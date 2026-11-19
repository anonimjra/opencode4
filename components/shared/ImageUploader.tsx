"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
  currentImageUrl?: string | null;
  onImageSelected: (file: File) => void;
  onImageRemoved: () => void;
  label?: string;
};

export default function ImageUploader({
  currentImageUrl,
  onImageSelected,
  onImageRemoved,
  label = "Foto Alat",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl ?? null,
  );
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setPreviewUrl(currentImageUrl ?? null);
  }, [currentImageUrl]);

  function handleFile(file: File) {
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    onImageSelected(file);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove() {
    setPreviewUrl(null);
    if (inputRef.current) inputRef.current.value = "";
    onImageRemoved();
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      {previewUrl ? (
        <div className="relative aspect-[4/3] w-full max-w-xs overflow-hidden rounded-2xl border border-[#1F2937] bg-black/40">
          <Image
            src={previewUrl}
            alt="Pratinjau foto alat"
            fill
            sizes="320px"
            className="object-cover"
            unoptimized={previewUrl.startsWith("blob:")}
          />
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Hapus foto"
            className="absolute right-2 top-2 rounded-full bg-black/70 p-1.5 text-gray-200 hover:bg-black/90 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
          className={cn(
            "flex aspect-[4/3] w-full max-w-xs cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 text-center transition-colors",
            isDragging
              ? "border-primary bg-primary/10"
              : "border-gray-700 bg-[#0B0F17] hover:border-gray-500",
          )}
        >
          <UploadCloud className="h-8 w-8 text-gray-500" />
          <span className="text-sm text-gray-400">
            Klik atau seret foto ke sini
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-600">
            <ImageIcon className="h-3 w-3" />
            JPEG, PNG, WebP • maks 2MB
          </span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}

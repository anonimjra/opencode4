"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Save, X } from "lucide-react";
import ImageUploader from "@/components/shared/ImageUploader";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { createRentalGear, updateRentalGear } from "@/app/actions/products";
import type { GearCategory, GearStatus, RentalGear } from "@/types/database";

type GearFormProps = {
  categories: GearCategory[];
  initialData?: RentalGear;
  isEditing?: boolean;
};

const STATUS_OPTIONS: { value: GearStatus; label: string }[] = [
  { value: "ready", label: "Ready di Studio" },
  { value: "rented", label: "Sedang Disewa" },
  { value: "maintenance", label: "Perawatan / Servis" },
];

export default function GearForm({
  categories,
  initialData,
  isEditing = false,
}: GearFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const existingImage = imageRemoved ? null : initialData?.primary_image_url ?? null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    if (imageFile) {
      formData.set("primary_image", imageFile);
    }
    if (newImageUrl) {
      formData.set("primary_image_url_existing", newImageUrl);
    }

    startTransition(async () => {
      const result = isEditing && initialData
        ? await updateRentalGear(initialData.id, formData)
        : await createRentalGear(formData);

      if (result.success) {
        showToast(
          isEditing
            ? "Alat rental berhasil diperbarui."
            : "Alat rental baru berhasil ditambahkan.",
          "success",
        );
        router.push("/admin/products");
        router.refresh();
      } else {
        setError(result.error ?? "Terjadi kesalahan saat menyimpan.");
        showToast(result.error ?? "Gagal menyimpan alat.", "error");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="flex items-start gap-2 rounded-xl border border-[#991B1B] bg-[#450A0A] px-4 py-3 text-sm text-[#F87171]">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          <span>{error}</span>
        </div>
      ) : null}

      <fieldset className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
        <legend className="px-1 text-sm font-semibold text-white">
          1. Identitas & Merk
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-gray-300">
              Nama Alat Rental
            </label>
            <input
              name="name"
              required
              defaultValue={initialData?.name}
              placeholder="Sony Alpha 7 IV Body Only"
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Brand / Merk
            </label>
            <input
              name="brand"
              defaultValue={initialData?.brand}
              placeholder="Sony, Canon, Fujifilm, Rode, Godox, DJI"
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Kategori Alat
            </label>
            <select
              name="category_id"
              defaultValue={initialData?.category_id ?? ""}
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="">-- Pilih Kategori --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-gray-300">
              Nomor Seri Unit (SN)
            </label>
            <input
              name="serial_number"
              defaultValue={initialData?.serial_number ?? ""}
              placeholder="SN-SNY-A74-01"
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 font-mono text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
        <legend className="px-1 text-sm font-semibold text-white">
          2. Tarif Sewa Fleksibel
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Tarif 12 Jam (Rp)
            </label>
            <input
              name="rate_12h"
              type="number"
              min={1}
              required
              defaultValue={initialData?.rate_12h}
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 font-mono text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Tarif 24 Jam (Rp)
            </label>
            <input
              name="rate_24h"
              type="number"
              min={1}
              required
              defaultValue={initialData?.rate_24h}
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 font-mono text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
        <legend className="px-1 text-sm font-semibold text-white">
          3. Spesifikasi Optik & Kelengkapan Bawaan
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Mount Lensa / Port
            </label>
            <input
              name="mount_type"
              defaultValue={initialData?.mount_type ?? ""}
              placeholder="Sony E-Mount, Canon RF"
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Spesifikasi Sensor / Audio
            </label>
            <input
              name="sensor_spec"
              defaultValue={initialData?.sensor_spec ?? ""}
              placeholder="Full Frame 33MP 4K 60fps"
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-gray-300">
              Kelengkapan Isi Tas Sewa
            </label>
            <textarea
              name="accessories_included"
              rows={3}
              required
              defaultValue={initialData?.accessories_included}
              placeholder="2x Baterai FZ100, 1x Dual Charger, 1x SD Card 128GB V60, 1x Tas Kamera"
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-gray-300">
              Deskripsi Alat
            </label>
            <textarea
              name="description"
              rows={2}
              defaultValue={initialData?.description ?? ""}
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
        <legend className="px-1 text-sm font-semibold text-white">
          4. Status Ketersediaan
        </legend>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Status Unit
            </label>
            <select
              name="gear_status"
              defaultValue={initialData?.gear_status ?? "ready"}
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Urutan Tampil
            </label>
            <input
              name="sort_order"
              type="number"
              defaultValue={initialData?.sort_order ?? 0}
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input
              name="is_featured"
              type="checkbox"
              defaultChecked={initialData?.is_featured ?? false}
              className="h-4 w-4 rounded border-gray-700 bg-[#0B0F17] accent-primary"
            />
            Tampilkan sebagai alat unggulan
          </label>
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
        <legend className="px-1 text-sm font-semibold text-white">
          5. Foto Media Alat
        </legend>
        <div className="mt-3">
          <ImageUploader
            currentImageUrl={existingImage}
            label="Foto Produk Alat"
            onImageSelected={(file) => {
              setImageFile(file);
              setImageRemoved(false);
            }}
            onImageRemoved={() => {
              setImageFile(null);
              setNewImageUrl(null);
              setImageRemoved(true);
            }}
          />
        </div>
      </fieldset>

      <div className="flex items-center justify-end gap-3">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-300 hover:bg-white/5 transition-colors"
        >
          <X className="h-4 w-4" />
          Batal
        </Link>
        <Button type="submit" isLoading={isPending}>
          <Save className="h-4 w-4" />
          Simpan Alat Rental
        </Button>
      </div>
    </form>
  );
}

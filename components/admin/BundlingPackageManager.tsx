"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, AlertCircle, Check } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import ImageUploader from "@/components/shared/ImageUploader";
import { formatRupiah } from "@/lib/utils";
import {
  createBundlingPackage,
  updateBundlingPackage,
  deleteBundlingPackage,
} from "@/app/actions/packages";
import type { BundlingPackage } from "@/types/database";

type BundlingPackageManagerProps = {
  packages: BundlingPackage[];
};

type FormState = {
  id?: string;
  name: string;
  description: string;
  items_included: string;
  rate_12h: number;
  rate_24h: number;
  discount_note: string;
  sort_order: number;
  image_url: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  items_included: "",
  rate_12h: 0,
  rate_24h: 0,
  discount_note: "",
  sort_order: 0,
  image_url: "",
};

export default function BundlingPackageManager({
  packages,
}: BundlingPackageManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function openCreate() {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setError(null);
    setIsOpen(true);
  }

  function openEdit(pkg: BundlingPackage) {
    setForm({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description ?? "",
      items_included: pkg.items_included.join("\n"),
      rate_12h: pkg.rate_12h,
      rate_24h: pkg.rate_24h,
      discount_note: pkg.discount_note ?? "",
      sort_order: pkg.sort_order,
      image_url: pkg.image_url,
    });
    setImageFile(null);
    setError(null);
    setIsOpen(true);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("name", form.name);
    formData.set("description", form.description);
    formData.set("items_included", form.items_included);
    formData.set("rate_12h", String(form.rate_12h));
    formData.set("rate_24h", String(form.rate_24h));
    formData.set("discount_note", form.discount_note);
    formData.set("sort_order", String(form.sort_order));
    if (imageFile) formData.set("image", imageFile);

    startTransition(async () => {
      const result = form.id
        ? await updateBundlingPackage(form.id, formData)
        : await createBundlingPackage(formData);
      if (result.success) {
        setIsOpen(false);
      } else {
        setError(result.error ?? "Terjadi kesalahan.");
      }
    });
  }

  function handleDelete(id: string) {
    if (!window.confirm("Hapus paket ini? Tindakan tidak dapat dibatalkan.")) return;
    startTransition(async () => {
      const result = await deleteBundlingPackage(id);
      if (!result.success) {
        window.alert(result.error ?? "Gagal menghapus paket.");
      }
    });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={openCreate} size="sm">
          <Plus className="h-4 w-4" />
          Buat Paket Bundling
        </Button>
      </div>

      {packages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#1F2937] py-12 text-center text-sm text-gray-500">
          Belum ada paket bundling. Buat paket hemat pertama Anda.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827]"
            >
              <div className="relative aspect-[16/10] bg-black/40">
                {pkg.image_url ? (
                  <Image
                    src={pkg.image_url}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{pkg.name}</h3>
                {pkg.discount_note ? (
                  <p className="mt-1 text-xs font-semibold text-[#4ADE80]">
                    {pkg.discount_note}
                  </p>
                ) : null}
                <ul className="mt-2 space-y-1">
                  {pkg.items_included.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-1.5 text-xs text-gray-400"
                    >
                      <Check className="h-3 w-3 text-[#4ADE80]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex items-center justify-between border-t border-[#1F2937] pt-3">
                  <div className="text-xs">
                    <span className="text-gray-500">12h </span>
                    <span className="font-mono text-white">
                      {formatRupiah(pkg.rate_12h)}
                    </span>
                    <span className="ml-2 text-gray-500">24h </span>
                    <span className="font-mono text-primary">
                      {formatRupiah(pkg.rate_24h)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(pkg)}
                      aria-label="Edit paket"
                      className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      aria-label="Hapus paket"
                      className="rounded-lg p-2 text-[#F87171] hover:bg-[#450A0A]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="Form paket bundling"
        className="w-full max-w-lg border border-[#1F2937] p-6"
      >
        <h3 className="text-lg font-bold text-white">
          {form.id ? "Edit Paket Bundling" : "Buat Paket Bundling"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error ? (
            <div className="flex items-start gap-2 rounded-xl border border-[#991B1B] bg-[#450A0A] px-4 py-3 text-sm text-[#F87171]">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
              <span>{error}</span>
            </div>
          ) : null}

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Nama Paket
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Deskripsi
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={2}
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Alat yang Termasuk (satu per baris)
            </label>
            <textarea
              value={form.items_included}
              onChange={(e) =>
                setForm({ ...form, items_included: e.target.value })
              }
              rows={4}
              placeholder={"Sony A7 IV\nLensa 24-70mm GM II\nRode Wireless GO II"}
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">
                Tarif 12 Jam (Rp)
              </label>
              <input
                type="number"
                min={1}
                value={form.rate_12h}
                onChange={(e) =>
                  setForm({ ...form, rate_12h: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 font-mono text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">
                Tarif 24 Jam (Rp)
              </label>
              <input
                type="number"
                min={1}
                value={form.rate_24h}
                onChange={(e) =>
                  setForm({ ...form, rate_24h: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 font-mono text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Catatan Diskon
            </label>
            <input
              value={form.discount_note}
              onChange={(e) =>
                setForm({ ...form, discount_note: e.target.value })
              }
              placeholder="Hemat Rp 100.000 dibanding sewa satuan"
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>

          <ImageUploader
            currentImageUrl={form.image_url || null}
            label="Foto Paket"
            onImageSelected={(file) => setImageFile(file)}
            onImageRemoved={() => {
              setImageFile(null);
              setForm({ ...form, image_url: "" });
            }}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" isLoading={isPending}>
              Simpan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

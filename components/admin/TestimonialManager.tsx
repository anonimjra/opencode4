"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Plus, Trash2, Star, AlertCircle, ToggleLeft, ToggleRight } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import ImageUploader from "@/components/shared/ImageUploader";
import {
  createTestimonial,
  toggleTestimonialActive,
  deleteTestimonial,
} from "@/app/actions/testimonials";
import type { Testimonial } from "@/types/database";

type TestimonialManagerProps = {
  testimonials: Testimonial[];
};

type FormState = {
  customer_name: string;
  customer_role: string;
  review_text: string;
  rating: number;
  sort_order: number;
  avatar_url: string;
};

const EMPTY_FORM: FormState = {
  customer_name: "",
  customer_role: "",
  review_text: "",
  rating: 5,
  sort_order: 0,
  avatar_url: "",
};

export default function TestimonialManager({
  testimonials,
}: TestimonialManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function openCreate() {
    setForm(EMPTY_FORM);
    setAvatarFile(null);
    setError(null);
    setIsOpen(true);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.set("customer_name", form.customer_name);
    formData.set("customer_role", form.customer_role);
    formData.set("review_text", form.review_text);
    formData.set("rating", String(form.rating));
    formData.set("sort_order", String(form.sort_order));
    if (avatarFile) formData.set("avatar", avatarFile);

    startTransition(async () => {
      const result = await createTestimonial(formData);
      if (result.success) setIsOpen(false);
      else setError(result.error ?? "Terjadi kesalahan.");
    });
  }

  function handleToggle(id: string, isActive: boolean) {
    startTransition(async () => {
      const result = await toggleTestimonialActive(id, isActive);
      if (!result.success) window.alert(result.error ?? "Gagal memperbarui.");
    });
  }

  function handleDelete(id: string) {
    if (!window.confirm("Hapus testimoni ini?")) return;
    startTransition(async () => {
      const result = await deleteTestimonial(id);
      if (!result.success) window.alert(result.error ?? "Gagal menghapus.");
    });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={openCreate} size="sm">
          <Plus className="h-4 w-4" />
          Tambah Ulasan Creator
        </Button>
      </div>

      {testimonials.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#1F2937] py-12 text-center text-sm text-gray-500">
          Belum ada testimoni.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5"
            >
              <div className="flex items-center gap-3">
                {item.avatar_url ? (
                  <Image
                    src={item.avatar_url}
                    alt={item.customer_name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    {item.customer_name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.customer_name}
                  </p>
                  <p className="text-xs text-gray-500">{item.customer_role}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < item.rating
                        ? "h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]"
                        : "h-3.5 w-3.5 text-gray-600"
                    }
                  />
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-300">{item.review_text}</p>
              <div className="mt-3 flex items-center justify-between border-t border-[#1F2937] pt-3">
                <button
                  onClick={() => handleToggle(item.id, !item.is_active)}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white"
                >
                  {item.is_active ? (
                    <ToggleRight className="h-5 w-5 text-[#4ADE80]" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-gray-600" />
                  )}
                  {item.is_active ? "Tampil" : "Disembunyikan"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  aria-label="Hapus testimoni"
                  className="rounded-lg p-2 text-[#F87171] hover:bg-[#450A0A]"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="Form testimoni"
        className="w-full max-w-lg border border-[#1F2937] p-6"
      >
        <h3 className="text-lg font-bold text-white">Tambah Ulasan Creator</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error ? (
            <div className="flex items-start gap-2 rounded-xl border border-[#991B1B] bg-[#450A0A] px-4 py-3 text-sm text-[#F87171]">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
              <span>{error}</span>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">
                Nama Klien
              </label>
              <input
                value={form.customer_name}
                onChange={(e) =>
                  setForm({ ...form, customer_name: e.target.value })
                }
                required
                className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-gray-300">
                Peran / Profesi
              </label>
              <input
                value={form.customer_role}
                onChange={(e) =>
                  setForm({ ...form, customer_role: e.target.value })
                }
                placeholder="Wedding Videographer"
                className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Isi Ulasan
            </label>
            <textarea
              value={form.review_text}
              onChange={(e) =>
                setForm({ ...form, review_text: e.target.value })
              }
              rows={3}
              required
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Rating Bintang (1-5)
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm({ ...form, rating: value })}
                  aria-label={`${value} bintang`}
                >
                  <Star
                    className={
                      value <= form.rating
                        ? "h-6 w-6 fill-[#FBBF24] text-[#FBBF24]"
                        : "h-6 w-6 text-gray-600"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <ImageUploader
            currentImageUrl={form.avatar_url || null}
            label="Avatar Klien (opsional)"
            onImageSelected={(file) => setAvatarFile(file)}
            onImageRemoved={() => {
              setAvatarFile(null);
              setForm({ ...form, avatar_url: "" });
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
              Simpan Ulasan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

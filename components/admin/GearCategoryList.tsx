"use client";

import { useState, useTransition } from "react";
import {
  Camera,
  Aperture,
  SunMedium,
  Mic,
  Sliders,
  Film,
  Pencil,
  Trash2,
  Plus,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import {
  createGearCategory,
  updateGearCategory,
  deleteGearCategory,
} from "@/app/actions/categories";
import type { GearCategory } from "@/types/database";

const ICON_OPTIONS: { name: string; icon: LucideIcon }[] = [
  { name: "Camera", icon: Camera },
  { name: "Aperture", icon: Aperture },
  { name: "SunMedium", icon: SunMedium },
  { name: "Mic", icon: Mic },
  { name: "Sliders", icon: Sliders },
  { name: "Film", icon: Film },
];

const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  ICON_OPTIONS.map((item) => [item.name, item.icon]),
);

export type CategoryWithCount = GearCategory & { gear_count: number };

type GearCategoryListProps = {
  categories: CategoryWithCount[];
};

type FormState = {
  id?: string;
  name: string;
  description: string;
  icon_name: string;
  sort_order: number;
};

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  icon_name: "Camera",
  sort_order: 0,
};

export default function GearCategoryList({ categories }: GearCategoryListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function openCreate() {
    setForm(EMPTY_FORM);
    setError(null);
    setIsOpen(true);
  }

  function openEdit(category: CategoryWithCount) {
    setForm({
      id: category.id,
      name: category.name,
      description: category.description ?? "",
      icon_name: category.icon_name,
      sort_order: category.sort_order,
    });
    setError(null);
    setIsOpen(true);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = form.id
        ? await updateGearCategory(
            form.id,
            form.name,
            form.description,
            form.icon_name,
            form.sort_order,
          )
        : await createGearCategory(
            form.name,
            form.description,
            form.icon_name,
            form.sort_order,
          );

      if (result.success) {
        setIsOpen(false);
      } else {
        setError(result.error ?? "Terjadi kesalahan.");
      }
    });
  }

  function handleDelete(id: string) {
    if (!window.confirm("Hapus kategori ini? Tindakan tidak dapat dibatalkan.")) {
      return;
    }
    startTransition(async () => {
      const result = await deleteGearCategory(id);
      if (!result.success) {
        window.alert(result.error ?? "Gagal menghapus kategori.");
      }
    });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={openCreate} size="sm">
          <Plus className="h-4 w-4" />
          Tambah Kategori
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#1F2937] bg-[#111827]">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="border-b border-[#1F2937] text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Ikon</th>
              <th className="px-4 py-3">Nama Kategori</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Jumlah Alat</th>
              <th className="px-4 py-3">Urutan</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                  Belum ada kategori alat.
                </td>
              </tr>
            ) : (
              categories.map((category) => {
                const Icon = ICON_MAP[category.icon_name] ?? Camera;
                return (
                  <tr
                    key={category.id}
                    className="border-b border-[#1F2937] last:border-0 hover:bg-white/5"
                  >
                    <td className="px-4 py-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-white">
                      {category.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">
                      {category.slug}
                    </td>
                    <td className="px-4 py-3">{category.gear_count}</td>
                    <td className="px-4 py-3">{category.sort_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(category)}
                          aria-label="Edit kategori"
                          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          aria-label="Hapus kategori"
                          className="rounded-lg p-2 text-[#F87171] hover:bg-[#450A0A]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        ariaLabel="Form kategori alat"
        className="w-full max-w-lg border border-[#1F2937] p-6"
      >
        <h3 className="text-lg font-bold text-white">
          {form.id ? "Edit Kategori" : "Tambah Kategori"}
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
              Nama Kategori
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
            <label className="mb-1.5 block text-sm text-gray-300">Ikon</label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => setForm({ ...form, icon_name: option.name })}
                    className={
                      form.icon_name === option.name
                        ? "flex items-center gap-1.5 rounded-lg border border-primary bg-primary/15 px-3 py-2 text-xs text-primary"
                        : "flex items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-2 text-xs text-gray-300 hover:border-gray-500"
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {option.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Urutan Tampil
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                setForm({ ...form, sort_order: Number(e.target.value) })
              }
              className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
            />
          </div>

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

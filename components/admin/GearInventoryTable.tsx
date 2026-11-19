"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Pencil, Trash2, Camera } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { updateGearStatus, deleteRentalGear } from "@/app/actions/products";
import type { GearCategory, GearStatus, RentalGear } from "@/types/database";

type GearInventoryTableProps = {
  gears: RentalGear[];
  categories: GearCategory[];
};

const STATUS_OPTIONS: { value: GearStatus; label: string }[] = [
  { value: "ready", label: "Ready di Studio" },
  { value: "rented", label: "Sedang Disewa" },
  { value: "maintenance", label: "Perawatan / Servis" },
];

const STATUS_BADGE: Record<GearStatus, string> = {
  ready: "bg-[#052E16] text-[#4ADE80] border-[#166534]",
  rented: "bg-[#450A0A] text-[#F87171] border-[#991B1B]",
  maintenance: "bg-[#451A03] text-[#FBBF24] border-[#92400E]",
};

export default function GearInventoryTable({
  gears,
  categories,
}: GearInventoryTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<"all" | GearStatus>("all");
  const [isPending, startTransition] = useTransition();

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories],
  );

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return gears.filter((gear) => {
      const matchQuery =
        !query ||
        gear.name.toLowerCase().includes(query) ||
        (gear.serial_number ?? "").toLowerCase().includes(query) ||
        gear.brand.toLowerCase().includes(query);
      const matchCategory =
        categoryFilter === "all" || gear.category_id === categoryFilter;
      const matchStatus =
        statusFilter === "all" || gear.gear_status === statusFilter;
      return matchQuery && matchCategory && matchStatus;
    });
  }, [gears, searchQuery, categoryFilter, statusFilter]);

  function handleStatusChange(id: string, status: GearStatus) {
    startTransition(async () => {
      const result = await updateGearStatus(id, status);
      if (!result.success) {
        window.alert(result.error ?? "Gagal memperbarui status.");
      }
    });
  }

  function handleDelete(id: string, name: string) {
    if (!window.confirm(`Hapus alat "${name}"? Tindakan tidak dapat dibatalkan.`)) {
      return;
    }
    startTransition(async () => {
      const result = await deleteRentalGear(id);
      if (!result.success) {
        window.alert(result.error ?? "Gagal menghapus alat.");
      }
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama alat, nomor seri (SN), atau brand..."
            className="w-full rounded-xl border border-gray-700 bg-[#0B0F17] pl-10 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
        >
          <option value="all">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | GearStatus)
          }
          className="rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none"
        >
          <option value="all">Semua Status</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#1F2937] bg-[#111827]">
        <table className="w-full min-w-[900px] text-left text-sm text-gray-300">
          <thead className="border-b border-[#1F2937] text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nama Alat & Brand</th>
              <th className="px-4 py-3">Nomor Seri</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Tarif</th>
              <th className="px-4 py-3">Status Unit</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                  Tidak ada alat yang cocok dengan filter.
                </td>
              </tr>
            ) : (
              filtered.map((gear) => (
                <tr
                  key={gear.id}
                  className="border-b border-[#1F2937] last:border-0 hover:bg-white/5"
                >
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-black/40">
                      {gear.primary_image_url ? (
                        <Image
                          src={gear.primary_image_url}
                          alt={gear.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-600">
                          <Camera className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{gear.name}</p>
                    <p className="text-xs text-gray-500">{gear.brand}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-400">
                    {gear.serial_number ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {gear.category_id
                      ? categoryMap.get(gear.category_id) ?? "-"
                      : "-"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <p className="font-mono text-xs text-white">
                      12h: {formatRupiah(gear.rate_12h)}
                    </p>
                    <p className="font-mono text-xs text-primary">
                      24h: {formatRupiah(gear.rate_24h)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1.5">
                      <span
                        className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[gear.gear_status]}`}
                      >
                        {STATUS_OPTIONS.find((s) => s.value === gear.gear_status)
                          ?.label ?? gear.gear_status}
                      </span>
                      <select
                        value={gear.gear_status}
                        disabled={isPending}
                        onChange={(e) =>
                          handleStatusChange(gear.id, e.target.value as GearStatus)
                        }
                        className="rounded-lg border border-gray-700 bg-[#0B0F17] px-2 py-1 text-xs text-white focus:border-primary focus:outline-none"
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${gear.id}/edit`}
                        aria-label="Edit alat"
                        className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(gear.id, gear.name)}
                        aria-label="Hapus alat"
                        className="rounded-lg p-2 text-[#F87171] hover:bg-[#450A0A]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

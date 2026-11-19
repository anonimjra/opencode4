import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import GearInventoryTable from "@/components/admin/GearInventoryTable";
import ExportExcelButton from "@/components/admin/ExportExcelButton";
import type { GearCategory, RentalGear } from "@/types/database";

export default async function AdminProductsPage() {
  const supabase = await createClient();

  const [gearsRes, categoriesRes] = await Promise.all([
    supabase
      .from("rental_gears")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase
      .from("gear_categories")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  const gears = (gearsRes.data as RentalGear[] | null) ?? [];
  const categories = (categoriesRes.data as GearCategory[] | null) ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Inventaris Alat Multimedia
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            {gears.length} alat terdaftar dalam katalog rental.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportExcelButton
            endpoint="/api/admin/export/inventory"
            label="Export Inventaris (.xlsx)"
          />
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            <Plus className="h-4 w-4" />
            Tambah Alat Baru
          </Link>
        </div>
      </div>

      <GearInventoryTable gears={gears} categories={categories} />
    </div>
  );
}

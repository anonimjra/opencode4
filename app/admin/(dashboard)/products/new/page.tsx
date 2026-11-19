import { createClient } from "@/lib/supabase/server";
import GearForm from "@/components/admin/GearForm";
import type { GearCategory } from "@/types/database";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gear_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  const categories = (data as GearCategory[] | null) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Tambah Alat Rental Baru</h2>
        <p className="mt-1 text-sm text-gray-400">
          Lengkapi spesifikasi, tarif 12/24 jam, nomor seri, dan kelengkapan bawaan.
        </p>
      </div>
      <GearForm categories={categories} isEditing={false} />
    </div>
  );
}

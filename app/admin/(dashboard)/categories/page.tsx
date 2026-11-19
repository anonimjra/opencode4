import { createClient } from "@/lib/supabase/server";
import GearCategoryList, {
  type CategoryWithCount,
} from "@/components/admin/GearCategoryList";
import type { GearCategory } from "@/types/database";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();

  const [categoriesRes, gearsRes] = await Promise.all([
    supabase
      .from("gear_categories")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase.from("rental_gears").select("category_id"),
  ]);

  const counts = new Map<string, number>();
  (gearsRes.data ?? []).forEach((row) => {
    const id = (row as { category_id: string | null }).category_id;
    if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
  });

  const categories: CategoryWithCount[] = (
    (categoriesRes.data as GearCategory[] | null) ?? []
  ).map((category) => ({
    ...category,
    gear_count: counts.get(category.id) ?? 0,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Kategori & Brand</h2>
        <p className="mt-1 text-sm text-gray-400">
          Kelola kategori alat untuk filter katalog rental.
        </p>
      </div>
      <GearCategoryList categories={categories} />
    </div>
  );
}

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GearForm from "@/components/admin/GearForm";
import type { GearCategory, RentalGear } from "@/types/database";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [gearRes, categoriesRes] = await Promise.all([
    supabase.from("rental_gears").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("gear_categories")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  if (!gearRes.data) {
    notFound();
  }

  const gear = gearRes.data as RentalGear;
  const categories = (categoriesRes.data as GearCategory[] | null) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Edit Alat Rental</h2>
        <p className="mt-1 text-sm text-gray-400">{gear.name}</p>
      </div>
      <GearForm
        categories={categories}
        initialData={gear}
        isEditing
      />
    </div>
  );
}

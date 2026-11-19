"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import type { ActionResponse } from "@/types";

async function ensureUniqueSlug(
  base: string,
  excludeId?: string,
): Promise<string> {
  const supabase = await createClient();
  let slug = slugify(base);
  let suffix = 1;
  let query = supabase.from("gear_categories").select("id, slug").eq("slug", slug);
  let { data } = await query;
  while ((data ?? []).some((row) => row.id !== excludeId)) {
    suffix += 1;
    slug = `${slugify(base)}-${suffix}`;
    query = supabase.from("gear_categories").select("id, slug").eq("slug", slug);
    ({ data } = await query);
  }
  return slug;
}

export async function createGearCategory(
  name: string,
  description: string,
  iconName: string,
  sortOrder: number,
): Promise<ActionResponse> {
  if (!name.trim()) {
    return { success: false, error: "Nama kategori wajib diisi." };
  }
  const supabase = await createClient();
  const slug = await ensureUniqueSlug(name);

  const { error } = await supabase.from("gear_categories").insert({
    name: name.trim(),
    slug,
    description: description.trim() || null,
    icon_name: iconName || "Camera",
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  });

  if (error) {
    return { success: false, error: `Gagal menambah kategori: ${error.message}` };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}

export async function updateGearCategory(
  id: string,
  name: string,
  description: string,
  iconName: string,
  sortOrder: number,
): Promise<ActionResponse> {
  if (!name.trim()) {
    return { success: false, error: "Nama kategori wajib diisi." };
  }
  const supabase = await createClient();
  const slug = await ensureUniqueSlug(name, id);

  const { error } = await supabase
    .from("gear_categories")
    .update({
      name: name.trim(),
      slug,
      description: description.trim() || null,
      icon_name: iconName || "Camera",
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal memperbarui kategori: ${error.message}` };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}

export async function deleteGearCategory(id: string): Promise<ActionResponse> {
  const supabase = await createClient();

  const { count } = await supabase
    .from("rental_gears")
    .select("*", { count: "exact", head: true })
    .eq("category_id", id);

  if ((count ?? 0) > 0) {
    return {
      success: false,
      error:
        "Kategori alat tidak dapat dihapus karena masih digunakan oleh beberapa alat rental.",
    };
  }

  const { error } = await supabase
    .from("gear_categories")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal menghapus kategori: ${error.message}` };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return { success: true };
}

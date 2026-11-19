"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  uploadRentalImage,
  extractPathFromUrl,
  deleteRentalImage,
} from "@/lib/supabase/storage";
import type { ActionResponse } from "@/types";

export async function createTestimonial(
  formData: FormData,
): Promise<ActionResponse> {
  const customer_name = String(formData.get("customer_name") ?? "").trim();
  const customer_role = String(formData.get("customer_role") ?? "").trim();
  const review_text = String(formData.get("review_text") ?? "").trim();
  const ratingRaw = Number(formData.get("rating") ?? 5);
  const sort_order = Number(formData.get("sort_order") ?? 0) || 0;

  if (!customer_name || !review_text) {
    return { success: false, error: "Nama dan isi ulasan wajib diisi." };
  }
  const rating = Math.max(1, Math.min(5, Math.round(ratingRaw)));

  let avatar_url: string | null = null;
  const file = formData.get("avatar") as File | null;
  if (file && file.size > 0) {
    const uploaded = await uploadRentalImage(file, "brand");
    if (!uploaded.success || !uploaded.data) {
      return { success: false, error: uploaded.error ?? "Gagal mengunggah avatar." };
    }
    avatar_url = uploaded.data.url;
  }

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    customer_name,
    customer_role: customer_role || null,
    review_text,
    rating,
    avatar_url,
    is_active: true,
    sort_order,
  });

  if (error) {
    return { success: false, error: `Gagal menyimpan testimoni: ${error.message}` };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function toggleTestimonialActive(
  id: string,
  isActive: boolean,
): Promise<ActionResponse> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("testimonials")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal memperbarui testimoni: ${error.message}` };
  }

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string): Promise<ActionResponse> {
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("testimonials")
    .select("avatar_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) {
    return { success: false, error: `Gagal menghapus testimoni: ${error.message}` };
  }

  const path = extractPathFromUrl(
    (row as { avatar_url: string | null } | null)?.avatar_url,
  );
  if (path) await deleteRentalImage(path);

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

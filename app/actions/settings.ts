"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  uploadRentalImage,
  extractPathFromUrl,
  deleteRentalImage,
} from "@/lib/supabase/storage";
import type { ActionResponse } from "@/types";

export async function updateBrandAndCinemaTheme(
  formData: FormData,
): Promise<ActionResponse> {
  const supabase = await createClient();

  const brand_name = String(formData.get("brand_name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const primary_color = String(formData.get("primary_color") ?? "").trim();

  if (!brand_name) {
    return { success: false, error: "Nama brand wajib diisi." };
  }
  if (!/^#[0-9a-fA-F]{6}$/.test(primary_color)) {
    return { success: false, error: "Kode warna HEX tidak valid (contoh: #E11D48)." };
  }

  const { data: existing } = await supabase
    .from("site_settings")
    .select("id, logo_url")
    .limit(1)
    .maybeSingle();

  if (!existing) {
    return { success: false, error: "Konfigurasi situs belum tersedia." };
  }

  const updateData: Record<string, unknown> = {
    brand_name,
    tagline,
    primary_color,
  };

  const logoFile = formData.get("logo") as File | null;
  if (logoFile && logoFile.size > 0) {
    const uploaded = await uploadRentalImage(logoFile, "brand");
    if (!uploaded.success || !uploaded.data) {
      return { success: false, error: uploaded.error ?? "Gagal mengunggah logo." };
    }
    updateData.logo_url = uploaded.data.url;

    const oldPath = extractPathFromUrl(
      (existing as { logo_url: string | null }).logo_url,
    );
    if (oldPath) await deleteRentalImage(oldPath);
  }

  const { error } = await supabase
    .from("site_settings")
    .update(updateData)
    .eq("id", (existing as { id: string }).id);

  if (error) {
    return { success: false, error: `Gagal menyimpan pengaturan: ${error.message}` };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  return { success: true };
}

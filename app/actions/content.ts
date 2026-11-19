"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { cleanPhoneNumber } from "@/lib/whatsapp";
import {
  uploadRentalImage,
  extractPathFromUrl,
  deleteRentalImage,
} from "@/lib/supabase/storage";
import type { ActionResponse } from "@/types";
import type { VisitingHour } from "@/types/database";

function parseVisitingHours(raw: string | null): VisitingHour[] {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [day, ...rest] = line.split("|");
      return {
        day: (day ?? "").trim(),
        time: rest.join("|").trim(),
      };
    })
    .filter((item) => item.day);
}

export async function updateStudioContent(
  formData: FormData,
): Promise<ActionResponse> {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("site_settings")
    .select("id")
    .limit(1)
    .maybeSingle();

  const updateData: Record<string, unknown> = {
    hero_title: String(formData.get("hero_title") ?? "").trim(),
    hero_subtitle: String(formData.get("hero_subtitle") ?? "").trim(),
    studio_title: String(formData.get("studio_title") ?? "").trim(),
    studio_description: String(formData.get("studio_description") ?? "").trim(),
    rental_terms: String(formData.get("rental_terms") ?? "").trim(),
    studio_address: String(formData.get("studio_address") ?? "").trim(),
    google_maps_embed_url:
      String(formData.get("google_maps_embed_url") ?? "").trim() || null,
    instagram_url: String(formData.get("instagram_url") ?? "").trim() || null,
    tiktok_url: String(formData.get("tiktok_url") ?? "").trim() || null,
    facebook_url: String(formData.get("facebook_url") ?? "").trim() || null,
    visiting_hours: parseVisitingHours(
      formData.get("visiting_hours") as string | null,
    ),
  };

  const whatsappRaw = String(formData.get("whatsapp_number") ?? "").trim();
  if (whatsappRaw) {
    updateData.whatsapp_number = cleanPhoneNumber(whatsappRaw);
  }

  const heroFile = formData.get("hero_image") as File | null;
  if (heroFile && heroFile.size > 0) {
    const uploaded = await uploadRentalImage(heroFile, "brand");
    if (!uploaded.success || !uploaded.data) {
      return { success: false, error: uploaded.error ?? "Gagal mengunggah foto hero." };
    }
    updateData.hero_image_url = uploaded.data.url;
  }

  const studioFile = formData.get("studio_image") as File | null;
  if (studioFile && studioFile.size > 0) {
    const uploaded = await uploadRentalImage(studioFile, "brand");
    if (!uploaded.success || !uploaded.data) {
      return { success: false, error: uploaded.error ?? "Gagal mengunggah foto studio." };
    }
    updateData.studio_image_url = uploaded.data.url;
  }

  if (!existing) {
    return { success: false, error: "Konfigurasi studio belum tersedia di database." };
  }

  const { error } = await supabase
    .from("site_settings")
    .update(updateData)
    .eq("id", (existing as { id: string }).id);

  if (error) {
    return { success: false, error: `Gagal menyimpan konten: ${error.message}` };
  }

  revalidatePath("/admin/content");
  revalidatePath("/");
  return { success: true };
}

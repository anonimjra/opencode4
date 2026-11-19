"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import { uploadRentalImage, extractPathFromUrl, deleteRentalImage } from "@/lib/supabase/storage";
import type { ActionResponse } from "@/types";
import type { GearStatus } from "@/types/database";

async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const supabase = await createClient();
  const root = slugify(base) || "alat";
  let slug = root;
  let suffix = 1;
  for (;;) {
    const { data } = await supabase
      .from("rental_gears")
      .select("id")
      .eq("slug", slug);
    if (!(data ?? []).some((row) => row.id !== excludeId)) return slug;
    suffix += 1;
    slug = `${root}-${suffix}`;
  }
}

export async function updateGearStatus(
  id: string,
  newStatus: GearStatus,
): Promise<ActionResponse> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("rental_gears")
    .update({ gear_status: newStatus })
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal memperbarui status: ${error.message}` };
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  return { success: true };
}

export async function deleteRentalGear(id: string): Promise<ActionResponse> {
  const supabase = await createClient();

  const { data: gear } = await supabase
    .from("rental_gears")
    .select("primary_image_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("rental_gears").delete().eq("id", id);
  if (error) {
    return { success: false, error: `Gagal menghapus alat: ${error.message}` };
  }

  const imageUrl = (gear as { primary_image_url: string | null } | null)
    ?.primary_image_url;
  const path = extractPathFromUrl(imageUrl);
  if (path) {
    await deleteRentalImage(path);
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  return { success: true };
}

function parseGearPayload(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    category_id: (String(formData.get("category_id") ?? "") || null) as string | null,
    brand: String(formData.get("brand") ?? "").trim() || "Sony",
    serial_number: String(formData.get("serial_number") ?? "").trim() || null,
    rate_12h: Number(formData.get("rate_12h") ?? 0),
    rate_24h: Number(formData.get("rate_24h") ?? 0),
    mount_type: String(formData.get("mount_type") ?? "").trim() || null,
    sensor_spec: String(formData.get("sensor_spec") ?? "").trim() || null,
    accessories_included: String(formData.get("accessories_included") ?? "").trim(),
    gear_status: String(formData.get("gear_status") ?? "ready") as GearStatus,
    description: String(formData.get("description") ?? "").trim() || null,
    is_featured: formData.get("is_featured") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createRentalGear(
  formData: FormData,
): Promise<ActionResponse> {
  const payload = parseGearPayload(formData);

  if (!payload.name) {
    return { success: false, error: "Nama alat wajib diisi." };
  }
  if (!(payload.rate_12h > 0) || !(payload.rate_24h > 0)) {
    return { success: false, error: "Tarif 12 jam dan 24 jam harus lebih dari 0." };
  }

  let imageUrl = String(formData.get("primary_image_url_existing") ?? "").trim();
  const file = formData.get("primary_image") as File | null;
  if (file && file.size > 0) {
    const uploaded = await uploadRentalImage(file, "gears");
    if (!uploaded.success || !uploaded.data) {
      return { success: false, error: uploaded.error ?? "Gagal mengunggah foto." };
    }
    imageUrl = uploaded.data.url;
  }

  if (!imageUrl) {
    return { success: false, error: "Foto alat wajib diunggah." };
  }

  const supabase = await createClient();
  const slug = await ensureUniqueSlug(payload.name);

  const { error } = await supabase.from("rental_gears").insert({
    ...payload,
    slug,
    primary_image_url: imageUrl,
  });

  if (error) {
    return { success: false, error: `Gagal menyimpan alat: ${error.message}` };
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  return { success: true };
}

export async function updateRentalGear(
  id: string,
  formData: FormData,
): Promise<ActionResponse> {
  const payload = parseGearPayload(formData);

  if (!payload.name) {
    return { success: false, error: "Nama alat wajib diisi." };
  }
  if (!(payload.rate_12h > 0) || !(payload.rate_24h > 0)) {
    return { success: false, error: "Tarif 12 jam dan 24 jam harus lebih dari 0." };
  }

  const supabase = await createClient();

  const updateData: Record<string, unknown> = {
    ...payload,
    slug: await ensureUniqueSlug(payload.name, id),
  };

  const file = formData.get("primary_image") as File | null;
  if (file && file.size > 0) {
    const uploaded = await uploadRentalImage(file, "gears");
    if (!uploaded.success || !uploaded.data) {
      return { success: false, error: uploaded.error ?? "Gagal mengunggah foto." };
    }
    updateData.primary_image_url = uploaded.data.url;

    const { data: existing } = await supabase
      .from("rental_gears")
      .select("primary_image_url")
      .eq("id", id)
      .maybeSingle();
    const oldPath = extractPathFromUrl(
      (existing as { primary_image_url: string | null } | null)?.primary_image_url,
    );
    if (oldPath) {
      await deleteRentalImage(oldPath);
    }
  }

  const { error } = await supabase
    .from("rental_gears")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal memperbarui alat: ${error.message}` };
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/");
  return { success: true };
}

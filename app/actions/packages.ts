"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/utils";
import {
  uploadRentalImage,
  extractPathFromUrl,
  deleteRentalImage,
} from "@/lib/supabase/storage";
import type { ActionResponse } from "@/types";
import type { BundlingPackage } from "@/types/database";

async function ensureUniqueSlug(base: string, excludeId?: string): Promise<string> {
  const supabase = await createClient();
  const root = slugify(base) || "paket";
  let slug = root;
  let suffix = 1;
  for (;;) {
    const { data } = await supabase
      .from("bundling_packages")
      .select("id")
      .eq("slug", slug);
    if (!(data ?? []).some((row) => row.id !== excludeId)) return slug;
    suffix += 1;
    slug = `${root}-${suffix}`;
  }
}

function parseItems(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parsePayload(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    items_included: parseItems(formData.get("items_included") as string | null),
    rate_12h: Number(formData.get("rate_12h") ?? 0),
    rate_24h: Number(formData.get("rate_24h") ?? 0),
    discount_note: String(formData.get("discount_note") ?? "").trim() || null,
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
  };
}

export async function createBundlingPackage(
  formData: FormData,
): Promise<ActionResponse> {
  const payload = parsePayload(formData);
  if (!payload.name) {
    return { success: false, error: "Nama paket wajib diisi." };
  }
  if (payload.items_included.length === 0) {
    return { success: false, error: "Daftar alat dalam paket wajib diisi." };
  }

  let imageUrl = "";
  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const uploaded = await uploadRentalImage(file, "packages");
    if (!uploaded.success || !uploaded.data) {
      return { success: false, error: uploaded.error ?? "Gagal mengunggah foto." };
    }
    imageUrl = uploaded.data.url;
  }
  if (!imageUrl) {
    return { success: false, error: "Foto paket wajib diunggah." };
  }

  const supabase = await createClient();
  const slug = await ensureUniqueSlug(payload.name);

  const { error } = await supabase.from("bundling_packages").insert({
    ...payload,
    slug,
    image_url: imageUrl,
  });

  if (error) {
    return { success: false, error: `Gagal menyimpan paket: ${error.message}` };
  }

  revalidatePath("/admin/packages");
  revalidatePath("/");
  return { success: true };
}

export async function updateBundlingPackage(
  id: string,
  formData: FormData,
): Promise<ActionResponse> {
  const payload = parsePayload(formData);
  if (!payload.name) {
    return { success: false, error: "Nama paket wajib diisi." };
  }

  const supabase = await createClient();
  const updateData: Record<string, unknown> = {
    ...payload,
    slug: await ensureUniqueSlug(payload.name, id),
  };

  const file = formData.get("image") as File | null;
  if (file && file.size > 0) {
    const uploaded = await uploadRentalImage(file, "packages");
    if (!uploaded.success || !uploaded.data) {
      return { success: false, error: uploaded.error ?? "Gagal mengunggah foto." };
    }
    updateData.image_url = uploaded.data.url;
  }

  const { error } = await supabase
    .from("bundling_packages")
    .update(updateData)
    .eq("id", id);

  if (error) {
    return { success: false, error: `Gagal memperbarui paket: ${error.message}` };
  }

  revalidatePath("/admin/packages");
  revalidatePath("/");
  return { success: true };
}

export async function deleteBundlingPackage(id: string): Promise<ActionResponse> {
  const supabase = await createClient();
  const { data: pkg } = await supabase
    .from("bundling_packages")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase
    .from("bundling_packages")
    .delete()
    .eq("id", id);
  if (error) {
    return { success: false, error: `Gagal menghapus paket: ${error.message}` };
  }

  const path = extractPathFromUrl(
    (pkg as { image_url: string | null } | null)?.image_url,
  );
  if (path) await deleteRentalImage(path);

  revalidatePath("/admin/packages");
  revalidatePath("/");
  return { success: true };
}

export type PackageRecord = BundlingPackage;

import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils";
import type { ActionResponse } from "@/types";

export const BUCKET_NAME = "rental-media";
export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export type UploadFolder = "gears" | "packages" | "brand";

export type UploadResult = { url: string; path: string };

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Format foto harus JPEG, PNG, atau WebP.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "Ukuran foto maksimal 2MB. Silakan kompres terlebih dahulu.";
  }
  return null;
}

export async function uploadRentalImage(
  file: File,
  folder: UploadFolder,
): Promise<ActionResponse<UploadResult>> {
  const validationError = validateImageFile(file);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const supabase = createClient();
  const timestamp = Date.now();
  const baseName = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${folder}/${baseName}-${timestamp}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, { cacheControl: "3600", upsert: false, contentType: file.type });

  if (error) {
    return { success: false, error: `Gagal mengunggah foto: ${error.message}` };
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return { success: true, data: { url: data.publicUrl, path } };
}

export async function deleteRentalImage(
  path: string,
): Promise<ActionResponse> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);
  if (error) {
    return { success: false, error: `Gagal menghapus foto: ${error.message}` };
  }
  return { success: true };
}

export function extractPathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const marker = `/${BUCKET_NAME}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
}

# T026 - Supabase Storage Helper untuk Foto Alat Kamera

**Depends on:** T003, T004
**Estimasi:** sedang

## Tujuan
Membuat modul helper utilitas unggah berkas media (`lib/supabase/storage.ts`) ke Supabase Storage Bucket `rental-media` dengan validasi ukuran (maksimal 2MB), format MIME gambar (JPEG, PNG, WebP), upload foto alat studio, dan fungsi pembersihan file lama.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/05-CONVENTIONS.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `lib/supabase/storage.ts` : Modul fungsi upload dan delete Supabase Storage
- `components/shared/ImageUploader.tsx` : Komponen antarmuka pengunggah foto alat

## Langkah
1. Buat `lib/supabase/storage.ts`:
   - Konstanta: `BUCKET_NAME = 'rental-media'`, `MAX_FILE_SIZE = 2 * 1024 * 1024` (2MB), format MIME gambar yang diizinkan.
   - `validateImageFile(file: File)`: Validasi ukuran dan tipe.
   - `uploadRentalImage(file: File, folder: 'gears' | 'packages' | 'brand'): Promise<ActionResponse<{ url: string; path: string }>>`:
     - Sanitasi nama file dengan slug unik dan timestamp.
     - Upload ke bucket `rental-media`.
     - Kembalikan URL publik via `supabase.storage.from(BUCKET_NAME).getPublicUrl(path)`.
   - `deleteRentalImage(path: string): Promise<ActionResponse>`: Menghapus file dari bucket.
2. Buat `components/shared/ImageUploader.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `currentImageUrl?: string | null`, `onImageSelected: (file: File) => void`, `onImageRemoved: () => void`, `label?: string`.
   - Menampilkan area drag-and-drop foto dengan pratinjau lokal instan.

## Kriteria selesai
- [x] Validasi menolak file non-gambar atau berukuran lebih dari 2MB.
- [x] Foto tersimpan rapi di Supabase Storage bucket `rental-media`.
- [x] Komponen ImageUploader mendukung pratinjau sebelum submit form.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mengunggah foto mentah berukuran puluhan megabyte tanpa validasi di sisi klien.

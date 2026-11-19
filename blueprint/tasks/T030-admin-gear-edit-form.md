# T030 - Admin Kelola Alat - Form Edit & Kelengkapan Bawaan

**Depends on:** T028, T029
**Estimasi:** sedang

## Tujuan
Membangun halaman form edit alat rental (`app/admin/products/[id]/edit/page.tsx`) dan Server Action `updateRentalGear` untuk mengubah tarif sewa 12h/24h, nomor seri, kelengkapan aksesoris, status unit, serta mengelola penggantian foto alat.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/products/[id]/edit/page.tsx` : Halaman edit alat rental
- `app/actions/products.ts` : Server Action `updateRentalGear`

## Langkah
1. Perbarui `app/actions/products.ts`:
   - `updateRentalGear(id: string, formData: FormData): Promise<ActionResponse>`:
     - Ekstrak seluruh field spesifikasi alat (nama, kategori, brand, serial_number, rate_12h, rate_24h, mount_type, sensor_spec, accessories_included, gear_status, description).
     - Periksa apakah ada foto baru yang diunggah. Jika ada, upload foto baru dan update URL.
     - Update record di tabel `rental_gears`.
     - Lakukan `revalidatePath('/admin/products')` dan `revalidatePath('/')`.
     - Kembalikan `{ success: true }`.
2. Buat `app/admin/products/[id]/edit/page.tsx`:
   - Server Component yang menerima parameter rute `params: { id: string }`.
   - Query data alat terkait dan daftar kategori dari Supabase.
   - Jika alat tidak ditemukan, panggil `notFound()`.
   - Render `GearForm` dengan `initialData={gear}` dan `isEditing={true}`.

## Kriteria selesai
- [ ] Form edit terisi otomatis dengan data alat lama (nama, tarif, nomor seri, kelengkapan, status).
- [ ] Admin dapat memperbarui tarif atau status tanpa harus mengunggah ulang foto lama.
- [ ] Sukses update mengarahkan kembali ke tabel inventaris dengan pesan sukses.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan menimpa `primary_image_url` dengan string kosong jika admin tidak memilih file foto baru.

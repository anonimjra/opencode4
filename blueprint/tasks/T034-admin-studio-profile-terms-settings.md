# T034 - Admin Kelola Profil Studio, Syarat Jaminan & Jam Buka

**Depends on:** T024, T026
**Estimasi:** sedang

## Tujuan
Membangun halaman manajemen profil studio dan syarat sewa di `/admin/content` beserta form editor (`components/admin/StudioContentForm.tsx`) untuk memperbarui teks Hero, profil studio rental, teks aturan jaminan sewa (KTP/deposit), alamat fisik pick-up, jam buka operasional, dan nomor WhatsApp rental.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/content/page.tsx` : Halaman editor studio & syarat sewa
- `components/admin/StudioContentForm.tsx` : Form profil studio, alamat & syarat jaminan sewa
- `app/actions/content.ts` : Server Action update konfigurasi `site_settings`

## Langkah
1. Buat `app/actions/content.ts`:
   - Deklarasikan `'use server'`.
   - `updateStudioContent(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak teks Hero, profil studio (`studio_title`, `studio_description`), aturan jaminan sewa (`rental_terms`), alamat fisik pick-up (`studio_address`), URL Google Maps, nomor WhatsApp pemesanan, jam kunjungan (`visiting_hours`), dan media sosial.
     - Tangani upload foto hero atau foto studio baru jika ada.
     - Simpan perubahan ke tabel `site_settings`.
     - Revalidasi path `/admin/content` dan `/`.
2. Buat `components/admin/StudioContentForm.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `settings: SiteSettings`.
   - Kartu 1: Banner Hero & Headline Display.
   - Kartu 2: Standar Perawatan Alat & Profil Studio.
   - Kartu 3: Teks Syarat & Ketentuan Jaminan Sewa (Textarea editor multi-line).
   - Kartu 4: Alamat Studio Pick-up & Jam Buka Operasional.
   - Kartu 5: Nomor WhatsApp & Tautan Media Sosial.
   - Tombol "Simpan Seluruh Pengaturan Konten" dengan feedback sukses.
3. Buat `app/admin/content/page.tsx`:
   - Server Component pemanggil `site_settings` dari Supabase.
   - Render `StudioContentForm`.

## Kriteria selesai
- [x] Admin dapat memperbarui syarat jaminan sewa dan alamat studio fisik.
- [x] Perubahan langsung ter-update di landing page publik.
- [x] Nomor WhatsApp pengelola tersimpan dengan format standar.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan nomor WhatsApp selalu diawali kode negara 62.

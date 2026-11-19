# T035 - Admin Kelola Pengaturan Brand & Palet Warna Cinema

**Depends on:** T009, T024, T026
**Estimasi:** kecil

## Tujuan
Membangun halaman pengaturan brand dan tema visual cinema di `/admin/settings` beserta komponen form (`components/admin/CinemaThemeSettingsForm.tsx`) untuk mengganti nama brand rental, upload logo, serta memilih palet warna aksen sinematik (Cinema Crimson, Amber Tungsten, Cyber Teal, Neon Violet).

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/admin/settings/page.tsx` : Halaman pengaturan identitas dan tema toko
- `components/admin/CinemaThemeSettingsForm.tsx` : Form nama brand, upload logo, dan preset tema cinema
- `app/actions/settings.ts` : Server Action update identitas dan tema

## Langkah
1. Buat `app/actions/settings.ts`:
   - Deklarasikan `'use server'`.
   - `updateBrandAndCinemaTheme(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak: `brand_name`, `tagline`, `primary_color`.
     - Upload file logo baru jika ada.
     - Simpan perubahan ke tabel `site_settings`.
     - Lakukan revalidasi layout root `revalidatePath('/', 'layout')`.
2. Buat `components/admin/CinemaThemeSettingsForm.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `settings: SiteSettings`.
   - Identitas Brand: Nama Brand (default "Lensa Nusantara Rental & Studio"), Tagline, dan Upload Logo Brand.
   - Palet Aksen Cinema:
     - Color picker native dan input manual kode HEX.
     - 4 Tombol Preset Tema Cinema Siap Pakai:
       1. Cinema Crimson (`#E11D48` - Merah Rekaman Kamera)
       2. Amber Tungsten (`#F59E0B` - Kuning Keemasan Lampu Studio)
       3. Cyber Teal (`#0D9488` - Hijau-Biru Digital)
       4. Neon Violet (`#8B5CF6` - Ungu Modern Creative)
     - Mengklik tombol preset langsung mengisi nilai HEX dan memperbarui visual tombol tema secara instan.
   - Tombol "Terapkan Perubahan Tampilan & Tema".
3. Buat `app/admin/settings/page.tsx`:
   - Server Component pemanggil `site_settings`.
   - Render `CinemaThemeSettingsForm`.

## Kriteria selesai
- [ ] Admin dapat mengubah nama brand rental kamera dan logo.
- [ ] Admin dapat memilih salah satu dari 4 preset tema cinema atau memilih warna custom.
- [ ] Mengubah tema warna segera memperbarui CSS Variables pada seluruh antarmuka web.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Panggil `revalidatePath('/', 'layout')` agar root layout memuat ulang variabel warna tema yang baru.

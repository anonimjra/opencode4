# T042 - Dokumentasi README, Setup Guide & Verifikasi Build

**Depends on:** T040, T041
**Estimasi:** sedang

## Tujuan
Menyusun dokumentasi lengkap proyek pada file `README.md` (panduan instalasi lokal, setup database Supabase, skrip migrasi & seed rental kamera, pembuatan akun admin awal, panduan deploy Vercel), menjalankan verifikasi build produksi, dan memperbarui checklist `PROGRESS.md`.

## Baca dulu
- AGENTS.md
- blueprint/00-README.md
- blueprint/02-PROJECT-BRIEF.md
- blueprint/99-FINAL-CHECKLIST.md

## File yang dibuat / diubah
- `README.md` : Dokumentasi lengkap panduan setup pengembang & pemilik rental
- `blueprint/PROGRESS.md` : Memperbarui checklist T042 dan mengisi laporan akhir

## Langkah
1. Buat berkas `README.md` di root `opencode4`:
   - **Tentang Proyek**: E-Catalog & CMS Rental Kamera & Multimedia Gear ("Lensa Nusantara") dengan tarif sewa fleksibel 12h/24h, nomor seri inventaris, checklist kelengkapan bawaan, dan ekspor Excel server-side.
   - **Fitur Utama**:
     - Katalog gear multimedia (Kamera, Lensa, Lighting, Audio, Stabilizer, Drone, Paket Bundling).
     - Modal Quick View dengan spesifikasi sensor, checklist isi tas sewa, dan kalkulator durasi sewa.
     - Template booking WhatsApp otomatis memuat jadwal sewa dan prompt verifikasi 2 identitas asli.
     - Section syarat jaminan sewa dan peta lokasi studio pick-up.
     - Dashboard admin terproteksi Supabase Auth.
     - Export Excel (.xlsx) untuk inventaris alat dan rekap booking sewa.
   - **Langkah Setup Supabase**:
     1. Buat proyek baru di dashboard Supabase.
     2. Di menu **SQL Editor**, jalankan skrip `supabase/migrations/001_rental_schema.sql`.
     3. Jalankan skrip `supabase/seed.sql` untuk mempopulasikan katalog alat awal.
     4. Pastikan storage bucket `rental-media` dibuat dengan opsi *Public*.
     5. Di menu **Authentication** > **Users**, buat user admin pertama (email & password).
   - **Setup Lingkungan Lokal**:
     1. Masuk ke folder: `cd opencode4`.
     2. Jalankan `npm install`.
     3. Salin `.env.example` ke `.env.local` dan isi URL & Anon Key Supabase.
     4. Jalankan `npm run dev` dan buka `http://localhost:3000`.
     5. Buka dashboard di `http://localhost:3000/admin/login`.
   - **Panduan Deploy ke Vercel**:
     1. Push ke repositori GitHub.
     2. Import proyek di dashboard Vercel.
     3. Masukkan environment variables yang sama dengan `.env.local`.
     4. Deploy.
2. Jalankan verifikasi kompilasi produksi `npm run build` dan `npx tsc --noEmit`.
3. Buka `blueprint/PROGRESS.md`, tandai seluruh task `[x]`, dan isi laporan akhir eksekusi.

## Kriteria selesai
- [x] Berkas `README.md` memuat instruksi yang jelas dan komprehensif.
- [x] Perintah `npm run build` sukses (Exit Code 0).
- [x] Seluruh kriteria di `blueprint/99-FINAL-CHECKLIST.md` terpenuhi.

## Verifikasi
`npm run build && npx tsc --noEmit`

## Catatan / jebakan
- Jangan mencantumkan API key rahasia asli di dalam dokumentasi publik.

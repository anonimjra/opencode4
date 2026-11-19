# BLUEPRINT INDEX & EXECUTION ORDER (V4 - CAMERA RENTAL EDITION)

Dokumen ini adalah panduan navigasi dan urutan eksekusi implementasi template E-Catalog & CMS Rental Kamera & Multimedia Gear ("Lensa Nusantara Rental & Studio") dengan Admin Dashboard & Server-Side Excel Export Engine berbasis Next.js App Router, Supabase, dan Tailwind CSS.

---

## 1. Daftar Dokumen Fondasi (Wajib Dipahami)

Sebelum agen pelaksana (`opencode`) mengeksekusi task apa pun, pahami arsitektur menyeluruh pada dokumen-dokumen berikut:

| Dokumen | Deskripsi |
|---|---|
| `AGENTS.md` | Protokol eksekusi otomatis, batasan keras isolasi project `opencode4`, penanganan kendala, dan konvensi commit. |
| `blueprint/02-PROJECT-BRIEF.md` | Ruang lingkup bisnis rental multimedia, tarif 12/24 jam, nomor seri, kelengkapan bawaan, alur WhatsApp booking & jaminan KTP. |
| `blueprint/03-ARCHITECTURE.md` | Peta struktur folder, alur data client-server, modal Quick View, kalkulator durasi sewa, proteksi rute admin, dan ExcelJS builder. |
| `blueprint/04-TECH-STACK.md` | Daftar dependensi package npm (Next.js, Supabase, Tailwind, Lucide, ExcelJS), versi terkunci, alasan teknis. |
| `blueprint/05-CONVENTIONS.md` | Aturan penamaan file, styling cinema dark, TypeScript strict mode, formatting tarif Rupiah & durasi sewa, standar commit git. |
| `blueprint/06-DATA-MODEL.md` | Skema database PostgreSQL di Supabase (kolom tarif 12/24 jam, nomor seri, kelengkapan tas/baterai, status unit, RLS policies). |
| `blueprint/07-DESIGN-SYSTEM.md` | Palet warna tema Cinema Dark (`#0F172A`) dengan aksen Crimson Red / Amber Gold, tipografi tajam, date picker, dan kartu gear. |
| `blueprint/PROGRESS.md` | Matriks pelacak progres pengerjaan task (T001 - T042). |
| `blueprint/BLOCKERS.md` | Log pencatatan kendala teknis dan mitigasi otonom. |
| `blueprint/99-FINAL-CHECKLIST.md` | Protokol audit integrasi akhir sebelum rilis produksi. |

---

## 2. Fase & Urutan Eksekusi Task (T001 - T042)

Eksekusi **WAJIB** berurutan dari T001 hingga T042 tanpa melompat kecuali terdapat dependensi yang gagal dan telah dicatat dalam `BLOCKERS.md`.

### Fase 1: Fondasi, Database & Core Infrastructure (T001 - T007)
- **T001**: Inisialisasi Project Next.js App Router, TypeScript, Tailwind CSS, Lucide React, Supabase SSR, dan ExcelJS.
- **T002**: Konfigurasi Tailwind CSS, Color Palette Cinema Dark (`#0F172A`), Google Fonts (`Inter` & `Plus Jakarta Sans`), dan CSS Variables.
- **T003**: Konfigurasi Environment Variable & Setup Supabase Client (Browser, Server Component, Route Handler).
- **T004**: Skema Database Supabase DDL Migration (`001_rental_schema.sql`), Kolom Tarif 12/24 Jam, Nomor Seri, Kelengkapan, Status Unit, RLS, dan Storage Bucket `rental-media`.
- **T005**: Seed Data Awal (`seed.sql`) untuk brand "Lensa Nusantara Rental" (Sony A7 IV, Canon R6 II, Lensa 24-70mm GM, Godox SL60W, Rode Wireless GO II, DJI Ronin RS3, Paket Wedding Video).
- **T006**: Pembuatan Tipe TypeScript Global (`types/database.ts` & `types/index.ts`) mencerminkan model data rental kamera lengkap.
- **T007**: Pembuatan Utility Helper (`formatRupiah`, `calculateRentalDuration`, `generateRentalWhatsAppLink` dengan durasi & syarat KTP, `cn`).

### Fase 2: Public Rental E-Catalog Landing Page (T008 - T021)
- **T008**: Root Layout Publik, Font Loader, dan Metadata SEO Khusus Rental Kamera & Multimedia Shooting Gear.
- **T009**: Provider Tema Dinamis untuk Aksen Warna Cinema (Crimson Red, Amber Gold, Cyber Teal).
- **T010**: Navbar Responsif Publik dengan Logo Rental, Link Navigasi Cepat, dan Tombol WhatsApp Booking.
- **T011**: Hero Section Banner Cinematic Studio (Badge Baterai Full & Alat Terkalibrasi, CTA "Cek Katalog" & "Konsultasi Shooting").
- **T012**: Section Tentang Studio Rental (Standar Perawatan Sensor Bersih, Kalibrasi Alat, Uji Fungsi Bersama).
- **T013**: Komponen Filter Kategori Alat Interaktif (Semua, Kamera, Lensa, Lighting, Audio, Stabilizer, Drone, Paket Bundling).
- **T014**: Kartu Alat Rental (Foto, Badge Ready/Disewa, Pill Mount/Sensor, Pill Kelengkapan Bawaan, Tarif 12 Jam & 24 Jam, Tombol Quick View & WA).
- **T015**: Modal Pop-up Quick View Detail Alat (Foto Detail, Spesifikasi Lengkap, Checklist Isi Tas Sewa, Kalkulator Durasi Sewa, Tombol WA).
- **T016**: Section Paket Bundling Hemat (Paket Wedding Video, Paket Podcast 2 Host, Paket YouTube Starter).
- **T017**: Section Syarat & Ketentuan Sewa (Transparansi Jaminan Minimal 2 KTP/SIM/Paspor, Verifikasi Medsos, Deposit Luar Kota).
- **T018**: Section 5 Langkah Alur Sewa (Pilih Alat ➔ Booking WA ➔ Ambil / Kirim ➔ Uji Fungsi ➔ Pengembalian).
- **T019**: Section Lokasi Studio & Jam Buka Pick-up (Embed Google Maps, Jam Ambil Pagi-Malam, Tombol Petunjuk Arah).
- **T020**: Testimoni Creator & Footer Publik dengan Floating WhatsApp ("Cek Ketersediaan Alat Hari Ini").
- **T021**: Assembling Landing Page Utama Publik (`app/(public)/page.tsx`) dengan Data Fetching Paralel Supabase & ISR.

### Fase 3: Autentikasi Admin & Proteksi Rute (T022 - T024)
- **T022**: Next.js Middleware untuk Proteksi Sesi Supabase Auth pada Seluruh Rute `/admin/*` (Kecuali `/admin/login`).
- **T023**: Halaman Login Admin (`/admin/login`) dengan Form Validasi, Error Handling, dan Desain Cinema Dark.
- **T024**: Layout Dashboard Admin dengan Sidebar Navigasi Modul Lengkap, Top Header, dan Logout.

### Fase 4: Fitur Admin Dashboard & Manajemen Rental (T025 - T035)
- **T025**: Halaman Ringkasan Dashboard Overview & Metrik Rental (Total Alat, Alat On-Rent Hari Ini, Alat Ready, Booking Pending, Estimasi Omzet).
- **T026**: Storage Service Helper untuk Upload Foto Alat & Kelengkapan ke Bucket `rental-media`.
- **T027**: Manajemen Kategori Alat & Brand (`/admin/categories`).
- **T028**: Daftar Inventaris Alat (`/admin/products`) - Tabel Data, Nomor Seri, Tarif 12/24 Jam, Status (Ready/Disewa/Servis), Toggle Status, dan Hapus.
- **T029**: Form Tambah Alat Rental Baru (`/admin/products/new`) - Input Tarif 12 & 24 Jam, Nomor Seri, Kelengkapan Bawaan Tas/Baterai, Foto.
- **T030**: Form Edit Alat Rental (`/admin/products/[id]/edit`) beserta Manajemen Nomor Seri dan Status Unit.
- **T031**: Manajemen Paket Bundling Shooting (`/admin/packages`) - Nama Paket, Alat yang Termasuk, dan Harga Paket Hemat.
- **T032**: Manajemen Antrean Booking Sewa (`/admin/bookings`) - Data Penyewa, Tanggal Sewa, dan Status Follow-up.
- **T033**: Manajemen Testimoni Klien (`/admin/testimonials`) - Tambah, Edit, Hapus Ulasan & Rating.
- **T034**: Manajemen Profil Studio, Syarat Jaminan & Jam Buka (`/admin/content`) - Hero Text, Syarat Sewa, Alamat Pick-up.
- **T035**: Pengaturan Brand & Palet Warna Cinema (`/admin/settings`) - Pilihan Preset Crimson Red, Amber Gold, Cyber Teal.

### Fase 5: Server-side Excel Export Engine Khusus Rental (T036 - T039)
- **T036**: ExcelJS Service Builder (`lib/excel/builder.ts`) dengan Tema Header Cinema Dark, Lebar Dinamis, Border, dan Format Rupiah.
- **T037**: Server Route Handler Export Excel Inventaris Alat (`/api/admin/export/inventory`) dengan Verifikasi Sesi Admin.
- **T038**: Server Route Handler Export Excel Rekap Booking Sewa (`/api/admin/export/bookings`) dengan Verifikasi Sesi Admin.
- **T039**: Integrasi Tombol Download Excel pada UI Dashboard Inventaris dan Antrean Booking.

### Fase 6: Polish, Validasi Produksi & Dokumentasi (T040 - T042)
- **T040**: Global Error Boundary, Halaman 404 Estetik Tema Kamera, Skeleton Shimmer Loading, dan Toast Feedback Notifikasi.
- **T041**: Optimasi Media `next/image` untuk Foto Gear Studio, Responsivitas Layar Sempit 360px, dan Audit Aksesibilitas.
- **T042**: Dokumentasi Komprehensif `README.md`, Panduan Setup Supabase, Skrip Pembuatan Admin Awal, dan Panduan Deploy Vercel.

---

## 3. Instruksi Eksekusi untuk Agen Pelaksana

1. Pastikan working directory terminal berada di: `C:\Users\L480\Downloads\opencode4`.
2. Buka dan baca `blueprint/tasks/T001-setup-nextjs-project.md`.
3. Kerjakan langkah-langkahnya, jalankan perintah verifikasi.
4. Perbarui `blueprint/PROGRESS.md` (ubah `[ ]` menjadi `[x]`).
5. Buat commit git: `T001: <judul task>`.
6. Lanjutkan berurutan hingga `T042`.
7. Jalankan audit menyeluruh di `blueprint/99-FINAL-CHECKLIST.md`.

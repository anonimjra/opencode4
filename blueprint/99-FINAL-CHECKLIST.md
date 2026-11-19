# 99-FINAL-CHECKLIST (V4 - CAMERA RENTAL EDITION)

Dokumen ini berisi protokol verifikasi menyeluruh yang wajib dijalankan oleh agen pelaksana (`opencode`) setelah menyelesaikan seluruh task T001 hingga T042 sebelum menyatakan proyek selesai.

---

## 1. Verifikasi Build & Kompilasi Kode

- [ ] **Type-Check Bersih:** Jalankan `npx tsc --noEmit`. Tidak boleh ada error tipe TypeScript.
- [ ] **Production Build Berhasil:** Jalankan `npm run build`. Build Next.js harus selesai dengan status sukses (Exit Code 0).
- [ ] **Linting Lolos:** Jalankan `npm run lint`. Tidak boleh ada error kritis ESLint.

---

## 2. Verifikasi Database & Supabase Integration

- [ ] **File DDL Lengkap:** File `supabase/migrations/001_rental_schema.sql` memuat tabel `site_settings`, `gear_categories`, `rental_gears` (lengkap dengan tarif 12/24 jam, nomor seri, kelengkapan bawaan, status unit: ready/rented/maintenance), `bundling_packages`, `rental_bookings`, `testimonials`.
- [ ] **RLS Aktif & Tervalidasi:** Seluruh tabel mengaktifkan RLS. Publik anonim hanya bisa membaca katalog dan meng-insert booking pada `rental_bookings`.
- [ ] **Seed Data Sedia:** File `supabase/seed.sql` berisi data dummy awal Lensa Nusantara (Sony A7 IV, Canon R6 II, Lensa 24-70mm GM, Godox SL60W, Rode Wireless GO II, DJI Ronin RS3, Paket Wedding Video).
- [ ] **Storage Bucket Terdefinisi:** Storage bucket `rental-media` siap menampung foto gear kamera resolusi tinggi.

---

## 3. Verifikasi Landing Page Publik

- [ ] **Filter Kategori Alat:** Tab filter (Kamera, Lensa, Lighting, Audio, Stabilizer, Drone, Paket Bundling) menyaring kartu alat secara instan.
- [ ] **Tarif Ganda (12 Jam vs 24 Jam):** Kartu alat menampilkan kedua opsi tarif sewa dengan jelas dalam format Rupiah.
- [ ] **Pill Spesifikasi & Kelengkapan:** Kartu alat menampilkan sensor/mount dan rincian baterai/tas bawaan.
- [ ] **Modal Quick View & Kalkulator:** Mengklik Quick View membuka modal dengan foto detail dan kalkulator durasi sewa interaktif (hitung hari x tarif).
- [ ] **Template Pesan WhatsApp:** Tombol booking memuat format detail nama alat, durasi sewa, tanggal ambil/kembali, total biaya, dan prompt pengiriman foto 2 identitas asli.
- [ ] **Section Syarat Jaminan:** Menampilkan aturan minimal 2 kartu identitas asli dan verifikasi medsos secara transparan.
- [ ] **Peta Studio Pick-up:** Iframe Google Maps terpasang rapi di section lokasi studio pick-up.

---

## 4. Verifikasi Autentikasi & Rute Admin

- [ ] **Route Guarding Berjalan:** Rute `/admin/*` otomatis me-redirect pengunjung tak terotentikasi ke `/admin/login`.
- [ ] **Login & Logout:** Login dengan kredensial Supabase berhasil masuk dashboard dan tombol logout berhasil membersihkan sesi.

---

## 5. Verifikasi Admin Dashboard

- [ ] **Overview Metrik Rental:** Menampilkan jumlah total alat, alat yang sedang disewa hari ini (on rent), alat ready, dan antrean booking.
- [ ] **CRUD Inventaris Alat:** Form input tarif 12/24 jam, nomor seri (SN), kelengkapan bawaan, dan upload foto berfungsi mulus.
- [ ] **Manajemen Antrean Booking:** Status booking sewa dapat diubah (pending, verified, active, completed, cancelled).
- [ ] **Manajemen Paket Bundling:** Admin dapat membuat paket hemat shooting baru.
- [ ] **Ganti Tema Cinema:** Pemilihan preset warna (Cinema Crimson, Amber Tungsten, Cyber Teal) langsung mengubah aksen warna web.

---

## 6. Verifikasi Export Excel Server-Side

- [ ] **Export Inventaris Alat:** Mengunduh file `inventaris-alat-YYYY-MM-DD.xlsx` dengan kolom Nomor Seri, Kelengkapan Bawaan, Tarif 12/24 Jam, dan Status Unit.
- [ ] **Export Rekap Booking Sewa:** Mengunduh file `rekap-sewa-YYYY-MM-DD.xlsx` dengan kolom Nama Penyewa, Nomor WA, Alat Disewa, Tanggal Ambil/Kembali, Durasi, Total Biaya (Rp), dan Status.
- [ ] **Integritas File:** File `.xlsx` dapat dibuka tanpa peringatan error, header rapi bertema cinema dark, dan format angka Rupiah valid.

---

## 7. Verifikasi Dokumentasi Handoff

- [ ] File `README.md` memuat panduan lengkap: setup Supabase, isi `.env.local`, buat admin pertama, dan deploy ke Vercel.
- [ ] File `blueprint/PROGRESS.md` seluruhnya telah bertanda `[x]` dengan ringkasan akhir.

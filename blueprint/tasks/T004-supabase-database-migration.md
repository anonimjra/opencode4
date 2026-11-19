# T004 - Skema Database Supabase DDL Migration & RLS Policies

**Depends on:** none
**Estimasi:** sedang

## Tujuan
Membuat berkas migrasi SQL lengkap (`supabase/migrations/001_rental_schema.sql`) yang mendefinisikan tabel-tabel PostgreSQL spesifik rental multimedia (tarif ganda 12/24 jam, nomor seri unit, kelengkapan tas/baterai, status unit), relasi kategori alat, tabel antrean booking, paket bundling shooting, testimoni, aturan RLS, dan storage bucket `rental-media`.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `supabase/migrations/001_rental_schema.sql` : Skrip SQL migrasi komprehensif industri rental kamera

## Langkah
1. Buat folder `supabase/migrations/` di root `opencode4`.
2. Buat file `001_rental_schema.sql`:
   - Ekstensi `pgcrypto` untuk `gen_random_uuid()`.
   - Buat tabel `site_settings` dengan profil studio rental, alamat fisik, jam pick-up (JSONB), syarat jaminan sewa (TEXT).
   - Buat tabel `gear_categories` (id, name, slug, description, icon_name, sort_order).
   - Buat tabel `rental_gears`:
     - Kolom identitas: `name`, `slug`, `brand`, `serial_number`.
     - Kolom tarif: `rate_12h NUMERIC`, `rate_24h NUMERIC`.
     - Kolom spesifikasi: `mount_type`, `sensor_spec`, `accessories_included`.
     - Kolom status: `gear_status` ('ready' | 'rented' | 'maintenance'), `is_featured`, `sort_order`.
     - Kolom media: `primary_image_url`.
   - Buat tabel `bundling_packages` (id, name, slug, description, items_included TEXT[], rate_12h, rate_24h, discount_note, image_url, sort_order).
   - Buat tabel `rental_bookings` (id, customer_name, customer_whatsapp, gear_name, rental_duration_type, pickup_date, return_date, total_days, estimated_total, notes, status).
   - Buat tabel `testimonials` (id, customer_name, customer_role, review_text, rating, avatar_url, is_active).
3. Buat indeks performa:
   - `idx_rental_gears_category`, `idx_rental_gears_status`, `idx_rental_gears_sort`, `idx_rental_bookings_status`.
4. Aktifkan RLS pada seluruh tabel.
5. Tulis RLS Policies:
   - Publik (Anon): SELECT pada `site_settings`, `gear_categories`, `rental_gears`, `bundling_packages`, `testimonials`.
   - Publik (Anon): INSERT pada `rental_bookings`.
   - Admin (Authenticated): SELECT, INSERT, UPDATE, DELETE penuh pada seluruh tabel.
6. Buat Storage Bucket `rental-media` dengan policy read publik dan write hanya role `authenticated`.

## Kriteria selesai
- [x] Berkas DDL SQL memuat seluruh kolom spesifik rental (tarif 12/24 jam, nomor seri, kelengkapan, status unit).
- [x] Aturan RLS melindungi data sensitif dan mengizinkan booking sewa dari publik.
- [x] Konfigurasi storage bucket `rental-media` siap pakai.

## Verifikasi
Pemeriksaan integritas sintaks PostgreSQL pada file migrasi.

## Catatan / jebakan
- Pastikan kolom `rate_12h` dan `rate_24h` bertipe `NUMERIC(12, 0)` agar dapat menampung tarif sewa kamera bioskop/high-end.

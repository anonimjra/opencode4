# T025 - Halaman Ringkasan Dashboard Overview & Metrik Rental

**Depends on:** T003, T006, T024
**Estimasi:** kecil

## Tujuan
Membangun halaman utama dashboard admin (`app/admin/page.tsx`) yang menyajikan ringkasan metrik operasional rental kamera (total alat terdaftar, alat on-rent hari ini, alat ready di studio, antrean booking pending, estimasi omzet sewa) dan tautan aksi cepat.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `app/admin/page.tsx` : Halaman overview ringkasan dashboard
- `components/admin/RentalMetricCard.tsx` : Kartu metrik operasional rental

## Langkah
1. Buat `components/admin/RentalMetricCard.tsx`:
   - Terima props `title: string`, `value: number | string`, `icon: LucideIcon`, `description?: string`, `badgeText?: string`.
   - Desain kartu: `bg-[#111827] p-6 rounded-2xl border border-[#1F2937] shadow-lg flex items-start justify-between text-white`.
2. Buat Server Component `app/admin/page.tsx`:
   - Ambil data agregat dari Supabase secara paralel:
     1. `rental_gears`: Total alat, hitung yang `gear_status = 'ready'`, hitung yang `gear_status = 'rented'`.
     2. `rental_bookings`: Total booking dan hitung yang berstatus `'pending'`.
     3. `bundling_packages`: Total paket hemat.
   - Tampilkan 4 Kartu Metrik Utama:
     - Kartu 1: "Total Inventaris Alat" (angka total, keterangan jumlah kategori).
     - Kartu 2: "Unit Ready di Studio" (angka alat siap disewa langsung).
     - Kartu 3: "Sedang Disewa (On Rent)" (angka alat yang sedang keluar shooting).
     - Kartu 4: "Booking Pending Masuk" (badge peringatan oranye jika ada booking baru belum diverifikasi).
   - Tautan Aksi Cepat (Quick Actions):
     - "Tambah Alat Baru" -> `/admin/products/new`
     - "Cek Antrean Booking" -> `/admin/bookings`
     - "Buat Paket Bundling" -> `/admin/packages`
     - "Export Excel Inventaris" -> `/api/admin/export/inventory`

## Kriteria selesai
- [x] Halaman ringkasan dashboard memuat data statistik rental dengan akurat.
- [x] Tombol aksi cepat mengarahkan ke modul yang tepat.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan count query `{ count: 'exact', head: true }` untuk efisiensi transfer data.

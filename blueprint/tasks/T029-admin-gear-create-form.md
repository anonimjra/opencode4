# T029 - Admin Kelola Alat - Form Tambah Tarif 12/24 Jam & SN

**Depends on:** T026, T027, T028
**Estimasi:** sedang

## Tujuan
Membangun halaman form tambah alat rental baru (`app/admin/products/new/page.tsx`) dan komponen form (`components/admin/GearForm.tsx`) dengan field spesifik rental: nama alat, merk/brand, nomor seri unit (SN), tarif sewa 12 jam, tarif sewa 24 jam, kelengkapan bawaan (baterai, charger, memory, tas), status ketersediaan, dan upload foto alat.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/products/new/page.tsx` : Halaman input alat rental baru
- `components/admin/GearForm.tsx` : Komponen form spesifikasi alat lengkap
- `app/actions/products.ts` : Server Action `createRentalGear`

## Langkah
1. Perbarui `app/actions/products.ts`:
   - `createRentalGear(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak: `name`, `category_id`, `brand`, `serial_number`, `rate_12h`, `rate_24h`, `mount_type`, `sensor_spec`, `accessories_included`, `gear_status`, `description`, `is_featured`, `sort_order`.
     - Validasi tarif: `rate_12h` dan `rate_24h` harus berupa angka positif.
     - Upload foto alat ke Supabase Storage via `uploadRentalImage`.
     - Generate slug unik dari `name`.
     - Insert record ke `rental_gears`.
     - Revalidasi path `/admin/products` dan `/`.
2. Buat `components/admin/GearForm.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `categories: GearCategory[]`, `initialData?: RentalGear`, `isEditing?: boolean`.
   - Grup Field 1 (Identitas & Merk):
     - Nama Alat Rental (Input teks wajib, cth: "Sony Alpha 7 IV Body Only")
     - Brand / Merk (Input teks: Sony, Canon, Fujifilm, Rode, Godox, DJI)
     - Kategori Alat (Select dari `categories`)
     - Nomor Seri Unit (SN) (Input teks untuk kontrol inventaris, cth: "SN-SNY-A74-01")
   - Grup Field 2 (Tarif Sewa Fleksibel):
     - 2 Kolom Sejajar: Tarif 12 Jam (Rp) dan Tarif 24 Jam (Rp).
   - Grup Field 3 (Spesifikasi Optik & Kelengkapan Bawaan):
     - Mount Lensa / Port (cth: "Sony E-Mount", "Canon RF")
     - Spesifikasi Sensor / Audio (cth: "Full Frame 33MP 4K 60fps")
     - Kelengkapan Isi Tas Sewa (Textarea: cth: "2x Baterai FZ100, 1x Dual Charger, 1x SD Card 128GB V60, 1x Tas Kamera")
   - Grup Field 4 (Status Ketersediaan):
     - Select: **Ready di Studio**, **Sedang Disewa**, **Perawatan / Servis**.
   - Grup Field 5 (Foto Media Alat):
     - Komponen `ImageUploader` untuk foto produk berkualitas tinggi.
   - Tombol "Simpan Alat Rental" dengan loading state dan tombol "Batal".
3. Buat `app/admin/products/new/page.tsx`:
   - Server Component pemanggil daftar `gear_categories`.
   - Render `GearForm` dalam mode pembuatan baru (`isEditing={false}`).

## Kriteria selesai
- [ ] Admin dapat mendaftarkan alat rental baru lengkap dengan tarif ganda 12h/24h dan nomor seri (SN).
- [ ] Kelengkapan aksesoris bawaan tersimpan jelas.
- [ ] Foto berhasil diunggah ke Supabase Storage dan data tersimpan di database.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan biarkan tarif 12 jam atau 24 jam bernilai 0 tanpa konfirmasi khusus.

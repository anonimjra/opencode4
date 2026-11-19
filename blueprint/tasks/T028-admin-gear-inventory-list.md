# T028 - Admin Kelola Inventaris Alat - List & Search

**Depends on:** T003, T006, T024, T027
**Estimasi:** sedang

## Tujuan
Membangun halaman inventaris alat admin (`app/admin/products/page.tsx`) dengan tabel interaktif (`components/admin/GearInventoryTable.tsx`) yang memiliki filter kategori alat, pencarian nama/nomor seri (SN), tarif 12/24 jam, badge status unit (Ready/Disewa/Servis), tombol ganti status cepat, tombol hapus, dan tombol Export Excel.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/admin/products/page.tsx` : Halaman tabel inventaris alat rental
- `components/admin/GearInventoryTable.tsx` : Komponen tabel interaktif data inventaris alat
- `app/actions/products.ts` : Server Actions status unit dan delete alat

## Langkah
1. Buat atau perbarui `app/actions/products.ts`:
   - Deklarasikan `'use server'`.
   - `updateGearStatus(id: string, newStatus: GearStatus): Promise<ActionResponse>`:
     - Update kolom `gear_status` pada tabel `rental_gears`.
     - Revalidasi path `/admin/products` dan `/`.
   - `deleteRentalGear(id: string): Promise<ActionResponse>`:
     - Hapus record alat dari Supabase.
     - Hapus foto terkait dari storage bucket.
     - Revalidasi path.
2. Buat `components/admin/GearInventoryTable.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `gears: RentalGear[]`, `categories: GearCategory[]`.
   - State filter: `searchQuery`, `categoryFilter`, `statusFilter` ('all' | 'ready' | 'rented' | 'maintenance').
   - Kolom Tabel:
     1. Thumbnail Foto Alat
     2. Nama Alat & Brand
     3. Nomor Seri (SN) Unit
     4. Kategori Alat
     5. Tarif 12 Jam & 24 Jam (Format Rupiah)
     6. Status Unit (Dropdown cepat / Badge: Ready / Sedang Disewa / Servis)
     7. Aksi (Tombol Edit -> `/admin/products/[id]/edit`, Tombol Hapus dengan konfirmasi)
3. Buat `app/admin/products/page.tsx`:
   - Server Component pemanggil data alat lengkap dengan relasi kategori dari Supabase.
   - Header: Judul "Inventaris Alat Multimedia", tombol "Tambah Alat Baru" (`/admin/products/new`), dan tombol "Export Excel".
   - Render `GearInventoryTable`.

## Kriteria selesai
- [ ] Daftar alat tampil lengkap dengan nomor seri (SN) dan tarif ganda 12h/24h.
- [ ] Filter pencarian dan kategori bekerja secara instan tanpa reload browser.
- [ ] Penggantian status unit langsung memicu revalidasi pada antarmuka publik.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Nomor seri (SN) sangat penting untuk kontrol internal alat rental; jangan biarkan kolom ini terpotong di layar.

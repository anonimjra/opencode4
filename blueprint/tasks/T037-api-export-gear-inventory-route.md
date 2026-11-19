# T037 - Server Route Handler Export Excel Inventaris Alat

**Depends on:** T003, T006, T036
**Estimasi:** sedang

## Tujuan
Membangun Server Route Handler (`app/api/admin/export/inventory/route.ts`) yang memverifikasi sesi login admin, memanggil seluruh data inventaris alat beserta kategorinya dari Supabase, menyusun worksheet Excel dengan kolom spesifik rental (Nomor Seri, Kelengkapan Bawaan, Tarif 12/24 Jam, Status Unit), dan mengalirkan file unduhan `inventaris-alat-YYYY-MM-DD.xlsx`.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `app/api/admin/export/inventory/route.ts` : API endpoint ekspor berkas Excel inventaris alat
- `lib/excel/inventory-sheet.ts` : Generator worksheet inventaris alat rental

## Langkah
1. Buat `lib/excel/inventory-sheet.ts`:
   - `buildInventoryWorksheet(workbook: Workbook, gears: RentalGear[]): void`:
     - Buat worksheet `"Inventaris Alat"`.
     - Konfigurasi definisi kolom:
       1. `header: 'No', key: 'no', width: 6`
       2. `header: 'Nama Alat Rental', key: 'name', width: 32`
       3. `header: 'Brand / Merk', key: 'brand', width: 16`
       4. `header: 'Nomor Seri (SN)', key: 'serial_number', width: 20`
       5. `header: 'Kategori Alat', key: 'category', width: 22`
       6. `header: 'Kelengkapan Bawaan Tas', key: 'accessories', width: 38`
       7. `header: 'Tarif 12 Jam (Rp)', key: 'rate_12h', width: 18`
       8. `header: 'Tarif 24 Jam (Rp)', key: 'rate_24h', width: 18`
       9. `header: 'Status Unit', key: 'status', width: 16`
       10. `header: 'Terakhir Diperbarui', key: 'updated_at', width: 22`
     - Tambahkan baris data:
       - Iterasi `gears`, petakan nomor urut.
       - Tulis tarif numerik dan set `cell.numFmt = RUPIAH_NUM_FMT`.
       - Format status: *"Ready di Studio"*, *"Sedang Disewa"*, *"Perawatan/Servis"*.
     - Terapkan styling via `applyCinemaWorksheetStyling`.
2. Buat `app/api/admin/export/inventory/route.ts`:
   - Tangani request `GET(request: NextRequest)`.
   - Cek sesi admin via `supabase.auth.getUser()`. Jika tidak login, kembalikan HTTP 401 Unauthorized.
   - Ambil seluruh data dari `rental_gears` join `gear_categories`, urutkan berdasarkan `category_id ASC, name ASC`.
   - Buat workbook dan panggil `buildInventoryWorksheet`.
   - Generate binary buffer.
   - Format nama berkas: `inventaris-alat-${format(new Date(), 'yyyy-MM-dd')}.xlsx`.
   - Kembalikan `new NextResponse(buffer, { headers: { ... } })` berformat attachment spreadsheet.

## Kriteria selesai
- [x] Endpoint `/api/admin/export/inventory` memblokir akses tanpa login admin (HTTP 401).
- [x] Mengembalikan file binary Excel dengan nama `inventaris-alat-YYYY-MM-DD.xlsx`.
- [x] Kolom spreadsheet mencakup Nomor Seri, Kelengkapan Bawaan, Tarif 12/24 Jam, dan Status Unit.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Kolom tarif harus berupa angka numerik dengan number format Rupiah agar pengguna dapat menggunakan rumus Excel tanpa error.

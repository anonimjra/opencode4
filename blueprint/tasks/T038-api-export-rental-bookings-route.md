# T038 - Server Route Handler Export Excel Rekap Booking Sewa

**Depends on:** T003, T006, T036
**Estimasi:** sedang

## Tujuan
Membangun Server Route Handler (`app/api/admin/export/bookings/route.ts`) yang memverifikasi sesi login admin, mengambil data seluruh antrean booking sewa dari `rental_bookings`, menyusun berkas Excel dengan `exceljs`, dan mengalirkan file unduhan `rekap-sewa-YYYY-MM-DD.xlsx`.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `app/api/admin/export/bookings/route.ts` : API endpoint ekspor berkas Excel rekap sewa
- `lib/excel/bookings-sheet.ts` : Generator worksheet rekap booking sewa

## Langkah
1. Buat `lib/excel/bookings-sheet.ts`:
   - `buildBookingsWorksheet(workbook: Workbook, bookings: RentalBooking[]): void`:
     - Buat worksheet `"Rekap Booking Sewa"`.
     - Konfigurasi definisi kolom:
       1. `header: 'No', key: 'no', width: 6`
       2. `header: 'Tanggal Booking', key: 'created_at', width: 22`
       3. `header: 'Nama Penyewa', key: 'name', width: 25`
       4. `header: 'Nomor WhatsApp', key: 'whatsapp', width: 20`
       5. `header: 'Alat / Paket Disewa', key: 'gear', width: 30`
       6. `header: 'Tipe Durasi', key: 'duration_type', width: 14`
       7. `header: 'Jadwal Ambil', key: 'pickup', width: 20`
       8. `header: 'Jadwal Kembali', key: 'return', width: 20`
       9. `header: 'Durasi (Hari)', key: 'days', width: 14`
       10. `header: 'Estimasi Biaya (Rp)', key: 'total', width: 20`
       11. `header: 'Status Booking', key: 'status', width: 18`
     - Tambahkan baris data:
       - Iterasi `bookings`.
       - Format tanggal ke waktu lokal Indonesia.
       - Format kolom biaya sebagai angka numerik dengan `cell.numFmt = RUPIAH_NUM_FMT`.
       - Tulis status: *"Pending"*, *"Terverifikasi"*, *"Sedang Berjalan"*, *"Selesai"*, *"Batal"*.
     - Terapkan styling via `applyCinemaWorksheetStyling`.
2. Buat `app/api/admin/export/bookings/route.ts`:
   - Tangani request `GET(request: NextRequest)`.
   - Cek sesi admin. Jika tidak ada sesi aktif, kembalikan HTTP 401.
   - Ambil seluruh rekaman dari `rental_bookings` diurutkan `created_at DESC`.
   - Buat workbook dan panggil `buildBookingsWorksheet`.
   - Generate binary buffer.
   - Format nama file: `rekap-sewa-${format(new Date(), 'yyyy-MM-dd')}.xlsx`.
   - Kembalikan respon binary download dengan header OpenXML Excel.

## Kriteria selesai
- [ ] Endpoint `/api/admin/export/bookings` terproteksi dengan sesi login admin.
- [ ] Mengembalikan file binary Excel dengan nama `rekap-sewa-YYYY-MM-DD.xlsx`.
- [ ] Kolom spreadsheet mencakup Tanggal, Nama Penyewa, Kontak WA, Alat, Jadwal Ambil/Kembali, Durasi, Total Biaya, dan Status.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan berkas Excel tetap terbentuk rapi meskipun data booking masih kosong.

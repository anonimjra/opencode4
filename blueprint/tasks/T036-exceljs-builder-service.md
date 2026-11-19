# T036 - ExcelJS Builder Service Helper & Formatting Cinema Dark

**Depends on:** T001, T006, T007
**Estimasi:** sedang

## Tujuan
Membangun modul helper utilitas pembuatan spreadsheet (`lib/excel/builder.ts`) menggunakan `exceljs` dengan standar visual bertema cinema dark elegan (header warna dark navy slate `#0F172A`), border sel tipis rapi, format angka Rupiah standar akuntansi, dan auto-fit lebar kolom.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/04-TECH-STACK.md

## File yang dibuat / diubah
- `lib/excel/builder.ts` : Modul pembuat workbook dan formatting worksheet ExcelJS terstandarisasi

## Langkah
1. Buat folder `lib/excel/`.
2. Buat `lib/excel/builder.ts`:
   - Import `Workbook`, `Worksheet` dari `exceljs`.
   - `createBaseWorkbook(): Workbook`:
     - Inisialisasi `new Workbook()` dengan metadata pembuat dokumen (*Creator: 'Sistem Rental Kamera Lensa Nusantara'*).
   - `applyCinemaWorksheetStyling(worksheet: Worksheet, columnHeaders: string[]): void`:
     - Baris Header (Row 1):
       - Tinggi baris: `headerRow.height = 32`.
       - Font: `name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' }`.
       - Latar Belakang (Fill): Solid pattern warna tema cinema dark `fgColor: { argb: 'FF0F172A' }`.
       - Alignment: `vertical: 'middle', horizontal: 'center'`.
     - Border Sel:
       - Border tipis netral (`style: 'thin', color: { argb: 'FFD1D5DB' }`) pada semua sel data.
     - Auto-fit Column Width:
       - Hitung panjang teks terpanjang pada tiap kolom dan berikan padding `Math.max(maxLength + 4, 14)`.
   - Ekspor format angka Rupiah akuntansi:
     - `RUPIAH_NUM_FMT = '"Rp"#,##0'`.
   - `generateBuffer(workbook: Workbook): Promise<Uint8Array>`:
     - Konversi workbook menjadi buffer binary array (`await workbook.xlsx.writeBuffer()`).

## Kriteria selesai
- [x] Modul `lib/excel/builder.ts` terbuat tanpa error tipe.
- [x] Header worksheet diformat dengan warna tema cinema dark dan font tebal putih.
- [x] Lebar kolom menyesuaikan secara dinamis dengan panjang data.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `writeBuffer()` agar buffer binary utuh siap dialirkan ke HTTP response tanpa memory leak.

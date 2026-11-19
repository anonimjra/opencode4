# T039 - Integrasi Tombol Download Excel pada UI Dashboard

**Depends on:** T028, T032, T037, T038
**Estimasi:** kecil

## Tujuan
Mengintegrasikan komponen tombol "Export Excel" (`components/admin/ExportExcelButton.tsx`) ke antarmuka halaman Inventaris Alat (`/admin/products`) dan halaman Antrean Booking (`/admin/bookings`) dengan indikator proses loading download.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/admin/ExportExcelButton.tsx` : Komponen tombol download Excel dengan loading state
- `app/admin/products/page.tsx` : Pasang tombol Export Excel di header inventaris alat
- `app/admin/bookings/page.tsx` : Pasang tombol Export Excel di header booking sewa

## Langkah
1. Buat `components/admin/ExportExcelButton.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `endpoint: string`, `label?: string`, `variant?: 'outline' | 'secondary'`.
   - State `isDownloading: boolean`.
   - Handler download:
     - Set `isDownloading` menjadi `true`.
     - Request `fetch(endpoint)`.
     - Dapatkan response blob jika berhasil.
     - Buat elemen `<a>` sementara, trigger click untuk mengunduh file `.xlsx`, lalu lepaskan URL blob.
     - Kembalikan `isDownloading` ke `false`.
   - Desain tombol:
     - Ikon `FileSpreadsheet` dari `lucide-react`.
     - Teks: "Mengunduh Excel..." atau label kustom.
     - Border styling bernuansa hijau spreadsheet elegan (`hover:bg-emerald-950/40 hover:border-emerald-500 hover:text-emerald-400`).
2. Perbarui `app/admin/products/page.tsx`:
   - Pasang `<ExportExcelButton endpoint="/api/admin/export/inventory" label="Export Inventaris (.xlsx)" />`.
3. Perbarui `app/admin/bookings/page.tsx`:
   - Pasang `<ExportExcelButton endpoint="/api/admin/export/bookings" label="Export Rekap Sewa (.xlsx)" />`.

## Kriteria selesai
- [x] Tombol Export Excel tampil di halaman inventaris alat dan antrean booking.
- [x] Mengklik tombol menampilkan indikator proses loading.
- [x] File Excel `.xlsx` terunduh otomatis ke folder Download komputer pengguna.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mengarahkan user menggunakan tag link biasa `<a href="..." download>` agar loading state dan error status 401 dapat ditangani dengan mulus di UI.

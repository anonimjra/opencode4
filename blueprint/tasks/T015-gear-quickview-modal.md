# T015 - Modal Pop-up Quick View & Kalkulator Sewa Interaktif

**Depends on:** T006, T007, T014
**Estimasi:** sedang

## Tujuan
Membangun komponen modal Quick View (`components/landing/GearQuickViewModal.tsx`) yang menyajikan foto detail alat, spesifikasi sensor/video, checklist kelengkapan isi tas sewa, kalkulator durasi sewa interaktif (hitung hari x tarif), dan tombol booking WhatsApp.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/GearQuickViewModal.tsx` : Modal detail spesifikasi alat & kalkulator sewa
- `components/ui/Modal.tsx` : Primitif modal dialog backdrop

## Langkah
1. Buat `components/ui/Modal.tsx` dengan backdrop blur gelap, tombol tutup (X), dan penanganan tombol `Escape`.
2. Buat `components/landing/GearQuickViewModal.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `gear: RentalGear | null`, `isOpen: boolean`, `onClose: () => void`, `brandName: string`, `whatsappNumber: string`.
   - Kelola state lokal kalkulator:
     - `rentalDurationType`: `'12h'` | `'24h'` (default '24h')
     - `pickupDate`: string (default hari ini)
     - `returnDate`: string (default besok)
     - `calculatedDays`: dihitung via `calculateRentalDuration(pickupDate, returnDate)`
     - `estimatedTotal`: `calculatedDays * (rentalDurationType === '12h' ? gear.rate_12h : gear.rate_24h)`
   - Layout Modal (`max-w-4xl w-full p-6 sm:p-8 bg-[#111827] text-white rounded-3xl border border-[#1F2937]`):
     - Grid 2 Kolom:
       - Kolom Kiri:
         - Foto alat besar (`aspect-[4/3] rounded-2xl overflow-hidden relative bg-black/50`).
         - Checklist Kelengkapan Isi Tas Sewa (baterai, charger, memory card, tas kamera, strap, kabel).
         - Deskripsi & Rekomendasi Penggunaan.
       - Kolom Kanan (Kalkulator Booking Sewa):
         - Nama alat & brand tebal.
         - Pilihan Durasi Sewa: Tab toggle "Tarif 12 Jam" vs "Tarif 24 Jam".
         - Input Tanggal & Jam Ambil (Pick-up).
         - Input Tanggal & Jam Kembali (Drop-off).
         - Kotak Rangkuman Biaya: Total `${calculatedDays} Hari` x `Tarif` = **`${formatRupiah(estimatedTotal)}`**.
         - Tombol Besar "Booking via WhatsApp Sekarang" (otomatis membawa data alat, tanggal sewa, dan estimasi biaya).

## Kriteria selesai
- [x] Modal terbuka saat tombol Quick View ditekan.
- [x] Mengubah tanggal atau durasi 12h/24h langsung mengkalkulasi estimasi biaya sewa secara realtime.
- [x] Tombol booking WhatsApp mengarahkan ke chat dengan template lengkap.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Validasi agar tanggal kembali tidak boleh lebih awal dari tanggal ambil.

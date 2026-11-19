# T014 - Kartu Alat Rental dengan Tarif 12/24 Jam & Kelengkapan

**Depends on:** T006, T007, T010
**Estimasi:** sedang

## Tujuan
Membangun komponen kartu produk alat multimedia (`components/landing/RentalGearCard.tsx`) yang menampilkan foto alat, badge ketersediaan realtime (Ready di Studio / Sedang Disewa), pill sensor/mount, pill kelengkapan bawaan, tarif ganda 12 jam & 24 jam, tombol Quick View, dan tombol booking WhatsApp.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/RentalGearCard.tsx` : Kartu alat multimedia individual

## Langkah
1. Buat `components/landing/RentalGearCard.tsx`.
2. Tandai dengan `'use client'`.
3. Terima props:
   - `gear: RentalGear`
   - `brandName: string`
   - `whatsappNumber: string`
   - `onQuickView: (gear: RentalGear) => void`
4. Struktur komponen:
   - Kontainer kartu: `bg-[#111827] rounded-2xl border border-[#1F2937] overflow-hidden shadow-lg hover:border-gray-600 transition-all duration-300 flex flex-col group`.
   - Area Gambar: Rasio `aspect-[4/3] relative overflow-hidden bg-black/40`.
     - Gunakan `next/image` dengan zoom hover halus.
     - Badge Status di pojok kiri atas: Jika `gear.gear_status === 'ready'`, tampilkan badge hijau dengan live pulsing dot *"Ready di Studio"*. Jika `'rented'`, badge merah *"Sedang Disewa"*.
     - Badge Merk di pojok kanan atas: Badge abu-abu gelap `${gear.brand}`.
   - Area Spesifikasi:
     - Nama alat tebal (`text-lg font-bold text-white group-hover:text-primary transition-colors`).
     - Deretan Pill Spesifikasi:
       - Pill Sensor/Mount: Ikon `Aperture` + teks `gear.sensor_spec || gear.mount_type`.
       - Pill Kelengkapan Bawaan: Ikon `CheckCircle2` + teks `gear.accessories_included` (line-clamp-1).
     - Kotak Tarif Ganda:
       - Kolom Kiri: Label "12 Jam" ➔ `formatRupiah(gear.rate_12h)` (font-mono tebal).
       - Kolom Kanan: Label "24 Jam" ➔ `formatRupiah(gear.rate_24h)` (font-mono tebal warna primary).
   - Area Aksi Ganda (Footer):
     - Tombol 1: "Quick View" (Ikon `Maximize2`, memanggil `onQuickView(gear)`).
     - Tombol 2: "Booking WA" (Ikon WhatsApp, membuka link yang dibuat oleh `generateRentalWhatsAppLink(...)`).

## Kriteria selesai
- [x] Kartu menampilkan foto, badge Ready/Disewa, spesifikasi, dan kelengkapan tas/baterai.
- [x] Menampilkan dua opsi tarif 12 jam dan 24 jam secara jelas.
- [x] Tombol Quick View dan Booking WA berfungsi sebagaimana mestinya.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Cantumkan `sizes` responsif pada tag `next/image` agar konsumsi bandwidth tetap hemat.

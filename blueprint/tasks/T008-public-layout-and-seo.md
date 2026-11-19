# T008 - Public Layout, Font Loader, & SEO Meta Tags Rental Kamera

**Depends on:** T001, T002, T006
**Estimasi:** kecil

## Tujuan
Menyiapkan root layout (`app/layout.tsx`) dan public layout (`app/(public)/layout.tsx`) dengan tema dark mode, font Google `Plus Jakarta Sans` dan `Inter`, viewport mobile-first, dan metadata SEO spesifik rental kamera & video shooting.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/layout.tsx` : Root layout dengan tag `<html>`, `<body>`, font loader, dan metadata
- `app/(public)/layout.tsx` : Layout pembungkus area landing page publik

## Langkah
1. Buat `app/layout.tsx`:
   - Muat `Plus Jakarta Sans` dan `Inter` dari `next/font/google`.
   - Konfigurasikan metadata Next.js:
     - `title`: `{ default: 'Lensa Nusantara - Rental Kamera, Lensa, Audio & Lighting Studio', template: '%s | Lensa Nusantara' }`
     - `description`: 'Sewa kamera mirrorless Sony, Canon, lensa G-Master, mic wireless Rode, lighting studio Godox, gimbal Ronin. Siap pakai, baterai full, sensor bersih.'
     - Open Graph tags.
   - Atur viewport mobile-first.
   - Styling body: `bg-[#0B0F17] text-[#F9FAFB] antialiased selection:bg-rose-500 selection:text-white`.
2. Buat `app/(public)/layout.tsx` sebagai Server Component wrapper area publik.

## Kriteria selesai
- [x] Font terhubung rapi tanpa CLS.
- [x] Metadata SEO spesifik industri rental kamera terkonfigurasi.
- [x] Latar belakang cinema dark aktif pada root body.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mengulang deklarasi tag `<html>` atau `<body>` di layout anak.

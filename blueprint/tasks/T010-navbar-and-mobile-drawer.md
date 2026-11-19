# T010 - Navbar Publik & Mobile Drawer Menu Rental

**Depends on:** T007, T008
**Estimasi:** sedang

## Tujuan
Membangun bilah navigasi publik (`components/landing/Navbar.tsx`) bernuansa dark modern yang sticky/backdrop-blur, menampilkan logo brand rental, link navigasi cepat, tombol WhatsApp booking, dan drawer menu responsif di layar ponsel.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/Navbar.tsx` : Komponen navigasi utama publik
- `components/landing/MobileDrawer.tsx` : Menu drawer geser untuk perangkat mobile
- `components/ui/Button.tsx` : Komponen tombol UI atomik

## Langkah
1. Buat `components/ui/Button.tsx` dengan variant `primary`, `secondary`, `outline`, `whatsapp`, `ghost` dan state `isLoading`.
2. Buat `components/landing/MobileDrawer.tsx`:
   - Tandai dengan `'use client'`.
   - Kelola state buka/tutup drawer dengan animasi backdrop.
   - Sediakan link navigasi: Beranda (`#hero`), Profil Studio (`#about`), Katalog Gear (`#catalog`), Paket Bundling (`#packages`), Syarat Sewa (`#terms`), Alur Sewa (`#workflow`), Lokasi Studio (`#location`).
3. Buat `components/landing/Navbar.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `brandName: string`, `logoUrl?: string | null`, `whatsappNumber: string`.
   - Desain sticky: `sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-[#1F2937] transition-all`.
   - Logo kamera di kiri, deretan link navigasi di tengah (desktop), dan tombol CTA "Booking Alat" (WhatsApp button) di kanan.
   - Ikon hamburger `Menu` dari `lucide-react` di mobile.

## Kriteria selesai
- [ ] Navbar sticky di bagian atas dengan estetika dark mode.
- [ ] Tautan navigasi smooth-scroll menuju section id terkait.
- [ ] Drawer mobile berfungsi membuka dan menutup dengan mulus.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Kunci scrolling layar belakang saat drawer mobile terbuka.

# T011 - Hero Section Banner Cinematic Studio & Garansi

**Depends on:** T007, T008, T010
**Estimasi:** kecil

## Tujuan
Membangun komponen Hero Section (`components/landing/HeroSection.tsx`) bernuansa studio kamera gelap, menampilkan headline sinematik, badge garansi baterai full & alat siap pakai, serta dua tombol aksi (Cek Katalog Alat & Konsultasi Shooting).

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/HeroSection.tsx` : Komponen tampilan Hero banner publik
- `components/ui/Badge.tsx` : Komponen badge status atomik

## Langkah
1. Buat `components/ui/Badge.tsx`.
2. Buat `components/landing/HeroSection.tsx`:
   - Terima props `title: string`, `subtitle: string`, `imageUrl?: string | null`, `brandName: string`, `whatsappNumber: string`.
   - Layout: `relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8`.
   - Latar: Foto kamera/lensa studio via `next/image` (`fill`, `priority={true}`, `object-cover`), dilapisi gradient gelap `bg-[#0B0F17]/75 backdrop-blur-[2px]`.
   - Konten:
     - Badge atas: Ikon `CheckCircle2` + teks *"Alat Bersih & Terkalibrasi • Baterai Full • Ready Siap Pakai"*.
     - Headline besar: `text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight`.
     - Subtitle deskriptif: `text-lg sm:text-xl text-stone-300 max-w-2xl mt-4`.
     - Grup Tombol CTA:
       - Tombol 1: "Cek Katalog Alat" (Anchor link ke `#catalog`, style solid primary crimson).
       - Tombol 2: "Konsultasi Kebutuhan Shooting" (Anchor link ke link WA, style outline netral).

## Kriteria selesai
- [ ] Section memiliki id `hero` untuk target navigasi.
- [ ] Gambar menggunakan `priority={true}` untuk LCP cepat.
- [ ] Teks kontras tinggi dan mudah dibaca di atas tema dark.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Sediakan fallback gambar lokal default bertema kamera jika URL gambar database belum diatur.

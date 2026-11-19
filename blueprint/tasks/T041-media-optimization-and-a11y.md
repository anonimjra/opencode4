# T041 - Optimasi Media next/image, Mobile & Aksesibilitas

**Depends on:** T021, T029, T031
**Estimasi:** sedang

## Tujuan
Melakukan audit dan optimasi menyeluruh pada rendering foto alat studio (`next/image`), rasio aspek foto alat 4:3, responsivitas layar mobile sempit (360px), dan kepatuhan aksesibilitas web dasar.

## Baca dulu
- AGENTS.md
- blueprint/05-CONVENTIONS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `next.config.ts` : Konfigurasi format gambar WebP/AVIF dan domain Supabase Storage
- `components/landing/RentalGearCard.tsx` : Atribut `sizes` responsif
- `components/landing/BundlingPackagesSection.tsx` : Atribut `sizes` responsif
- `components/landing/Navbar.tsx` : Label aksesibilitas ARIA tombol menu

## Langkah
1. Optimasi konfigurasi `next.config.ts`:
   - `formats: ['image/avif', 'image/webp']`.
   - Wildcard domain Supabase Storage (`**.supabase.co`) dan Unsplash.
2. Pasang atribut `sizes` pada semua komponen `next/image`:
   - `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"` pada kartu alat rental.
   - Pastikan seluruh tag `<Image />` memiliki properti `alt` deskriptif (misal: `"Sony A7 IV Tampak Depan dengan Sensor"`).
3. Audit Aksesibilitas:
   - Tambahkan `aria-label` pada tombol close modal Quick View, tombol WhatsApp floating, dan drawer hamburger.
   - Pastikan focus ring keyboard terlihat jelas saat navigasi tab.
4. Audit Layar 360px:
   - Pastikan tidak ada horizontal overflow pada tabel inventaris atau kartu alat.

## Kriteria selesai
- [x] Gambar disajikan dalam format WebP/AVIF beresolusi optimal.
- [x] Bebas dari peringatan "missing alt property" pada konsol build.
- [x] Tampilan tidak mengalami horizontal scroll pada lebar layar 360px.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Jangan mengunggah foto alat resolusi 4K mentah tanpa batasan ukuran.

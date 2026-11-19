# T009 - Theme Provider Dinamis untuk Aksen Warna Cinema

**Depends on:** T002, T008
**Estimasi:** kecil

## Tujuan
Membangun komponen `components/shared/ThemeProvider.tsx` yang menginjeksi nilai warna aksen cinema (`primary_color`) dari database Supabase langsung ke CSS Variables di tag `<html>` secara reaktif.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/shared/ThemeProvider.tsx` : Client Component penyedia variabel CSS tema cinema
- `lib/theme.ts` : Helper kalkulasi warna hover dan highlight cinema

## Langkah
1. Buat folder `components/shared/`.
2. Buat `lib/theme.ts` untuk fungsi penyesuaian kecerahan warna (hover & glow).
3. Buat `components/shared/ThemeProvider.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `primaryColor?: string` dan `children: React.ReactNode`.
   - Di dalam `useEffect`, atur CSS Variables pada `document.documentElement`:
     - `--color-cinema-primary`: hex dari prop (fallback `#E11D48`)
     - `--color-cinema-hover`: warna lebih gelap 15%
     - `--color-cinema-light`: warna aksen lembut
     - `--color-cinema-foreground`: `#FFFFFF`
   - Render `children`.
4. Pasang `ThemeProvider` di `app/layout.tsx`.

## Kriteria selesai
- [x] CSS Variable `--color-cinema-primary` berhasil diinjeksikan ke root DOM.
- [x] Tersedia fallback warna Cinema Crimson jika data database belum termuat.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Berikan inline fallback style agar tidak terjadi lonjakan warna sesaat (*flash of unstyled theme*).

# T002 - Konfigurasi Tailwind CSS, Font & Theme Variables Cinema Dark

**Depends on:** T001
**Estimasi:** kecil

## Tujuan
Mengonfigurasi Tailwind CSS dengan palet warna Cinema Dark (`#0B0F17` / `#0F172A`) dan aksen Crimson Red (`#E11D48`), menyiapkan Google Fonts (`Plus Jakarta Sans` & `Inter`), serta deklarasi CSS Variables tema di `globals.css`.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `postcss.config.mjs` : Konfigurasi PostCSS dan Autoprefixer
- `tailwind.config.ts` : Konfigurasi ekstensi tema warna cinema dark dan font family
- `app/globals.css` : Import dasar Tailwind, styling root dark mode, dan CSS Variables tema

## Langkah
1. Konfigurasikan `postcss.config.mjs`.
2. Buat `tailwind.config.ts` dengan ekstensi tema:
   - Warna `primary`:
     - `DEFAULT`: `var(--color-cinema-primary, #E11D48)`
     - `hover`: `var(--color-cinema-hover, #BE123C)`
     - `light`: `var(--color-cinema-light, #FFF1F2)`
     - `foreground`: `var(--color-cinema-foreground, #FFFFFF)`
   - Warna dark surface: `cinema-black: #0B0F17`, `cinema-card: #111827`, `cinema-border: #1F2937`.
   - Warna semantik: Ready stock (`#22C55E`), On-rent (`#EF4444`), Servis (`#F59E0B`), WhatsApp (`#25D366`).
3. Perbarui `app/globals.css`:
   - Pasang direktif Tailwind.
   - Deklarasikan CSS Variables `:root`:
     - `--color-cinema-primary: #E11D48;`
     - `--color-cinema-hover: #BE123C;`
     - `--color-cinema-light: #FFF1F2;`
     - `--color-cinema-foreground: #FFFFFF;`
   - Berikan `scroll-behavior: smooth;` pada tag `html` dan background dasar gelap `#0B0F17`.

## Kriteria selesai
- [x] Tailwind CSS terkonfigurasi dengan kelas utilitas `bg-primary`, `text-primary`.
- [x] CSS Variables default bertema Cinema Dark aktif.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan lupa nilai fallback di `var(--color-cinema-primary, #E11D48)` agar tampilan tidak pecah sebelum tema termuat.

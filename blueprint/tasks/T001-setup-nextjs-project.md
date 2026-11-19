# T001 - Inisialisasi Project Next.js, TypeScript & Tooling Rental Kamera

**Depends on:** none
**Estimasi:** sedang

## Tujuan
Menginisialisasi proyek Next.js dengan App Router, TypeScript strict mode, Tailwind CSS, Lucide React, Supabase SSR adapter, dan ExcelJS di direktori `opencode4`.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/04-TECH-STACK.md

## File yang dibuat / diubah
- `package.json` : Konfigurasi manifest proyek, dependensi npm, dan skrip build/dev
- `tsconfig.json` : Konfigurasi TypeScript strict mode dengan path alias `@/*`
- `next.config.ts` : Konfigurasi Next.js remote patterns untuk Supabase Storage
- `.gitignore` : Pengabaian file build, env local, dan node_modules

## Langkah
1. Buat `package.json` dengan dependensi resmi:
   - `next`, `react`, `react-dom`, `typescript`, `@types/react`, `@types/node`
   - `@supabase/supabase-js`, `@supabase/ssr`
   - `lucide-react`, `clsx`, `tailwind-merge`
   - `exceljs`, `date-fns`
2. Jalankan perintah `npm install`.
3. Konfigurasikan `tsconfig.json`:
   - `"strict": true`, `"target": "ES2022"`
   - `"paths": { "@/*": ["./*"] }`
4. Konfigurasikan `next.config.ts` untuk mengizinkan remote patterns gambar Supabase (`**.supabase.co`) dan Unsplash (`images.unsplash.com`).
5. Buat `.gitignore` yang menyaring `.env*.local`, `.next/`, `node_modules/`, `out/`.

## Kriteria selesai
- [x] Berkas `package.json` dan `package-lock.json` terinstal tanpa error.
- [x] TypeScript strict mode aktif dengan alias `@/*`.
- [x] Konfigurasi remote images siap pakai.

## Verifikasi
`npm run build || npx tsc --noEmit`

## Catatan / jebakan
- Pastikan eksekusi dilakukan di dalam folder `opencode4`, jangan pernah mengubah berkas di folder luar.

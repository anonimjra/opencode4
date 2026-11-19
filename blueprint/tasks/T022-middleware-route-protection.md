# T022 - Next.js Middleware untuk Proteksi Sesi Admin

**Depends on:** T003
**Estimasi:** kecil

## Tujuan
Mengimplementasikan rute penjagaan (route guarding) pada Next.js Middleware (`middleware.ts`) untuk memvalidasi sesi Supabase Auth pada seluruh rute admin `/admin/*` dan memblokir akses tanpa login.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md

## File yang dibuat / diubah
- `middleware.ts` : Berkas root Next.js Middleware
- `lib/supabase/middleware.ts` : Helper validasi sesi via token Supabase

## Langkah
1. Perbarui `lib/supabase/middleware.ts`:
   - Gunakan `createServerClient` dari `@supabase/ssr`.
   - Panggil `await supabase.auth.getUser()`.
2. Buat `middleware.ts` di root `opencode4`:
   - Tangkap setiap request yang menuju `/admin/:path*` dan `/api/admin/:path*`.
   - Logika Rute:
     - Jika pengguna **BELUM** terotentikasi:
       - Rute dashboard selain `/admin/login` diarahkan redirect ke `/admin/login`.
       - Rute API `/api/admin/*` dikembalikan status `401 Unauthorized`.
     - Jika pengguna **SUDAH** terotentikasi:
       - Rute `/admin/login` diarahkan redirect ke `/admin`.
   - Konfigurasikan matcher rute:
     ```typescript
     export const config = {
       matcher: ['/admin/:path*', '/api/admin/:path*'],
     };
     ```

## Kriteria selesai
- [x] Mengakses `/admin` tanpa login otomatis ter-redirect ke `/admin/login`.
- [x] Endpoint `/api/admin/*` terlindungi dengan HTTP 401.
- [x] Pengguna yang sudah login diarahkan ke dashboard jika membuka rute login.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `supabase.auth.getUser()` untuk memvalidasi token JWT ke server Supabase secara aktual.

# T003 - Konfigurasi Environment & Supabase Client Setup

**Depends on:** T001
**Estimasi:** sedang

## Tujuan
Menyiapkan berkas template variabel lingkungan (`.env.example` & `.env.local`) serta mengimplementasikan klien Supabase untuk browser, server components, server actions, dan middleware menggunakan `@supabase/ssr`.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `.env.example` : Dokumentasi variabel lingkungan publik & rahasia
- `.env.local` : Konfigurasi lokal aman
- `lib/supabase/client.ts` : Supabase client untuk browser (Client Components)
- `lib/supabase/server.ts` : Supabase client untuk Server Components & Actions
- `lib/supabase/middleware.ts` : Helper refresh session cookie di middleware

## Langkah
1. Buat `.env.example` berisi:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-camera-rental.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-optional
   ```
2. Buat `.env.local` dengan nilai placeholder aman untuk pengujian lokal.
3. Buat `lib/supabase/client.ts` menggunakan `createBrowserClient` dari `@supabase/ssr`.
4. Buat `lib/supabase/server.ts` menggunakan `createServerClient` dengan pengelolaan cookie via `cookies()` dari `next/headers`.
5. Buat `lib/supabase/middleware.ts` dengan fungsi `updateSession(request: NextRequest)`.

## Kriteria selesai
- [ ] Klien browser di `lib/supabase/client.ts` tervalidasi.
- [ ] Klien server di `lib/supabase/server.ts` mengelola cookie sesi dengan benar.
- [ ] Helper middleware siap digunakan.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Variabel rahasia `SUPABASE_SERVICE_ROLE_KEY` tidak boleh memiliki prefiks `NEXT_PUBLIC_`.

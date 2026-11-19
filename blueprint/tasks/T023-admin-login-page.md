# T023 - Halaman Login Admin & Form Autentikasi

**Depends on:** T003, T006, T010, T022
**Estimasi:** sedang

## Tujuan
Membangun halaman login admin (`app/admin/login/page.tsx`) dengan desain cinema dark modern dan form interaktif (`components/admin/LoginForm.tsx`) yang terhubung ke Server Action otentikasi Supabase (`app/actions/auth.ts`).

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/login/page.tsx` : Halaman login portal admin
- `components/admin/LoginForm.tsx` : Form input kredensial admin
- `app/actions/auth.ts` : Server Actions login & logout

## Langkah
1. Buat `app/actions/auth.ts`:
   - Deklarasikan `'use server'`.
   - `loginAction(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak `email` dan `password`.
     - Panggil `supabase.auth.signInWithPassword({ email, password })`.
     - Jika salah, kembalikan: *"Email atau kata sandi pengelola rental salah."*.
     - Jika berhasil, redirect ke `/admin`.
   - `logoutAction(): Promise<void>`:
     - Panggil `supabase.auth.signOut()` dan redirect ke `/admin/login`.
2. Buat `components/admin/LoginForm.tsx`:
   - Tandai dengan `'use client'`.
   - Form field: Email dan Password dengan tombol toggle visibility.
   - Tombol "Masuk ke Sistem Rental" dengan loading spinner.
   - Peringatan error berbahasa Indonesia jika login gagal.
3. Buat `app/admin/login/page.tsx`:
   - Tampilan terpusat dengan latar belakang `bg-[#0B0F17] min-h-screen flex items-center justify-center p-4`.
   - Kartu login berbingkai dengan logo studio, judul *"Portal Pengelola Rental"*, dan subjudul *"Kelola inventaris kamera, nomor seri, dan antrean booking."*.

## Kriteria selesai
- [x] Halaman login dapat diakses di `/admin/login`.
- [x] Validasi kredensial bekerja via Supabase Auth.
- [x] Sesi login tersimpan dan me-redirect ke `/admin`.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mencetak password ke console log atau client state.

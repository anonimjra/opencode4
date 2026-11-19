# T024 - Layout Dashboard Admin dengan Sidebar & Header

**Depends on:** T010, T022, T023
**Estimasi:** sedang

## Tujuan
Membangun layout utama panel administrasi (`app/admin/layout.tsx`) dengan sidebar navigasi modul rental lengkap (`components/admin/AdminSidebar.tsx`), header atas dengan profil pengguna dan tombol logout (`components/admin/AdminHeader.tsx`).

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/admin/layout.tsx` : Layout pembungkus dashboard admin
- `components/admin/AdminSidebar.tsx` : Sidebar navigasi modul rental
- `components/admin/AdminHeader.tsx` : Header atas dashboard dengan tombol logout

## Langkah
1. Buat folder `components/admin/`.
2. Buat `components/admin/AdminSidebar.tsx`:
   - Tandai dengan `'use client'`.
   - Modul Navigasi:
     1. Ringkasan / Overview (`/admin` - Ikon `LayoutDashboard`)
     2. Inventaris Alat (`/admin/products` - Ikon `Camera`)
     3. Kategori & Brand (`/admin/categories` - Ikon `Layers`)
     4. Paket Bundling (`/admin/packages` - Ikon `Sparkles`)
     5. Antrean Booking Sewa (`/admin/bookings` - Ikon `Calendar`)
     6. Testimoni Klien (`/admin/testimonials` - Ikon `MessageSquareQuote`)
     7. Profil Studio & Syarat (`/admin/content` - Ikon `MapPin`)
     8. Pengaturan & Brand (`/admin/settings` - Ikon `Settings`)
   - Indikator menu aktif dengan highlight warna crimson lembut (`bg-rose-950/40 text-rose-400 font-semibold border-r-4 border-rose-500`).
   - Tautan cepat di sisi bawah: "Buka Website Publik" (link tab baru ke `/`).
3. Buat `components/admin/AdminHeader.tsx`:
   - Hamburger drawer untuk mobile smartphone.
   - Status user aktif (email admin) dan tombol Logout memanggil `logoutAction()`.
4. Buat `app/admin/layout.tsx`:
   - Layout grid admin: Sidebar tetap di sisi kiri (`w-64 hidden md:block border-r border-[#1F2937] bg-[#111827] h-screen sticky top-0`) dan area konten di sisi kanan (`flex-1 bg-[#0B0F17] overflow-y-auto min-w-0 text-white`).
   - Isolasi agar halaman `/admin/login` tidak menampilkan sidebar ganda.

## Kriteria selesai
- [ ] Sidebar menampilkan seluruh 8 modul admin rental kamera.
- [ ] Indikator menu aktif berpindah dinamis mengikuti rute URL.
- [ ] Tombol logout di header menghapus sesi dan mengarahkan ke halaman login.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan area konten memiliki `min-w-0` agar tabel data lebar tidak merusak grid layout dashboard.

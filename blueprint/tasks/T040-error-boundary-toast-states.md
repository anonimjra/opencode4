# T040 - Error Boundary, 404 Page, Loading State & Toast UI

**Depends on:** T008, T024
**Estimasi:** sedang

## Tujuan
Menyediakan halaman penanganan error global (`app/error.tsx`), halaman 404 ramah bertema kamera (`app/not-found.tsx`), animasi skeleton loading (`app/loading.tsx` & `app/admin/loading.tsx`), serta notifikasi toast (`components/ui/Toast.tsx`) untuk feedback mutasi data.

## Baca dulu
- AGENTS.md
- blueprint/05-CONVENTIONS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/error.tsx` : Global error boundary
- `app/not-found.tsx` : Halaman 404 bertema rental kamera
- `app/loading.tsx` : Halaman skeleton loading publik
- `app/admin/loading.tsx` : Halaman skeleton loading admin
- `components/ui/Toast.tsx` : Notifikasi toast floating
- `components/ui/Skeleton.tsx` : Komponen placeholder shimmer loading atomik

## Langkah
1. Buat `components/ui/Skeleton.tsx` dengan efek `animate-pulse bg-gray-800 rounded-xl`.
2. Buat `components/ui/Toast.tsx` dengan varian sukses, error, info yang hilang otomatis dalam 4 detik.
3. Buat `app/error.tsx` (ditandai `'use client'`):
   - Pesan ramah: *"Terjadi kendala teknis saat memuat katalog gear. Silakan muat ulang halaman."*.
   - Tombol "Coba Lagi" (`reset()`) dan "Kembali ke Beranda".
4. Buat `app/not-found.tsx`:
   - Visual 404 bertema kamera: *"Alat atau Halaman yang Anda Cari Tidak Ditemukan"*.
   - Tombol "Kembali ke Katalog Alat".
5. Buat `app/loading.tsx` dan `app/admin/loading.tsx`:
   - Komposisi shimmer skeleton menyerupai kartu alat dan tabel data gelap untuk mencegah pergeseran tata letak mendadak.

## Kriteria selesai
- [ ] Error boundary menangkap error tanpa layar putih kosong.
- [ ] Halaman 404 tampil estetik saat rute salah diakses.
- [ ] Toast notifikasi muncul saat booking terkirim atau admin menyimpan data.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- File `app/error.tsx` wajib menyertakan `'use client'`.

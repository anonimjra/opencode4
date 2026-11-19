# T031 - Admin Kelola Paket Bundling Shooting

**Depends on:** T024, T026
**Estimasi:** sedang

## Tujuan
Membangun modul manajemen paket bundling shooting di `/admin/packages` beserta Server Actions (`app/actions/packages.ts`) untuk membuat paket hemat shooting (kombinasi kamera + lensa + audio + stabilizer), mengatur tarif paket 12h/24h, dan menghapus paket.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/packages/page.tsx` : Halaman daftar paket bundling shooting
- `components/admin/BundlingPackageManager.tsx` : Komponen tabel paket, modal form create/edit
- `app/actions/packages.ts` : Server Actions mutasi data paket bundling

## Langkah
1. Buat `app/actions/packages.ts`:
   - Deklarasikan `'use server'`.
   - `createBundlingPackage(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak: `name`, `description`, `items_included` (array string nama alat), `rate_12h`, `rate_24h`, `discount_note`, foto paket.
     - Upload foto ke Supabase Storage.
     - Generate slug unik.
     - Insert ke `bundling_packages`.
     - Revalidasi path `/admin/packages` dan `/`.
   - `updateBundlingPackage(id: string, formData: FormData): Promise<ActionResponse>`:
     - Update paket dan revalidasi path.
   - `deleteBundlingPackage(id: string): Promise<ActionResponse>`:
     - Hapus paket dari database dan bersihkan storage.
     - Revalidasi path.
2. Buat `components/admin/BundlingPackageManager.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `packages: BundlingPackage[]`.
   - Modal Form: Input nama paket, daftar alat yang termasuk (multiple tags/lines), tarif 12h, tarif 24h, catatan diskon (cth: "Hemat Rp 100.000"), upload foto paket.
   - Grid Kartu Paket: Menampilkan nama, daftar alat, tarif, tombol edit, dan tombol hapus dengan konfirmasi.
3. Buat `app/admin/packages/page.tsx`:
   - Server Component pemanggil `bundling_packages` dari Supabase diurutkan `sort_order ASC`.
   - Render `BundlingPackageManager`.

## Kriteria selesai
- [x] Admin dapat membuat paket bundling shooting baru dengan daftar alat yang jelas.
- [x] Paket tampil di landing page publik pada section paket hemat.
- [x] Hapus paket berfungsi dengan aman.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Simpan daftar alat sebagai array string PostgreSQL `TEXT[]` agar mudah di-loop di antarmuka publik.

# T027 - Admin Kelola Kategori Alat & Brand

**Depends on:** T003, T006, T024
**Estimasi:** sedang

## Tujuan
Membangun modul manajemen kategori alat di `/admin/categories` beserta Server Actions (`app/actions/categories.ts`) untuk menambah kategori alat baru, mengedit nama & ikon, mengatur urutan tampil, dan menghapus kategori.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/categories/page.tsx` : Halaman daftar kategori alat
- `app/actions/categories.ts` : Server Actions mutasi kategori alat
- `components/admin/GearCategoryList.tsx` : Tabel kategori & modal form tambah/edit

## Langkah
1. Buat `app/actions/categories.ts`:
   - Deklarasikan `'use server'`.
   - `createGearCategory(name: string, description: string, iconName: string, sortOrder: number): Promise<ActionResponse>`:
     - Generate slug unik dari `name`.
     - Insert ke tabel `gear_categories`.
     - Lakukan `revalidatePath('/admin/categories')` dan `revalidatePath('/')`.
   - `updateGearCategory(id: string, name: string, description: string, iconName: string, sortOrder: number): Promise<ActionResponse>`:
     - Update nama, slug, deskripsi, ikon, dan urutan.
     - Revalidasi path rute terkait.
   - `deleteGearCategory(id: string): Promise<ActionResponse>`:
     - Cek apakah kategori masih dipakai oleh alat di `rental_gears`.
     - Jika masih ada, batalkan dan beri peringatan: *"Kategori alat tidak dapat dihapus karena masih digunakan oleh beberapa alat rental."*.
     - Hapus kategori dan revalidasi path.
2. Buat `components/admin/GearCategoryList.tsx`:
   - Tandai dengan `'use client'`.
   - Tabel: Ikon Alat, Nama Kategori, Slug, Jumlah Alat Terkait, Urutan Tampil, dan Tombol Aksi (Edit, Hapus).
   - Modal Form Tambah / Edit Kategori dengan pilihan nama ikon Lucide (`Camera`, `Aperture`, `SunMedium`, `Mic`, `Sliders`, `Film`).
3. Buat `app/admin/categories/page.tsx`:
   - Server Component pemanggil `gear_categories` beserta hitungan relasi alat dari Supabase.
   - Render header dan `GearCategoryList`.

## Kriteria selesai
- [x] Admin dapat menambah, mengedit, dan menghapus kategori alat rental.
- [x] Kategori yang menaungi produk terlindungi dari penghapusan tidak sengaja.
- [x] Perubahan langsung tercermin pada filter landing page publik.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Update slug secara sinkron jika nama kategori alat diubah.

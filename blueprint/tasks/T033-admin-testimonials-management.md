# T033 - Admin Kelola Testimoni Creator

**Depends on:** T024, T026
**Estimasi:** sedang

## Tujuan
Membangun modul manajemen ulasan pelanggan di `/admin/testimonials` beserta Server Actions (`app/actions/testimonials.ts`) untuk menambah ulasan videografer/creator, mengatur rating bintang (1-5), mengaktifkan/menonaktifkan ulasan, serta menghapus testimoni.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/testimonials/page.tsx` : Halaman daftar testimoni klien
- `components/admin/TestimonialManager.tsx` : Komponen ulasan, toggle aktif, dan modal form
- `app/actions/testimonials.ts` : Server Actions mutasi data testimoni

## Langkah
1. Buat `app/actions/testimonials.ts`:
   - Deklarasikan `'use server'`.
   - `createTestimonial(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak: `customer_name`, `customer_role`, `review_text`, `rating` (1-5), `sort_order`, avatar jika ada.
     - Insert ke `testimonials` dengan `is_active: true`.
     - Revalidasi path `/admin/testimonials` dan `/`.
   - `toggleTestimonialActive(id: string, isActive: boolean): Promise<ActionResponse>`:
     - Update kolom `is_active` dan revalidasi path.
   - `deleteTestimonial(id: string): Promise<ActionResponse>`:
     - Hapus record dari database dan revalidasi path.
2. Buat `components/admin/TestimonialManager.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `testimonials: Testimonial[]`.
   - Tombol "Tambah Ulasan Creator" di header atas.
   - Modal Form: Input nama klien, peran (cth: "Wedding Videographer"), isi review kepuasan alat, rating bintang (1-5), avatar klien.
   - Tabel Ulasan: Menampilkan avatar, nama, rating bintang, review, toggle status tampil, dan tombol aksi.
3. Buat `app/admin/testimonials/page.tsx`:
   - Server Component pemanggil `testimonials` dari Supabase diurutkan `sort_order ASC, created_at DESC`.
   - Render `TestimonialManager`.

## Kriteria selesai
- [ ] Admin dapat menambahkan ulasan kepuasan videografer/creator.
- [ ] Rating tervalidasi 1 sampai 5 bintang.
- [ ] Toggle status aktif langsung menyembunyikan atau menampilkan testimoni di halaman depan.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Validasi agar nilai rating selalu berupa angka bulat integer antara 1 dan 5.

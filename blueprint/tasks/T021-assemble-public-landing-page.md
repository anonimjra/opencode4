# T021 - Assembling Landing Page Utama Publik dengan Supabase

**Depends on:** T003, T008, T009, T010, T011, T012, T013, T014, T015, T016, T017, T018, T019, T020
**Estimasi:** sedang

## Tujuan
Menggabungkan seluruh komponen section publik ke dalam halaman utama (`app/(public)/page.tsx`) sebagai Server Component yang memanggil data kategori alat, daftar alat rental, paket bundling, testimoni, dan konfigurasi studio dari Supabase secara paralel dengan ISR caching.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `app/(public)/page.tsx` : Halaman landing page katalog rental utama
- `lib/data/rental.ts` : Helper service query data publik dari Supabase
- `components/landing/GearCatalogSection.tsx` : Wrapper interaktif penyaring katalog alat & modal Quick View

## Langkah
1. Buat `lib/data/rental.ts`:
   - Buat fungsi `getRentalCatalogData()`:
     - Gunakan `Promise.all` untuk mengambil data paralel:
       1. `site_settings`: Profil studio dan tema warna.
       2. `gear_categories`: Diurutkan `sort_order ASC`.
       3. `rental_gears`: Diurutkan `sort_order ASC, created_at DESC`.
       4. `bundling_packages`: Diurutkan `sort_order ASC`.
       5. `testimonials`: Di mana `is_active = true`.
     - Kembalikan objek data terstruktur.
2. Buat `components/landing/GearCatalogSection.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `categories: GearCategory[]`, `gears: RentalGear[]`, `brandName: string`, `whatsappNumber: string`.
   - Kelola state: `selectedCategory` ('all' atau category_id) dan `quickViewGear: RentalGear | null`.
   - Render `GearCategoryFilter`.
   - Render grid kartu alat `RentalGearCard` sesuai kategori aktif.
   - Render `GearQuickViewModal` yang aktif saat alat di-klik.
3. Buat `app/(public)/page.tsx`:
   - Server Component dengan `export const revalidate = 3600;`.
   - Panggil `const data = await getRentalCatalogData()`.
   - Susun komponen:
     1. `<Navbar ... />`
     2. `<HeroSection ... />`
     3. `<AboutStudioSection ... />`
     4. `<GearCatalogSection ... />` (dengan `id="catalog"`)
     5. `<BundlingPackagesSection packages={data.packages} ... />`
     6. `<RentalTermsSection rentalTerms={data.settings.rental_terms} ... />`
     7. `<RentalWorkflowSection />`
     8. `<StudioLocationSection ... />`
     9. `<TestimonialSection testimonials={data.testimonials} />`
     10. `<Footer ... />`
     11. `<WhatsAppFloatingButton ... />`
   - Bungkus dengan `ThemeProvider`.

## Kriteria selesai
- [ ] Landing page ter-render sempurna dengan nuansa cinema dark.
- [ ] Tab filter kategori alat menyaring produk secara instan.
- [ ] Modal Quick View terbuka menampilkan spesifikasi sensor dan checklist kelengkapan tas.
- [ ] Seluruh data dinamis termuat dari database Supabase.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Berikan penanganan fallback jika database masih kosong agar tidak terjadi crash halaman 500 saat pertama kali di-deploy.

# T013 - Komponen Filter Kategori Alat Interaktif

**Depends on:** T006, T008, T010
**Estimasi:** kecil

## Tujuan
Membangun komponen filter kategori alat interaktif (`components/landing/GearCategoryFilter.tsx`) yang menampilkan tab filter (Semua, Kamera, Lensa, Lighting, Audio, Stabilizer, Drone, Paket Bundling) dengan ikon Lucide yang serasi.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/GearCategoryFilter.tsx` : Komponen tab filter alat horizontal

## Langkah
1. Buat `components/landing/GearCategoryFilter.tsx`.
2. Tandai dengan `'use client'`.
3. Terima props:
   - `categories: GearCategory[]`
   - `selectedCategoryId: string` ('all' atau UUID kategori)
   - `onSelectCategory: (id: string) => void`
4. Desain baris filter:
   - Kontainer horizontal geser di mobile: `flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none`.
   - Tombol pertama: "Semua Gear" dengan ikon `Film`.
   - Tombol kategori dinamis: Render tombol dengan ikon terkait (`Camera`, `Aperture`, `SunMedium`, `Mic`, `Sliders`, `Film`, `Sparkles`).
   - Indikator aktif: Tab aktif berlatar warna crimson solid (`bg-primary text-white shadow-lg shadow-rose-950`), tab tidak aktif berlatar gelap `#1F2937` (`text-gray-300 hover:bg-[#374151] border border-gray-700`).

## Kriteria selesai
- [x] Tab filter dapat digeser horizontal di layar ponsel.
- [x] Mengklik tab memicu callback `onSelectCategory` secara instan.
- [x] Indikator visual tab aktif terlihat tajam dan modern.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `whitespace-nowrap` pada masing-masing tombol agar teks kategori tidak patah ke baris bawah.

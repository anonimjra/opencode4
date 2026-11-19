# T019 - Section Lokasi Studio & Jam Buka Pick-up

**Depends on:** T006, T008
**Estimasi:** kecil

## Tujuan
Membangun section Lokasi Studio & Jam Pengambilan Alat (`components/landing/StudioLocationSection.tsx`) yang menampilkan alamat fisik studio tempat pick-up/drop-off, jam buka operasional, sematan Google Maps responsif, dan tombol petunjuk arah.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/StudioLocationSection.tsx` : Komponen alamat studio, jam buka, dan peta

## Langkah
1. Buat `components/landing/StudioLocationSection.tsx`.
2. Terima props `studioAddress: string`, `visitingHours: Array<{ day: string; time: string }>`, `googleMapsEmbedUrl?: string | null`, `whatsappNumber: string`.
3. Tata letak:
   - Kontainer section `id="location"`, padding `py-20 lg:py-28 bg-[#111827] text-white`.
   - Grid 2 Kolom Responsif:
     - Sisi Kiri (Informasi Studio & Pick-up):
       - Kartu `bg-[#1F2937] p-8 rounded-3xl border border-gray-700 flex flex-col justify-between`.
       - Blok Alamat: Ikon `MapPin` warna crimson, judul "Studio Pick-up & Drop-off", alamat lengkap, dan petunjuk patokan jalan.
       - Blok Jam Operasional: Ikon `Clock` warna crimson, judul "Jam Operasional Ambil & Kembali", render daftar hari & jam dari JSON `visitingHours`.
       - Tombol "Hubungi Petugas Studio via WhatsApp".
     - Sisi Kanan (Peta Sematan):
       - Kontainer peta `w-full h-80 sm:h-96 lg:h-full min-h-[380px] rounded-3xl overflow-hidden border border-gray-700 relative bg-black`.
       - Render `<iframe>` responsif Google Maps.

## Kriteria selesai
- [x] Section memiliki atribut `id="location"`.
- [x] Jam operasional pick-up terender dinamis.
- [x] Peta Google Maps responsif tanpa overflow.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan embed URL standar tanpa memasukkan private API key.

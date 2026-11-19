# T020 - Testimoni Creator & Footer Publik dengan Floating WhatsApp

**Depends on:** T006, T007, T008
**Estimasi:** kecil

## Tujuan
Membangun section Testimoni Pelanggan (`components/landing/TestimonialSection.tsx`), Footer Publik (`components/landing/Footer.tsx`), dan tombol melayang Floating Action Button (FAB) WhatsApp (`components/landing/WhatsAppFloatingButton.tsx`) dengan tooltip khusus ketersediaan gear hari ini.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/TestimonialSection.tsx` : Komponen ulasan videografer/creator
- `components/landing/Footer.tsx` : Komponen footer publik
- `components/landing/WhatsAppFloatingButton.tsx` : Komponen FAB WhatsApp melayang

## Langkah
1. Buat `components/landing/TestimonialSection.tsx`:
   - Kontainer `py-20 bg-[#0B0F17] text-white`.
   - Grid kartu ulasan videografer, rating 5 bintang, nama creator, dan peran (cth: "Wedding Videographer", "Content Creator YouTube").
2. Buat `components/landing/WhatsAppFloatingButton.tsx`:
   - Tandai dengan `'use client'`.
   - Tombol melayang `fixed bottom-6 right-6 z-50 flex items-center gap-3`.
   - Tooltip: *"Cek Ketersediaan Alat Hari Ini"*.
   - Mengarahkan chat WA dengan template pesan pembuka.
3. Buat `components/landing/Footer.tsx`:
   - Kontainer `bg-black text-stone-400 pt-16 pb-12 border-t border-stone-800`.
   - 4 Kolom: Brand studio, navigasi kategori alat, kontak studio, dan tautan sosial media.
   - Hak Cipta + Link login admin `/admin/login`.

## Kriteria selesai
- [x] Testimoni creator terender rapi.
- [x] Tombol melayang WhatsApp tampak di sudut kanan bawah dengan tooltip informatif.
- [x] Footer menyajikan informasi navigasi dan copyright dinamis.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan z-index tombol FAB (`z-50`) berada di bawah modal dialog (`z-60`+).

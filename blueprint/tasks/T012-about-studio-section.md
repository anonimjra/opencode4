# T012 - Section Tentang Studio Rental & Standar Kalibrasi

**Depends on:** T007, T008
**Estimasi:** kecil

## Tujuan
Membangun section Profil Studio Rental (`components/landing/AboutStudioSection.tsx`) yang mengedukasi penyewa mengenai standar perawatan alat (pembersihan sensor berkala, kalibrasi gimbal, baterai selalu terisi penuh, dan pengujian fungsi bersama).

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/AboutStudioSection.tsx` : Komponen showcase studio rental

## Langkah
1. Buat `components/landing/AboutStudioSection.tsx`.
2. Terima props `title: string`, `description: string`, `imageUrl?: string | null`, `brandName: string`.
3. Tata letak:
   - Kontainer section `id="about"`, padding `py-20 lg:py-28 bg-[#111827] text-white`.
   - Grid 2 kolom responsif:
     - Sisi Kiri (Foto Studio & Sensor Cleaning): Gambar berbingkai `aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative border border-[#1F2937]` dengan badge *"Sensor Clean & Checked"*.
     - Sisi Kanan (Teks & 3 Nilai Keunggulan):
       - Badge kecil: *"Standar Kelayakan Alat"*.
       - Judul: `title` tebal dan tajam.
       - Paragraf: `description` dengan teks abu-abu nyaman dibaca.
       - 3 Kartu Keunggulan Teknis:
         1. *"Sensor Bebas Debu & Jamur"*: Pembersihan sensor rutin menggunakan wet swab profesional.
         2. *"Baterai Selalu Full + Ekstra"*: Disertakan minimal 2 baterai original dan dual charger cepat.
         3. *"Uji Fungsi Bersama"*: Pengecekan tombol, port HDMI/audio, dan fokus lensa saat serah terima.

## Kriteria selesai
- [ ] Section memiliki atribut `id="about"`.
- [ ] 3 poin keunggulan teknis perawatan alat terender rapi.
- [ ] Gambar menggunakan `next/image` dengan aspek rasio terjaga.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `whitespace-pre-line` pada deskripsi untuk memelihara pemisahan paragraf.

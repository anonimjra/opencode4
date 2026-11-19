# T018 - Section 5 Langkah Alur Sewa Alat

**Depends on:** T008
**Estimasi:** kecil

## Tujuan
Membangun section Alur Sewa (`components/landing/RentalWorkflowSection.tsx`) yang menyajikan panduan infografis 5 langkah mudah menyewa alat kamera (Pilih Alat ➔ Booking WA ➔ Ambil / Kirim ➔ Uji Fungsi ➔ Pengembalian).

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/RentalWorkflowSection.tsx` : Komponen infografis alur rental alat

## Langkah
1. Buat `components/landing/RentalWorkflowSection.tsx`.
2. Struktur:
   - Kontainer section `id="workflow"`, padding `py-20 lg:py-28 bg-[#0B0F17] text-white`.
   - Header: Badge *"Panduan Penyewa"*, judul *"5 Langkah Mudah Sewa Alat di Lensa Nusantara"*.
   - Tata letak alur 5 kolom (desktop) / timeline bertumpuk (mobile):
     - Langkah 1: *"1. Pilih Alat & Jadwal"*: Tentukan kamera/lensa dan jadwal tanggal shooting Anda di katalog.
     - Langkah 2: *"2. Booking via WhatsApp"*: Kirim pesan booking dan lampirkan foto 2 identitas asli untuk verifikasi.
     - Langkah 3: *"3. Ambil di Studio / Kurir"*: Datang langsung ke studio atau gunakan kurir instan terpercaya.
     - Langkah 4: *"4. Uji Coba Fisik Bersama"*: Cek kebersihan sensor, tombol, dan kelengkapan baterai sebelum dibawa.
     - Langkah 5: *"5. Pengembalian & Ambil KTP"*: Kembalikan unit sesuai jadwal, cek kondisi akhir, dan ambil kembali kartu identitas Anda.

## Kriteria selesai
- [x] Section memiliki atribut `id="workflow"`.
- [x] 5 langkah alur sewa tersaji secara visual dan mudah dipahami oleh pengguna baru.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Berikan penomoran langkah yang kontras dengan warna aksen primary.

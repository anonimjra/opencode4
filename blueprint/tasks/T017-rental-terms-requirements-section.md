# T017 - Section Syarat & Ketentuan Jaminan Sewa

**Depends on:** T006, T008
**Estimasi:** kecil

## Tujuan
Membangun section Syarat & Jaminan Sewa (`components/landing/RentalTermsSection.tsx`) yang memberikan transparansi dokumen jaminan wajib (minimal 2 identitas asli: KTP + SIM/Paspor/Kartu Mahasiswa/NPWP), ketentuan verifikasi akun media sosial, dan aturan deposit luar domisili.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/RentalTermsSection.tsx` : Komponen syarat jaminan sewa kamera

## Langkah
1. Buat `components/landing/RentalTermsSection.tsx`.
2. Terima props `rentalTerms: string`, `whatsappNumber: string`.
3. Tata letak:
   - Kontainer section `id="terms"`, padding `py-20 lg:py-28 bg-[#111827] text-white border-y border-[#1F2937]`.
   - Header section: Badge *"Transparansi & Keamanan"*, judul *"Syarat & Ketentuan Jaminan Sewa"*, subjudul *"Proses verifikasi cepat dan aman demi kenyamanan dan perlindungan bersama."*.
   - 3 Kotak Panduan Jaminan:
     1. *"Wajib 2 Kartu Identitas Asli"*: KTP wajib, ditambah 1 identitas pendukung (SIM A/C, Paspor, NPWP, atau Kartu Tanda Mahasiswa aktif). Identitas disimpan selama masa sewa.
     2. *"Verifikasi Akun Media Sosial"*: Memiliki akun media sosial aktif (Instagram, TikTok, atau LinkedIn) yang dapat diverifikasi oleh admin.
     3. *"Foto Bersama Unit Saat Pick-up"*: Dokumentasi foto serah terima unit di studio sebagai bukti kelengkapan fisik alat.
   - Paragraf Ketentuan Tambahan (dari `rentalTerms` database): Tampilkan catatan deposit untuk penyewa ber-KTP luar domisili atau penyewa perdana.
   - Tombol "Tanya Syarat Khusus via WhatsApp".

## Kriteria selesai
- [x] Section memiliki atribut `id="terms"`.
- [x] Menyajikan 3 pilar syarat jaminan identitas sewa secara tegas dan transparan.
- [x] Teks ketentuan dari database terender rapi.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `whitespace-pre-line` agar poin-poin syarat sewa dari admin tidak menyatu dalam satu baris panjang.

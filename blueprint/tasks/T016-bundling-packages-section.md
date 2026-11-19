# T016 - Section Paket Bundling Hemat Shooting

**Depends on:** T006, T007, T008
**Estimasi:** kecil

## Tujuan
Membangun section Paket Bundling Hemat (`components/landing/BundlingPackagesSection.tsx`) yang menyajikan paket kombinasi produksi siap pakai (misal: Paket Wedding Video, Paket Podcast 2 Host, Paket YouTube Starter) dengan rincian alat yang didapat dan penghematan biaya.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/BundlingPackagesSection.tsx` : Komponen paket hemat produksi kamera

## Langkah
1. Buat `components/landing/BundlingPackagesSection.tsx`.
2. Terima props `packages: BundlingPackage[]`, `brandName: string`, `whatsappNumber: string`.
3. Tata letak:
   - Kontainer section `id="packages"`, padding `py-20 lg:py-28 bg-[#0B0F17] text-white`.
   - Header section: Badge *"Solusi Produksi Hemat"*, judul *"Paket Bundling Shooting Siap Pakai"*, subjudul *"Sewa paket lengkap kamera, audio, dan stabilizer dengan harga lebih hemat dibanding sewa satuan."*.
   - Grid Kartu Paket: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12`.
   - Kartu Paket Individual:
     - Kontainer `bg-[#111827] border border-[#1F2937] rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-rose-500/50 transition-all`.
     - Foto Paket atau Banner Ilustrasi.
     - Badge Hemat: *"Hemat Rp 150.000"*.
     - Nama Paket: `text-xl font-bold text-white mt-2`.
     - Daftar Alat yang Didapat (Checklist Bullet):
       - Render daftar alat dari array `items_included` dengan ikon centang hijau.
     - Kotak Tarif Sewa: Pilihan tarif 12 Jam & 24 Jam.
     - Tombol "Booking Paket Ini" (menghubungkan ke WhatsApp dengan template paket sewa).

## Kriteria selesai
- [ ] Section memiliki atribut `id="packages"`.
- [ ] Menampilkan daftar alat yang termasuk dalam paket secara jelas.
- [ ] Tombol booking WhatsApp mengarahkan ke pemesanan paket terkait.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Tangani kondisi jika data paket kosong dengan menyembunyikan section atau menampilkan placeholder ramah.

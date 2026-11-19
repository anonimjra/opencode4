# T007 - Utility Helper Functions (Rupiah, Durasi Sewa, WhatsApp)

**Depends on:** T001, T006
**Estimasi:** kecil

## Tujuan
Membuat modul fungsi utilitas (`lib/utils.ts`, `lib/whatsapp.ts`, `lib/constants.ts`) untuk memformat Rupiah, menghitung selisih hari rental (`calculateRentalDuration`), menyusun link booking WhatsApp dengan format jadwal sewa dan syarat KTP, serta fungsi `cn`.

## Baca dulu
- AGENTS.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `lib/utils.ts` : Helper `cn()`, `formatRupiah()`, `calculateRentalDuration()`, `slugify()`, `formatDateIndonesia()`
- `lib/whatsapp.ts` : Helper `generateRentalWhatsAppLink()` dan `cleanPhoneNumber()`
- `lib/constants.ts` : Preset tema cinema dark dan kategori alat default

## Langkah
1. Buat folder `lib/`.
2. Buat `lib/utils.ts`:
   - `cn(...inputs: ClassValue[])` menggunakan `clsx` dan `twMerge`.
   - `formatRupiah(amount: number): string`: Menghasilkan string `Rp 350.000`.
   - `calculateRentalDuration(pickup: Date | string, returnDate: Date | string): number`:
     Menghitung selisih hari antara tanggal ambil dan tanggal kembali (pembulatan minimal 1 hari).
   - `formatDateIndonesia(dateString: string): string`: Format tanggal bahasa Indonesia.
   - `slugify(text: string): string`: Slug URL.
3. Buat `lib/whatsapp.ts`:
   - `cleanPhoneNumber(phone: string): string`: Awalan format 62...
   - `generateRentalWhatsAppLink(options: { phone: string; brandName: string; gearName: string; durationType: '12h' | '24h'; pickupDate: string; returnDate: string; totalDays: number; estimatedPrice: number }): string`:
     Template pesan:
     *"Halo {brandName}, saya ingin booking sewa alat berikut:*
     *- Alat: {gearName}*
     *- Paket: Tarif {durationType} ({totalDays} Hari)*
     *- Jadwal Ambil: {pickupDate}*
     *- Jadwal Kembali: {returnDate}*
     *- Estimasi Total: {formatRupiah(estimatedPrice)}*
     *Saya bersedia melampirkan foto 2 identitas asli (KTP + SIM/Paspor) untuk verifikasi syarat sewa. Apakah unit masih ready pada tanggal tersebut?"*
4. Buat `lib/constants.ts` dengan preset tema Crimson, Amber, Teal.

## Kriteria selesai
- [x] Fungsi `calculateRentalDuration` menghitung selisih hari dengan tepat (min 1 hari).
- [x] Template pesan WhatsApp memuat rincian tanggal sewa dan kesiapan kirim 2 KTP.
- [x] Fungsi `formatRupiah` dan `cn` tervalidasi.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `encodeURIComponent()` pada seluruh parameter teks pesan WhatsApp.

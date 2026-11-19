# T006 - Definisi TypeScript Types & Database Interfaces

**Depends on:** T001
**Estimasi:** kecil

## Tujuan
Membuat file definisi tipe TypeScript (`types/database.ts` dan `types/index.ts`) yang merepresentasikan entitas rental kamera, status unit `GearStatus`, status booking `BookingStatus`, durasi sewa, respon Server Action, dan DTO form.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `types/database.ts` : Tipe skema tabel Supabase (RentalGear, GearCategory, BundlingPackage, RentalBooking, Testimonial, SiteSettings)
- `types/index.ts` : DTO form input, durasi sewa, dan generic ActionResponse

## Langkah
1. Buat folder `types/`.
2. Buat `types/database.ts` sesuai rancangan di `06-DATA-MODEL.md`:
   - Ekspor `type GearStatus = 'ready' | 'rented' | 'maintenance'`.
   - Ekspor `type BookingStatus = 'pending' | 'verified' | 'active' | 'completed' | 'cancelled'`.
   - Ekspor interface `RentalGear`, `GearCategory`, `BundlingPackage`, `RentalBooking`, `Testimonial`, dan `SiteSettings`.
   - Relasi opsional `category?: GearCategory | null` pada `RentalGear`.
3. Buat `types/index.ts`:
   - Ekspor `ActionResponse<T = unknown> = { success: boolean; data?: T; error?: string }`.
   - Ekspor DTO form: `GearFormInput`, `BundlingPackageInput`, `BookingFormInput`, `SiteSettingsInput`.

## Kriteria selesai
- [x] Berkas tipe TypeScript bersih dari tipe `any`.
- [x] Tipe `RentalGear` memuat tarif ganda `rate_12h` dan `rate_24h` serta `accessories_included`.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan lupa tipe `rate_12h` dan `rate_24h` bertipe `number` di TypeScript.

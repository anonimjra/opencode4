# 05-CONVENTIONS (V4 - CAMERA RENTAL EDITION)

Dokumen ini mendefinisikan konvensi penamaan, standar kode TypeScript, aturan formatting tarif rental (12/24 jam), kalkulasi durasi booking, optimasi foto gear, dan format commit git.

---

## 1. Aturan Penamaan (Naming Conventions)

### A. Berkas & Direktori
- **Komponen React:** PascalCase (contoh: `RentalGearCard.tsx`, `GearQuickViewModal.tsx`, `RentalBookingsTable.tsx`).
- **Halaman & Rute Next.js:** kebab-case sesuai konvensi App Router (`page.tsx`, `layout.tsx`, `route.ts`).
- **Utilitas & Helper:** camelCase (contoh: `calculateRentalDuration.ts`, `builder.ts`, `storage.ts`).
- **Server Actions:** kebab-case / camelCase (contoh: `products.ts`, `bookings.ts`, `packages.ts`).

### B. Database & Skema
- **Tabel:** snake_case jamak (`gear_categories`, `rental_gears`, `bundling_packages`, `rental_bookings`, `testimonials`, `site_settings`).
- **Kolom Tarif & Inventaris:** snake_case (`rate_12h`, `rate_24h`, `serial_number`, `accessories_included`, `gear_status`, `pickup_date`, `return_date`).

---

## 2. Standar TypeScript & Spesifikasi Rental

1. **Status Ketersediaan Unit:**
   Gunakan Union Literal:
   ```typescript
   export type GearStatus = 'ready' | 'rented' | 'maintenance';
   ```
2. **Status Booking Sewa:**
   ```typescript
   export type BookingStatus = 'pending' | 'verified' | 'active' | 'completed' | 'cancelled';
   ```
3. **Format Kalkulasi Sewa:**
   Wajib menggunakan fungsi helper `calculateRentalDuration(pickupDate: Date, returnDate: Date): number` yang menghitung total hari sewa secara presisi dengan pembulatan minimal 1 hari.

---

## 3. Format Respon Server Action & Bahasa UI

1. **Format Respon:**
   ```typescript
   export type ActionResponse<T = unknown> = {
     success: boolean;
     data?: T;
     error?: string;
   };
   ```
2. **Bahasa UI:**
   Seluruh antarmuka publik dan pesan feedback admin wajib menggunakan Bahasa Indonesia yang profesional dan lugas (contoh: *"Status alat berhasil diperbarui menjadi Sedang Disewa."*, *"Permintaan booking berhasil dikirim. Silakan kirimkan foto 2 identitas asli Anda melalui WhatsApp untuk verifikasi."*).

---

## 4. Standar Optimasi Media Foto Alat

1. **Rasio Foto Alat:**
   - Foto katalog gear menggunakan rasio `aspect-[4/3]` atau `aspect-square`.
   - Menggunakan `<Image />` dari `next/image` dengan properti `sizes` responsif untuk memastikan detail optik lensa dan tombol kamera terlihat tajam.
2. **Ukuran Berkas:**
   - Maksimal ukuran per foto adalah **2MB**.
   - Format: `image/jpeg`, `image/png`, `image/webp`.

---

## 5. Format Commit Git

Setiap penyelesaian satu task wajib menghasilkan satu commit git terisolasi:

```
T001: Inisialisasi project Next.js dan setup tooling rental kamera
T002: Konfigurasi Tailwind palet cinema dark dan font Plus Jakarta Sans
...
T042: Finalisasi dokumentasi README dan audit produksi rental
```

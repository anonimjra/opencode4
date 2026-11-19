# 03-ARCHITECTURE (V4 - CAMERA RENTAL EDITION)

Dokumen ini menjelaskan struktur direktori aplikasi, alur data (data flow), batas keamanan, komponen utama, dan integrasi sistem untuk E-Catalog & CMS Rental Kamera.

---

## 1. Struktur Direktori Proyek

Aplikasi dibangun menggunakan Next.js App Router dengan arsitektur modular yang memisahkan area publik, area administrasi, logika bisnis rental, serta integrasi Supabase dan ExcelJS.

```
opencode4/
├── AGENTS.md                          # Aturan kerja agen opencode
├── blueprint/                         # Cetak biru arsitektur dan task teknis
├── supabase/
│   ├── migrations/
│   │   └── 001_rental_schema.sql      # Skrip DDL tabel rental, tarif 12/24 jam, RLS, storage
│   └── seed.sql                       # Data awal katalog rental kamera Lensa Nusantara
├── public/
│   ├── images/                        # Placeholder foto gear studio & sensor kamera
│   │   ├── hero-gear.jpg
│   │   ├── camera-sensor.jpg
│   │   └── default-logo.png
│   └── favicon.ico
├── app/
│   ├── (public)/                      # Area publik
│   │   ├── layout.tsx                 # Layout publik (Navbar, Footer, Floating WA)
│   │   └── page.tsx                   # Landing page e-katalog rental kamera
│   ├── admin/                         # Area terproteksi Admin Dashboard
│   │   ├── layout.tsx                 # Layout admin (Sidebar, TopHeader)
│   │   ├── page.tsx                   # Overview dashboard & metrik rental
│   │   ├── login/
│   │   │   └── page.tsx               # Login admin
│   │   ├── products/
│   │   │   ├── page.tsx               # Tabel inventaris alat & tombol export excel
│   │   │   ├── new/page.tsx           # Form tambah alat rental baru
│   │   │   └── [id]/edit/page.tsx     # Form edit alat rental
│   │   ├── categories/
│   │   │   └── page.tsx               # Manajemen kategori alat & brand
│   │   ├── packages/
│   │   │   └── page.tsx               # Manajemen paket bundling shooting
│   │   ├── bookings/
│   │   │   └── page.tsx               # Manajemen antrean booking sewa
│   │   ├── testimonials/
│   │   │   └── page.tsx               # Manajemen ulasan creator/klien
│   │   ├── content/
│   │   │   └── page.tsx               # Manajemen profil studio & syarat jaminan sewa
│   │   └── settings/
│   │       └── page.tsx               # Pengaturan brand, logo, warna aksen cinema
│   ├── api/
│   │   └── admin/
│   │       └── export/
│   │           ├── inventory/
│   │           │   └── route.ts       # Endpoint export Excel inventaris alat
│   │           └── bookings/
│   │               └── route.ts       # Endpoint export Excel rekap booking sewa
│   ├── actions/                       # Next.js Server Actions
│   │   ├── auth.ts                    # Login & logout admin
│   │   ├── products.ts                # Mutasi alat rental (tarif 12/24h, SN, status)
│   │   ├── categories.ts              # Mutasi kategori alat
│   │   ├── packages.ts                # Mutasi paket bundling shooting
│   │   ├── bookings.ts                # Submit booking publik & update status
│   │   ├── testimonials.ts            # Mutasi testimoni
│   │   └── settings.ts                # Mutasi profil studio & tema visual
│   ├── layout.tsx                     # Root layout (HTML, Body, Fonts, ThemeProvider)
│   ├── globals.css                    # Tailwind CSS & theme variables cinema dark
│   ├── error.tsx                      # Global error boundary
│   └── not-found.tsx                  # Halaman 404 bertema kamera
├── components/
│   ├── ui/                            # Komponen UI atomik primitif
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Skeleton.tsx
│   │   └── Toast.tsx
│   ├── shared/                        # Komponen bersama
│   │   ├── ThemeProvider.tsx          # Injektor CSS Variables warna aksen cinema
│   │   └── ImageUploader.tsx          # Komponen upload foto alat kamera
│   ├── landing/                       # Komponen spesifik Landing Page Publik
│   │   ├── Navbar.tsx
│   │   ├── MobileDrawer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutStudioSection.tsx
│   │   ├── GearCategoryFilter.tsx
│   │   ├── RentalGearCard.tsx
│   │   ├── GearQuickViewModal.tsx
│   │   ├── BundlingPackagesSection.tsx
│   │   ├── RentalTermsSection.tsx
│   │   ├── RentalWorkflowSection.tsx
│   │   ├── StudioLocationSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppFloatingButton.tsx
│   └── admin/                         # Komponen spesifik Admin Dashboard
│       ├── AdminSidebar.tsx
│       ├── AdminHeader.tsx
│       ├── RentalMetricCard.tsx
│       ├── GearInventoryTable.tsx
│       ├── GearForm.tsx
│       ├── BundlingPackageManager.tsx
│       ├── RentalBookingsTable.tsx
│       └── ExportExcelButton.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # Browser Client
│   │   ├── server.ts                  # Server Component & Action Client
│   │   ├── middleware.ts              # Middleware session helper
│   │   └── storage.ts                 # Helper upload foto alat ke Supabase Storage
│   ├── excel/
│   │   ├── builder.ts                 # ExcelJS builder & styling cinema dark
│   │   ├── inventory-sheet.ts         # Worksheet inventaris alat kamera
│   │   └── bookings-sheet.ts          # Worksheet rekap booking sewa
│   ├── utils.ts                       # formatRupiah, calculateRentalDuration, slugify, cn
│   ├── whatsapp.ts                    # Helper pesan WA sewa + verifikasi syarat KTP
│   └── constants.ts                   # Preset tema cinema, kategori gear default
├── types/
│   ├── database.ts                    # Interface PostgreSQL Supabase
│   └── index.ts                       # DTOs, GearStatus, BookingPayload, ActionResponse
├── middleware.ts                      # Root Next.js Route Guarding Middleware
├── .env.example                       # Contoh environment variables
├── .env.local                         # Konfigurasi lokal
├── next.config.ts                     # Konfigurasi Next.js remote patterns Supabase
├── package.json                       # Manifest dependensi
├── postcss.config.mjs                 # PostCSS setup
├── tailwind.config.ts                 # Tailwind configuration
└── tsconfig.json                      # TypeScript strict configuration
```

---

## 2. Alur Data (Data Flow Architecture)

### A. Alur Publik & Booking WhatsApp
1. Halaman `/` (Server Component) mengambil data konfigurasi studio, kategori alat, daftar alat rental, paket bundling, testimoni secara paralel dari Supabase.
2. Pengunjung memfilter katalog berdasarkan kategori alat (Kamera, Lensa, Lighting, Audio, Stabilizer, Drone, Paket).
3. Pengunjung mengeklik **Quick View**: Modal pop-up menampilkan spesifikasi sensor, checklist kelengkapan isi tas sewa (baterai, charger, memory), dan kalkulator durasi sewa harian.
4. Pengunjung memilih tanggal ambil & kembali, lalu mengeklik **Booking WhatsApp**:
   Browser membuka link WhatsApp yang telah terisi format jadwal sewa lengkap dan instruksi mengirimkan foto 2 kartu identitas asli untuk verifikasi syarat sewa.
5. Jika pengunjung mengisi form booking cepat di web, Server Action `actions/bookings.ts` menyimpan antrean ke tabel `rental_bookings`.

### B. Alur Admin & Pengelolaan Inventaris
1. Admin login di `/admin/login`, diverifikasi oleh Supabase Auth, sesi disimpan di HTTP-only cookie.
2. Form alat (`GearForm.tsx`) menerima input spesifikasi alat, nomor seri (SN) unit, tarif 12 jam, tarif 24 jam, kelengkapan aksesoris bawaan, dan foto.
3. Foto diunggah ke storage bucket `rental-media`.
4. Server Action menyimpan data ke `rental_gears` dan memicu `revalidatePath('/')`.

### C. Alur Server-side Export Excel
1. Admin mengeklik tombol "Export Excel" pada tabel inventaris alat atau antrean booking.
2. Route Handler `/api/admin/export/inventory` atau `/api/admin/export/bookings` memverifikasi sesi admin.
3. Server memanggil data dari Supabase, menyusun worksheet menggunakan `exceljs`, memformat header bertema cinema dark (`#0F172A`), format Rupiah akuntansi, dan border data.
4. Server mengalirkan berkas binary `.xlsx` bertanggal ke browser admin.

---

## 3. Sistem Tema Visual Cinema Dark Dinamis

Rental multimedia sangat identik dengan nuansa visual gelap (*dark mode / cinema aesthetic*):
- Nilai `primary_color` (contoh: `#E11D48` untuk Cinema Crimson) disimpan di tabel `site_settings`.
- Komponen `ThemeProvider` menanamkan CSS Variables `--color-cinema-primary` ke tag `<html>`.
- Tailwind CSS menggunakan variabel ini untuk kelas utilitas `bg-primary`, `text-primary`, dan `border-primary`.
- Admin dapat mengganti tema ke preset: **Cinema Crimson** (`#E11D48`), **Amber Gold** (`#F59E0B`), **Cyber Teal** (`#0D9488`), atau **Neon Violet** (`#8B5CF6`).

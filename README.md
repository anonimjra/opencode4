# Lensa Nusantara Rental & Studio

E-Catalog & CMS Rental Kamera & Multimedia Gear berbasis **Next.js App Router**, **Supabase**, dan **Tailwind CSS**. Dirancang untuk pemilik rental kamera yang membutuhkan katalog alat profesional, alur booking via WhatsApp, manajemen inventaris dengan nomor seri, serta ekspor rekap ke Excel.

---

## Tentang Proyek

Website ini menyajikan katalog gear multimedia (kamera, lensa, lighting, audio, stabilizer, drone, paket bundling) dengan **tarif sewa fleksibel 12 jam / 24 jam**, **nomor seri inventaris**, **checklist kelengkapan bawaan** (baterai, charger, tas), dan **ekspor Excel server-side** untuk rekap inventaris maupun booking. Admin mengelola seluruh konten melalui dashboard terproteksi Supabase Auth.

---

## Fitur Utama

- **Landing page publik** bertema cinema dark dengan hero, profil studio, filter kategori, katalog gear, paket bundling, syarat sewa, alur 5 langkah, lokasi studio (Google Maps), testimoni, footer, dan tombol WhatsApp melayang.
- **Modal Quick View** menampilkan foto detail, spesifikasi sensor/mount, checklist isi tas sewa, serta **kalkulator durasi sewa** interaktif (12h/24h) dengan estimasi biaya realtime.
- **Template booking WhatsApp** otomatis memuat nama alat, paket durasi, jadwal ambil/kembali, estimasi total, dan permintaan foto 2 identitas asli.
- **Dashboard admin** (`/admin`) terproteksi:
  - Overview metrik rental (total alat, on-rent, ready, booking pending, estimasi omzet).
  - CRUD inventaris alat (tarif 12/24 jam, nomor seri, kelengkapan, status unit, foto).
  - Manajemen kategori, paket bundling, antrean booking, testimoni, profil studio & syarat sewa, serta brand & tema warna.
- **Export Excel (.xlsx)** untuk inventaris alat (`inventaris-alat-YYYY-MM-DD.xlsx`) dan rekap booking (`rekap-sewa-YYYY-MM-DD.xlsx`) dengan header bertema cinema dark dan format Rupiah.
- **Tema warna aksen dinamis** (Cinema Crimson, Amber Tungsten, Cyber Teal, Neon Violet).
- **Route protecting** `/admin/*` via Next.js Middleware + Supabase Auth.
- Error boundary, halaman 404 bertema kamera, skeleton loading, dan toast notifikasi.

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router, Server Components, Server Actions) |
| Bahasa | TypeScript (strict mode) |
| Styling | Tailwind CSS 3 |
| Database & Auth & Storage | Supabase (`@supabase/supabase-js`, `@supabase/ssr`) |
| Ikon | lucide-react |
| Excel | exceljs |
| Utilitas | clsx, tailwind-merge, date-fns |

---

## Langkah Setup Supabase

1. Buat proyek baru di [dashboard Supabase](https://app.supabase.com).
2. Buka menu **SQL Editor**, jalankan skrip migrasi:
   ```
   supabase/migrations/001_rental_schema.sql
   ```
   Skrip ini membuat tabel `site_settings`, `gear_categories`, `rental_gears`, `bundling_packages`, `rental_bookings`, `testimonials`, mengaktifkan RLS, dan menyiapkan storage bucket `rental-media`.
3. Jalankan skrip seed untuk mempopulasikan katalog awal:
   ```
   supabase/seed.sql
   ```
4. Pastikan storage bucket `rental-media` bersifat **Public** (read terbuka, write khusus `authenticated`).
5. Di menu **Authentication > Users**, buat user admin pertama (email & password), centang **Auto Confirm User**.
   - Alternatif via skrip lokal (lihat bagian Skrip Admin).
6. Salin **Project URL** dan **anon public key** dari **Settings > API** untuk mengisi `.env.local`.

---

## Setup Lingkungan Lokal

```bash
# 1. Masuk ke folder proyek
cd opencode4

# 2. Install dependensi
npm install

# 3. Salin template environment
cp .env.example .env.local
# lalu isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4. Jalankan dev server
npm run dev
# Buka http://localhost:3000
# Dashboard admin: http://localhost:3000/admin/login
```

### Variabel Environment

| Variabel | Wajib | Keterangan |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Ya | URL proyek Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ya | Anon public key Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Opsional | Hanya untuk skrip admin server-side; JANGAN diekspos ke client |

---

## Skrip Pembuatan Admin Awal

Cara cepat membuat akun admin tanpa membuka dashboard Supabase:

```bash
# Set environment (PowerShell)
$env:NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
$env:SUPABASE_SERVICE_ROLE_KEY="service-role-key"

node scripts/create-admin.mjs admin@lensanusantara.id "KataSandiKuat123"
```

> `SUPABASE_SERVICE_ROLE_KEY` bersifat rahasia dan hanya boleh digunakan di sisi server. Jangan commit nilai asli ke repositori.

---

## Build & Verifikasi

```bash
npx tsc --noEmit   # Type-check
npm run build      # Build produksi
npm run lint       # ESLint
```

---

## Panduan Deploy ke Vercel

1. Push repositori ke GitHub.
2. Import proyek di [dashboard Vercel](https://vercel.com/new).
3. Tambahkan Environment Variables yang sama dengan `.env.local`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Klik **Deploy**. Setelah selesai, akses dashboard admin di `https://<domain>/admin/login`.

---

## Struktur Proyek (Ringkas)

```
opencode4/
├── app/
│   ├── (public)/        # Landing page publik
│   ├── admin/           # Dashboard admin (terproteksi)
│   ├── actions/         # Server Actions (auth, products, bookings, dll.)
│   ├── api/admin/export # Route handler export Excel
│   ├── error.tsx        # Global error boundary
│   └── not-found.tsx    # Halaman 404
├── components/
│   ├── ui/              # Primitif UI (Button, Modal, Toast, Skeleton, dll.)
│   ├── shared/          # ThemeProvider, ImageUploader
│   ├── landing/         # Komponen landing page publik
│   └── admin/           # Komponen dashboard admin
├── lib/
│   ├── supabase/        # Client, server, middleware, storage
│   ├── excel/           # ExcelJS builder & worksheet
│   ├── data/            # Query data publik
│   ├── utils.ts         # Rupiah, durasi sewa, slug, cn
│   ├── whatsapp.ts      # Link WhatsApp booking
│   └── constants.ts     # Preset tema & kategori
├── types/               # Tipe database & DTO
├── supabase/            # migrations & seed
├── middleware.ts        # Route guard /admin/*
└── README.md
```

---

## Lisensi

Template internal — Lensa Nusantara Rental & Studio.

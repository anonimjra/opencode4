# 04-TECH-STACK (V4 - CAMERA RENTAL EDITION)

Dokumen ini mendokumentasikan daftar resmi pustaka, runtime, dan dependensi npm yang digunakan dalam proyek Rental Kamera "Lensa Nusantara".

---

## 1. Core Framework & Runtime

| Paket / Tool | Versi | Justifikasi Teknis |
|---|---|---|
| **Node.js** | `>= 20.x LTS` | Runtime stabil dengan dukungan native Web Streams, Crypto, dan Fetch API. |
| **Next.js** | `15.x` (atau `14.2.x LTS`) | App Router dengan Server Components untuk SEO katalog rental kamera, Server Actions untuk mutasi data cepat, dan Route Handlers untuk streaming berkas Excel. |
| **React & React DOM** | `19.x` (atau `18.3.x`) | Library deklaratif UI inti. |
| **TypeScript** | `^5.6.x` | Menjamin type-safety ketat untuk status unit (`ready` | `rented` | `maintenance`), tarif ganda 12/24 jam, dan kalkulasi durasi booking. |

---

## 2. Styling, Ikon & Antarmuka UI

| Paket | Versi | Justifikasi Teknis |
|---|---|---|
| **Tailwind CSS** | `^3.4.x` / `^4.0.x` | Framework styling utility-first untuk tema cinema dark modern (`#0F172A`) dan komponen visual alat kamera. |
| **PostCSS & Autoprefixer** | `^8.4.x` / `^10.4.x` | Compiler CSS cross-browser otomatis. |
| **Lucide React** | `^0.460.x` | Kumpulan ikon SVG modern (ikon `Camera`, `Aperture`, `Film`, `Mic`, `SunMedium`, `Sliders`, `Calendar`, `ShieldAlert`, `FileSpreadsheet`, dll). |
| **clsx & tailwind-merge** | `^2.1.x` / `^2.5.x` | Helper penggabung class Tailwind dinamis (`cn()`). |

---

## 3. Database, Auth & Media Storage

| Paket | Versi | Justifikasi Teknis |
|---|---|---|
| **@supabase/supabase-js** | `^2.46.x` | SDK resmi Supabase untuk query PostgreSQL, filtering kategori alat, dan upload foto gear resolusi tinggi. |
| **@supabase/ssr** | `^0.5.x` | Adapter sesi auth cookie aman khusus Next.js App Router. |

---

## 4. Pembuat Berkas Spreadsheet (Excel Engine)

| Paket | Versi | Justifikasi Teknis |
|---|---|---|
| **exceljs** | `^4.4.x` | Library pembuatan berkas Microsoft Excel (.xlsx) di sisi server dengan kontrol penuh styling cell, warna tema cinema dark, format angka Rupiah (`"Rp"#,##0`), dan auto-fit lebar kolom. |

---

## 5. Utilitas Tambahan

| Paket | Versi | Justifikasi Teknis |
|---|---|---|
| **date-fns** | `^4.1.x` | Format tanggal Indonesia untuk nama file export dan kalkulasi durasi hari booking sewa. |

---

## 6. Target Lingkungan & Batasan

- **Hosting:** Vercel (Hobby / Free Tier).
- **Database & Storage:** Supabase Cloud (Free Tier).
- **Batasan Keras:** Agen pelaksana (`opencode`) dilarang menginstal dependensi di luar daftar di atas.

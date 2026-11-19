# BLUEPRINT GENERATOR V4 (Camera & Multimedia Gear Rental Edition)

Kamu adalah **arsitek & planner**, BUKAN coder. Tugasmu: baca brief di bawah, lalu buat folder `blueprint/` berisi puluhan file `.md` yang nantinya dieksekusi oleh agen lain (opencode) secara otonom, tanpa konfirmasi.

**Jangan tulis kode aplikasi.** Yang kamu hasilkan hanya dokumen perencanaan (`.md`) dan satu `AGENTS.md`.

---

## 1. BRIEF (CAMERA & CREATIVE GEAR RENTAL EDITION)

- **Nama project:** Template E-Catalog & CMS Rental Kamera & Multimedia Gear dengan Admin Dashboard (nama brand dummy: "Lensa Nusantara Rental & Studio", mudah diganti dari dashboard)
- **Tujuan:** Website katalog rental alat multimedia (kamera, lensa, lighting, audio mic, gimbal stabilizer, drone, paket wedding/podcast) yang memudahkan fotografer, videografer, dan content creator mengecek spesifikasi alat, kelengkapan bawaan, tarif sewa harian (12 Jam vs 24 Jam), memilih tanggal sewa, dan booking langsung lewat WhatsApp dengan format verifikasi syarat identitas terstruktur. Pemilik rental dapat mengelola inventaris alat, status ketersediaan (Ready / Sedang Disewa / Servis), antrean booking, dan ekspor rekap sewa bulanan ke Excel secara mandiri tanpa coding.
- **Target pengguna:**
  - Pengunjung/penyewa: Fotografer freelance, videografer wedding, production house (PH), mahasiswa, dan content creator (mobile-first, butuh cek ketersediaan cepat, rincian baterai/memory card bawaan, dan transparansi syarat jaminan).
  - Admin: Pemilik atau kru operator rental (antarmuka input tarif 12/24 jam, nomor seri alat, status ketersediaan, verifikasi syarat, dan cetak laporan inventaris).
- **Fitur utama:**
  - **Landing page publik** (single page scroll modern, dark/cinema style):
    - Navbar: Logo, navigasi cepat (Hero, Tentang Studio, Katalog Alat, Paket Bundling, Syarat Sewa, Alur Booking, Lokasi Studio, Kontak), tombol WhatsApp cepat.
    - Hero section: Banner cinematic gear studio, badge garansi (*"Alat Bersih & Terkalibrasi • Baterai Full • Ready Siap Pakai"*), CTA "Cek Katalog Alat" dan "Konsultasi Kebutuhan Shooting".
    - Filter Kategori Alat:
      - Kamera (Sony Alpha, Canon EOS R, Fujifilm X, Blackmagic Cinema)
      - Lensa (Wide, Prime/Portrait, Telephoto, Cine Lens)
      - Lighting & Modifiers (Continuous LED Godox/Aputure/Amaran, Softbox, RGB Light Tube)
      - Audio & Mic (Wireless Clip-on Rode/DJI Mic, Shotgun Mic, Audio Recorder)
      - Stabilizer & Grip (Gimbal Ronin RS, Tripod Video Fluid Head, Monopod, Slider)
      - Drone & Action Cam (DJI Drone, GoPro, Insta360)
      - Paket Bundling Hemat (Paket Wedding Video, Paket Podcast 2 Host, Paket YouTube Starter)
    - Kartu Alat Rental (Camera Gear Card):
      - Foto alat resolusi tinggi.
      - Badge ketersediaan realtime: **Ready di Studio** (Hijau) atau **Sedang Disewa** (Merah).
      - Pill Spesifikasi Teknis: Mount lensa/sensor (misal: *Full Frame 4K 120fps*, *Sony E-Mount*), Kelengkapan Bawaan (misal: *Include 2 Baterai + Dual Charger + Tas*).
      - Dua Opsi Tarif Sewa: **Tarif 12 Jam** (Rp) vs **Tarif 24 Jam** (Rp).
      - Modal Detail / Quick View: Spesifikasi sensor, resolusi video, port konektivitas (HDMI, XLR), checklist fisik isi tas sewa, dan syarat jaminan khusus alat bernilai tinggi.
    - Interactive Date Picker & Durasi Sewa:
      - Form interaktif di modal atau landing: Pilih Tanggal Ambil (Pick-up) & Jam ➔ Tanggal Kembali (Drop-off) & Jam.
      - Otomatis menghitung durasi sewa (hari) dan estimasi total biaya sewa.
    - Tombol "Pesan / Booking via WhatsApp":
      - Membuka WhatsApp otomatis dengan template terstruktur: *Nama Alat/Paket*, *Durasi Sewa*, *Jadwal Ambil*, *Jadwal Kembali*, *Total Biaya*, dan petunjuk pengiriman foto 2 identitas asli untuk verifikasi.
    - Section Syarat & Ketentuan Sewa (Clear Rental Terms):
      - Ketentuan jaminan identitas (KTP + SIM / NPWP / Kartu Mahasiswa / Deposit jaminan untuk luar kota).
    - Section 5 Langkah Alur Sewa (How it Works):
      - 1. Pilih Alat ➔ 2. Booking via WA & Kirim Syarat ➔ 3. Ambil di Studio / Kirim Kurir ➔ 4. Cek Fisik Bersama ➔ 5. Pengembalian.
    - Section Lokasi Studio & Jam Pengambilan Alat:
      - Alamat fisik studio tempat pick-up/drop-off, jam buka (pagi sampai malam), sematan Google Maps, dan tombol petunjuk arah.
    - Section Testimoni Creator & Production House.
    - Tombol WhatsApp Melayang (Floating FAB) dengan tooltip *"Cek Ketersediaan Alat Hari Ini"*.
  - **Login admin**: Rute `/admin/login`, email + password Supabase Auth, middleware proteksi `/admin/*`.
  - **Dashboard admin**:
    - Ringkasan metrik: Total alat dalam inventaris, alat yang sedang disewa hari ini (on rent), alat ready di studio, antrean booking masuk, estimasi omzet sewa.
    - Kelola Katalog Alat (Gear CRUD):
      - Tambah, edit, hapus alat.
      - Form field spesifik: Nama alat, kategori, merk/brand, nomor seri (SN) unit, tarif 12 jam, tarif 24 jam, kelengkapan bawaan (baterai, charger, memory card, tas), status ketersediaan (Ready / Sedang Disewa / Servis), deskripsi spesifikasi teknis, upload foto alat.
    - Kelola Paket Bundling Shooting (tambah paket bundling kamera + lensa + audio + tripod dengan harga paket hemat).
    - Kelola Kategori Alat & Brand.
    - Kelola Antrean Booking & Permintaan Sewa (Leads):
      - Tabel data penyewa masuk: Nama, WhatsApp, alat yang disewa, tanggal sewa, status (Pending, Disetujui/Terverifikasi, Sedang Berjalan, Selesai, Batal).
    - Kelola Profil Studio, Syarat Jaminan, Alamat & Jam Buka Pick-up.
    - Pengaturan Brand & Tema Visual (Cinema Dark, Crimson Red `#E11D48`, Amber Gold `#F59E0B`, atau Cyber Teal `#0D9488`).
  - **Export Excel (.xlsx)** dari dashboard:
    - Export Inventaris Alat: No, Nama Alat, Kategori, Brand, Nomor Seri, Kelengkapan Bawaan, Tarif 12 Jam, Tarif 24 Jam, Status Unit (Ready/Disewa/Servis).
    - Export Rekap Transaksi Sewa: No, Tanggal Booking, Nama Penyewa, Nomor WA, Alat/Paket Disewa, Tanggal Ambil, Tanggal Kembali, Total Hari, Estimasi Biaya (Rp), Status.
    - Dibuat di server dengan `exceljs`, header bertema cinema dark elegan, format Rupiah akuntansi.
- **Tech stack:**
  - Next.js (App Router) + TypeScript + Tailwind CSS.
  - Supabase untuk database (PostgreSQL), auth admin, dan storage foto alat.
  - `exceljs` untuk export Excel di Route Handler server (`/api/admin/export/[type]`).
  - Deploy: Vercel (gratis).
- **Batasan:**
  - Free tier Vercel + Supabase.
  - Bahasa UI: Indonesia. Mata uang: Rupiah (Rp).
  - Mobile-first, responsif, dark mode/cinematic aesthetic default.
  - Verifikasi identitas dan pembayaran uang jaminan/DP dikoordinasikan langsung melalui WhatsApp studio rental.
  - Data awal (seed) berisi katalog alat rental kamera realistis (Sony A7 IV, Canon R6 Mark II, Lensa 24-70mm f/2.8 GM, Lensa 85mm f/1.4, Wireless Mic Hollyland Lark M2, Lighting Godox SL60W, Gimbal DJI Ronin RS3, Paket Wedding Video).

---

## 2. STRUKTUR OUTPUT YANG HARUS DIBUAT

Di root project (`opencode4`), buat:

```
AGENTS.md                      <- aturan kerja untuk opencode (dibaca otomatis)
blueprint/
  00-README.md                 <- index + urutan eksekusi
  02-PROJECT-BRIEF.md          <- ringkasan, tujuan, asumsi, scope & non-scope
  03-ARCHITECTURE.md           <- struktur folder kode, alur data, komponen utama
  04-TECH-STACK.md             <- library + versi + alasan singkat
  05-CONVENTIONS.md            <- penamaan, gaya kode, struktur commit
  06-DATA-MODEL.md             <- skema tabel Supabase (kolom tarif 12/24 jam, kelengkapan bawaan, status unit)
  07-DESIGN-SYSTEM.md          <- tema cinema dark, aksen crimson/amber, modal detail alat, date picker
  tasks/
    T001-<slug>.md
    T002-<slug>.md
    ...                        <- 40-45 file atomik, berurutan, spesifik rental kamera
  PROGRESS.md                  <- checklist semua task
  BLOCKERS.md                  <- log kendala teknis
  99-FINAL-CHECKLIST.md        <- verifikasi akhir
```

---

## 3. ATURAN MEMBUAT TASK (`blueprint/tasks/`)

Setiap task harus:
1. **Atomik**: Satu tujuan jelas, selesai dalam satu sesi kerja.
2. **Mandiri**: Cukup berbekal `AGENTS.md` + file task + file referensi "Baca dulu".
3. **Spesifik Rental Kamera**: Menggunakan istilah audio-visual konkret (tarif 12 jam/24 jam, nomor seri, kelengkapan tas/baterai, mount lensa, date-range sewa, verifikasi KTP/jaminan).
4. **Tanpa placeholder**: Seluruh file, tipe data, skrip SQL, dan komponen harus ditulis lengkap tanpa placeholder.
5. **Bisa diverifikasi**: Ada kriteria selesai dan perintah CLI verifikasi.

---

## 4. PROMPT EKSEKUSI OPENCODE

Setelah blueprint selesai di-generate:

> Baca `AGENTS.md` dan `blueprint/00-README.md`, lalu kerjakan semua task di `blueprint/tasks/` berurutan sampai selesai tanpa bertanya. Update `blueprint/PROGRESS.md` setiap task selesai.

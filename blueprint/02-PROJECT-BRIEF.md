# 02-PROJECT-BRIEF (V4 - CAMERA RENTAL EDITION)

Dokumen ini mendefinisikan ruang lingkup bisnis, sasaran fungsional, spesifikasi teknis industri rental multimedia, serta batasan sistem untuk E-Catalog & CMS Rental Kamera & Multimedia Gear.

---

## 1. Identitas Proyek

- **Nama Proyek:** Template E-Catalog & CMS Rental Kamera & Multimedia Gear (Default Brand Mock: "Lensa Nusantara Rental & Studio")
- **Kategori:** Web Application / E-Catalog Rental Multimedia, Studio Gear Management & Booking System
- **Target Audiens:**
  1. **Pengunjung / Penyewa:** Fotografer freelance, videografer wedding, creator YouTube/TikTok, mahasiswa perfilman, dan production house (PH) yang memerlukan kejelasan ketersediaan alat, tarif fleksibel (12 Jam vs 24 Jam), kelengkapan aksesoris bawaan (baterai, charger, tas, memory card), serta transparansi syarat jaminan identitas sewa.
  2. **Pemilik Rental / Kru Studio (Admin):** Pengelola rental yang membutuhkan antarmuka pencatatan nomor seri unit (SN), status unit (Ready di Studio / Sedang Disewa / Servis), pengelolaan antrean booking sewa, dan ekspor rekap transaksi bulanan ke Excel.

---

## 2. Tujuan Proyek

1. **Katalog Gear Terstruktur:** Menyajikan inventaris kamera, lensa, lighting, audio mic, gimbal, drone, dan paket bundling dengan spesifikasi teknis dan kelengkapan bawaan yang jelas.
2. **Fleksibilitas Tarif Durasi Sewa:** Mendukung kebutuhan shooting pendek (Tarif 12 Jam) maupun shooting harian/luar kota (Tarif 24 Jam) dengan kalkulator estimasi total biaya otomatis.
3. **Standarisasi Alur Booking & Syarat Identitas:** Mengeliminasi risiko keamanan rental melalui alur verifikasi syarat jaminan terstruktur (minimal 2 kartu identitas asli KTP/SIM/Paspor + medsos aktif) yang langsung diteruskan ke WhatsApp operator studio.
4. **Manajemen Status Unit Realtime:** Memudahkan kru studio memantau unit mana yang sedang disewa dan kapan jadwal pengembaliannya.

---

## 3. Fitur Utama Khusus Rental Kamera

### A. Landing Page Publik
- **Navbar Khusus Rental:** Logo brand studio, navigasi cepat (Beranda, Profil Studio, Katalog Gear, Paket Bundling, Syarat Sewa, Alur Sewa, Lokasi Studio, Kontak), dan tombol WhatsApp cepat.
- **Hero Section:** Banner visual cinema studio bernuansa gelap (*dark aesthetic*), badge jaminan (*"Alat Bersih & Terkalibrasi • Baterai Full • Ready Siap Pakai"*), tombol CTA "Cek Katalog Alat" dan "Konsultasi Kebutuhan Shooting".
- **Profil Studio & Standar Perawatan (About Section):** Penjelasan standar pembersihan sensor kamera, pengecekan fungsi tombol, kalibrasi gimbal, dan uji fungsi bersama sebelum serah terima unit.
- **Filter Kategori Alat Lengkap:**
  - Kamera (Mirrorless Sony, Canon, Fujifilm, Cinema Camera Blackmagic)
  - Lensa (Wide Angle, Prime Portrait, Telephoto Zoom, Cine Lens)
  - Lighting & Modifiers (Continuous LED Godox/Aputure/Amaran, Softbox, RGB Light Tube)
  - Audio & Mic (Wireless Clip-on Rode/DJI Mic, Shotgun Mic, Recorder Zoom)
  - Stabilizer & Grip (Gimbal Ronin RS, Tripod Video Fluid Head, Monopod, Slider)
  - Drone & Action Cam (DJI Drone, Action Cam GoPro/Insta360)
  - Paket Bundling Hemat (Paket Wedding Video, Paket Podcast 2 Host, Paket YouTube Starter)
- **Kartu Alat Multimedia Spesifik:**
  - Foto alat resolusi tinggi.
  - Badge Status: **Ready di Studio** (Hijau) atau **Sedang Disewa** (Merah).
  - Pill Spesifikasi: Sensor/Mount (misal: *Full Frame 4K 120fps*, *Sony E-Mount*).
  - Pill Kelengkapan Bawaan: *Include 2 Baterai + Dual Charger + Tas*.
  - Dua Opsi Tarif: **Tarif 12 Jam** (Rp) & **Tarif 24 Jam** (Rp).
  - Tombol **Quick View**: Membuka modal detail spesifikasi teknis dan checklist kelengkapan.
  - Tombol **Booking WhatsApp**: Mengenerate format booking otomatis memuat nama alat, durasi, dan jadwal sewa.
- **Modal Pop-up Quick View:**
  - Foto detail alat, spesifikasi sensor/video, port konektivitas (HDMI, XLR, Type-C).
  - Checklist isi tas sewa (baterai, charger, strap, tutup lensa, memory card).
  - Kalkulator Tanggal & Durasi Sewa: Pilih Tanggal & Jam Ambil ➔ Tanggal & Jam Kembali ➔ Hitung total hari & estimasi biaya sewa.
  - Tombol langsung booking via WhatsApp.
- **Section Paket Bundling Hemat:** Menampilkan paket produksi terpadu (misal: Paket Dokumentasi Wedding = Sony A7 IV + Lensa 24-70mm + Mic Wireless + Gimbal Ronin) dengan harga sewa paket lebih hemat.
- **Section Syarat & Ketentuan Jaminan Sewa:** Panduan transparan mengenai dokumen wajib (2 identitas asli asli KTP + SIM/Paspor/NPWP), verifikasi akun media sosial, dan ketentuan deposit untuk pengguna luar domisili.
- **Section 5 Langkah Alur Sewa:** Panduan infografis mulai dari pilih alat, booking WA, pengambilan di studio, cek fisik, hingga pengembalian.
- **Section Lokasi Studio & Jam Pengambilan:** Alamat studio fisik, jam buka pick-up pagi hingga malam, sematan Google Maps responsif, dan tombol petunjuk arah.
- **Section Testimoni Content Creator & Videografer.**
- **Floating WhatsApp Button:** Tombol melayang dengan tooltip *"Cek Ketersediaan Alat Hari Ini"*.

### B. Otentikasi & Keamanan Admin
- Halaman login terproteksi di `/admin/login` menggunakan Supabase Auth.
- Next.js Middleware route guard untuk mengamankan seluruh rute `/admin/*`.

### C. Admin Dashboard (Sistem Manajemen Rental)
- **Overview Dashboard:** Total alat terdaftar, jumlah alat sedang disewa hari ini (on rent), alat ready di studio, antrean booking masuk, dan estimasi omzet sewa.
- **Manajemen Inventaris Alat (Gear CRUD):** Input nama alat, kategori, merk, nomor seri unit (SN), tarif 12 jam, tarif 24 jam, rincian kelengkapan bawaan, status unit (Ready / Sedang Disewa / Servis), dan upload foto.
- **Manajemen Paket Bundling:** Tambah dan edit paket hemat shooting.
- **Manajemen Kategori Alat & Merk:** Kelola kategori alat dan brand.
- **Manajemen Antrean Booking Sewa:** Tabel data penyewa masuk (nama, nomor WA, alat yang disewa, tanggal sewa, total biaya) dengan status verifikasi.
- **Manajemen Profil Studio & Syarat Sewa:** Edit teks hero, aturan jaminan sewa, jam operasional pick-up, dan nomor WA rental.
- **Pengaturan Brand & Tema Cinema:** Ganti nama brand studio, logo, dan pilihan warna aksen (Cinema Crimson `#E11D48`, Amber Gold `#F59E0B`, Cyber Teal `#0D9488`).

### D. Server-Side Export Excel (.xlsx)
- **Export Inventaris Alat:** Tombol download di `/admin/products` menghasilkan file `inventaris-alat-YYYY-MM-DD.xlsx`. Kolom: No, Nama Alat, Kategori, Brand, Nomor Seri, Kelengkapan Bawaan, Tarif 12 Jam, Tarif 24 Jam, Status Unit.
- **Export Rekap Booking Sewa:** Tombol download di `/admin/bookings` menghasilkan file `rekap-sewa-YYYY-MM-DD.xlsx`. Kolom: No, Tanggal Booking, Nama Penyewa, Nomor WA, Alat Disewa, Tanggal Ambil, Tanggal Kembali, Durasi, Total Biaya (Rp), Status.

---

## 4. Scope & Non-Scope

### In-Scope (Termasuk)
- E-katalog spesifik rental kamera dan multimedia gear.
- Tarif sewa ganda (12 Jam vs 24 Jam) dan kalkulator durasi sewa harian.
- Manajemen nomor seri unit (SN) dan status ketersediaan (Ready / Disewa / Servis).
- Modal Quick View dengan checklist isi tas sewa.
- Halaman paket bundling shooting hemat.
- Template booking WhatsApp otomatis memuat jadwal sewa dan prompt syarat KTP.
- Section syarat jaminan sewa dan peta lokasi studio pick-up.
- Dashboard admin lengkap dengan Supabase Auth & Storage.
- Server-side generator berkas Microsoft Excel (.xlsx) dengan `exceljs`.

### Out-of-Scope (Tidak Termasuk)
- Payment gateway online otomatis (pembayaran uang sewa dan deposit jaminan diselesaikan langsung saat serah terima alat atau transfer invoice via WhatsApp).
- GPS tracker hardware live tracking realtime di dalam aplikasi web.
- Tanda tangan digital bermaterai elektronik (cukup tanda terima fisik saat ambil alat di studio).

# 07-DESIGN-SYSTEM (V4 - CAMERA RENTAL EDITION)

Dokumen ini mendefinisikan sistem desain visual, palet warna bertema Cinema Dark dan studio shooting modern, tipografi tajam, kartu alat dengan status ketersediaan realtime, dan kalkulator durasi sewa.

---

## 1. Konsep Visual & Karakter (Aesthetic Direction)

- **Karakter:** Sinematik (*cinematic*), presisi optik (*technical & sharp*), modern (*dark studio aesthetic*), dan terpercaya (*dependable*).
- **Nuansa Utama:** Suasana studio kamera profesional dengan latar belakang gelap pekat (`#0B0F17` / `#0F172A`) dipadukan dengan aksen neon sinematik (*Cinema Crimson* atau *Amber Gold*), menonjolkan keindahan perangkat kamera, lensa, dan lighting.

---

## 2. Palet Warna (Color Palette)

### A. Palet Aksen Sinematik (Dynamic Cinema Accents)
Warna aksen utama dikelola via CSS Variable `--color-cinema-primary` di tag `<html>`:

| Token CSS Variable | Nilai Default | Penjelasan |
|---|---|---|
| `--color-cinema-primary` | `#E11D48` (Cinema Crimson / Tally Light Red) | Tombol utama, border fokus, aksen record dot, highlight tarif |
| `--color-cinema-hover` | `#BE123C` (Deep Crimson) | State hover tombol |
| `--color-cinema-light` | `#FFF1F2` (Soft Crimson Tint) | Background badge, highlight khusus |
| `--color-cinema-foreground`| `#FFFFFF` | Warna teks di atas tombol aksen |

### B. Preset Pilihan Tema Visual Studio
Admin dapat memilih 4 preset tema:
1. **Cinema Crimson (Default):** `#E11D48` (Merah rekaman kamera profesional)
2. **Amber Tungsten:** `#F59E0B` (Kuning keemasan lampu studio tungsten)
3. **Cyber Teal:** `#0D9488` (Hijau-biru digital sci-fi)
4. **Neon Violet:** `#8B5CF6` (Ungu modern creative agency)

### C. Status Ketersediaan Unit (Realtime Availability)
- **Ready di Studio:** Background `#052E16` (Green-950), Teks `#4ADE80` (Green-400), Border `#166534` (Green-700) dengan dot hijau berkedip (*pulsing live dot*).
- **Sedang Disewa (On Rent):** Background `#450A0A` (Red-950), Teks `#F87171` (Red-400), Border `#991B1B` (Red-800) bertuliskan *"Sedang Disewa"*.
- **Perawatan / Servis:** Background `#451A03` (Amber-950), Teks `#FBBF24` (Amber-400), Border `#92400E` (Amber-800).

### D. Permukaan & Latar Belakang (Dark Surfaces)
- **Background Utama:** `#0B0F17` (Deep Cinema Black)
- **Background Card & Container:** `#111827` (Gray-900 dengan subtle border `#1F2937`)
- **Teks Utama:** `#F9FAFB` (Gray-50 - kontras tinggi tajam)
- **Teks Sekunder:** `#9CA3AF` (Gray-400)

---

## 3. Tipografi (Typography)

- **Heading Display:** `Plus Jakarta Sans` atau `Inter` (Font sans-serif modern berbobot bold & tracking tight untuk kesan gear optik presisi).
- **Angka Tarif & Monospace:** `font-mono` atau `tabular-nums` untuk tampilan tarif 12 jam / 24 jam dan nomor seri unit.

---

## 4. Spesifikasi Komponen Khusus Rental Kamera

### A. Kartu Alat Rental (`RentalGearCard.tsx`)
- Rasio Foto: `aspect-[4/3]` dengan background gelap kontras tinggi.
- Badge Status di Pojok Kiri Atas: Live status (*Ready di Studio* vs *Sedang Disewa*).
- Pill Spesifikasi Teknis:
  - Sensor/Mount: Kotak pill gelap dengan ikon `Aperture` (misal: *Full Frame 4K 120fps*).
  - Kelengkapan: Kotak pill dengan ikon `CheckCircle2` (misal: *Inc. 2 Baterai + Tas*).
- Pilihan Tarif Ganda:
  - Menampilkan dua opsi harga berdampingan: **12 Jam** (Rp) dan **24 Jam** (Rp).
- Aksi Ganda (Dual Action):
  - Tombol 1: "Quick View" (Icon `Eye` / `Maximize2`, border abu-abu gelap).
  - Tombol 2: "Booking WA" (Tombol hijau WA, membuka chat dengan estimasi biaya dan durasi).

### B. Modal Quick View & Kalkulator Sewa (`GearQuickViewModal.tsx`)
- Tampilan 2 Kolom Lebar (`max-w-4xl`):
  - Kiri: Foto alat resolusi tinggi dan checklist isi tas sewa (baterai, charger, memory card, tas).
  - Kanan: Detail spesifikasi lengkap + **Kalkulator Durasi Sewa Interaktif**:
    - Input Tanggal & Jam Ambil (Pick-up).
    - Input Tanggal & Jam Kembali (Drop-off).
    - Pilihan Paket Durasi: 12 Jam atau 24 Jam.
    - Kalkulasi Realtime: Jumlah Hari x Tarif = Estimasi Total Sewa.
    - Tombol Booking via WhatsApp yang otomatis membawa angka estimasi tersebut.

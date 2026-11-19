# T005 - Seed Data Katalog Alat Lensa Nusantara Rental

**Depends on:** T004
**Estimasi:** kecil

## Tujuan
Menyediakan berkas seed data realistis (`supabase/seed.sql`) untuk rental kamera "Lensa Nusantara Rental & Studio" berisi bodi kamera Sony & Canon, lensa G-Master, lighting studio Godox, wireless audio Rode, stabilizer DJI Ronin, dan paket wedding video.

## Baca dulu
- AGENTS.md
- blueprint/02-PROJECT-BRIEF.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `supabase/seed.sql` : Skrip SQL populasi data rental kamera realistis

## Langkah
1. Buat berkas `supabase/seed.sql`.
2. Masukkan data konfigurasi `site_settings`:
   - Brand: "Lensa Nusantara Rental & Studio"
   - Tagline: "Pusat Rental Kamera, Lensa, Audio & Lighting Terlengkap"
   - Primary Color: `#E11D48` (Cinema Crimson)
   - Studio: "Jl. Kemang Raya No. 45, Bangka, Mampang Prapatan, Jakarta Selatan"
   - WhatsApp: "6281234567890"
   - Syarat sewa lengkap (minimal 2 identitas asli, foto saat ambil alat).
3. Masukkan 6 kategori alat pada `gear_categories`:
   - "Kamera Mirrorless & Cinema" (`kamera`, icon `Camera`, order 1)
   - "Lensa & Filter" (`lensa`, icon `Aperture`, order 2)
   - "Lighting & Studio Modifiers" (`lighting`, icon `SunMedium`, order 3)
   - "Audio & Wireless Mic" (`audio`, icon `Mic`, order 4)
   - "Gimbal & Stabilizer" (`stabilizer`, icon `Sliders`, order 5)
   - "Drone & Action Cam" (`drone`, icon `Film`, order 6)
4. Masukkan minimal 8 produk alat multimedia realistis:
   - "Sony Alpha 7 IV Body Only" (Full Frame 33MP 4K 60fps, SN: SN-SNY-A74-01, 12h: Rp 250.000, 24h: Rp 350.000, Inc. 2x Baterai FZ100, Dual Charger, SD 128GB V60, Tas).
   - "Canon EOS R6 Mark II Body" (Full Frame 24.2MP 4K 60fps, SN: SN-CAN-R62-01, 12h: Rp 275.000, 24h: Rp 375.000, Inc. 2x LP-E6NH, Charger, SD 128GB, Tas).
   - "Sony FE 24-70mm f/2.8 GM II" (Lensa Zoom Standard G-Master, SN: SN-LNS-2470-01, 12h: Rp 175.000, 24h: Rp 250.000, Inc. UV Filter, Lens Hood, Pouch).
   - "Sony FE 85mm f/1.4 GM" (Lensa Portrait Bokeh Tajam, SN: SN-LNS-8514-01, 12h: Rp 150.000, 24h: Rp 200.000, Inc. Hood, Pouch).
   - "Godox SL60W LED Continuous Light" (Bowens Mount Daylight 5600K, 12h: Rp 60.000, 24h: Rp 90.000, Inc. Stand Lampu, Softbox Octa 80cm, Kabel).
   - "Rode Wireless GO II Dual Channel" (Mic Wireless 2 Transmitter + 1 Receiver, 12h: Rp 100.000, 24h: Rp 140.000, Inc. 2x Lav Mic, Kabel Lightning/Type-C, Pouch).
   - "DJI RS 3 Pro Gimbal Stabilizer" (Beban Maksimal 4.5kg, 12h: Rp 150.000, 24h: Rp 220.000, Inc. Focus Motor, RavenEye Transmitter, Hardcase).
   - "DJI Mini 4 Pro Fly More Combo" (Drone 4K HDR Omni Sensing, 12h: Rp 250.000, 24h: Rp 350.000, Inc. 3x Baterai, Hub Charger, Remote RC2, Tas).
5. Masukkan 2 paket bundling pada `bundling_packages`:
   - "Paket Wedding Video Standard" (Sony A7 IV + Lensa 24-70mm GM II + Rode Wireless GO II + Gimbal RS3, 24h: Rp 850.000 - Hemat Rp 110.000).
   - "Paket YouTube Starter Creator" (Sony A7 IV + Mic Wireless + Godox SL60W, 24h: Rp 500.000 - Hemat Rp 80.000).
6. Masukkan 3 ulasan pada `testimonials` dari videografer profesional.

## Kriteria selesai
- [x] Berkas `supabase/seed.sql` tervalidasi tanpa error.
- [x] Seluruh alat memiliki tarif 12h & 24h serta rincian kelengkapan bawaan.

## Verifikasi
Pemeriksaan integritas sintaks PostgreSQL pada file `supabase/seed.sql`.

## Catatan / jebakan
- Gunakan subquery kategori `(SELECT id FROM public.gear_categories WHERE slug = 'kamera' LIMIT 1)`.

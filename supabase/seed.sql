-- ============================================================================
-- seed.sql
-- Data awal katalog Lensa Nusantara Rental & Studio
-- ============================================================================

-- Bersihkan data lama (idempotent re-seed)
truncate table public.rental_bookings restart identity cascade;
truncate table public.bundling_packages restart identity cascade;
truncate table public.rental_gears restart identity cascade;
truncate table public.testimonials restart identity cascade;
truncate table public.gear_categories restart identity cascade;
truncate table public.site_settings restart identity cascade;

-- ----------------------------------------------------------------------------
-- site_settings
-- ----------------------------------------------------------------------------
insert into public.site_settings (
    brand_name, tagline, primary_color,
    hero_title, hero_subtitle, hero_image_url,
    studio_title, studio_description, studio_image_url,
    whatsapp_number, studio_address, google_maps_embed_url,
    visiting_hours, rental_terms,
    instagram_url, tiktok_url, facebook_url
) values (
    'Lensa Nusantara Rental & Studio',
    'Pusat Rental Kamera, Lensa, Audio & Lighting Terlengkap',
    '#E11D48',
    'Wujudkan Visual Sinematik Tanpa Beban Investasi Alat Mahal',
    'Sedia kamera mirrorless, cinema lens, wireless audio, dan lighting studio terkalibrasi. Kondisi prima, sensor bersih, dan baterai selalu full siap shooting.',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop',
    'Standar Perawatan & Kalibrasi Alat Tanpa Kompromi',
    'Setiap unit kamera dan lensa melalui proses pembersihan sensor, pengecekan fungsi tombol, dan uji coba bersama saat serah terima untuk memastikan kelancaran produksi Anda.',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600&auto=format&fit=crop',
    '6281234567890',
    'Jl. Kemang Raya No. 45, Bangka, Mampang Prapatan, Jakarta Selatan',
    'https://www.google.com/maps?q=Kemang+Raya+Jakarta+Selatan&output=embed',
    '[
        {"day": "Senin - Sabtu", "time": "08:00 - 21:00 WIB"},
        {"day": "Minggu / Libur", "time": "09:00 - 18:00 WIB"}
    ]'::jsonb,
    '1. Menyerahkan 2 kartu identitas asli (KTP + SIM/Paspor/Kartu Mahasiswa/NPWP).
2. Memiliki akun media sosial aktif (Instagram/LinkedIn) yang terverifikasi.
3. Bersedia difoto bersama identitas saat serah terima unit di studio.
4. Untuk penyewa luar domisili, wajib menyertakan jaminan deposit atau rekomendasi instansi.',
    'https://instagram.com/lensanusantara',
    'https://tiktok.com/@lensanusantara',
    'https://facebook.com/lensanusantara'
);

-- ----------------------------------------------------------------------------
-- gear_categories
-- ----------------------------------------------------------------------------
insert into public.gear_categories (name, slug, description, icon_name, sort_order) values
    ('Kamera Mirrorless & Cinema', 'kamera', 'Bodi kamera mirrorless full frame & cinema camera profesional.', 'Camera', 1),
    ('Lensa & Filter', 'lensa', 'Lensa prime, zoom, dan cine lens dengan optik tajam.', 'Aperture', 2),
    ('Lighting & Studio Modifiers', 'lighting', 'Continuous LED, softbox, dan modifiers studio.', 'SunMedium', 3),
    ('Audio & Wireless Mic', 'audio', 'Wireless clip-on, shotgun mic, dan recorder.', 'Mic', 4),
    ('Gimbal & Stabilizer', 'stabilizer', 'Gimbal, tripod fluid head, dan stabilizer video.', 'Sliders', 5),
    ('Drone & Action Cam', 'drone', 'Drone aerial 4K HDR dan action camera.', 'Film', 6);

-- ----------------------------------------------------------------------------
-- rental_gears
-- ----------------------------------------------------------------------------
insert into public.rental_gears (
    category_id, name, slug, brand, serial_number, description,
    rate_12h, rate_24h, mount_type, sensor_spec, accessories_included,
    gear_status, is_featured, sort_order, primary_image_url
) values
    ((select id from public.gear_categories where slug = 'kamera' limit 1),
     'Sony Alpha 7 IV Body Only', 'sony-alpha-7-iv', 'Sony', 'SN-SNY-A74-01',
     'Kamera mirrorless full frame serba bisa untuk foto dan video hybrid.',
     250000, 350000, 'Sony E-Mount', 'Full Frame 33MP 4K 60fps',
     '2x Baterai FZ100, 1x Dual Charger, 1x SD Card 128GB V60, 1x Tas Kamera',
     'ready', true, 1,
     'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=1200&auto=format&fit=crop'),

    ((select id from public.gear_categories where slug = 'kamera' limit 1),
     'Canon EOS R6 Mark II Body', 'canon-eos-r6-mark-ii', 'Canon', 'SN-CAN-R62-01',
     'Mirrorless full frame dengan autofokus canggih dan video 4K 60fps.',
     275000, 375000, 'Canon RF', 'Full Frame 24.2MP 4K 60fps',
     '2x LP-E6NH, 1x Charger, 1x SD Card 128GB, 1x Tas Kamera',
     'ready', true, 2,
     'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?q=80&w=1200&auto=format&fit=crop'),

    ((select id from public.gear_categories where slug = 'lensa' limit 1),
     'Sony FE 24-70mm f/2.8 GM II', 'sony-fe-24-70mm-gm-ii', 'Sony', 'SN-LNS-2470-01',
     'Lensa zoom standard G-Master II dengan ketajaman optik luar biasa.',
     175000, 250000, 'Sony E-Mount', 'Full Frame Zoom 24-70mm f/2.8',
     '1x UV Filter, 1x Lens Hood, 1x Lens Pouch',
     'ready', true, 3,
     'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=1200&auto=format&fit=crop'),

    ((select id from public.gear_categories where slug = 'lensa' limit 1),
     'Sony FE 85mm f/1.4 GM', 'sony-fe-85mm-f14-gm', 'Sony', 'SN-LNS-8514-01',
     'Lensa portrait dengan bokeh tajam dan creamy, ideal untuk wedding.',
     150000, 200000, 'Sony E-Mount', 'Full Frame Prime 85mm f/1.4',
     '1x Lens Hood, 1x Lens Pouch',
     'ready', false, 4,
     'https://images.unsplash.com/photo-1606986628253-896a3e5e3e45?q=80&w=1200&auto=format&fit=crop'),

    ((select id from public.gear_categories where slug = 'lighting' limit 1),
     'Godox SL60W LED Continuous Light', 'godox-sl60w', 'Godox', 'SN-LGT-SL60-01',
     'Lampu LED continuous daylight 5600K untuk video dan studio.',
     60000, 90000, 'Bowens Mount', '60W Daylight 5600K CRI 95+',
     '1x Stand Lampu, 1x Softbox Octa 80cm, 1x Kabel Power',
     'ready', false, 5,
     'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop'),

    ((select id from public.gear_categories where slug = 'audio' limit 1),
     'Rode Wireless GO II Dual Channel', 'rode-wireless-go-ii', 'Rode', 'SN-AUD-WGO2-01',
     'Sistem mic wireless dual channel ringkas untuk interview dan vlog.',
     100000, 140000, 'Wireless 2.4GHz', 'Dual Channel 2 Transmitter + 1 Receiver',
     '2x Lav Mic, 1x Kabel Lightning, 1x Kabel Type-C, 1x Pouch',
     'ready', true, 6,
     'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop'),

    ((select id from public.gear_categories where slug = 'stabilizer' limit 1),
     'DJI RS 3 Pro Gimbal Stabilizer', 'dji-rs-3-pro', 'DJI', 'SN-STB-RS3P-01',
     'Gimbal stabilizer profesional dengan beban maksimal 4.5kg.',
     150000, 220000, '3-Axis Gimbal', 'Payload 4.5kg, LiDAR Focus Ready',
     '1x Focus Motor, 1x RavenEye Transmitter, 1x Hardcase',
     'rented', true, 7,
     'https://images.unsplash.com/photo-1542567455-cd733f23fbb1?q=80&w=1200&auto=format&fit=crop'),

    ((select id from public.gear_categories where slug = 'drone' limit 1),
     'DJI Mini 4 Pro Fly More Combo', 'dji-mini-4-pro-fly-more', 'DJI', 'SN-DRN-M4P-01',
     'Drone ringan 4K HDR dengan omni directional sensing.',
     250000, 350000, 'DJI O4', '4K HDR 60fps, Omni Sensing',
     '3x Baterai, 1x Hub Charger, 1x Remote RC2, 1x Tas Drone',
     'ready', true, 8,
     'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop');

-- ----------------------------------------------------------------------------
-- bundling_packages
-- ----------------------------------------------------------------------------
insert into public.bundling_packages (
    name, slug, description, items_included,
    rate_12h, rate_24h, discount_note, image_url, sort_order
) values
    ('Paket Wedding Video Standard', 'paket-wedding-video-standard',
     'Kombinasi lengkap untuk dokumentasi wedding: kamera hybrid, lensa serba bisa, audio wireless, dan gimbal.',
     array['Sony A7 IV', 'Lensa 24-70mm GM II', 'Rode Wireless GO II', 'Gimbal RS 3 Pro'],
     650000, 850000, 'Hemat Rp 110.000 dibanding sewa satuan', 
     'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop', 1),

    ('Paket YouTube Starter Creator', 'paket-youtube-starter',
     'Paket hemat untuk kreator konten pemula: kamera, mic wireless, dan lighting studio.',
     array['Sony A7 IV', 'Rode Wireless GO II', 'Godox SL60W'],
     380000, 500000, 'Hemat Rp 80.000 dibanding sewa satuan',
     'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop', 2);

-- ----------------------------------------------------------------------------
-- testimonials
-- ----------------------------------------------------------------------------
insert into public.testimonials (customer_name, customer_role, review_text, rating, avatar_url, is_active, sort_order) values
    ('Rangga Pratama', 'Wedding Videographer',
     'Alat selalu dalam kondisi prima dan sensor bersih. Baterai full saat diambil, sangat membantu produksi wedding yang padat.',
     5, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', true, 1),
    ('Sinta Maharani', 'Content Creator',
     'Proses booking cepat via WhatsApp dan kru studio ramah. Lensa 24-70 GM II tajam banget hasilnya.',
     5, 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', true, 2),
    ('Bayu Aditya', 'Production House Owner',
     'Paket wedding video sangat hemat dan lengkap. Uji fungsi bersama sebelum serah terima bikin tenang.',
     5, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', true, 3);

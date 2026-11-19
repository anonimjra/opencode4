-- ============================================================================
-- 001_rental_schema.sql
-- Skema Database Lensa Nusantara Rental & Studio
-- E-Catalog & CMS Rental Kamera & Multimedia Gear
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- A. Tabel site_settings
-- ----------------------------------------------------------------------------
create table if not exists public.site_settings (
    id uuid primary key default gen_random_uuid(),
    brand_name varchar(100) not null default 'Lensa Nusantara Rental & Studio',
    tagline varchar(255) default 'Pusat Rental Kamera, Lensa, Audio & Lighting Terlengkap',
    logo_url text,
    primary_color varchar(10) not null default '#E11D48',
    hero_title varchar(200) not null default 'Wujudkan Visual Sinematik Tanpa Beban Investasi Alat Mahal',
    hero_subtitle text default 'Sedia kamera mirrorless, cinema lens, wireless audio, dan lighting studio terkalibrasi. Kondisi prima, sensor bersih, dan baterai selalu full siap shooting.',
    hero_image_url text,
    studio_title varchar(200) not null default 'Standar Perawatan & Kalibrasi Alat Tanpa Kompromi',
    studio_description text default 'Setiap unit kamera dan lensa melalui proses pembersihan sensor, pengecekan fungsi tombol, dan uji coba bersama saat serah terima untuk memastikan kelancaran produksi Anda.',
    studio_image_url text,
    whatsapp_number varchar(30) not null default '6281234567890',
    studio_address text default 'Jl. Kemang Raya No. 45, Bangka, Mampang Prapatan, Jakarta Selatan',
    google_maps_embed_url text,
    visiting_hours jsonb not null default '[
        {"day": "Senin - Sabtu", "time": "08:00 - 21:00 WIB"},
        {"day": "Minggu / Libur", "time": "09:00 - 18:00 WIB"}
    ]'::jsonb,
    rental_terms text default '1. Menyerahkan 2 kartu identitas asli (KTP + SIM/Paspor/Kartu Mahasiswa/NPWP).
2. Memiliki akun media sosial aktif (Instagram/LinkedIn) yang terverifikasi.
3. Bersedia difoto bersama identitas saat serah terima unit di studio.
4. Untuk penyewa luar domisili, wajib menyertakan jaminan deposit atau rekomendasi instansi.',
    instagram_url varchar(255) default 'https://instagram.com',
    tiktok_url varchar(255) default 'https://tiktok.com',
    facebook_url varchar(255) default 'https://facebook.com',
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- B. Tabel gear_categories
-- ----------------------------------------------------------------------------
create table if not exists public.gear_categories (
    id uuid primary key default gen_random_uuid(),
    name varchar(100) not null,
    slug varchar(120) not null unique,
    description text,
    icon_name varchar(50) default 'Camera',
    sort_order int not null default 0,
    created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_gear_categories_sort on public.gear_categories (sort_order asc);

-- ----------------------------------------------------------------------------
-- C. Tabel rental_gears
-- ----------------------------------------------------------------------------
create table if not exists public.rental_gears (
    id uuid primary key default gen_random_uuid(),
    category_id uuid references public.gear_categories(id) on delete set null,
    name varchar(180) not null,
    slug varchar(200) not null unique,
    brand varchar(100) not null default 'Sony',
    serial_number varchar(100),
    description text,
    rate_12h numeric(12, 0) not null default 0,
    rate_24h numeric(12, 0) not null default 0,
    mount_type varchar(100),
    sensor_spec varchar(100),
    accessories_included text not null default '2x Baterai, 1x Dual Charger, 1x SD Card 128GB, 1x Tas Kamera',
    gear_status varchar(20) not null default 'ready'
        check (gear_status in ('ready', 'rented', 'maintenance')),
    is_featured boolean not null default false,
    sort_order int not null default 0,
    primary_image_url text not null,
    created_at timestamptz not null default timezone('utc'::text, now()),
    updated_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_rental_gears_category on public.rental_gears (category_id);
create index if not exists idx_rental_gears_status on public.rental_gears (gear_status);
create index if not exists idx_rental_gears_sort on public.rental_gears (sort_order asc, created_at desc);

-- ----------------------------------------------------------------------------
-- D. Tabel bundling_packages
-- ----------------------------------------------------------------------------
create table if not exists public.bundling_packages (
    id uuid primary key default gen_random_uuid(),
    name varchar(180) not null,
    slug varchar(200) not null unique,
    description text,
    items_included text[] not null default '{}',
    rate_12h numeric(12, 0) not null default 0,
    rate_24h numeric(12, 0) not null default 0,
    discount_note varchar(150) default 'Hemat Rp 150.000 dibanding sewa satuan',
    image_url text not null,
    sort_order int not null default 0,
    created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_bundling_packages_sort on public.bundling_packages (sort_order asc);

-- ----------------------------------------------------------------------------
-- E. Tabel rental_bookings
-- ----------------------------------------------------------------------------
create table if not exists public.rental_bookings (
    id uuid primary key default gen_random_uuid(),
    customer_name varchar(120) not null,
    customer_whatsapp varchar(30) not null,
    gear_name varchar(180) not null,
    rental_duration_type varchar(20) not null default '24h'
        check (rental_duration_type in ('12h', '24h')),
    pickup_date timestamptz not null,
    return_date timestamptz not null,
    total_days int not null default 1,
    estimated_total numeric(12, 0) not null default 0,
    notes text,
    status varchar(30) not null default 'pending'
        check (status in ('pending', 'verified', 'active', 'completed', 'cancelled')),
    created_at timestamptz not null default timezone('utc'::text, now())
);

create index if not exists idx_rental_bookings_status on public.rental_bookings (status, created_at desc);

-- ----------------------------------------------------------------------------
-- F. Tabel testimonials
-- ----------------------------------------------------------------------------
create table if not exists public.testimonials (
    id uuid primary key default gen_random_uuid(),
    customer_name varchar(120) not null,
    customer_role varchar(120) default 'Wedding Videographer',
    review_text text not null,
    rating int not null default 5 check (rating >= 1 and rating <= 5),
    avatar_url text,
    is_active boolean not null default true,
    sort_order int not null default 0,
    created_at timestamptz not null default timezone('utc'::text, now())
);

-- ----------------------------------------------------------------------------
-- Trigger updated_at otomatis
-- ----------------------------------------------------------------------------
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
    before update on public.site_settings
    for each row execute function public.handle_updated_at();

drop trigger if exists trg_rental_gears_updated_at on public.rental_gears;
create trigger trg_rental_gears_updated_at
    before update on public.rental_gears
    for each row execute function public.handle_updated_at();

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================
alter table public.site_settings enable row level security;
alter table public.gear_categories enable row level security;
alter table public.rental_gears enable row level security;
alter table public.bundling_packages enable row level security;
alter table public.rental_bookings enable row level security;
alter table public.testimonials enable row level security;

-- --- site_settings ---
drop policy if exists "site_settings_public_read" on public.site_settings;
create policy "site_settings_public_read" on public.site_settings
    for select using (true);

drop policy if exists "site_settings_admin_all" on public.site_settings;
create policy "site_settings_admin_all" on public.site_settings
    for all to authenticated using (true) with check (true);

-- --- gear_categories ---
drop policy if exists "gear_categories_public_read" on public.gear_categories;
create policy "gear_categories_public_read" on public.gear_categories
    for select using (true);

drop policy if exists "gear_categories_admin_all" on public.gear_categories;
create policy "gear_categories_admin_all" on public.gear_categories
    for all to authenticated using (true) with check (true);

-- --- rental_gears ---
drop policy if exists "rental_gears_public_read" on public.rental_gears;
create policy "rental_gears_public_read" on public.rental_gears
    for select using (true);

drop policy if exists "rental_gears_admin_all" on public.rental_gears;
create policy "rental_gears_admin_all" on public.rental_gears
    for all to authenticated using (true) with check (true);

-- --- bundling_packages ---
drop policy if exists "bundling_packages_public_read" on public.bundling_packages;
create policy "bundling_packages_public_read" on public.bundling_packages
    for select using (true);

drop policy if exists "bundling_packages_admin_all" on public.bundling_packages;
create policy "bundling_packages_admin_all" on public.bundling_packages
    for all to authenticated using (true) with check (true);

-- --- testimonials ---
drop policy if exists "testimonials_public_read" on public.testimonials;
create policy "testimonials_public_read" on public.testimonials
    for select using (is_active = true);

drop policy if exists "testimonials_admin_all" on public.testimonials;
create policy "testimonials_admin_all" on public.testimonials
    for all to authenticated using (true) with check (true);

-- --- rental_bookings ---
drop policy if exists "rental_bookings_public_insert" on public.rental_bookings;
create policy "rental_bookings_public_insert" on public.rental_bookings
    for insert with check (true);

drop policy if exists "rental_bookings_admin_all" on public.rental_bookings;
create policy "rental_bookings_admin_all" on public.rental_bookings
    for all to authenticated using (true) with check (true);

-- ============================================================================
-- Storage Bucket: rental-media
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('rental-media', 'rental-media', true)
on conflict (id) do nothing;

-- Read terbuka untuk publik
drop policy if exists "rental_media_public_read" on storage.objects;
create policy "rental_media_public_read" on storage.objects
    for select using (bucket_id = 'rental-media');

-- Write/Delete hanya untuk authenticated
drop policy if exists "rental_media_auth_write" on storage.objects;
create policy "rental_media_auth_write" on storage.objects
    for insert to authenticated with check (bucket_id = 'rental-media');

drop policy if exists "rental_media_auth_update" on storage.objects;
create policy "rental_media_auth_update" on storage.objects
    for update to authenticated using (bucket_id = 'rental-media') with check (bucket_id = 'rental-media');

drop policy if exists "rental_media_auth_delete" on storage.objects;
create policy "rental_media_auth_delete" on storage.objects
    for delete to authenticated using (bucket_id = 'rental-media');

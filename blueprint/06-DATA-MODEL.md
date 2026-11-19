# 06-DATA-MODEL (V4 - CAMERA RENTAL EDITION)

Dokumen ini mendefinisikan skema tabel PostgreSQL di Supabase, relasi entitas, aturan Row Level Security (RLS), konfigurasi storage bucket, dan tipe data TypeScript khusus industri rental kamera & multimedia.

---

## 1. Skema Entitas Database (PostgreSQL DDL)

### A. Tabel `site_settings`
Menyimpan profil studio rental, alamat fisik pengambilan alat, jam buka pick-up, dan aturan syarat jaminan sewa.

```sql
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_name VARCHAR(100) NOT NULL DEFAULT 'Lensa Nusantara Rental & Studio',
    tagline VARCHAR(255) DEFAULT 'Pusat Rental Kamera, Lensa, Audio & Lighting Terlengkap',
    logo_url TEXT,
    primary_color VARCHAR(10) NOT NULL DEFAULT '#E11D48', -- Cinema Crimson
    hero_title VARCHAR(200) NOT NULL DEFAULT 'Wujudkan Visual Sinematik Tanpa Beban Investasi Alat Mahal',
    hero_subtitle TEXT DEFAULT 'Sedia kamera mirrorless, cinema lens, wireless audio, dan lighting studio terkalibrasi. Kondisi prima, sensor bersih, dan baterai selalu full siap shooting.',
    hero_image_url TEXT,
    studio_title VARCHAR(200) NOT NULL DEFAULT 'Standar Perawatan & Kalibrasi Alat Tanpa Kompromi',
    studio_description TEXT DEFAULT 'Setiap unit kamera dan lensa melalui proses pembersihan sensor, pengecekan fungsi tombol, dan uji coba bersama saat serah terima untuk memastikan kelancaran produksi Anda.',
    studio_image_url TEXT,
    whatsapp_number VARCHAR(30) NOT NULL DEFAULT '6281234567890',
    studio_address TEXT DEFAULT 'Jl. Kemang Raya No. 45, Bangka, Mampang Prapatan, Jakarta Selatan',
    google_maps_embed_url TEXT,
    visiting_hours JSONB NOT NULL DEFAULT '[
        {"day": "Senin - Sabtu", "time": "08:00 - 21:00 WIB"},
        {"day": "Minggu / Libur", "time": "09:00 - 18:00 WIB"}
    ]'::jsonb,
    rental_terms TEXT DEFAULT '1. Menyerahkan 2 kartu identitas asli (KTP + SIM/Paspor/Kartu Mahasiswa/NPWP).
2. Memiliki akun media sosial aktif (Instagram/LinkedIn) yang terverifikasi.
3. Bersedia difoto bersama identitas saat serah terima unit di studio.
4. Untuk penyewa luar domisili, wajib menyertakan jaminan deposit atau rekomendasi instansi.',
    instagram_url VARCHAR(255) DEFAULT 'https://instagram.com',
    tiktok_url VARCHAR(255) DEFAULT 'https://tiktok.com',
    facebook_url VARCHAR(255) DEFAULT 'https://facebook.com',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

### B. Tabel `gear_categories`
Kategori alat (Kamera, Lensa, Lighting, Audio, Stabilizer, Drone, Aksesori).

```sql
CREATE TABLE public.gear_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    icon_name VARCHAR(50) DEFAULT 'Camera',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_gear_categories_sort ON public.gear_categories (sort_order ASC);
```

### C. Tabel `rental_gears`
Menyimpan katalog alat rental dengan nomor seri (SN), tarif ganda 12 jam vs 24 jam, kelengkapan bawaan, dan status unit.

```sql
CREATE TABLE public.rental_gears (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.gear_categories(id) ON DELETE SET NULL,
    name VARCHAR(180) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    brand VARCHAR(100) NOT NULL DEFAULT 'Sony',
    serial_number VARCHAR(100), -- Nomor Seri Unit untuk kontrol inventaris
    description TEXT,
    rate_12h NUMERIC(12, 0) NOT NULL DEFAULT 0, -- Tarif 12 Jam (Rp)
    rate_24h NUMERIC(12, 0) NOT NULL DEFAULT 0, -- Tarif 24 Jam (Rp)
    -- Spesifikasi Teknis & Kelengkapan
    mount_type VARCHAR(100), -- Cth: Sony E-Mount, Canon RF, L-Mount
    sensor_spec VARCHAR(100), -- Cth: Full Frame 33MP, Super 35
    accessories_included TEXT NOT NULL DEFAULT '2x Baterai, 1x Dual Charger, 1x SD Card 128GB, 1x Tas Kamera',
    gear_status VARCHAR(20) NOT NULL DEFAULT 'ready', -- 'ready' | 'rented' | 'maintenance'
    is_featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    -- Media Gambar
    primary_image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_rental_gears_category ON public.rental_gears (category_id);
CREATE INDEX idx_rental_gears_status ON public.rental_gears (gear_status);
CREATE INDEX idx_rental_gears_sort ON public.rental_gears (sort_order ASC, created_at DESC);
```

### D. Tabel `bundling_packages`
Menyimpan paket shooting hemat (kombinasi kamera + lensa + mic + stabilizer).

```sql
CREATE TABLE public.bundling_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(180) NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    items_included TEXT[] NOT NULL DEFAULT '{}', -- Daftar nama alat dalam paket
    rate_12h NUMERIC(12, 0) NOT NULL DEFAULT 0,
    rate_24h NUMERIC(12, 0) NOT NULL DEFAULT 0,
    discount_note VARCHAR(150) DEFAULT 'Hemat Rp 150.000 dibanding sewa satuan',
    image_url TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_bundling_packages_sort ON public.bundling_packages (sort_order ASC);
```

### E. Tabel `rental_bookings`
Menyimpan antrean permohonan sewa alat dari penyewa.

```sql
CREATE TABLE public.rental_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(120) NOT NULL,
    customer_whatsapp VARCHAR(30) NOT NULL,
    gear_name VARCHAR(180) NOT NULL,
    rental_duration_type VARCHAR(20) NOT NULL DEFAULT '24h', -- '12h' | '24h'
    pickup_date TIMESTAMPTZ NOT NULL,
    return_date TIMESTAMPTZ NOT NULL,
    total_days INT NOT NULL DEFAULT 1,
    estimated_total NUMERIC(12, 0) NOT NULL DEFAULT 0,
    notes TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending' | 'verified' | 'active' | 'completed' | 'cancelled'
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_rental_bookings_status ON public.rental_bookings (status, created_at DESC);
```

### F. Tabel `testimonials`
Ulasan dari videografer, fotografer, dan production house.

```sql
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(120) NOT NULL,
    customer_role VARCHAR(120) DEFAULT 'Wedding Videographer',
    review_text TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

---

## 2. Row Level Security (RLS) Policies

Semua tabel wajib mengaktifkan RLS (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).

| Tabel | Akses Publik (Anon) | Akses Admin (Authenticated) |
|---|---|---|
| `site_settings` | **SELECT** | **SELECT, INSERT, UPDATE** |
| `gear_categories` | **SELECT** | **SELECT, INSERT, UPDATE, DELETE** |
| `rental_gears` | **SELECT** | **SELECT, INSERT, UPDATE, DELETE** |
| `bundling_packages`| **SELECT** | **SELECT, INSERT, UPDATE, DELETE** |
| `testimonials` | **SELECT** (`is_active = true`) | **SELECT, INSERT, UPDATE, DELETE** |
| `rental_bookings` | **INSERT** | **SELECT, UPDATE, DELETE** |

---

## 3. Storage Bucket: `rental-media`

- **Bucket Name:** `rental-media`
- **Public:** `true`
- **Akses Read:** Terbuka publik (`anon` dan `authenticated`).
- **Akses Write/Delete:** Hanya role `authenticated`.

---

## 4. Tipe TypeScript (`types/database.ts`)

```typescript
export type GearStatus = 'ready' | 'rented' | 'maintenance';
export type BookingStatus = 'pending' | 'verified' | 'active' | 'completed' | 'cancelled';

export type RentalGear = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  brand: string;
  serial_number: string | null;
  description: string | null;
  rate_12h: number;
  rate_24h: number;
  mount_type: string | null;
  sensor_spec: string | null;
  accessories_included: string;
  gear_status: GearStatus;
  is_featured: boolean;
  sort_order: number;
  primary_image_url: string;
  created_at: string;
  updated_at: string;
  category?: GearCategory | null;
};

export type GearCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon_name: string;
  sort_order: number;
  created_at: string;
};

export type BundlingPackage = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  items_included: string[];
  rate_12h: number;
  rate_24h: number;
  discount_note: string | null;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type RentalBooking = {
  id: string;
  customer_name: string;
  customer_whatsapp: string;
  gear_name: string;
  rental_duration_type: '12h' | '24h';
  pickup_date: string;
  return_date: string;
  total_days: number;
  estimated_total: number;
  notes: string | null;
  status: BookingStatus;
  created_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  customer_role: string | null;
  review_text: string;
  rating: number;
  avatar_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type SiteSettings = {
  id: string;
  brand_name: string;
  tagline: string;
  logo_url: string | null;
  primary_color: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string | null;
  studio_title: string;
  studio_description: string;
  studio_image_url: string | null;
  whatsapp_number: string;
  studio_address: string;
  google_maps_embed_url: string | null;
  visiting_hours: Array<{ day: string; time: string }>;
  rental_terms: string;
  instagram_url: string | null;
  tiktok_url: string | null;
  facebook_url: string | null;
  created_at: string;
  updated_at: string;
};
```

import { createClient } from "@/lib/supabase/server";
import type {
  BundlingPackage,
  GearCategory,
  RentalGear,
  SiteSettings,
  Testimonial,
} from "@/types/database";

export type RentalCatalogData = {
  settings: SiteSettings;
  categories: GearCategory[];
  gears: RentalGear[];
  packages: BundlingPackage[];
  testimonials: Testimonial[];
};

export const FALLBACK_SETTINGS: SiteSettings = {
  id: "fallback",
  brand_name: "Lensa Nusantara Rental & Studio",
  tagline: "Pusat Rental Kamera, Lensa, Audio & Lighting Terlengkap",
  logo_url: null,
  primary_color: "#E11D48",
  hero_title:
    "Wujudkan Visual Sinematik Tanpa Beban Investasi Alat Mahal",
  hero_subtitle:
    "Sedia kamera mirrorless, cinema lens, wireless audio, dan lighting studio terkalibrasi. Kondisi prima, sensor bersih, dan baterai selalu full siap shooting.",
  hero_image_url:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop",
  studio_title: "Standar Perawatan & Kalibrasi Alat Tanpa Kompromi",
  studio_description:
    "Setiap unit kamera dan lensa melalui proses pembersihan sensor, pengecekan fungsi tombol, dan uji coba bersama saat serah terima untuk memastikan kelancaran produksi Anda.",
  studio_image_url:
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600&auto=format&fit=crop",
  whatsapp_number: "6281234567890",
  studio_address:
    "Jl. Kemang Raya No. 45, Bangka, Mampang Prapatan, Jakarta Selatan",
  google_maps_embed_url:
    "https://www.google.com/maps?q=Kemang+Raya+Jakarta+Selatan&output=embed",
  visiting_hours: [
    { day: "Senin - Sabtu", time: "08:00 - 21:00 WIB" },
    { day: "Minggu / Libur", time: "09:00 - 18:00 WIB" },
  ],
  rental_terms:
    "1. Menyerahkan 2 kartu identitas asli (KTP + SIM/Paspor/Kartu Mahasiswa/NPWP).\n2. Memiliki akun media sosial aktif (Instagram/LinkedIn) yang terverifikasi.\n3. Bersedia difoto bersama identitas saat serah terima unit di studio.\n4. Untuk penyewa luar domisili, wajib menyertakan jaminan deposit atau rekomendasi instansi.",
  instagram_url: "https://instagram.com",
  tiktok_url: "https://tiktok.com",
  facebook_url: "https://facebook.com",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export async function getRentalCatalogData(): Promise<RentalCatalogData> {
  try {
    const supabase = await createClient();

    const [
      settingsRes,
      categoriesRes,
      gearsRes,
      packagesRes,
      testimonialsRes,
    ] = await Promise.all([
      supabase.from("site_settings").select("*").limit(1).maybeSingle(),
      supabase
        .from("gear_categories")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("rental_gears")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false }),
      supabase
        .from("bundling_packages")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
    ]);

    const settings =
      (settingsRes.data as SiteSettings | null) ?? FALLBACK_SETTINGS;

    return {
      settings,
      categories: (categoriesRes.data as GearCategory[] | null) ?? [],
      gears: (gearsRes.data as RentalGear[] | null) ?? [],
      packages: (packagesRes.data as BundlingPackage[] | null) ?? [],
      testimonials: (testimonialsRes.data as Testimonial[] | null) ?? [],
    };
  } catch {
    return {
      settings: FALLBACK_SETTINGS,
      categories: [],
      gears: [],
      packages: [],
      testimonials: [],
    };
  }
}

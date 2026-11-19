export type GearStatus = "ready" | "rented" | "maintenance";
export type BookingStatus =
  | "pending"
  | "verified"
  | "active"
  | "completed"
  | "cancelled";
export type RentalDurationType = "12h" | "24h";

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
  rental_duration_type: RentalDurationType;
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

export type VisitingHour = { day: string; time: string };

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
  visiting_hours: VisitingHour[];
  rental_terms: string;
  instagram_url: string | null;
  tiktok_url: string | null;
  facebook_url: string | null;
  created_at: string;
  updated_at: string;
};

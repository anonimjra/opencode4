import type {
  BookingStatus,
  GearStatus,
  RentalDurationType,
} from "./database";

export type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type GearFormInput = {
  category_id: string | null;
  name: string;
  brand: string;
  serial_number: string;
  description: string;
  rate_12h: number;
  rate_24h: number;
  mount_type: string;
  sensor_spec: string;
  accessories_included: string;
  gear_status: GearStatus;
  is_featured: boolean;
  sort_order: number;
  primary_image_url: string;
};

export type BundlingPackageInput = {
  name: string;
  description: string;
  items_included: string[];
  rate_12h: number;
  rate_24h: number;
  discount_note: string;
  image_url: string;
  sort_order: number;
};

export type BookingFormInput = {
  customer_name: string;
  customer_whatsapp: string;
  gear_name: string;
  rental_duration_type: RentalDurationType;
  pickup_date: string;
  return_date: string;
  total_days: number;
  estimated_total: number;
  notes: string;
};

export type BookingStatusUpdate = {
  id: string;
  status: BookingStatus;
};

export type SiteSettingsInput = {
  brand_name: string;
  tagline: string;
  primary_color: string;
  hero_title: string;
  hero_subtitle: string;
  studio_title: string;
  studio_description: string;
  whatsapp_number: string;
  studio_address: string;
  google_maps_embed_url: string;
  rental_terms: string;
  instagram_url: string;
  tiktok_url: string;
  facebook_url: string;
};

export * from "./database";

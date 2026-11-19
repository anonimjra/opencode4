export type CinemaThemePreset = {
  id: string;
  label: string;
  primary: string;
  hover: string;
  light: string;
  foreground: string;
};

export const CINEMA_THEME_PRESETS: CinemaThemePreset[] = [
  {
    id: "crimson",
    label: "Cinema Crimson",
    primary: "#E11D48",
    hover: "#BE123C",
    light: "#FFF1F2",
    foreground: "#FFFFFF",
  },
  {
    id: "amber",
    label: "Amber Tungsten",
    primary: "#F59E0B",
    hover: "#D97706",
    light: "#FFFBEB",
    foreground: "#1F2937",
  },
  {
    id: "teal",
    label: "Cyber Teal",
    primary: "#0D9488",
    hover: "#0F766E",
    light: "#F0FDFA",
    foreground: "#FFFFFF",
  },
  {
    id: "violet",
    label: "Neon Violet",
    primary: "#8B5CF6",
    hover: "#7C3AED",
    light: "#F5F3FF",
    foreground: "#FFFFFF",
  },
];

export const DEFAULT_GEAR_CATEGORIES = [
  { name: "Kamera Mirrorless & Cinema", slug: "kamera", icon_name: "Camera", sort_order: 1 },
  { name: "Lensa & Filter", slug: "lensa", icon_name: "Aperture", sort_order: 2 },
  { name: "Lighting & Studio Modifiers", slug: "lighting", icon_name: "SunMedium", sort_order: 3 },
  { name: "Audio & Wireless Mic", slug: "audio", icon_name: "Mic", sort_order: 4 },
  { name: "Gimbal & Stabilizer", slug: "stabilizer", icon_name: "Sliders", sort_order: 5 },
  { name: "Drone & Action Cam", slug: "drone", icon_name: "Film", sort_order: 6 },
] as const;

export const GEAR_STATUS_LABELS: Record<string, string> = {
  ready: "Ready di Studio",
  rented: "Sedang Disewa",
  maintenance: "Perawatan / Servis",
};

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  verified: "Terverifikasi",
  active: "Aktif Disewa",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import ThemeProvider from "@/components/shared/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lensa Nusantara - Rental Kamera, Lensa, Audio & Lighting Studio",
    template: "%s | Lensa Nusantara",
  },
  description:
    "Sewa kamera mirrorless Sony, Canon, lensa G-Master, mic wireless Rode, lighting studio Godox, gimbal Ronin. Siap pakai, baterai full, sensor bersih.",
  keywords: [
    "rental kamera",
    "sewa lensa",
    "rental lighting studio",
    "sewa gimbal",
    "rental mic wireless",
    "sewa drone",
    "Lensa Nusantara",
  ],
  openGraph: {
    title: "Lensa Nusantara - Rental Kamera & Multimedia Gear",
    description:
      "Pusat rental kamera, lensa, audio & lighting terkalibrasi untuk produksi sinematik Anda.",
    type: "website",
    locale: "id_ID",
    siteName: "Lensa Nusantara Rental & Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lensa Nusantara - Rental Kamera & Multimedia Gear",
    description:
      "Sewa gear kamera profesional, baterai full, sensor bersih, siap shooting.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F17",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="bg-[#0B0F17] text-[#F9FAFB] antialiased selection:bg-rose-500 selection:text-white font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

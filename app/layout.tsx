import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lensa Nusantara Rental & Studio",
  description:
    "Pusat rental kamera, lensa, audio & lighting terkalibrasi untuk produksi sinematik Anda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

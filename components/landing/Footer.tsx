import Link from "next/link";
import { Camera, Instagram, Facebook, Music2, MapPin, Phone } from "lucide-react";
import { cleanPhoneNumber } from "@/lib/whatsapp";

type FooterProps = {
  brandName: string;
  tagline: string;
  studioAddress: string;
  whatsappNumber: string;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  facebookUrl?: string | null;
};

const CATEGORY_LINKS = [
  { label: "Kamera", href: "#catalog" },
  { label: "Lensa", href: "#catalog" },
  { label: "Lighting", href: "#catalog" },
  { label: "Audio", href: "#catalog" },
  { label: "Stabilizer", href: "#catalog" },
  { label: "Drone", href: "#catalog" },
];

const INFO_LINKS = [
  { label: "Paket Bundling", href: "#packages" },
  { label: "Syarat Sewa", href: "#terms" },
  { label: "Alur Sewa", href: "#workflow" },
  { label: "Lokasi Studio", href: "#location" },
];

export default function Footer({
  brandName,
  tagline,
  studioAddress,
  whatsappNumber,
  instagramUrl,
  tiktokUrl,
  facebookUrl,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-stone-400 pt-16 pb-12 border-t border-stone-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                <Camera className="h-5 w-5" />
              </span>
              <span className="font-display text-base font-bold text-white">
                {brandName}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">{tagline}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Kategori Alat</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {CATEGORY_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Informasi</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {INFO_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Kontak Studio</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-none text-primary" />
                <span>{studioAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-none text-primary" />
                <a
                  href={`https://wa.me/${cleanPhoneNumber(whatsappNumber)}`}
                  className="hover:text-white transition-colors"
                >
                  +{cleanPhoneNumber(whatsappNumber)}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex items-center gap-3">
              {instagramUrl ? (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="rounded-lg bg-stone-900 p-2 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              ) : null}
              {tiktokUrl ? (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="rounded-lg bg-stone-900 p-2 hover:text-white transition-colors"
                >
                  <Music2 className="h-4 w-4" />
                </a>
              ) : null}
              {facebookUrl ? (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="rounded-lg bg-stone-900 p-2 hover:text-white transition-colors"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-stone-800 pt-6 text-xs sm:flex-row">
          <p>
            © {year} {brandName}. Seluruh hak cipta dilindungi.
          </p>
          <Link href="/admin/login" className="hover:text-white transition-colors">
            Login Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

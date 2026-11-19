"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, Camera, MessageCircle } from "lucide-react";
import MobileDrawer, { type NavLink } from "./MobileDrawer";
import { cleanPhoneNumber } from "@/lib/whatsapp";

const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "#hero" },
  { label: "Profil Studio", href: "#about" },
  { label: "Katalog Gear", href: "#catalog" },
  { label: "Paket Bundling", href: "#packages" },
  { label: "Syarat Sewa", href: "#terms" },
  { label: "Alur Sewa", href: "#workflow" },
  { label: "Lokasi Studio", href: "#location" },
];

type NavbarProps = {
  brandName: string;
  logoUrl?: string | null;
  whatsappNumber: string;
};

export default function Navbar({
  brandName,
  logoUrl,
  whatsappNumber,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const waLink = `https://wa.me/${cleanPhoneNumber(
    whatsappNumber,
  )}?text=${encodeURIComponent(
    `Halo ${brandName}, saya ingin booking alat rental.`,
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-[#1F2937] transition-all">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-2.5">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={brandName}
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <Camera className="h-5 w-5" />
            </span>
          )}
          <span className="font-display text-sm font-bold text-white sm:text-base max-w-[140px] sm:max-w-none truncate">
            {brandName}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1EBE5A] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Booking Alat
          </a>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Buka menu"
            className="rounded-lg p-2 text-gray-300 hover:bg-white/5 hover:text-white md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        links={NAV_LINKS}
        brandName={brandName}
        whatsappNumber={whatsappNumber}
      />
    </header>
  );
}

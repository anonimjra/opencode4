"use client";

import { useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { cleanPhoneNumber } from "@/lib/whatsapp";

export type NavLink = { label: string; href: string };

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  brandName: string;
  whatsappNumber: string;
};

export default function MobileDrawer({
  isOpen,
  onClose,
  links,
  brandName,
  whatsappNumber,
}: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const waLink = `https://wa.me/${cleanPhoneNumber(
    whatsappNumber,
  )}?text=${encodeURIComponent(
    `Halo ${brandName}, saya ingin booking alat rental.`,
  )}`;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 md:hidden",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-72 max-w-[85%] bg-[#0B0F17] border-l border-[#1F2937] shadow-2xl transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1F2937]">
          <span className="font-display font-bold text-white">{brandName}</span>
          <button
            onClick={onClose}
            aria-label="Tutup menu"
            className="rounded-lg p-2 text-gray-300 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-3 py-3 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-[#1F2937]">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1EBE5A] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Booking Alat
          </a>
        </div>
      </div>
    </div>
  );
}

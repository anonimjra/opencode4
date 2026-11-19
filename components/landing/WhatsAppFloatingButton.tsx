"use client";

import { MessageCircle } from "lucide-react";
import { cleanPhoneNumber } from "@/lib/whatsapp";

type WhatsAppFloatingButtonProps = {
  brandName: string;
  whatsappNumber: string;
};

export default function WhatsAppFloatingButton({
  brandName,
  whatsappNumber,
}: WhatsAppFloatingButtonProps) {
  const waLink = `https://wa.me/${cleanPhoneNumber(
    whatsappNumber,
  )}?text=${encodeURIComponent(
    `Halo ${brandName}, saya ingin cek ketersediaan alat hari ini.`,
  )}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cek Ketersediaan Alat Hari Ini via WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3"
    >
      <span className="hidden rounded-xl bg-[#111827] px-3 py-2 text-xs font-semibold text-white shadow-lg border border-[#1F2937] sm:block">
        Cek Ketersediaan Alat Hari Ini
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform group-hover:scale-105">
        <MessageCircle className="h-7 w-7" />
      </span>
    </a>
  );
}

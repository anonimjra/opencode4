"use client";

import Image from "next/image";
import { Aperture, CheckCircle2, Maximize2, MessageCircle } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { generateRentalWhatsAppLink } from "@/lib/whatsapp";
import type { RentalGear } from "@/types/database";

type RentalGearCardProps = {
  gear: RentalGear;
  brandName: string;
  whatsappNumber: string;
  onQuickView: (gear: RentalGear) => void;
};

function StatusBadge({ status }: { status: RentalGear["gear_status"] }) {
  if (status === "ready") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#052E16] border border-[#166534] px-2.5 py-1 text-xs font-semibold text-[#4ADE80]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ADE80] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4ADE80]" />
        </span>
        Ready di Studio
      </span>
    );
  }
  if (status === "rented") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#450A0A] border border-[#991B1B] px-2.5 py-1 text-xs font-semibold text-[#F87171]">
        <span className="h-2 w-2 rounded-full bg-[#F87171]" />
        Sedang Disewa
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#451A03] border border-[#92400E] px-2.5 py-1 text-xs font-semibold text-[#FBBF24]">
      <span className="h-2 w-2 rounded-full bg-[#FBBF24]" />
      Perawatan / Servis
    </span>
  );
}

export default function RentalGearCard({
  gear,
  brandName,
  whatsappNumber,
  onQuickView,
}: RentalGearCardProps) {
  const waLink = generateRentalWhatsAppLink({
    phone: whatsappNumber,
    brandName,
    gearName: gear.name,
    durationType: "24h",
    pickupDate: new Date().toLocaleDateString("id-ID"),
    returnDate: new Date(Date.now() + 86400000).toLocaleDateString("id-ID"),
    totalDays: 1,
    estimatedPrice: gear.rate_24h,
  });

  return (
    <div className="bg-[#111827] rounded-2xl border border-[#1F2937] overflow-hidden shadow-lg hover:border-gray-600 transition-all duration-300 flex flex-col group">
      <div className="aspect-[4/3] relative overflow-hidden bg-black/40">
        <Image
          src={gear.primary_image_url}
          alt={gear.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={gear.gear_status} />
        </div>
        <div className="absolute right-3 top-3">
          <span className="rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-gray-200 backdrop-blur">
            {gear.brand}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
          {gear.name}
        </h3>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Aperture className="h-3.5 w-3.5 flex-none text-primary" />
            <span className="truncate">
              {gear.sensor_spec || gear.mount_type || "Spesifikasi standar"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <CheckCircle2 className="h-3.5 w-3.5 flex-none text-[#4ADE80]" />
            <span className="line-clamp-1">{gear.accessories_included}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 p-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-gray-500">
              12 Jam
            </p>
            <p className="font-mono text-sm font-bold text-white">
              {formatRupiah(gear.rate_12h)}
            </p>
          </div>
          <div className="border-l border-[#1F2937] pl-3">
            <p className="text-[11px] uppercase tracking-wide text-gray-500">
              24 Jam
            </p>
            <p className="font-mono text-sm font-bold text-primary">
              {formatRupiah(gear.rate_24h)}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => onQuickView(gear)}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-700 px-3 py-2.5 text-sm font-semibold text-gray-200 hover:bg-white/5 transition-colors"
          >
            <Maximize2 className="h-4 w-4" />
            Quick View
          </button>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#1EBE5A] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Booking WA
          </a>
        </div>
      </div>
    </div>
  );
}

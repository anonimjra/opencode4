"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CheckCircle2, MessageCircle, Aperture, Calendar } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { formatRupiah, calculateRentalDuration } from "@/lib/utils";
import { generateRentalWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import type { RentalGear } from "@/types/database";

type GearQuickViewModalProps = {
  gear: RentalGear | null;
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
  whatsappNumber: string;
};

function toDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatDateDisplay(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function GearQuickViewModal({
  gear,
  isOpen,
  onClose,
  brandName,
  whatsappNumber,
}: GearQuickViewModalProps) {
  const today = useMemo(() => toDateInput(new Date()), []);
  const tomorrow = useMemo(
    () => toDateInput(new Date(Date.now() + 86400000)),
    [],
  );

  const [durationType, setDurationType] = useState<"12h" | "24h">("24h");
  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(tomorrow);

  if (!gear) return null;

  const days = calculateRentalDuration(pickupDate, returnDate);
  const rate = durationType === "12h" ? gear.rate_12h : gear.rate_24h;
  const estimatedTotal = days * rate;

  const accessories = gear.accessories_included
    .split(/,(?![^()]*\))/)
    .map((item) => item.trim())
    .filter(Boolean);

  const invalidRange = new Date(returnDate) < new Date(pickupDate);

  const waLink = generateRentalWhatsAppLink({
    phone: whatsappNumber,
    brandName,
    gearName: gear.name,
    durationType,
    pickupDate: formatDateDisplay(pickupDate),
    returnDate: formatDateDisplay(returnDate),
    totalDays: days,
    estimatedPrice: estimatedTotal,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={`Detail ${gear.name}`}
      className="max-w-4xl w-full p-6 sm:p-8 border border-[#1F2937]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-black/50">
            <Image
              src={gear.primary_image_url}
              alt={gear.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="mt-5">
            <h4 className="text-sm font-semibold text-white">
              Checklist Isi Tas Sewa
            </h4>
            <ul className="mt-2 space-y-1.5">
              {accessories.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-300"
                >
                  <CheckCircle2 className="h-4 w-4 flex-none text-[#4ADE80]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {gear.description ? (
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              {gear.description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            {gear.brand}
          </span>
          <h3 className="mt-1 text-2xl font-bold text-white">{gear.name}</h3>

          <div className="mt-3 flex flex-wrap gap-2">
            {gear.sensor_spec ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B0F17] border border-[#1F2937] px-3 py-1 text-xs text-gray-300">
                <Aperture className="h-3.5 w-3.5 text-primary" />
                {gear.sensor_spec}
              </span>
            ) : null}
            {gear.mount_type ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B0F17] border border-[#1F2937] px-3 py-1 text-xs text-gray-300">
                {gear.mount_type}
              </span>
            ) : null}
            {gear.serial_number ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0B0F17] border border-[#1F2937] px-3 py-1 font-mono text-xs text-gray-400">
                SN: {gear.serial_number}
              </span>
            ) : null}
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-white">Pilih Durasi Sewa</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["12h", "24h"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setDurationType(type)}
                  className={cn(
                    "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
                    durationType === type
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-gray-700 bg-[#0B0F17] text-gray-300 hover:border-gray-500",
                  )}
                >
                  Tarif {type === "12h" ? "12 Jam" : "24 Jam"}
                  <span className="ml-1 font-mono text-xs">
                    {formatRupiah(type === "12h" ? gear.rate_12h : gear.rate_24h)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                Tanggal Ambil
              </span>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                Tanggal Kembali
              </span>
              <input
                type="date"
                value={returnDate}
                min={pickupDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
              />
            </label>
          </div>

          {invalidRange ? (
            <p className="mt-2 text-xs text-[#F87171]">
              Tanggal kembali tidak boleh lebih awal dari tanggal ambil.
            </p>
          ) : null}

          <div className="mt-4 rounded-xl border border-[#1F2937] bg-[#0B0F17] p-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Durasi Sewa</span>
              <span className="font-semibold text-white">{days} Hari</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm text-gray-400">
              <span>Tarif per Hari</span>
              <span className="font-mono text-white">{formatRupiah(rate)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-[#1F2937] pt-3">
              <span className="text-sm font-semibold text-gray-300">
                Estimasi Total
              </span>
              <span className="font-mono text-lg font-bold text-primary">
                {formatRupiah(estimatedTotal)}
              </span>
            </div>
          </div>

          <a
            href={invalidRange ? undefined : waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={invalidRange}
            className={cn(
              "mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1EBE5A]",
              invalidRange && "pointer-events-none opacity-50",
            )}
          >
            <MessageCircle className="h-5 w-5" />
            Booking via WhatsApp Sekarang
          </a>
        </div>
      </div>
    </Modal>
  );
}

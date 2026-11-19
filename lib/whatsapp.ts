import { formatRupiah } from "./utils";

export function cleanPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }
  if (digits.startsWith("62")) {
    return digits;
  }
  return `62${digits}`;
}

export type RentalWhatsAppOptions = {
  phone: string;
  brandName: string;
  gearName: string;
  durationType: "12h" | "24h";
  pickupDate: string;
  returnDate: string;
  totalDays: number;
  estimatedPrice: number;
};

export function generateRentalWhatsAppLink(
  options: RentalWhatsAppOptions,
): string {
  const {
    phone,
    brandName,
    gearName,
    durationType,
    pickupDate,
    returnDate,
    totalDays,
    estimatedPrice,
  } = options;

  const message = [
    `Halo ${brandName}, saya ingin booking sewa alat berikut:`,
    `- Alat: ${gearName}`,
    `- Paket: Tarif ${durationType} (${totalDays} Hari)`,
    `- Jadwal Ambil: ${pickupDate}`,
    `- Jadwal Kembali: ${returnDate}`,
    `- Estimasi Total: ${formatRupiah(estimatedPrice)}`,
    `Saya bersedia melampirkan foto 2 identitas asli (KTP + SIM/Paspor) untuk verifikasi syarat sewa. Apakah unit masih ready pada tanggal tersebut?`,
  ].join("\n");

  return `https://wa.me/${cleanPhoneNumber(phone)}?text=${encodeURIComponent(
    message,
  )}`;
}

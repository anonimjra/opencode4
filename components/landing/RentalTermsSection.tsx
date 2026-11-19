import { CreditCard, Share2, Camera, ShieldAlert, MessageCircle } from "lucide-react";
import { cleanPhoneNumber } from "@/lib/whatsapp";

type RentalTermsSectionProps = {
  rentalTerms: string;
  whatsappNumber: string;
};

const PILLARS = [
  {
    icon: CreditCard,
    title: "Wajib 2 Kartu Identitas Asli",
    text: "KTP wajib, ditambah 1 identitas pendukung (SIM A/C, Paspor, NPWP, atau Kartu Tanda Mahasiswa aktif). Identitas disimpan selama masa sewa.",
  },
  {
    icon: Share2,
    title: "Verifikasi Akun Media Sosial",
    text: "Memiliki akun media sosial aktif (Instagram, TikTok, atau LinkedIn) yang dapat diverifikasi oleh admin.",
  },
  {
    icon: Camera,
    title: "Foto Bersama Unit Saat Pick-up",
    text: "Dokumentasi foto serah terima unit di studio sebagai bukti kelengkapan fisik alat.",
  },
];

export default function RentalTermsSection({
  rentalTerms,
  whatsappNumber,
}: RentalTermsSectionProps) {
  const waLink = `https://wa.me/${cleanPhoneNumber(
    whatsappNumber,
  )}?text=${encodeURIComponent(
    "Halo, saya ingin menanyakan syarat khusus jaminan sewa alat.",
  )}`;

  return (
    <section
      id="terms"
      className="py-20 lg:py-28 bg-[#111827] text-white border-y border-[#1F2937]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary border border-primary/40">
            <ShieldAlert className="h-3.5 w-3.5" />
            Transparansi & Keamanan
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Syarat & Ketentuan Jaminan Sewa
          </h2>
          <p className="mt-3 text-gray-400">
            Proses verifikasi cepat dan aman demi kenyamanan dan perlindungan
            bersama.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-2xl border border-[#1F2937] bg-[#0B0F17]/60 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-[#1F2937] bg-[#0B0F17]/60 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-white">
            Ketentuan Tambahan & Deposit
          </h3>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed whitespace-pre-line">
            {rentalTerms}
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1EBE5A] transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            Tanya Syarat Khusus via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

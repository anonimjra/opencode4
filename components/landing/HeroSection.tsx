import Image from "next/image";
import { CheckCircle2, ArrowRight, MessageCircle } from "lucide-react";
import { cleanPhoneNumber } from "@/lib/whatsapp";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  imageUrl?: string | null;
  brandName: string;
  whatsappNumber: string;
};

const FALLBACK_HERO =
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop";

export default function HeroSection({
  title,
  subtitle,
  imageUrl,
  brandName,
  whatsappNumber,
}: HeroSectionProps) {
  const waLink = `https://wa.me/${cleanPhoneNumber(
    whatsappNumber,
  )}?text=${encodeURIComponent(
    `Halo ${brandName}, saya ingin konsultasi kebutuhan shooting dan sewa alat.`,
  )}`;

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
    >
      <Image
        src={imageUrl || FALLBACK_HERO}
        alt="Studio rental kamera dan lensa profesional"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[#0B0F17]/75 backdrop-blur-[2px]" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white sm:text-sm">
          <CheckCircle2 className="h-4 w-4 text-[#4ADE80]" />
          Alat Bersih & Terkalibrasi • Baterai Full • Ready Siap Pakai
        </span>
        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight text-balance">
          {title}
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-stone-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#catalog"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-primary-hover"
          >
            Cek Katalog Alat
            <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-500 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle className="h-5 w-5" />
            Konsultasi Kebutuhan Shooting
          </a>
        </div>
      </div>
    </section>
  );
}

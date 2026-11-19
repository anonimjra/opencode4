import Image from "next/image";
import { Sparkles, BatteryCharging, Wrench, ShieldCheck } from "lucide-react";

type AboutStudioSectionProps = {
  title: string;
  description: string;
  imageUrl?: string | null;
  brandName: string;
};

const FALLBACK_STUDIO =
  "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1600&auto=format&fit=crop";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Sensor Bebas Debu & Jamur",
    text: "Pembersihan sensor rutin menggunakan wet swab profesional.",
  },
  {
    icon: BatteryCharging,
    title: "Baterai Selalu Full + Ekstra",
    text: "Disertakan minimal 2 baterai original dan dual charger cepat.",
  },
  {
    icon: Wrench,
    title: "Uji Fungsi Bersama",
    text: "Pengecekan tombol, port HDMI/audio, dan fokus lensa saat serah terima.",
  },
];

export default function AboutStudioSection({
  title,
  description,
  imageUrl,
  brandName,
}: AboutStudioSectionProps) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#111827] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#1F2937]">
            <Image
              src={imageUrl || FALLBACK_STUDIO}
              alt={`Perawatan dan kalibrasi alat di ${brandName}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-[#4ADE80] backdrop-blur">
              <ShieldCheck className="h-4 w-4" />
              Sensor Clean & Checked
            </span>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary border border-primary/40">
              Standar Kelayakan Alat
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
              {title}
            </h2>
            <p className="mt-4 text-gray-400 leading-relaxed whitespace-pre-line">
              {description}
            </p>

            <div className="mt-8 space-y-4">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 rounded-2xl border border-[#1F2937] bg-[#0B0F17]/60 p-4"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-400 mt-0.5">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

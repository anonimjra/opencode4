import { MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import { cleanPhoneNumber } from "@/lib/whatsapp";

type VisitingHour = { day: string; time: string };

type StudioLocationSectionProps = {
  studioAddress: string;
  visitingHours: VisitingHour[];
  googleMapsEmbedUrl?: string | null;
  whatsappNumber: string;
};

const FALLBACK_MAP =
  "https://www.google.com/maps?q=Kemang+Raya+Jakarta+Selatan&output=embed";

export default function StudioLocationSection({
  studioAddress,
  visitingHours,
  googleMapsEmbedUrl,
  whatsappNumber,
}: StudioLocationSectionProps) {
  const waLink = `https://wa.me/${cleanPhoneNumber(
    whatsappNumber,
  )}?text=${encodeURIComponent(
    "Halo, saya ingin bertanya seputar lokasi studio dan jam pengambilan alat.",
  )}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    studioAddress,
  )}`;

  return (
    <section id="location" className="py-20 lg:py-28 bg-[#111827] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="bg-[#1F2937] p-8 rounded-3xl border border-gray-700 flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Studio Pick-up & Drop-off
                  </h3>
                  <p className="mt-1 text-sm text-gray-300 leading-relaxed">
                    {studioAddress}
                  </p>
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    <Navigation className="h-4 w-4" />
                    Petunjuk Arah
                  </a>
                </div>
              </div>

              <div className="mt-8 flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">
                    Jam Operasional Ambil & Kembali
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {visitingHours.map((hour) => (
                      <li
                        key={hour.day}
                        className="flex items-center justify-between text-sm text-gray-300"
                      >
                        <span>{hour.day}</span>
                        <span className="font-mono text-white">{hour.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1EBE5A] transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              Hubungi Petugas Studio via WhatsApp
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 lg:h-full min-h-[380px] rounded-3xl overflow-hidden border border-gray-700 relative bg-black">
            <iframe
              src={googleMapsEmbedUrl || FALLBACK_MAP}
              title="Lokasi Studio Lensa Nusantara"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

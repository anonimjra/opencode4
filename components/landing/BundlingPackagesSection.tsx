import Image from "next/image";
import { Check, MessageCircle, Sparkles, Package } from "lucide-react";
import { formatRupiah } from "@/lib/utils";
import { cleanPhoneNumber } from "@/lib/whatsapp";
import type { BundlingPackage } from "@/types/database";

type BundlingPackagesSectionProps = {
  packages: BundlingPackage[];
  brandName: string;
  whatsappNumber: string;
};

export default function BundlingPackagesSection({
  packages,
  brandName,
  whatsappNumber,
}: BundlingPackagesSectionProps) {
  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <section id="packages" className="py-20 lg:py-28 bg-[#0B0F17] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary border border-primary/40">
            <Sparkles className="h-3.5 w-3.5" />
            Solusi Produksi Hemat
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Paket Bundling Shooting Siap Pakai
          </h2>
          <p className="mt-3 text-gray-400">
            Sewa paket lengkap kamera, audio, dan stabilizer dengan harga lebih
            hemat dibanding sewa satuan.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => {
            const waLink = `https://wa.me/${cleanPhoneNumber(
              whatsappNumber,
            )}?text=${encodeURIComponent(
              `Halo ${brandName}, saya ingin booking ${pkg.name} (24 Jam). Mohon info ketersediaan dan syarat sewa.`,
            )}`;

            return (
              <div
                key={pkg.id}
                className="bg-[#111827] border border-[#1F2937] rounded-3xl overflow-hidden flex flex-col hover:border-rose-500/50 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={pkg.image_url}
                    alt={pkg.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  {pkg.discount_note ? (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1 text-xs font-semibold text-white">
                      <Package className="h-3.5 w-3.5" />
                      {pkg.discount_note}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                  {pkg.description ? (
                    <p className="mt-1.5 text-sm text-gray-400">
                      {pkg.description}
                    </p>
                  ) : null}

                  <ul className="mt-4 space-y-1.5 flex-1">
                    {pkg.items_included.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-gray-300"
                      >
                        <Check className="h-4 w-4 flex-none text-[#4ADE80]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 p-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-gray-500">
                        12 Jam
                      </p>
                      <p className="font-mono text-sm font-bold text-white">
                        {formatRupiah(pkg.rate_12h)}
                      </p>
                    </div>
                    <div className="border-l border-[#1F2937] pl-3">
                      <p className="text-[11px] uppercase tracking-wide text-gray-500">
                        24 Jam
                      </p>
                      <p className="font-mono text-sm font-bold text-primary">
                        {formatRupiah(pkg.rate_24h)}
                      </p>
                    </div>
                  </div>

                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1EBE5A] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Booking Paket Ini
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

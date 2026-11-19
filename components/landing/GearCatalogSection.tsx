"use client";

import { useMemo, useState } from "react";
import { PackageSearch } from "lucide-react";
import GearCategoryFilter from "./GearCategoryFilter";
import RentalGearCard from "./RentalGearCard";
import GearQuickViewModal from "./GearQuickViewModal";
import type { GearCategory, RentalGear } from "@/types/database";

type GearCatalogSectionProps = {
  categories: GearCategory[];
  gears: RentalGear[];
  brandName: string;
  whatsappNumber: string;
};

export default function GearCatalogSection({
  categories,
  gears,
  brandName,
  whatsappNumber,
}: GearCatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [quickViewGear, setQuickViewGear] = useState<RentalGear | null>(null);

  const filteredGears = useMemo(() => {
    if (selectedCategory === "all") return gears;
    return gears.filter((gear) => gear.category_id === selectedCategory);
  }, [gears, selectedCategory]);

  return (
    <section id="catalog" className="py-20 lg:py-28 bg-[#0B0F17] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary border border-primary/40">
            Katalog Gear Rental
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Pilih Alat Sesuai Kebutuhan Produksi Anda
          </h2>
          <p className="mt-3 text-gray-400">
            Semua gear dicek sensor & fungsinya, baterai full, dan siap pakai.
            Klik Quick View untuk spesifikasi lengkap dan kalkulator sewa.
          </p>
        </div>

        <div className="mt-8">
          <GearCategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {filteredGears.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGears.map((gear) => (
              <RentalGearCard
                key={gear.id}
                gear={gear}
                brandName={brandName}
                whatsappNumber={whatsappNumber}
                onQuickView={setQuickViewGear}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1F2937] py-16 text-center">
            <PackageSearch className="h-10 w-10 text-gray-600" />
            <p className="mt-3 text-sm text-gray-400">
              Belum ada alat pada kategori ini saat ini.
            </p>
          </div>
        )}
      </div>

      <GearQuickViewModal
        gear={quickViewGear}
        isOpen={quickViewGear !== null}
        onClose={() => setQuickViewGear(null)}
        brandName={brandName}
        whatsappNumber={whatsappNumber}
      />
    </section>
  );
}

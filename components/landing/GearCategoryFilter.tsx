"use client";

import {
  Film,
  Camera,
  Aperture,
  SunMedium,
  Mic,
  Sliders,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { GearCategory } from "@/types/database";

const ICON_MAP: Record<string, LucideIcon> = {
  Camera,
  Aperture,
  SunMedium,
  Mic,
  Sliders,
  Film,
  Sparkles,
};

type GearCategoryFilterProps = {
  categories: GearCategory[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
};

export default function GearCategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: GearCategoryFilterProps) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none">
      <button
        onClick={() => onSelectCategory("all")}
        className={cn(
          "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all",
          selectedCategoryId === "all"
            ? "bg-primary text-white shadow-lg shadow-rose-950"
            : "bg-[#1F2937] text-gray-300 hover:bg-[#374151] border border-gray-700",
        )}
      >
        <Film className="h-4 w-4" />
        Semua Gear
      </button>
      {categories.map((category) => {
        const Icon = ICON_MAP[category.icon_name] ?? Sparkles;
        const isActive = selectedCategoryId === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all",
              isActive
                ? "bg-primary text-white shadow-lg shadow-rose-950"
                : "bg-[#1F2937] text-gray-300 hover:bg-[#374151] border border-gray-700",
            )}
          >
            <Icon className="h-4 w-4" />
            {category.name}
          </button>
        );
      })}
    </div>
  );
}

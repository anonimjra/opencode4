import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type RentalMetricCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  badgeText?: string;
  accent?: "default" | "ready" | "rented" | "warning";
};

const accentClasses: Record<string, string> = {
  default: "bg-primary/15 text-primary",
  ready: "bg-[#052E16] text-[#4ADE80]",
  rented: "bg-[#450A0A] text-[#F87171]",
  warning: "bg-[#451A03] text-[#FBBF24]",
};

export default function RentalMetricCard({
  title,
  value,
  icon: Icon,
  description,
  badgeText,
  accent = "default",
}: RentalMetricCardProps) {
  return (
    <div className="bg-[#111827] p-6 rounded-2xl border border-[#1F2937] shadow-lg flex items-start justify-between text-white">
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="mt-2 text-3xl font-bold font-mono">{value}</p>
        {description ? (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        ) : null}
        {badgeText ? (
          <span className="mt-3 inline-flex items-center rounded-full bg-[#451A03] border border-[#92400E] px-2.5 py-1 text-xs font-semibold text-[#FBBF24]">
            {badgeText}
          </span>
        ) : null}
      </div>
      <span
        className={cn(
          "flex h-11 w-11 flex-none items-center justify-center rounded-xl",
          accentClasses[accent] ?? accentClasses.default,
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
    </div>
  );
}

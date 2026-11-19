import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "ready" | "rented" | "maintenance" | "primary" | "muted";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-white border border-white/20",
  ready: "bg-[#052E16] text-[#4ADE80] border border-[#166534]",
  rented: "bg-[#450A0A] text-[#F87171] border border-[#991B1B]",
  maintenance: "bg-[#451A03] text-[#FBBF24] border border-[#92400E]",
  primary: "bg-primary/15 text-primary border border-primary/40",
  muted: "bg-[#1F2937] text-gray-300 border border-gray-700",
};

type BadgeProps = {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
};

export default function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

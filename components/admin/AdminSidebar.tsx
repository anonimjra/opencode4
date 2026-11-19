"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Camera,
  Layers,
  Sparkles,
  Calendar,
  MessageSquareQuote,
  MapPin,
  Settings,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Ringkasan / Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Inventaris Alat", href: "/admin/products", icon: Camera },
  { label: "Kategori & Brand", href: "/admin/categories", icon: Layers },
  { label: "Paket Bundling", href: "/admin/packages", icon: Sparkles },
  { label: "Antrean Booking Sewa", href: "/admin/bookings", icon: Calendar },
  { label: "Testimoni Klien", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Profil Studio & Syarat", href: "/admin/content", icon: MapPin },
  { label: "Pengaturan & Brand", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-[#1F2937] bg-[#111827]">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#1F2937]">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
          <Camera className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-bold text-white leading-tight">
            Lensa Nusantara
          </p>
          <p className="text-[11px] text-gray-500">Rental Admin Panel</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-rose-950/40 text-rose-400 font-semibold border-r-4 border-rose-500"
                  : "text-gray-400 hover:bg-white/5 hover:text-white border-r-4 border-transparent",
              )}
            >
              <Icon className="h-4 w-4 flex-none" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#1F2937] p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Buka Website Publik
        </Link>
      </div>
    </aside>
  );
}

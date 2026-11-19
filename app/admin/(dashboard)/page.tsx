import Link from "next/link";
import {
  Camera,
  CheckCircle2,
  Clapperboard,
  CalendarClock,
  Plus,
  FileSpreadsheet,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import RentalMetricCard from "@/components/admin/RentalMetricCard";

const QUICK_ACTIONS = [
  { label: "Tambah Alat Baru", href: "/admin/products/new", icon: Plus },
  { label: "Cek Antrean Booking", href: "/admin/bookings", icon: CalendarClock },
  { label: "Buat Paket Bundling", href: "/admin/packages", icon: Sparkles },
  {
    label: "Export Excel Inventaris",
    href: "/api/admin/export/inventory",
    icon: FileSpreadsheet,
  },
];

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    totalGears,
    readyGears,
    rentedGears,
    categoriesCount,
    pendingBookings,
    packagesCount,
    revenueRes,
  ] = await Promise.all([
    supabase.from("rental_gears").select("*", { count: "exact", head: true }),
    supabase
      .from("rental_gears")
      .select("*", { count: "exact", head: true })
      .eq("gear_status", "ready"),
    supabase
      .from("rental_gears")
      .select("*", { count: "exact", head: true })
      .eq("gear_status", "rented"),
    supabase.from("gear_categories").select("*", { count: "exact", head: true }),
    supabase
      .from("rental_bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("bundling_packages").select("*", { count: "exact", head: true }),
    supabase
      .from("rental_bookings")
      .select("estimated_total")
      .in("status", ["verified", "active", "completed"]),
  ]);

  const revenue = (revenueRes.data ?? []).reduce(
    (sum, row) => sum + Number((row as { estimated_total: number }).estimated_total ?? 0),
    0,
  );
  const revenueFormatted = `Rp ${revenue.toLocaleString("id-ID")}`;

  const pendingCount = pendingBookings.count ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-white">Ringkasan Dashboard</h2>
        <p className="mt-1 text-sm text-gray-400">
          Pantau kondisi inventaris dan antrean booking rental kamera hari ini.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <RentalMetricCard
          title="Total Inventaris Alat"
          value={totalGears.count ?? 0}
          icon={Camera}
          description={`${categoriesCount.count ?? 0} kategori alat terdaftar`}
        />
        <RentalMetricCard
          title="Unit Ready di Studio"
          value={readyGears.count ?? 0}
          icon={CheckCircle2}
          accent="ready"
          description="Siap disewa langsung"
        />
        <RentalMetricCard
          title="Sedang Disewa (On Rent)"
          value={rentedGears.count ?? 0}
          icon={Clapperboard}
          accent="rented"
          description="Sedang keluar untuk shooting"
        />
        <RentalMetricCard
          title="Booking Pending Masuk"
          value={pendingCount}
          icon={CalendarClock}
          accent="warning"
          badgeText={pendingCount > 0 ? "Perlu verifikasi" : undefined}
          description={`${packagesCount.count ?? 0} paket bundling aktif`}
        />
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">
              Estimasi Omzet Sewa
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Akumulasi booking terverifikasi, aktif & selesai.
            </p>
          </div>
          <p className="font-mono text-2xl font-bold text-primary">
            {revenueFormatted}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-300">
          Aksi Cepat
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-4 text-sm font-medium text-gray-200 hover:border-primary/50 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-primary" />
                  {action.label}
                </span>
                <ArrowRight className="h-4 w-4 text-gray-600 group-hover:text-primary transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

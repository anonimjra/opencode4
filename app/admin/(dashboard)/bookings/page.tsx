import { FileSpreadsheet } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import RentalBookingsTable from "@/components/admin/RentalBookingsTable";
import { FALLBACK_SETTINGS } from "@/lib/data/rental";
import type { RentalBooking, SiteSettings } from "@/types/database";

export default async function AdminBookingsPage() {
  const supabase = await createClient();

  const [bookingsRes, settingsRes] = await Promise.all([
    supabase
      .from("rental_bookings")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.from("site_settings").select("brand_name").limit(1).maybeSingle(),
  ]);

  const bookings = (bookingsRes.data as RentalBooking[] | null) ?? [];
  const brandName =
    (settingsRes.data as Pick<SiteSettings, "brand_name"> | null)?.brand_name ??
    FALLBACK_SETTINGS.brand_name;

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Antrean Booking Sewa</h2>
          <p className="mt-1 text-sm text-gray-400">
            {bookings.length} total booking • {pendingCount} menunggu verifikasi.
          </p>
        </div>
        <a
          href="/api/admin/export/bookings"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-200 hover:bg-white/5 transition-colors"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export Excel Rekap
        </a>
      </div>

      <RentalBookingsTable bookings={bookings} brandName={brandName} />
    </div>
  );
}

import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { createBaseWorkbook, generateBuffer, buildExcelResponse } from "@/lib/excel/builder";
import { buildBookingsWorksheet } from "@/lib/excel/bookings-sheet";
import type { RentalBooking } from "@/types/database";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ success: false, error: "Tidak terautentikasi." }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }

  const { data } = await supabase
    .from("rental_bookings")
    .select("*")
    .order("created_at", { ascending: false });

  const bookings = (data as RentalBooking[] | null) ?? [];

  const workbook = createBaseWorkbook();
  buildBookingsWorksheet(workbook, bookings);
  const buffer = await generateBuffer(workbook);

  const fileName = `rekap-sewa-${format(new Date(), "yyyy-MM-dd")}.xlsx`;
  return buildExcelResponse(buffer, fileName);
}

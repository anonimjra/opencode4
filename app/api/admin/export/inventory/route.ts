import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";
import { createBaseWorkbook, generateBuffer, buildExcelResponse } from "@/lib/excel/builder";
import { buildInventoryWorksheet } from "@/lib/excel/inventory-sheet";
import type { RentalGear } from "@/types/database";

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
    .from("rental_gears")
    .select("*, category:gear_categories(*)")
    .order("category_id", { ascending: true })
    .order("name", { ascending: true });

  const gears = (data as RentalGear[] | null) ?? [];

  const workbook = createBaseWorkbook();
  buildInventoryWorksheet(workbook, gears);
  const buffer = await generateBuffer(workbook);

  const fileName = `inventaris-alat-${format(new Date(), "yyyy-MM-dd")}.xlsx`;
  return buildExcelResponse(buffer, fileName);
}

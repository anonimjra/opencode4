import type ExcelJS from "exceljs";
import type { RentalGear } from "@/types/database";
import { GEAR_STATUS_LABELS } from "@/lib/constants";
import {
  applyCinemaWorksheetStyling,
  RUPIAH_NUM_FMT,
} from "@/lib/excel/builder";

export function buildInventoryWorksheet(
  workbook: ExcelJS.Workbook,
  gears: RentalGear[],
): void {
  const worksheet = workbook.addWorksheet("Inventaris Alat");

  worksheet.columns = [
    { header: "No", key: "no", width: 6 },
    { header: "Nama Alat Rental", key: "name", width: 32 },
    { header: "Brand / Merk", key: "brand", width: 16 },
    { header: "Nomor Seri (SN)", key: "serial_number", width: 20 },
    { header: "Kategori Alat", key: "category", width: 22 },
    { header: "Kelengkapan Bawaan Tas", key: "accessories", width: 38 },
    { header: "Tarif 12 Jam (Rp)", key: "rate_12h", width: 18 },
    { header: "Tarif 24 Jam (Rp)", key: "rate_24h", width: 18 },
    { header: "Status Unit", key: "status", width: 16 },
    { header: "Terakhir Diperbarui", key: "updated_at", width: 22 },
  ];

  gears.forEach((gear, index) => {
    worksheet.addRow({
      no: index + 1,
      name: gear.name,
      brand: gear.brand,
      serial_number: gear.serial_number ?? "-",
      category: gear.category?.name ?? "-",
      accessories: gear.accessories_included,
      rate_12h: Number(gear.rate_12h),
      rate_24h: Number(gear.rate_24h),
      status: GEAR_STATUS_LABELS[gear.gear_status] ?? gear.gear_status,
      updated_at: new Date(gear.updated_at).toLocaleString("id-ID"),
    });
  });

  worksheet.getColumn("rate_12h").numFmt = RUPIAH_NUM_FMT;
  worksheet.getColumn("rate_24h").numFmt = RUPIAH_NUM_FMT;

  const headers = worksheet.columns.map((col) => String(col.header ?? ""));
  applyCinemaWorksheetStyling(worksheet, headers);
}

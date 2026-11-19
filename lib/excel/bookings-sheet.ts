import type ExcelJS from "exceljs";
import type { RentalBooking } from "@/types/database";
import { BOOKING_STATUS_LABELS } from "@/lib/constants";
import {
  applyCinemaWorksheetStyling,
  RUPIAH_NUM_FMT,
} from "@/lib/excel/builder";

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function buildBookingsWorksheet(
  workbook: ExcelJS.Workbook,
  bookings: RentalBooking[],
): void {
  const worksheet = workbook.addWorksheet("Rekap Booking Sewa");

  worksheet.columns = [
    { header: "No", key: "no", width: 6 },
    { header: "Tanggal Booking", key: "created_at", width: 22 },
    { header: "Nama Penyewa", key: "name", width: 25 },
    { header: "Nomor WhatsApp", key: "whatsapp", width: 20 },
    { header: "Alat / Paket Disewa", key: "gear", width: 30 },
    { header: "Tipe Durasi", key: "duration_type", width: 14 },
    { header: "Jadwal Ambil", key: "pickup", width: 20 },
    { header: "Jadwal Kembali", key: "return", width: 20 },
    { header: "Durasi (Hari)", key: "days", width: 14 },
    { header: "Estimasi Biaya (Rp)", key: "total", width: 20 },
    { header: "Status Booking", key: "status", width: 18 },
  ];

  bookings.forEach((booking, index) => {
    worksheet.addRow({
      no: index + 1,
      created_at: formatDateTime(booking.created_at),
      name: booking.customer_name,
      whatsapp: booking.customer_whatsapp,
      gear: booking.gear_name,
      duration_type: booking.rental_duration_type,
      pickup: formatDateTime(booking.pickup_date),
      return: formatDateTime(booking.return_date),
      days: booking.total_days,
      total: Number(booking.estimated_total),
      status: BOOKING_STATUS_LABELS[booking.status] ?? booking.status,
    });
  });

  worksheet.getColumn("total").numFmt = RUPIAH_NUM_FMT;

  const headers = worksheet.columns.map((col) => String(col.header ?? ""));
  applyCinemaWorksheetStyling(worksheet, headers);
}

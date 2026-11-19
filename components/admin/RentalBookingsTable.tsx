"use client";

import { useMemo, useState, useTransition } from "react";
import { MessageCircle, Trash2, Eye, X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { formatRupiah, formatDateIndonesia } from "@/lib/utils";
import { cleanPhoneNumber } from "@/lib/whatsapp";
import { BOOKING_STATUS_LABELS } from "@/lib/constants";
import { updateBookingStatus, deleteBooking } from "@/app/actions/bookings";
import type { BookingStatus, RentalBooking } from "@/types/database";

type RentalBookingsTableProps = {
  bookings: RentalBooking[];
  brandName: string;
};

const STATUS_OPTIONS: BookingStatus[] = [
  "pending",
  "verified",
  "active",
  "completed",
  "cancelled",
];

const FILTERS: { value: "all" | BookingStatus; label: string }[] = [
  { value: "all", label: "Semua Booking" },
  { value: "pending", label: "Pending Verifikasi" },
  { value: "verified", label: "Terverifikasi" },
  { value: "active", label: "Sedang Berjalan" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Batal" },
];

const STATUS_BADGE: Record<BookingStatus, string> = {
  pending: "bg-[#451A03] text-[#FBBF24] border-[#92400E]",
  verified: "bg-[#0C4A6E] text-[#38BDF8] border-[#0369A1]",
  active: "bg-[#052E16] text-[#4ADE80] border-[#166534]",
  completed: "bg-[#1F2937] text-gray-300 border-gray-600",
  cancelled: "bg-[#450A0A] text-[#F87171] border-[#991B1B]",
};

export default function RentalBookingsTable({
  bookings,
  brandName,
}: RentalBookingsTableProps) {
  const [filter, setFilter] = useState<"all" | BookingStatus>("all");
  const [detail, setDetail] = useState<RentalBooking | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    if (filter === "all") return bookings;
    return bookings.filter((b) => b.status === filter);
  }, [bookings, filter]);

  function handleStatusChange(id: string, status: BookingStatus) {
    startTransition(async () => {
      const result = await updateBookingStatus(id, status);
      if (!result.success) window.alert(result.error ?? "Gagal memperbarui status.");
    });
  }

  function handleDelete(id: string) {
    if (!window.confirm("Hapus booking ini? Tindakan tidak dapat dibatalkan.")) return;
    startTransition(async () => {
      const result = await deleteBooking(id);
      if (!result.success) window.alert(result.error ?? "Gagal menghapus booking.");
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={
              filter === item.value
                ? "rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white"
                : "rounded-full border border-gray-700 bg-[#1F2937] px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-[#374151]"
            }
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#1F2937] bg-[#111827]">
        <table className="w-full min-w-[1000px] text-left text-sm text-gray-300">
          <thead className="border-b border-[#1F2937] text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Tanggal Booking</th>
              <th className="px-4 py-3">Penyewa</th>
              <th className="px-4 py-3">Alat / Paket</th>
              <th className="px-4 py-3">Jadwal</th>
              <th className="px-4 py-3">Durasi</th>
              <th className="px-4 py-3">Total Biaya</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                  Tidak ada booking pada kategori ini.
                </td>
              </tr>
            ) : (
              filtered.map((booking) => {
                const waLink = `https://wa.me/${cleanPhoneNumber(
                  booking.customer_whatsapp,
                )}?text=${encodeURIComponent(
                  `Halo kak ${booking.customer_name}, kami dari ${brandName} ingin mengonfirmasi permohonan booking sewa ${booking.gear_name} untuk tanggal ${formatDateIndonesia(booking.pickup_date)}. Apakah Anda sudah melampirkan foto 2 identitas asli?`,
                )}`;
                return (
                  <tr
                    key={booking.id}
                    className="border-b border-[#1F2937] last:border-0 hover:bg-white/5"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-xs">
                      {formatDateIndonesia(booking.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">
                        {booking.customer_name}
                      </p>
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-xs text-[#25D366] hover:underline"
                      >
                        <MessageCircle className="h-3 w-3" />
                        Chat WA Penyewa
                      </a>
                    </td>
                    <td className="px-4 py-3 text-xs">{booking.gear_name}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs">
                      <p>Ambil: {formatDateIndonesia(booking.pickup_date)}</p>
                      <p className="text-gray-500">
                        Kembali: {formatDateIndonesia(booking.return_date)}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs">
                      {booking.total_days} Hari
                      <span className="ml-1 text-gray-500">
                        ({booking.rental_duration_type})
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-primary">
                      {formatRupiah(booking.estimated_total)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1.5">
                        <span
                          className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[booking.status]}`}
                        >
                          {BOOKING_STATUS_LABELS[booking.status]}
                        </span>
                        <select
                          value={booking.status}
                          disabled={isPending}
                          onChange={(e) =>
                            handleStatusChange(
                              booking.id,
                              e.target.value as BookingStatus,
                            )
                          }
                          className="rounded-lg border border-gray-700 bg-[#0B0F17] px-2 py-1 text-xs text-white focus:border-primary focus:outline-none"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {BOOKING_STATUS_LABELS[status]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setDetail(booking)}
                          aria-label="Detail booking"
                          className="rounded-lg p-2 text-gray-400 hover:bg-white/5 hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(booking.id)}
                          aria-label="Hapus booking"
                          className="rounded-lg p-2 text-[#F87171] hover:bg-[#450A0A]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={detail !== null}
        onClose={() => setDetail(null)}
        ariaLabel="Detail booking sewa"
        className="w-full max-w-lg border border-[#1F2937] p-6"
      >
        {detail ? (
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Detail Booking</h3>
              <button
                onClick={() => setDetail(null)}
                aria-label="Tutup detail"
                className="rounded-lg p-2 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Nama Penyewa" value={detail.customer_name} />
              <Row label="Nomor WhatsApp" value={detail.customer_whatsapp} />
              <Row label="Alat / Paket" value={detail.gear_name} />
              <Row label="Paket Durasi" value={detail.rental_duration_type} />
              <Row
                label="Jadwal Ambil"
                value={formatDateIndonesia(detail.pickup_date)}
              />
              <Row
                label="Jadwal Kembali"
                value={formatDateIndonesia(detail.return_date)}
              />
              <Row label="Durasi" value={`${detail.total_days} Hari`} />
              <Row
                label="Estimasi Total"
                value={formatRupiah(detail.estimated_total)}
              />
              <Row label="Status" value={BOOKING_STATUS_LABELS[detail.status]} />
              {detail.notes ? (
                <Row label="Catatan" value={detail.notes} />
              ) : null}
            </dl>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#1F2937] pb-2">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-right text-gray-200">{value}</dd>
    </div>
  );
}

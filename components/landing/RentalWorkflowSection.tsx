import { PackageSearch, MessageCircle, Truck, Wrench, RotateCcw } from "lucide-react";

const STEPS = [
  {
    icon: PackageSearch,
    title: "Pilih Alat & Jadwal",
    text: "Tentukan kamera/lensa dan jadwal tanggal shooting Anda di katalog.",
  },
  {
    icon: MessageCircle,
    title: "Booking via WhatsApp",
    text: "Kirim pesan booking dan lampirkan foto 2 identitas asli untuk verifikasi.",
  },
  {
    icon: Truck,
    title: "Ambil di Studio / Kurir",
    text: "Datang langsung ke studio atau gunakan kurir instan terpercaya.",
  },
  {
    icon: Wrench,
    title: "Uji Coba Fisik Bersama",
    text: "Cek kebersihan sensor, tombol, dan kelengkapan baterai sebelum dibawa.",
  },
  {
    icon: RotateCcw,
    title: "Pengembalian & Ambil KTP",
    text: "Kembalikan unit sesuai jadwal, cek kondisi akhir, dan ambil kembali kartu identitas Anda.",
  },
];

export default function RentalWorkflowSection() {
  return (
    <section id="workflow" className="py-20 lg:py-28 bg-[#0B0F17] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary border border-primary/40">
            Panduan Penyewa
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            5 Langkah Mudah Sewa Alat di Lensa Nusantara
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative rounded-2xl border border-[#1F2937] bg-[#111827] p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold text-white">
                    {index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {step.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { CameraOff, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F17] px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1F2937] text-primary">
        <CameraOff className="h-8 w-8" />
      </span>
      <p className="mt-6 font-mono text-5xl font-extrabold text-white">404</p>
      <h1 className="mt-3 text-2xl font-bold text-white">
        Alat atau Halaman yang Anda Cari Tidak Ditemukan
      </h1>
      <p className="mt-3 max-w-md text-sm text-gray-400">
        Sepertinya alat yang Anda cari sudah tidak tersedia atau tautan yang Anda
        buka salah.
      </p>
      <Link
        href="/#catalog"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Katalog Alat
      </Link>
    </div>
  );
}

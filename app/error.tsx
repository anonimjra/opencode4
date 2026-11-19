"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B0F17] px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#450A0A] text-[#F87171]">
        <AlertTriangle className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-2xl font-bold text-white">
        Terjadi Kendala Teknis
      </h1>
      <p className="mt-3 max-w-md text-sm text-gray-400">
        Terjadi kendala teknis saat memuat katalog gear. Silakan muat ulang
        halaman.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Coba Lagi
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-200 hover:bg-white/5 transition-colors"
        >
          <Home className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

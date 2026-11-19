"use client";

import { useState } from "react";
import { FileSpreadsheet, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ExportExcelButtonProps = {
  endpoint: string;
  label?: string;
  fileName?: string;
  variant?: "outline" | "secondary";
};

function fileNameFromDisposition(disposition: string | null, fallback: string): string {
  if (!disposition) return fallback;
  const match = /filename="?([^"]+)"?/.exec(disposition);
  return match?.[1] ?? fallback;
}

export default function ExportExcelButton({
  endpoint,
  label = "Export Excel",
  fileName = "export.xlsx",
  variant = "outline",
}: ExportExcelButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    setIsDownloading(true);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        window.alert(
          response.status === 401
            ? "Sesi login Anda berakhir. Silakan login kembali."
            : "Gagal mengunduh berkas Excel. Silakan coba lagi.",
        );
        return;
      }
      const blob = await response.blob();
      const resolvedName = fileNameFromDisposition(
        response.headers.get("Content-Disposition"),
        fileName,
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resolvedName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      window.alert("Terjadi kesalahan jaringan saat mengunduh berkas.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors border hover:bg-emerald-950/40 hover:border-emerald-500 hover:text-emerald-400 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "secondary"
          ? "border-[#1F2937] bg-[#111827] text-gray-200"
          : "border-gray-700 text-gray-200",
      )}
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileSpreadsheet className="h-4 w-4" />
      )}
      {isDownloading ? "Mengunduh Excel..." : label}
    </button>
  );
}

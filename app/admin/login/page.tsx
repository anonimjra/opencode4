import type { Metadata } from "next";
import { Camera } from "lucide-react";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login Admin",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] p-4">
      <div className="w-full max-w-md rounded-3xl border border-[#1F2937] bg-[#111827] p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
            <Camera className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-2xl font-bold text-white">
            Portal Pengelola Rental
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Kelola inventaris kamera, nomor seri, dan antrean booking.
          </p>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Lensa Nusantara Rental & Studio
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Menu, LogOut, User, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { logoutAction } from "@/app/actions/auth";
import { cn } from "@/lib/utils";

type AdminHeaderProps = {
  userEmail: string;
  title?: string;
};

export default function AdminHeader({ userEmail, title }: AdminHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#1F2937] bg-[#0B0F17]/90 px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Buka menu admin"
            className="rounded-lg p-2 text-gray-300 hover:bg-white/5 hover:text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-base font-semibold text-white sm:text-lg">
            {title ?? "Dashboard Rental"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-[#1F2937] bg-[#111827] px-3 py-1.5 sm:flex">
            <User className="h-4 w-4 text-gray-400" />
            <span className="max-w-[180px] truncate text-xs text-gray-300">
              {userEmail}
            </span>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#991B1B] bg-[#450A0A] px-3 py-2 text-xs font-semibold text-[#F87171] hover:bg-[#5a0f0f] transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          isDrawerOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!isDrawerOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity",
            isDrawerOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setIsDrawerOpen(false)}
        />
        <div
          className={cn(
            "absolute left-0 top-0 h-full transition-transform duration-300",
            isDrawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="relative h-full">
            <button
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Tutup menu"
              className="absolute right-2 top-3 z-10 rounded-lg p-2 text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div onClick={() => setIsDrawerOpen(false)}>
              <AdminSidebar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

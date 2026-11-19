"use client";

import { useEffect } from "react";
import { buildThemeVars } from "@/lib/theme";

type ThemeProviderProps = {
  primaryColor?: string;
  children: React.ReactNode;
};

export default function ThemeProvider({
  primaryColor = "#E11D48",
  children,
}: ThemeProviderProps) {
  useEffect(() => {
    const vars = buildThemeVars(primaryColor || "#E11D48");
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [primaryColor]);

  return <>{children}</>;
}

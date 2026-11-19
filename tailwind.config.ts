import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-cinema-primary, #E11D48)",
          hover: "var(--color-cinema-hover, #BE123C)",
          light: "var(--color-cinema-light, #FFF1F2)",
          foreground: "var(--color-cinema-foreground, #FFFFFF)",
        },
        "cinema-black": "#0B0F17",
        "cinema-card": "#111827",
        "cinema-border": "#1F2937",
        status: {
          ready: "#22C55E",
          rented: "#EF4444",
          maintenance: "#F59E0B",
        },
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

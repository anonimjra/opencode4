function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    return null;
  }
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => clampChannel(value).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function darkenHex(hex: string, amount = 0.15): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#BE123C";
  const factor = 1 - amount;
  return rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
}

export function lightenHex(hex: string, amount = 0.9): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#FFF1F2";
  return rgbToHex(
    rgb.r + (255 - rgb.r) * amount,
    rgb.g + (255 - rgb.g) * amount,
    rgb.b + (255 - rgb.b) * amount,
  );
}

export function buildThemeVars(primaryColor: string) {
  return {
    "--color-cinema-primary": primaryColor,
    "--color-cinema-hover": darkenHex(primaryColor, 0.15),
    "--color-cinema-light": lightenHex(primaryColor, 0.9),
    "--color-cinema-foreground": "#FFFFFF",
  };
}

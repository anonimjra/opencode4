"use client";

import { useState, useTransition } from "react";
import { AlertCircle, CheckCircle2, Palette, Save } from "lucide-react";
import Button from "@/components/ui/Button";
import ImageUploader from "@/components/shared/ImageUploader";
import { CINEMA_THEME_PRESETS } from "@/lib/constants";
import { updateBrandAndCinemaTheme } from "@/app/actions/settings";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/database";

type CinemaThemeSettingsFormProps = {
  settings: SiteSettings;
};

const inputClass =
  "w-full rounded-xl border border-gray-700 bg-[#0B0F17] px-3 py-2.5 text-sm text-white focus:border-primary focus:outline-none";

export default function CinemaThemeSettingsForm({
  settings,
}: CinemaThemeSettingsFormProps) {
  const [brandName, setBrandName] = useState(settings.brand_name);
  const [tagline, setTagline] = useState(settings.tagline);
  const [primaryColor, setPrimaryColor] = useState(settings.primary_color);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(settings.logo_url);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.set("brand_name", brandName);
    formData.set("tagline", tagline);
    formData.set("primary_color", primaryColor);
    if (logoFile) formData.set("logo", logoFile);

    startTransition(async () => {
      const result = await updateBrandAndCinemaTheme(formData);
      if (result.success) {
        setSuccess(true);
        document.documentElement.style.setProperty(
          "--color-cinema-primary",
          primaryColor,
        );
      } else {
        setError(result.error ?? "Terjadi kesalahan.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="flex items-start gap-2 rounded-xl border border-[#991B1B] bg-[#450A0A] px-4 py-3 text-sm text-[#F87171]">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          <span>{error}</span>
        </div>
      ) : null}
      {success ? (
        <div className="flex items-center gap-2 rounded-xl border border-[#166534] bg-[#052E16] px-4 py-3 text-sm text-[#4ADE80]">
          <CheckCircle2 className="h-4 w-4" />
          Identitas brand dan tema berhasil diperbarui.
        </div>
      ) : null}

      <fieldset className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
        <legend className="px-1 text-sm font-semibold text-white">
          Identitas Brand
        </legend>
        <div className="mt-3 space-y-3">
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Nama Brand
            </label>
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-gray-300">
              Tagline
            </label>
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className={inputClass}
            />
          </div>
          <ImageUploader
            currentImageUrl={logoUrl}
            label="Logo Brand"
            onImageSelected={(file) => setLogoFile(file)}
            onImageRemoved={() => {
              setLogoFile(null);
              setLogoUrl(null);
            }}
          />
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-[#1F2937] bg-[#111827] p-5">
        <legend className="px-1 text-sm font-semibold text-white">
          Palet Aksen Cinema
        </legend>
        <div className="mt-3 space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value.toUpperCase())}
              aria-label="Color picker tema"
              className="h-11 w-14 cursor-pointer rounded-lg border border-gray-700 bg-transparent"
            />
            <input
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className={cn(inputClass, "max-w-[160px] font-mono uppercase")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CINEMA_THEME_PRESETS.map((preset) => {
              const isActive =
                preset.primary.toLowerCase() === primaryColor.toLowerCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setPrimaryColor(preset.primary)}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-all",
                    isActive
                      ? "border-white ring-2 ring-white/40"
                      : "border-gray-700 hover:border-gray-500",
                  )}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ backgroundColor: preset.primary }}
                  >
                    <Palette className="h-4 w-4 text-white" />
                  </span>
                  <span className="mt-2 block text-xs font-semibold text-white">
                    {preset.label}
                  </span>
                  <span className="block font-mono text-[10px] text-gray-500">
                    {preset.primary}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isPending}>
          <Save className="h-4 w-4" />
          Terapkan Perubahan Tampilan & Tema
        </Button>
      </div>
    </form>
  );
}

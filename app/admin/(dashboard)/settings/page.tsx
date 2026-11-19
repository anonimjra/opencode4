import { createClient } from "@/lib/supabase/server";
import CinemaThemeSettingsForm from "@/components/admin/CinemaThemeSettingsForm";
import { FALLBACK_SETTINGS } from "@/lib/data/rental";
import type { SiteSettings } from "@/types/database";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  const settings = (data as SiteSettings | null) ?? FALLBACK_SETTINGS;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Pengaturan & Brand</h2>
        <p className="mt-1 text-sm text-gray-400">
          Atur identitas brand dan palet warna aksen cinema.
        </p>
      </div>
      <CinemaThemeSettingsForm settings={settings} />
    </div>
  );
}

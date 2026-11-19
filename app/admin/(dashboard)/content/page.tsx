import { createClient } from "@/lib/supabase/server";
import StudioContentForm from "@/components/admin/StudioContentForm";
import { FALLBACK_SETTINGS } from "@/lib/data/rental";
import type { SiteSettings } from "@/types/database";

export default async function AdminContentPage() {
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
        <h2 className="text-xl font-bold text-white">
          Profil Studio, Syarat Jaminan & Jam Buka
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Perubahan langsung tercermin pada landing page publik.
        </p>
      </div>
      <StudioContentForm settings={settings} />
    </div>
  );
}

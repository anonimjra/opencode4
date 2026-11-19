import { createClient } from "@/lib/supabase/server";
import BundlingPackageManager from "@/components/admin/BundlingPackageManager";
import type { BundlingPackage } from "@/types/database";

export default async function AdminPackagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bundling_packages")
    .select("*")
    .order("sort_order", { ascending: true });

  const packages = (data as BundlingPackage[] | null) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Paket Bundling Shooting</h2>
        <p className="mt-1 text-sm text-gray-400">
          Kelola kombinasi paket hemat kamera, audio, dan stabilizer.
        </p>
      </div>
      <BundlingPackageManager packages={packages} />
    </div>
  );
}

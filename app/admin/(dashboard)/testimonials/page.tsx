import { createClient } from "@/lib/supabase/server";
import TestimonialManager from "@/components/admin/TestimonialManager";
import type { Testimonial } from "@/types/database";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const testimonials = (data as Testimonial[] | null) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Testimoni Klien</h2>
        <p className="mt-1 text-sm text-gray-400">
          Kelola ulasan videografer, fotografer, dan production house.
        </p>
      </div>
      <TestimonialManager testimonials={testimonials} />
    </div>
  );
}

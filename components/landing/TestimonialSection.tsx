import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types/database";

type TestimonialSectionProps = {
  testimonials: Testimonial[];
};

export default function TestimonialSection({
  testimonials,
}: TestimonialSectionProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 lg:py-28 bg-[#0B0F17] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary border border-primary/40">
            Testimoni Creator
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Dipercaya Videografer & Content Creator
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6 flex flex-col"
            >
              <Quote className="h-7 w-7 text-primary" />
              <p className="mt-3 flex-1 text-sm text-gray-300 leading-relaxed">
                {item.review_text}
              </p>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < item.rating
                        ? "h-4 w-4 fill-[#FBBF24] text-[#FBBF24]"
                        : "h-4 w-4 text-gray-600"
                    }
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-[#1F2937] pt-4">
                {item.avatar_url ? (
                  <Image
                    src={item.avatar_url}
                    alt={item.customer_name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    {item.customer_name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="text-sm font-semibold text-white">
                    {item.customer_name}
                  </p>
                  <p className="text-xs text-gray-400">{item.customer_role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

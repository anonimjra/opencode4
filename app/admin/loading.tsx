import Skeleton from "@/components/ui/Skeleton";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#0B0F17] p-6">
      <Skeleton className="h-8 w-64" />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 w-full" />
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-[#1F2937] bg-[#111827] p-4">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="mt-3 h-12 w-full" />
        ))}
      </div>
    </div>
  );
}

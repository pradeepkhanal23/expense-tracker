import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-5 p-4">
      {/* Header Skeleton */}
      <Skeleton className="h-12 w-full rounded-lg" />

      {/* Main Content Skeleton */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-44 w-full rounded-lg" />
        <Skeleton className="h-44 w-full rounded-lg" />
        <Skeleton className="h-44 w-full rounded-lg" />
      </div>

      {/* Chart and Table Skeleton */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Skeleton className="h-60 w-full rounded-lg" />
        <Skeleton className="h-60 w-full rounded-lg" />
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Skeleton className="h-60 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-muted" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-1/4" />
        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-9 bg-muted rounded" />
          <div className="flex-1 h-9 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}

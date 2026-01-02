import { ProductCard, type ProductCardProps } from "./product-card"
import { ProductCardSkeleton } from "./product-card-skeleton"

interface ProductGridProps {
  products: ProductCardProps[]
  isLoading?: boolean
  columns?: 2 | 3 | 4
  onAddToWaitlist?: (id: string) => void
  onViewDetails?: (id: string) => void
  waitlistItems?: string[]
}

export function ProductGrid({
  products,
  isLoading = false,
  columns = 4,
  onAddToWaitlist,
  onViewDetails,
  waitlistItems = [],
}: ProductGridProps) {
  const skeletonCount = 8

  const gridColsClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[columns]

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-6`}>
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => <ProductCardSkeleton key={i} />)
        : products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToWaitlist={onAddToWaitlist}
              onViewDetails={onViewDetails}
              isInWaitlist={waitlistItems.includes(product.id)}
            />
          ))}
    </div>
  )
}

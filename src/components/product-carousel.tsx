import { ProductCard, type ProductCardProps } from "./product-card"

interface ProductCarouselProps {
  title: string
  subtitle?: string
  products: ProductCardProps[]
  onAddToWaitlist?: (id: string) => void
  onViewDetails?: (id: string) => void
  waitlistItems?: string[]
}

export function ProductCarousel({
  title,
  subtitle,
  products,
  onAddToWaitlist,
  onViewDetails,
  waitlistItems = [],
}: ProductCarouselProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToWaitlist={onAddToWaitlist}
            onViewDetails={onViewDetails}
            isInWaitlist={waitlistItems.includes(product.id)}
          />
        ))}
      </div>
    </div>
  )
}

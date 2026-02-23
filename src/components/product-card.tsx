"use client"

import { Button } from "@/components/ui/button"
import { Heart, ExternalLink } from "lucide-react"
import Link from "next/link"

export interface ProductCardProps {
  id: string
  title: string
  price: number
  image?: string
  store: string
  rating?: number
  onAddToWaitlist?: (id: string) => void
  onViewDetails?: (id: string) => void
  isInWaitlist?: boolean
}

export function ProductCard({
  id,
  title,
  price,
  image,
  store,
  rating,
  onAddToWaitlist,
  onViewDetails,
  isInWaitlist = false,
}: ProductCardProps) {
  return (
    <div className="group rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 bg-card">
      {/* Product Image */}
      <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden relative">
        {image ? (
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">No image</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold line-clamp-2 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground">{store}</p>
        {rating && <p className="text-sm text-muted-foreground">Rating: {rating.toFixed(1)}/5</p>}
        <p className="text-lg font-bold text-accent">${price.toFixed(2)}</p>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link href={`/product/${id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              // onClick={(e) => {
              //   e.preventDefault()
              //   onViewDetails?.(id)
              // }}
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              Details
            </Button>
          </Link>
          <Button
            size="sm"
            className={`flex-1 ${isInWaitlist ? "bg-accent/20 hover:bg-accent/30" : "bg-accent hover:bg-accent/90"}`}
            onClick={() => onAddToWaitlist?.(id)}
          >
            <Heart className={`w-3.5 h-3.5 mr-1 ${isInWaitlist ? "fill-current" : ""}`} />
            {isInWaitlist ? "Saved" : "Waitlist"}
          </Button>
        </div>
      </div>
    </div>
  )
}

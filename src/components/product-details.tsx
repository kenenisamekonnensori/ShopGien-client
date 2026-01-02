"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ExternalLink, Star, Shield, TrendingUp } from "lucide-react"

interface ProductDetailsProps {
  id: string
  title: string
  price: number
  store: string
  rating?: number
  reviews?: number
  description?: string
  images?: string[]
  inStock?: boolean
  availability?: string
  onAddToWaitlist?: (id: string) => void
  isInWaitlist?: boolean
  aiSummary?: string
}

export function ProductDetails({
  id,
  title,
  price,
  store,
  rating,
  reviews,
  description,
  images = [],
  inStock = true,
  availability = "Ships in 2-3 business days",
  onAddToWaitlist,
  isInWaitlist = false,
  aiSummary,
}: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const displayImages = images.length > 0 ? images : ["/placeholder.svg"]

  return (
    <div className="grid md:grid-cols-2 gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={displayImages[selectedImage] || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="flex gap-3">
            {displayImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === idx ? "border-accent" : "border-border"
                }`}
              >
                <img
                  src={displayImages[idx] || "/placeholder.svg"}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Title and Store */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-balance">{title}</h1>
          <p className="text-lg text-muted-foreground">{store}</p>
        </div>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-accent text-accent" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="font-semibold">{rating}</span>
            <span className="text-muted-foreground">({reviews} reviews)</span>
          </div>
        )}

        {/* Price */}
        <div className="space-y-1">
          <p className="text-5xl font-bold text-accent">${price.toFixed(2)}</p>
          <p className="text-muted-foreground">{availability}</p>
        </div>

        {/* Stock Status */}
        {inStock && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg w-fit">
            <div className="w-2 h-2 bg-green-600 rounded-full" />
            In Stock
          </div>
        )}

        {/* Description */}
        {description && <p className="text-foreground text-lg leading-relaxed">{description}</p>}

        {/* Key Features */}
        <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Free Returns</p>
              <p className="text-xs text-muted-foreground">30-day return policy</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Best Price</p>
              <p className="text-xs text-muted-foreground">Price match guarantee</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://${store.toLowerCase().replace(/\s/g, "")}.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground gap-2 text-base">
              <ExternalLink className="w-4 h-4" />
              Purchase on {store}
            </Button>
          </a>
          <Button
            onClick={() => onAddToWaitlist?.(id)}
            className={`flex-1 h-12 gap-2 text-base ${
              isInWaitlist
                ? "bg-accent/20 hover:bg-accent/30 text-foreground"
                : "border border-border hover:bg-secondary"
            }`}
            variant={isInWaitlist ? "default" : "outline"}
          >
            <Heart className={`w-4 h-4 ${isInWaitlist ? "fill-current" : ""}`} />
            {isInWaitlist ? "Added to Waitlist" : "Add to Waitlist"}
          </Button>
        </div>
      </div>
    </div>
  )
}

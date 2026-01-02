"use client"

import { Button } from "@/components/ui/button"
import { ProductCard } from "./product-card"
import { Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

interface WaitlistItem {
  id: string
  title: string
  price: number
  store: string
  rating?: number
  image?: string
  addedAt?: string
}

interface WaitlistListProps {
  items: WaitlistItem[]
  isEmpty?: boolean
  onViewDetails?: (id: string) => void
  onRemove?: (id: string) => void
}

export function WaitlistList({ items, isEmpty = false, onViewDetails, onRemove }: WaitlistListProps) {
  if (isEmpty || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-lg">
        <Heart className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="font-semibold text-lg mb-2">No items in your waitlist</h3>
        <p className="text-muted-foreground mb-6">Start searching for products and add them to your waitlist</p>
        <Link href="/search">
          <Button className="bg-accent hover:bg-accent/90">
            Start Shopping
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-6 flex items-start gap-3">
        <div className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0" />
        <div>
          <h3 className="font-semibold">Price Monitoring</h3>
          <p className="text-sm text-muted-foreground mt-1">
            We'll notify you when prices drop on items in your waitlist
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div key={product.id} className="space-y-3">
            <ProductCard {...product} onViewDetails={onViewDetails} isInWaitlist={true} onAddToWaitlist={onRemove} />
            <div className="flex justify-between items-center px-4">
              <p className="text-xs text-muted-foreground">
                Added: {product.addedAt ? new Date(product.addedAt).toLocaleDateString() : "Recently"}
              </p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => alert("Price tracking feature coming soon")}
                className="text-xs"
              >
                Set Alert
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

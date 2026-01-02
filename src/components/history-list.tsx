"use client"

import { Button } from "@/components/ui/button"
import { History, ArrowRight } from "lucide-react"
import Link from "next/link"

interface HistoryItem {
  id: string
  title: string
  price: number
  store: string
  image?: string
  viewedAt?: string
}

interface HistoryListProps {
  items: HistoryItem[]
  isEmpty?: boolean
  onView?: (id: string) => void
  onAddToWaitlist?: (id: string) => void
}

export function HistoryList({ items, isEmpty = false, onView, onAddToWaitlist }: HistoryListProps) {
  if (isEmpty || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-border rounded-lg">
        <History className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="font-semibold text-lg mb-2">No viewed products yet</h3>
        <p className="text-muted-foreground mb-6">Your product search history will appear here</p>
        <Link href="/search">
          <Button className="bg-accent hover:bg-accent/90">
            Explore Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {items.map((product) => (
        <div
          key={product.id}
          className="flex gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
        >
          {/* Product Image */}
          <div className="w-24 h-24 rounded-lg bg-muted shrink-0 overflow-hidden">
            <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-full object-cover" />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold line-clamp-2">{product.title}</h3>
              <p className="text-sm text-muted-foreground">{product.store}</p>
              <p className="text-lg font-bold text-accent mt-2">${product.price.toFixed(2)}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 ml-4">
              <Button size="sm" variant="outline" onClick={() => onView?.(product.id)}>
                View
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90" onClick={() => onAddToWaitlist?.(product.id)}>
                Save
              </Button>
            </div>
          </div>

          {/* Viewed Time */}
          <div className="text-right">
            <p className="text-xs text-muted-foreground">{product.viewedAt}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

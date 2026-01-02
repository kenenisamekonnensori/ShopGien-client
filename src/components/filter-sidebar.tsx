"use client"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface FiltersSidebarProps {
  priceRange: { min: number; max: number }
  onPriceRangeChange: (range: { min: number; max: number }) => void
  stores: string[]
  selectedStore: string | null
  onStoreChange: (store: string | null) => void
  sortBy: string
  onSortChange: (sort: string) => void
  onClose?: () => void
  isOpen?: boolean
}

export function FiltersSidebar({
  priceRange,
  onPriceRangeChange,
  stores,
  selectedStore,
  onStoreChange,
  sortBy,
  onSortChange,
  onClose,
  isOpen = true,
}: FiltersSidebarProps) {
  return (
    <div
      className={`space-y-6 ${
        isOpen
          ? "block fixed inset-0 top-32 left-0 right-0 mx-6 bg-background z-30 p-6 rounded-lg border border-border md:relative md:inset-auto md:w-64 md:shrink-0 md:bg-transparent md:border-0 md:mx-0 md:p-0"
          : "hidden md:block md:w-64"
      }`}
    >
      {/* Close button for mobile */}
      {isOpen && (
        <button onClick={onClose} className="absolute top-4 right-4 md:hidden">
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="space-y-6 pt-8 md:pt-0">
        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Min: ${priceRange.min}</label>
              <Input
                type="range"
                min="0"
                max="5000"
                value={priceRange.min}
                onChange={(e) => onPriceRangeChange({ ...priceRange, min: Number.parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Max: ${priceRange.max}</label>
              <Input
                type="range"
                min="0"
                max="5000"
                value={priceRange.max}
                onChange={(e) => onPriceRangeChange({ ...priceRange, max: Number.parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Store Filter */}
        <div>
          <h3 className="font-semibold mb-3">Store</h3>
          <div className="space-y-2">
            {stores.map((store) => (
              <button
                key={store}
                onClick={() => onStoreChange(selectedStore === store ? null : store)}
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedStore === store ? "bg-accent text-accent-foreground" : "hover:bg-secondary text-foreground"
                }`}
              >
                {store}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <h3 className="font-semibold mb-3">Sort By</h3>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-border bg-card"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

interface FiltersSidebarProps {
    priceRange: { min: number; max: number}
    stores: string[]
    selectedStore: string | null
    sortBy: string
}

export const FilteringSidebar = ({
    priceRange,
    stores,
    selectedStore,
    sortBy,
}: FiltersSidebarProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const updateFilters = (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())

      if (!value) {
          params.delete(key)
      } else {
          params.set(key, value)
      }

      router.push(`/searching?${params.toString()}`)
  }

  return (
    <div>
      <div className="space-y-6 pt-8 md:pt-0">
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
                onChange={(e) => updateFilters("min", e.target.value)}
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
                onChange={(e) => updateFilters("max", e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Store</h3>
          <div className="space-y-2">
            {stores.map((store) => (
              <button
                key={store}
                onClick={() => updateFilters("store", selectedStore === store ? null : store)}
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
            onChange={(e) => updateFilters("sort", e.target.value)}
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
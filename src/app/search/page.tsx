"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { FiltersSidebar } from "@/components/filter-sidebar"
import { ProductGrid } from "@/components/product-grid"
import { Search } from "lucide-react"

interface Product {
  id: string
  title: string
  price: number
  store: string
  rating?: number
  image?: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [waitlist, setWaitlist] = useState<string[]>([])

  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })
  const [selectedStore, setSelectedStore] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("relevance")

  const mockProducts: Product[] = [
    {
      id: "1",
      title: "MacBook Pro 14-inch",
      price: 1999,
      store: "Apple Store",
      rating: 4.8,
      image: "/modern-laptop-workspace.png",
    },
    {
      id: "2",
      title: "Dell XPS 13 Laptop",
      price: 1299,
      store: "Dell",
      rating: 4.6,
      image: "/modern-laptop-workspace.png",
    },
    {
      id: "3",
      title: "ASUS VivoBook 15",
      price: 699,
      store: "Amazon",
      rating: 4.4,
      image: "/modern-laptop-workspace.png",
    },
    {
      id: "4",
      title: "Lenovo ThinkPad X1",
      price: 1599,
      store: "Lenovo",
      rating: 4.7,
      image: "/modern-laptop-workspace.png",
    },
    {
      id: "5",
      title: "HP Pavilion 15",
      price: 549,
      store: "Best Buy",
      rating: 4.3,
      image: "/modern-laptop-workspace.png",
    },
    {
      id: "6",
      title: "Microsoft Surface Laptop",
      price: 1299,
      store: "Microsoft Store",
      rating: 4.5,
      image: "/modern-laptop-workspace.png",
    },
    {
      id: "7",
      title: "Google Pixelbook Go",
      price: 999,
      store: "Google Store",
      rating: 4.2,
      image: "/modern-laptop-workspace.png",
    },
    {
      id: "8",
      title: "Razer Book 13",
      price: 1199,
      store: "Razer",
      rating: 4.4,
      image: "/modern-laptop-workspace.png",
    },
  ]

  const stores = Array.from(new Set(mockProducts.map((p) => p.store)))

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        const filtered = mockProducts.filter((p) => {
          const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max
          const matchesStore = !selectedStore || p.store === selectedStore
          return matchesPrice && matchesStore
        })

        if (sortBy === "price-low") {
          filtered.sort((a, b) => a.price - b.price)
        } else if (sortBy === "price-high") {
          filtered.sort((a, b) => b.price - a.price)
        } else if (sortBy === "rating") {
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        }

        setProducts(filtered)
        setIsLoading(false)
      }, 600)

      return () => clearTimeout(timer)
    } else {
      setProducts([])
    }
  }, [query, priceRange, selectedStore, sortBy])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    window.history.pushState(null, "", `/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const handleAddToWaitlist = (productId: string) => {
    setWaitlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* <SearchBar onSearch={handleSearch} initialQuery={query} /> */}
      <SearchBar onSearch={handleSearch} />


      <div className="max-w-7xl mx-auto px-6 py-8">
        {query.trim() ? (
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Results for "{query}"</h1>
              <p className="text-muted-foreground">Found {products.length} products</p>
            </div>

            <div className="flex gap-8">
              <FiltersSidebar
                stores={stores}
                selectedStore={selectedStore}
                onStoreChange={setSelectedStore}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
              />

              <div className="flex-1 space-y-6">
                {products.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Search className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
                  </div>
                )}

                {products.length > 0 && (
                  <ProductGrid
                    products={products}
                    isLoading={isLoading}
                    columns={3}
                    onAddToWaitlist={handleAddToWaitlist}
                    waitlistItems={waitlist}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Start searching</h2>
            <p className="text-muted-foreground">Enter a product name or description to get started</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

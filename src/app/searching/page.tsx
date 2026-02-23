import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchingBar } from "@/components/searching-bar"
import { FilteringSidebar } from "@/components/filtering-sidebar"
import { ProductGrid } from "@/components/product-grid"
import { Search } from "lucide-react"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q ?? ""

  let products: any[] = []
  let stores: string[] = []

  if (query.trim()) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/search/text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
        cache: "no-store",
      })

      const data = await res.json()
      products = data.products || []
      stores = Array.from(new Set(products.map((p: any) => p.source)))
    } catch (err) {
      console.error("Search fetch failed:", err)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SearchingBar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {query ? (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold">
                Results for "{query}"
              </h1>
              <p className="text-muted-foreground">
                Found {products.length} products
              </p>
            </div>

            <div className="flex gap-8">
              <FilteringSidebar
                priceRange={{ min: 0, max: 5000 }} // optional: use AI filters
                selectedStore={""}
                sortBy="relevance"
                stores={stores}
              />

              <div className="flex-1">
                {products.length === 0 ? (
                  <div className="flex flex-col items-center py-16">
                    <Search className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3>No products found</h3>
                  </div>
                ) : (
                  <ProductGrid products={products} columns={3} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-24">
            <Search className="w-16 h-16 text-muted-foreground mb-4" />
            <h2>Start searching</h2>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HomeHero() {
  const [query, setQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Navigate to search results page with query
      window.location.href = `/search?q=${encodeURIComponent(query)}`
    }
  }

  return (
    <section className="flex flex-col items-center justify-center px-6 py-20 md:py-32 text-center">
      <div className="max-w-3xl space-y-8">
        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-balance leading-tight">
            Search Products Using Natural Language
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Type what you want, AI finds the best products for you across multiple stores
          </p>
        </div>

        {/* AI Search Input */}
        <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="I want a lightweight laptop under $1000 for coding"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 text-base"
              />
            </div>
            <Button
              type="submit"
              className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground gap-2 whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </form>

        {/* Example Searches */}
        <div className="flex flex-wrap justify-center gap-2 pt-4">
          <span className="text-sm text-muted-foreground">Try:</span>
          {["Wireless headphones under $200", "Best 4K monitors", "Budget gaming keyboard"].map((example) => (
            <button
              key={example}
              onClick={() => setQuery(example)}
              className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

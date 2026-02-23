'use client'

import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchingBarProps {
    placeholder?: string
    isLoading?: boolean
}

export function SearchingBar(
  { placeholder = "Search for products..",
    isLoading = false 
  } : SearchingBarProps) {
    const [query, setQuery] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return

        router.push(`/searching?q=${encodeURIComponent(query)}`)
    }

    return (
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-12 text-base"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground gap-2 whitespace-nowrap"
          disabled={isLoading || !query.trim()}
        >
          <Search className="w-4 h-4" />
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>
    )
}
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  suggestions?: string[]
  showSuggestions?: boolean
  isLoading?: boolean
}

export function SearchBar({
  placeholder = "Search products...",
  onSearch,
  suggestions = [],
  showSuggestions = false,
  isLoading = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onSearch(suggestion)
  }

  return (
    <div className="w-full space-y-4">
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

      {showSuggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Try:</span>
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

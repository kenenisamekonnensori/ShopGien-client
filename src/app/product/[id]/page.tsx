"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { ProductCarousel } from "@/components/product-carousel"
import { AISummary } from "@/components/ai-summary"

interface Product {
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
  features?: { icon: React.ReactNode; title: string; description: string }[]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [isInWaitlist, setIsInWaitlist] = useState(false)

  // Mock product data
  const product: Product = {
    id: params.id,
    title: "MacBook Pro 14-inch",
    price: 1999,
    store: "Apple Store",
    rating: 4.8,
    reviews: 328,
    inStock: true,
    availability: "Ships in 2-3 business days",
    description:
      "Supercharged by M3, M3 Pro, or M3 Max. Tear through workflows and get more done faster with a powerful GPU, more unified memory and breakthrough battery life.",
    images: ["/modern-laptop-workspace.png", "/modern-laptop-workspace.png", "/modern-laptop-workspace.png"],
  }

  const similarProducts = [
    {
      id: "2",
      title: "Dell XPS 13 Laptop",
      price: 1299,
      store: "Dell",
      rating: 4.6,
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
      id: "6",
      title: "Microsoft Surface Laptop",
      price: 1299,
      store: "Microsoft Store",
      rating: 4.5,
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

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 space-y-16">
        <ProductDetails
          id={product.id}
          title={product.title}
          price={product.price}
          store={product.store}
          rating={product.rating}
          reviews={product.reviews}
          description={product.description}
          images={product.images}
          inStock={product.inStock}
          availability={product.availability}
          isInWaitlist={isInWaitlist}
          onAddToWaitlist={() => setIsInWaitlist(!isInWaitlist)}
        />

        <AISummary
          summary="This MacBook Pro 14-inch is a powerhouse laptop designed for professionals. Featuring the latest M3, M3 Pro, or M3 Max chip, it delivers exceptional performance for demanding workflows. With a stunning Liquid Retina XDR display, up to 22 hours of battery life, and premium build quality, it's perfect for creators, developers, and power users. The Thunderbolt 4 connectivity ensures fast data transfers and external display support."
          title="AI Summary"
        />

        <ProductCarousel
          title="You Might Also Like"
          subtitle="Similar premium laptops from other brands"
          products={similarProducts}
          onAddToWaitlist={() => setIsInWaitlist(true)}
          onViewDetails={(id) => {
            // Handle navigation to other product details
            window.location.href = `/product/${id}`
          }}
          waitlistItems={isInWaitlist ? [product.id] : []}
        />
      </div>

      <Footer />
    </main>
  )
}

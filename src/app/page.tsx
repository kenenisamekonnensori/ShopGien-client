"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HomeHero } from "@/components/home-ui/home-hero"
import { ArrowRight } from "lucide-react"

function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Search",
      description: "Describe what you're looking for in natural language",
    },
    {
      number: 2,
      title: "AI Process",
      description: "Our AI analyzes your needs and searches multiple stores",
    },
    {
      number: 3,
      title: "Results",
      description: "Get curated results ranked by relevance and price",
    },
  ]

  return (
    <section className="px-6 py-20 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={step.number}>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold mb-4">
                  {step.number}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center mt-8">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProducts() {
  const products = [
    {
      id: "1",
      title: "Premium Wireless Headphones",
      price: 299,
      store: "Electronics Store",
      image: "/wireless-headphones.png",
    },
    {
      id: "2",
      title: "Premium Wireless Headphones",
      price: 299,
      store: "Electronics Store",
      image: "/wireless-headphones.png",
    },
    {
      id: "3",
      title: "Premium Wireless Headphones",
      price: 299,
      store: "Electronics Store",
      image: "/wireless-headphones.png",
    },
    {
      id: "4",
      title: "Premium Wireless Headphones",
      price: 299,
      store: "Electronics Store",
      image: "/wireless-headphones.png",
    },
  ]

  return (
    <section className="px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Recently Searched</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow bg-card h-full cursor-pointer">
                <div className="aspect-square bg-muted flex items-center justify-center text-muted-foreground overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">{product.store}</p>
                  <p className="text-lg font-bold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Suspense fallback={null}>
        <HomeHero />
      </Suspense>

      <HowItWorks />
      <FeaturedProducts />
      <Footer />
    </main>
  )
}

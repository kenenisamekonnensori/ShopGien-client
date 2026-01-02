"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardTabs } from "@/components/dashboard-tabs"
import { WaitlistList } from "@/components/waitlist-list"
import { HistoryList } from "@/components/history-list"
import { useState } from "react"

interface DashboardProduct {
  id: string
  title: string
  price: number
  store: string
  rating?: number
  image?: string
  viewedAt?: string
  addedAt?: string
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"history" | "waitlist">("waitlist")

  const viewedHistory: DashboardProduct[] = [
    {
      id: "1",
      title: "MacBook Pro 14-inch",
      price: 1999,
      store: "Apple Store",
      rating: 4.8,
      image: "/modern-laptop-workspace.png",
      viewedAt: "2 days ago",
    },
    {
      id: "2",
      title: "Dell XPS 13 Laptop",
      price: 1299,
      store: "Dell",
      rating: 4.6,
      image: "/modern-laptop-workspace.png",
      viewedAt: "5 days ago",
    },
    {
      id: "3",
      title: "ASUS VivoBook 15",
      price: 699,
      store: "Amazon",
      rating: 4.4,
      image: "/modern-laptop-workspace.png",
      viewedAt: "1 week ago",
    },
    {
      id: "4",
      title: "Lenovo ThinkPad X1",
      price: 1599,
      store: "Lenovo",
      rating: 4.7,
      image: "/modern-laptop-workspace.png",
      viewedAt: "2 weeks ago",
    },
  ]

  const waitlistItems: DashboardProduct[] = [
    {
      id: "1",
      title: "MacBook Pro 14-inch",
      price: 1999,
      store: "Apple Store",
      rating: 4.8,
      image: "/modern-laptop-workspace.png",
      addedAt: "2025-01-15",
    },
    {
      id: "6",
      title: "Microsoft Surface Laptop",
      price: 1299,
      store: "Microsoft Store",
      rating: 4.5,
      image: "/modern-laptop-workspace.png",
      addedAt: "2025-01-10",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your wishlist and view your recent searches</p>
        </div>

        <DashboardTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          waitlistCount={waitlistItems.length}
          historyCount={viewedHistory.length}
        >
          {activeTab === "waitlist" && <WaitlistList items={waitlistItems} />}
          {activeTab === "history" && <HistoryList items={viewedHistory} />}
        </DashboardTabs>
      </div>

      <Footer />
    </main>
  )
}

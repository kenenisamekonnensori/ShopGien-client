"use client"

import type React from "react"

import { Heart, History } from "lucide-react"

interface DashboardTabsProps {
  activeTab: "waitlist" | "history"
  onTabChange: (tab: "waitlist" | "history") => void
  waitlistCount: number
  historyCount: number
  children: React.ReactNode
}

export function DashboardTabs({ activeTab, onTabChange, waitlistCount, historyCount, children }: DashboardTabsProps) {
  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b border-border">
        <button
          onClick={() => onTabChange("waitlist")}
          className={`pb-4 px-2 font-semibold border-b-2 transition-colors ${
            activeTab === "waitlist"
              ? "border-accent text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Waitlist ({waitlistCount})
          </div>
        </button>
        <button
          onClick={() => onTabChange("history")}
          className={`pb-4 px-2 font-semibold border-b-2 transition-colors ${
            activeTab === "history"
              ? "border-accent text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex items-center gap-2">
            <History className="w-5 h-5" />
            View History ({historyCount})
          </div>
        </button>
      </div>

      <div className="pt-6">{children}</div>
    </div>
  )
}

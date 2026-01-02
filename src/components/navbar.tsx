import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

interface NavbarProps {
  showDashboard?: boolean
  dashboardText?: string
  dashboardHref?: string
}

//E9A491A3DE247814E7E067EAE06F8ECDD651FF2E

export function Navbar({
  showDashboard = true,
  dashboardText = "Dashboard",
  dashboardHref = "/dashboard",
}: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-background sticky top-0 z-40">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-accent-foreground" />
        </div>
        <span className="font-semibold text-lg text-blue-400">AI Finder</span>
      </Link>
      {showDashboard && (
        <Link href={dashboardHref}>
          <Button variant="outline" size="sm">
            {dashboardText}
          </Button>
        </Link>
      )}
    </nav>
  )
}

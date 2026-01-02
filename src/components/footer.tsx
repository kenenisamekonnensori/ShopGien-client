interface FooterProps {
  companyName?: string
  tagline?: string
  email?: string
}

export function Footer({
  companyName = "AI Finder",
  tagline = "Smart shopping with natural language search",
  email = "hello@aifinder.com",
}: FooterProps) {
  return (
    <footer className="border-t border-border px-6 py-12 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">{companyName}</h4>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/search" className="hover:text-foreground transition-colors">
                  Search
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

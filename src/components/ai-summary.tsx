interface AISummaryProps {
  summary: string
  title?: string
}

export function AISummary({ summary, title = "AI Summary" }: AISummaryProps) {
  return (
    <div className="bg-secondary/30 rounded-lg p-8 border border-border">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-2 h-2 bg-accent rounded-full mt-2" />
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-foreground leading-relaxed">{summary}</p>
    </div>
  )
}

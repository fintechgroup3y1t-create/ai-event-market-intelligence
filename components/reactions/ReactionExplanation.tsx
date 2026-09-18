/**
 * "AI Reaction Summary" card. The text is deterministic mock content
 * from lib/mockData.ts (EventMarketReaction.aiSummary) — not a live
 * AI call — and is written to describe the observed historical
 * reaction only, never a prediction or recommendation.
 */
export function ReactionExplanation({ summary }: { summary: string }) {
  return (
    <section className="rounded-lg border border-ai-accent/30 bg-gradient-to-br from-ai-accent/[0.07] via-surface to-surface p-6">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ai-accent">
        <span aria-hidden="true">✦</span>
        AI Reaction Summary
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{summary}</p>
      <p className="mt-3 text-xs text-muted">AI-assisted interpretation</p>
    </section>
  );
}

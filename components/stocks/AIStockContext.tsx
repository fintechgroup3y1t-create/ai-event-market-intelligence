/**
 * "AI Stock Context" — deterministic mock text (not a live AI call),
 * describing the historical event window only. Never a forecast.
 */
export function AIStockContext({ text }: { text: string }) {
  return (
    <section className="rounded-lg border border-ai-accent/30 bg-gradient-to-br from-ai-accent/[0.07] via-surface to-surface p-6">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ai-accent">
        <span aria-hidden="true">✦</span>
        AI Stock Context
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground">{text}</p>
      <p className="mt-3 text-xs text-muted">AI-assisted interpretation</p>
    </section>
  );
}

import type { NewsSource } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";

const RELEVANCE_STYLE: Record<NewsSource["relevance"], string> = {
  HIGH: "border-ai-accent/30 bg-ai-accent/10 text-ai-accent",
  MEDIUM: "border-mixed/30 bg-mixed/10 text-mixed",
  LOW: "border-neutral/30 bg-neutral/10 text-neutral",
};

const RELEVANCE_LABEL: Record<NewsSource["relevance"], string> = {
  HIGH: "High Relevance",
  MEDIUM: "Medium Relevance",
  LOW: "Low Relevance",
};

/**
 * "Evidence & Sources" — mock news sources only. Links are non-
 * functional placeholders (mock URLs); nothing here is fetched from
 * an external service.
 */
export function EventEvidence({ sources }: { sources: NewsSource[] }) {
  return (
    <section>
      <SectionHeader title="Evidence & Sources" />
      <div className="space-y-3">
        {sources.map((source) => (
          <div
            key={source.id}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-medium text-muted">
                {source.sourceName} · {source.publishedAt}
              </span>
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${RELEVANCE_STYLE[source.relevance]}`}
              >
                {RELEVANCE_LABEL[source.relevance]}
              </span>
            </div>
            <p className="mt-2 text-sm text-foreground">{source.title}</p>
            <span className="mt-1 inline-block text-xs text-ai-accent">
              Mock source link (demo data) ↗
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

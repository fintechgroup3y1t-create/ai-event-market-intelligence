import Link from "next/link";
import type { MarketEvent } from "@/lib/types";
import { StatusBadge } from "@/components/common/StatusBadge";

export function MajorEventCard({ event }: { event: MarketEvent }) {
  return (
    <section className="relative overflow-hidden rounded-lg border border-ai-accent/30 bg-gradient-to-br from-ai-accent/[0.07] via-surface to-surface p-6 shadow-[0_0_0_1px_rgba(124,108,246,0.05)]">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ai-accent">
        <span aria-hidden="true">✦</span>
        Major Market Event
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">
          {event.title}
        </h2>
        <StatusBadge label={event.eventType} />
        <span className="text-xs text-muted">{event.date}</span>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {event.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-6">
        <div>
          <p className="text-xs text-muted">Affected Asset</p>
          <p className="text-sm font-medium text-foreground">
            {event.affectedAsset}{" "}
            <span
              className={
                event.assetChangePercent >= 0 ? "text-positive" : "text-negative"
              }
            >
              {event.assetChangePercent >= 0 ? "+" : ""}
              {event.assetChangePercent.toFixed(2)}%
            </span>
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">Impact Score</p>
          <p className="text-sm font-medium text-foreground">
            {event.impactScore} / 100
          </p>
        </div>
        <div>
          <p className="text-xs text-muted">Confidence</p>
          <p className="text-sm font-medium text-foreground">
            {event.confidence}%
          </p>
        </div>
      </div>

      <Link
        href={`/events/${event.id}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
      >
        View Event Analysis →
      </Link>
    </section>
  );
}

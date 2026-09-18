import Link from "next/link";
import type { MarketEvent, StockEventExposure } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";

/**
 * "Event Relationship" — deliberately uses neutral, non-causal
 * language ("the historical event context shows a positive observed
 * relationship in this mock dataset") rather than any claim like
 * "the stock will benefit" or "the stock will rise", per the locked
 * product-safety rule for this page.
 */
export function StockEventRelationship({
  event,
  exposure,
  sector,
}: {
  event: MarketEvent;
  exposure: StockEventExposure;
  sector: string;
}) {
  const directionWord =
    exposure.direction === "POSITIVE"
      ? "positive"
      : exposure.direction === "NEGATIVE"
        ? "negative"
        : exposure.direction === "MIXED"
          ? "mixed"
          : "neutral";

  return (
    <section>
      <SectionHeader title="Event Relationship" />
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted">Event</p>
            <p className="mt-1 text-sm font-medium text-foreground">{event.title}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Event Type</p>
            <div className="mt-1">
              <StatusBadge label={event.eventType} />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted">Event Date</p>
            <p className="mt-1 text-sm font-medium text-foreground">{event.date}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Sector</p>
            <p className="mt-1 text-sm font-medium text-foreground">{sector}</p>
          </div>
          <div>
            <p className="text-xs text-muted">Direction</p>
            <div className="mt-1">
              <StatusBadge label={exposure.direction} direction={exposure.direction} />
            </div>
          </div>
          <div>
            <p className="text-xs text-muted">Impact Score</p>
            <p className="mt-1 text-sm font-medium text-foreground">{exposure.impactScore}</p>
          </div>
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <p className="text-xs text-muted">Reason</p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{exposure.reason}</p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          The historical event context shows a {directionWord} observed
          relationship in this mock dataset.
        </p>

        <Link
          href={`/events/${event.id}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
        >
          View Event Details →
        </Link>
      </div>
    </section>
  );
}

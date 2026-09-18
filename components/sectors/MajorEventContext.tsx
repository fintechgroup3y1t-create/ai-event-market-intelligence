import Link from "next/link";
import type { MarketEvent } from "@/lib/types";
import { StatusBadge } from "@/components/common/StatusBadge";

/**
 * Major Event context block for the Sector Impact page. Deliberately
 * a separate, smaller component from components/dashboard/MajorEventCard.tsx
 * (a frozen Step-1 critical fix) rather than a modification of it —
 * this shows a different, more compact field set (Type, Affected
 * Asset, Direction, Magnitude, Confidence) tailored to framing the
 * Cross-Sector Impact section below it, while reusing the same
 * ai-accent visual treatment established in Step 1.
 */
export function MajorEventContext({ event }: { event: MarketEvent }) {
  return (
    <section className="rounded-lg border border-ai-accent/30 bg-gradient-to-br from-ai-accent/[0.06] via-surface to-surface p-6">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ai-accent">
        <span aria-hidden="true">✦</span>
        Major Event
      </p>
      <h2 className="mt-2 text-lg font-semibold text-foreground">{event.title}</h2>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
        <div>
          <p className="text-muted">Type</p>
          <div className="mt-1">
            <StatusBadge label={event.eventType} />
          </div>
        </div>
        <div>
          <p className="text-muted">Affected Asset</p>
          <p className="mt-1 font-medium text-foreground">{event.affectedAsset}</p>
        </div>
        <div>
          <p className="text-muted">Direction</p>
          <div className="mt-1">
            <StatusBadge label={event.direction} eventDirection={event.direction} />
          </div>
        </div>
        <div>
          <p className="text-muted">Magnitude</p>
          <p className="mt-1 font-medium text-foreground">{event.magnitude} / 5</p>
        </div>
        <div>
          <p className="text-muted">Confidence</p>
          <p className="mt-1 font-medium text-foreground">{event.confidence}%</p>
        </div>
      </div>

      <Link
        href={`/events/${event.id}`}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
      >
        View Event Details →
      </Link>
    </section>
  );
}

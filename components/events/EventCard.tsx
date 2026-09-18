import Link from "next/link";
import type { MarketEvent } from "@/lib/types";
import { StatusBadge } from "@/components/common/StatusBadge";

/**
 * One event row on the Events List page. The whole card is a link to
 * the event's detail page — no calculation happens here, every value
 * is read straight from the mock MarketEvent record.
 */
export function EventCard({ event }: { event: MarketEvent }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-ai-accent/40 hover:bg-surface-hover sm:p-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge label={event.eventType} />
        <StatusBadge label={event.status} status={event.status} />
        <span className="text-xs text-muted">
          {event.date} · {event.time}
        </span>
      </div>

      <h3 className="mt-2 text-sm font-semibold text-foreground sm:text-base">
        {event.title}
      </h3>

      <p className="mt-1 text-xs text-muted">
        {event.actor} — {event.action}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
        <div>
          <span className="text-muted">Affected Asset </span>
          <span className="font-medium text-foreground">{event.affectedAsset}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-muted">Direction</span>
          <StatusBadge label={event.direction} eventDirection={event.direction} />
        </div>
        <div>
          <span className="text-muted">Magnitude </span>
          <span className="font-medium text-foreground">{event.magnitude} / 5</span>
        </div>
        <div>
          <span className="text-muted">Confidence </span>
          <span className="font-medium text-foreground">{event.confidence}%</span>
        </div>
        <div>
          <span className="text-muted">Sources </span>
          <span className="font-medium text-foreground">{event.sourceCount}</span>
        </div>
      </div>
    </Link>
  );
}

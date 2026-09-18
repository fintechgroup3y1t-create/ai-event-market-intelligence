import Link from "next/link";
import type { MarketEvent } from "@/lib/types";
import { StatusBadge } from "@/components/common/StatusBadge";

/**
 * Event context block for the Market Reaction page — shows which
 * historical event the reaction data below belongs to. Every field is
 * read directly from the mock MarketEvent; nothing is computed here.
 */
export function ReactionEventContext({ event }: { event: MarketEvent }) {
  return (
    <section className="rounded-lg border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs">
        <div>
          <p className="text-muted">Event</p>
          <p className="mt-1 text-sm font-medium text-foreground">{event.title}</p>
        </div>
        <div>
          <p className="text-muted">Event Type</p>
          <div className="mt-1">
            <StatusBadge label={event.eventType} />
          </div>
        </div>
        <div>
          <p className="text-muted">Event Date</p>
          <p className="mt-1 font-medium text-foreground">
            {event.date} · {event.time}
          </p>
        </div>
        <div>
          <p className="text-muted">Affected Asset</p>
          <p className="mt-1 font-medium text-foreground">{event.affectedAsset}</p>
        </div>
        <div>
          <p className="text-muted">Event Direction</p>
          <div className="mt-1">
            <StatusBadge label={event.direction} eventDirection={event.direction} />
          </div>
        </div>
      </div>

      <Link
        href={`/events/${event.id}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
      >
        View Event Details →
      </Link>
    </section>
  );
}

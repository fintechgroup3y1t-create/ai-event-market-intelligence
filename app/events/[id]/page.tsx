import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/common/StatusBadge";
import { SectorImpactTable } from "@/components/dashboard/SectorImpactTable";
import { EventSummaryCard } from "@/components/events/EventSummaryCard";
import { EventEvidence } from "@/components/events/EventEvidence";
import { EventMarketReactionPreview } from "@/components/events/EventMarketReactionPreview";
import {
  EVENTS,
  EVENT_MARKET_REACTION_PREVIEW,
  EVENT_NEWS_SOURCES,
  EVENT_SECTOR_IMPACTS,
} from "@/lib/mockData";

/**
 * Event Detail — answers WHAT HAPPENED? -> WHO IS AFFECTED? in full,
 * with a compact HOW DID THE MARKET REACT? preview linking onward to
 * the future full Market Reaction page. All data is mock.
 */
export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = EVENTS.find((item) => item.id === params.id);

  if (!event) {
    notFound();
    return null;
  }

  const sectorImpacts = EVENT_SECTOR_IMPACTS[event.id] ?? [];
  const reactionPreview = EVENT_MARKET_REACTION_PREVIEW[event.id];
  const newsSources = EVENT_NEWS_SOURCES[event.id] ?? [];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/events"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-foreground"
        >
          ← Back to Events
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <StatusBadge label={event.eventType} />
          <StatusBadge label={event.status} status={event.status} />
          <span className="text-xs text-muted">
            {event.date} · {event.time}
          </span>
        </div>

        <h1 className="mt-2 text-xl font-semibold text-foreground">
          {event.title}
        </h1>

        <p className="mt-1 text-sm text-muted">
          Confidence <span className="font-medium text-foreground">{event.confidence}%</span>
        </p>
      </div>

      <EventSummaryCard event={event} />

      <section>
        <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-ai-accent">
          Who Is Affected?
        </h2>
        <p className="mb-4 text-sm text-muted">
          Cross-Sector Impact preview for this event.
        </p>
        <SectorImpactTable items={sectorImpacts} />
        <Link
          href="/sectors"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
        >
          View Sector Impact →
        </Link>
      </section>

      <EventEvidence sources={newsSources} />

      {reactionPreview && <EventMarketReactionPreview preview={reactionPreview} />}
    </div>
  );
}

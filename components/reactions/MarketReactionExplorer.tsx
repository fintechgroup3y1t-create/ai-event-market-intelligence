"use client";

import { useState } from "react";
import type { EventMarketReaction, MarketEvent } from "@/lib/types";
import { ReactionEventContext } from "./ReactionEventContext";
import { ReactionSummaryCards } from "./ReactionSummaryCards";
import { ReactionExplanation } from "./ReactionExplanation";
import { ReactionChart } from "./ReactionChart";
import { AbnormalReturnTable } from "./AbnormalReturnTable";
import { ReactionClassificationSection } from "./ReactionClassificationSection";
import { CARSummary } from "./CARSummary";

/**
 * Event selector + all reaction sections for the currently selected
 * event. Reuses the existing EVENTS / MARKET_REACTIONS mock data as-is
 * (no new mock-data system, no dynamic calculation) — the same
 * lightweight local-state pattern already used by
 * components/sectors/SectorImpactExplorer.tsx.
 */
export function MarketReactionExplorer({
  events,
  reactions,
}: {
  events: MarketEvent[];
  reactions: EventMarketReaction[];
}) {
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(events[0]?.id);
  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? events[0];
  const reaction = reactions.find((item) => item.eventId === selectedEvent?.id);

  return (
    <div className="space-y-8">
      {events.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {events.map((event) => {
            const isSelected = event.id === selectedEvent?.id;
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEventId(event.id)}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isSelected
                    ? "border-ai-accent/40 bg-ai-accent/10 text-ai-accent"
                    : "border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {event.title}
              </button>
            );
          })}
        </div>
      )}

      {selectedEvent && <ReactionEventContext event={selectedEvent} />}

      {reaction ? (
        <>
          <ReactionSummaryCards reaction={reaction} />
          <ReactionExplanation summary={reaction.aiSummary} />
          <ReactionChart timeline={reaction.timeline} />
          <AbnormalReturnTable timeline={reaction.timeline} />
          <ReactionClassificationSection classification={reaction.classification} />
          <CARSummary carPercent={reaction.carPercent} eventWindow={reaction.eventWindow} />
        </>
      ) : (
        <p className="text-sm text-muted">
          No historical reaction data is available for this event yet.
        </p>
      )}
    </div>
  );
}

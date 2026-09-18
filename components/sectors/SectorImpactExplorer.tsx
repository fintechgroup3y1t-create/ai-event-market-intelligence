"use client";

import { useState } from "react";
import type { MarketEvent, SectorImpact } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MajorEventContext } from "./MajorEventContext";
import { SectorImpactDetailTable } from "./SectorImpactDetailTable";

/**
 * Lets the user switch which mock event's sector impact is shown.
 * Reuses the existing EVENTS / EVENT_SECTOR_IMPACTS mock data from
 * Step 2 as-is (no new mock-data system, no dynamic scoring) — this
 * is a small amount of local UI state, not a new architecture.
 */
export function SectorImpactExplorer({
  events,
  sectorImpactsByEventId,
}: {
  events: MarketEvent[];
  sectorImpactsByEventId: Record<string, SectorImpact[]>;
}) {
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(events[0]?.id);
  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? events[0];
  const items = selectedEvent ? sectorImpactsByEventId[selectedEvent.id] ?? [] : [];

  return (
    <div className="space-y-6">
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

      {selectedEvent && <MajorEventContext event={selectedEvent} />}

      <section>
        <SectionHeader eyebrow="Who Is Affected?" title="Cross-Sector Impact" />
        <p className="-mt-2 mb-4 text-xs leading-relaxed text-muted">
          Impact Score measures the estimated relevance and severity of an
          event for a sector. It does not represent expected stock return.
        </p>
        <SectorImpactDetailTable items={items} />
      </section>
    </div>
  );
}

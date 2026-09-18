"use client";

import { useMemo, useState } from "react";
import type {
  AbnormalReactionLevel,
  Direction,
  MarketEvent,
  Stock,
  StockEventExposure,
  StockEventHistoryEntry,
  StockReaction,
} from "@/lib/types";
import { StockTable, type StockRow } from "./StockTable";

const ALL = "ALL";

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ai-accent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function findClassification(
  history: Record<string, StockEventHistoryEntry[]>,
  symbol: string,
  eventId: string | undefined
): AbnormalReactionLevel | undefined {
  if (!eventId) return undefined;
  return history[symbol]?.find((entry) => entry.eventId === eventId)?.classification;
}

/**
 * Event / Sector / Direction filters over the mock stock universe.
 * All filtering happens client-side over already-loaded mock data —
 * no backend/API call, no recalculation of any financial value.
 */
export function StocksExplorer({
  stocks,
  events,
  exposures,
  reactions,
  eventHistory,
}: {
  stocks: Stock[];
  events: MarketEvent[];
  exposures: StockEventExposure[];
  reactions: StockReaction[];
  eventHistory: Record<string, StockEventHistoryEntry[]>;
}) {
  const [eventFilter, setEventFilter] = useState(ALL);
  const [sectorFilter, setSectorFilter] = useState(ALL);
  const [directionFilter, setDirectionFilter] = useState<typeof ALL | Direction>(ALL);

  const sectors = useMemo(() => Array.from(new Set(stocks.map((stock) => stock.sector))), [stocks]);

  const rows: StockRow[] = useMemo(() => {
    return stocks
      .map((stock) => {
        const exposure = exposures.find((item) => item.symbol === stock.symbol);
        const event = exposure ? events.find((item) => item.id === exposure.eventId) : undefined;
        const reaction = exposure ? reactions.find((item) => item.symbol === stock.symbol) : undefined;
        const classification = findClassification(eventHistory, stock.symbol, exposure?.eventId);
        return { stock, exposure, eventTitle: event?.title, reaction, classification };
      })
      .filter(({ stock, exposure }) => {
        if (sectorFilter !== ALL && stock.sector !== sectorFilter) return false;
        if (eventFilter !== ALL && exposure?.eventId !== eventFilter) return false;
        if (directionFilter !== ALL && exposure?.direction !== directionFilter) return false;
        return true;
      });
  }, [stocks, exposures, events, reactions, eventHistory, eventFilter, sectorFilter, directionFilter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <FilterSelect
          label="Event"
          value={eventFilter}
          onChange={setEventFilter}
          options={[
            { value: ALL, label: "All Events" },
            ...events.map((event) => ({ value: event.id, label: event.title })),
          ]}
        />
        <FilterSelect
          label="Sector"
          value={sectorFilter}
          onChange={setSectorFilter}
          options={[
            { value: ALL, label: "All Sectors" },
            ...sectors.map((sector) => ({ value: sector, label: sector })),
          ]}
        />
        <FilterSelect
          label="Direction"
          value={directionFilter}
          onChange={(value) => setDirectionFilter(value as typeof ALL | Direction)}
          options={[
            { value: ALL, label: "All" },
            { value: "POSITIVE", label: "Positive" },
            { value: "NEGATIVE", label: "Negative" },
            { value: "NEUTRAL", label: "Neutral" },
            { value: "MIXED", label: "Mixed" },
          ]}
        />
      </div>

      {rows.length > 0 ? (
        <StockTable rows={rows} />
      ) : (
        <p className="rounded-lg border border-border bg-surface p-6 text-sm text-muted">
          No stocks match the selected filters.
        </p>
      )}
    </div>
  );
}

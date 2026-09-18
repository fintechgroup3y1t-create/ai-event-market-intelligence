import { MetricCard } from "@/components/common/MetricCard";
import { toneForReturn } from "./reactionTone";

function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * Compact "Cumulative Abnormal Return (CAR)" card. Value comes
 * directly from mock data (EventMarketReaction.carPercent) — the sum
 * across the event window was verified by hand before being written
 * into lib/mockData.ts; it is never summed at runtime by the frontend.
 */
export function CARSummary({
  carPercent,
  eventWindow,
}: {
  carPercent: number;
  eventWindow: [number, number];
}) {
  const tone = toneForReturn(carPercent);

  return (
    <section className="rounded-lg border border-border bg-surface p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        Cumulative Abnormal Return (CAR)
      </p>
      <div className="mt-2">
        <MetricCard
          label="CAR"
          value={formatPercent(carPercent)}
          tone={tone === "neutral" ? "default" : tone}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Sum of abnormal returns across the selected event window.
      </p>
      <p className="mt-2 text-xs text-muted">
        Event Window:{" "}
        <span className="font-medium text-foreground">
          [{eventWindow[0]}, {eventWindow[1] > 0 ? `+${eventWindow[1]}` : eventWindow[1]}]
        </span>
      </p>
    </section>
  );
}

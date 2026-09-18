import type { StockReaction } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MetricCard } from "@/components/common/MetricCard";

function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function toneFor(value: number): "default" | "positive" | "negative" {
  if (value > 0.05) return "positive";
  if (value < -0.05) return "negative";
  return "default";
}

/**
 * "Historical Market Reaction" — Actual/Expected/Abnormal Return + CAR
 * for one stock's event window. Explicitly labeled as a historical
 * event-window observation, never framed as a future prediction.
 */
export function StockHistoricalReaction({ reaction }: { reaction: StockReaction }) {
  return (
    <section>
      <SectionHeader title="Historical Market Reaction" />
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard label="Actual Return" value={formatPercent(reaction.actualReturnPercent)} tone={toneFor(reaction.actualReturnPercent)} />
          <MetricCard label="Expected Return" value={formatPercent(reaction.expectedReturnPercent)} />
          <MetricCard label="Abnormal Return" value={formatPercent(reaction.abnormalReturnPercent)} tone={toneFor(reaction.abnormalReturnPercent)} />
          <MetricCard label="CAR" value={formatPercent(reaction.carPercent)} tone={toneFor(reaction.carPercent)} />
        </div>
        <p className="mt-4 text-xs text-muted">
          Event Window:{" "}
          <span className="font-medium text-foreground">
            [{reaction.eventWindow[0]}, {reaction.eventWindow[1] > 0 ? `+${reaction.eventWindow[1]}` : reaction.eventWindow[1]}]
          </span>
        </p>
        <p className="mt-2 text-xs italic text-muted">Historical event-window observation.</p>
      </div>
    </section>
  );
}

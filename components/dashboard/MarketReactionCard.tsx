import type { MarketReaction } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MetricCard } from "@/components/common/MetricCard";

function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function MarketReactionCard({ reaction }: { reaction: MarketReaction }) {
  return (
    <section>
      <SectionHeader eyebrow="How Did Market React?" title="Market Reaction" />

      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-foreground">
            Sector: {reaction.sector}
          </p>
          <StatusBadge
            label={reaction.classification.replace("_", " ")}
            classification={reaction.classification}
          />
        </div>

        {/* Expected vs. Actual — kept visually distinct, side by side */}
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard
            label="Expected Return"
            value={formatPercent(reaction.expectedReturnPercent)}
          />
          <MetricCard
            label="Actual Return"
            value={formatPercent(reaction.actualReturnPercent)}
            tone={reaction.actualReturnPercent < 0 ? "negative" : "positive"}
          />
          <MetricCard
            label="Abnormal Return"
            value={formatPercent(reaction.abnormalReturnPercent)}
            tone={reaction.abnormalReturnPercent < 0 ? "negative" : "positive"}
          />
          <MetricCard label="Abnormal Score" value={reaction.abnormalScore.toFixed(1)} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <MetricCard label="Volume" value={`${reaction.volumeRatio.toFixed(1)}×`} />
          <MetricCard
            label="Volatility"
            value={`+${reaction.volatilityChangePercent.toFixed(0)}%`}
          />
        </div>

        <p className="mt-5 text-xs leading-relaxed text-muted">
          The observed market movement was substantially larger than the
          normal return expected from market conditions. This describes
          analytical direction and magnitude only — it is not a trading
          signal.
        </p>
      </div>
    </section>
  );
}

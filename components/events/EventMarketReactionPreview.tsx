import Link from "next/link";
import type { MarketReactionPreview } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MetricCard } from "@/components/common/MetricCard";

function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Compact Market Reaction preview for the Event Detail page. This is
 * deliberately NOT the full Market Reaction page (volume, volatility,
 * abnormal score, and classification live there, not here) — it only
 * shows the three headline return figures and links onward.
 *
 * Expected Return is a baseline/counterfactual estimate for comparing
 * the market's reaction, not an investment prediction.
 */
export function EventMarketReactionPreview({
  preview,
}: {
  preview: MarketReactionPreview;
}) {
  return (
    <section>
      <SectionHeader eyebrow="How Did Market React?" title="Market Reaction" />
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <MetricCard
            label="Expected Return"
            value={formatPercent(preview.expectedReturnPercent)}
          />
          <MetricCard
            label="Actual Return"
            value={formatPercent(preview.actualReturnPercent)}
            tone={preview.actualReturnPercent < 0 ? "negative" : "positive"}
          />
          <MetricCard
            label="Abnormal Return"
            value={formatPercent(preview.abnormalReturnPercent)}
            tone={preview.abnormalReturnPercent < 0 ? "negative" : "positive"}
          />
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Expected Return is a baseline estimate for comparison, not a price
          prediction. Full statistical significance, volume, and volatility
          analysis is available on the Market Reaction page.
        </p>

        <Link
          href="/reactions"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
        >
          View Market Reaction →
        </Link>
      </div>
    </section>
  );
}

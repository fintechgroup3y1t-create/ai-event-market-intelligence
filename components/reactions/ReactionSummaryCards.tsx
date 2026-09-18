import type { EventMarketReaction } from "@/lib/types";
import { MetricCard } from "@/components/common/MetricCard";
import { REACTION_LEVEL_LABEL, REACTION_LEVEL_TONE, toneForReturn } from "./reactionTone";

function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * 4 summary cards: Market Return, Expected Return, Abnormal Return
 * (direction-aware — never red just for being abnormal), and Reaction
 * Classification. All values come straight from mock data.
 */
export function ReactionSummaryCards({ reaction }: { reaction: EventMarketReaction }) {
  const abnormalTone = toneForReturn(reaction.abnormalReturnPercent);
  const marketTone = toneForReturn(reaction.marketReturnPercent);
  const classificationTone = REACTION_LEVEL_TONE[reaction.classification];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <MetricCard
        label="Market Return"
        value={formatPercent(reaction.marketReturnPercent)}
        tone={marketTone === "neutral" ? "default" : marketTone}
      />
      <MetricCard
        label="Expected Return"
        value={formatPercent(reaction.expectedReturnPercent)}
      />
      <MetricCard
        label="Abnormal Return"
        value={formatPercent(reaction.abnormalReturnPercent)}
        tone={abnormalTone === "neutral" ? "default" : abnormalTone}
      />
      <MetricCard
        label="Reaction Classification"
        value={REACTION_LEVEL_LABEL[reaction.classification]}
        tone={classificationTone === "neutral" ? "default" : classificationTone}
      />
    </div>
  );
}

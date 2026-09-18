import Link from "next/link";
import { MarketReactionExplorer } from "@/components/reactions/MarketReactionExplorer";
import { ReactionMethodology } from "@/components/reactions/ReactionMethodology";
import { EVENTS, MARKET_REACTIONS } from "@/lib/mockData";

/**
 * Market Reaction — answers HOW DID THE MARKET REACT?. All data is
 * mock (lib/mockData.ts); this is a market intelligence view of
 * historical reaction, not a trading signal or prediction.
 */
export default function ReactionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Market Reaction</h1>
        <p className="mt-1 text-sm text-muted">
          How did the market react after major events?
        </p>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
          Historical abnormal returns help identify whether market movements
          around an event were unusual relative to normal market behavior.
        </p>
      </div>

      <MarketReactionExplorer events={EVENTS} reactions={MARKET_REACTIONS} />

      <ReactionMethodology />

      <section className="rounded-lg border border-border bg-surface p-6">
        <h2 className="text-sm font-semibold text-foreground">Sector Impact</h2>
        <p className="mt-1 text-sm text-muted">
          See which sectors were affected by this event.
        </p>
        <Link
          href="/sectors"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
        >
          View Sector Impact →
        </Link>
      </section>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { StockEventRelationship } from "@/components/stocks/StockEventRelationship";
import { StockHistoricalReaction } from "@/components/stocks/StockHistoricalReaction";
import { StockEventHistoryList } from "@/components/stocks/StockEventHistoryList";
import { AIStockContext } from "@/components/stocks/AIStockContext";
import { StockSectorContext } from "@/components/stocks/StockSectorContext";
import { ReactionChart } from "@/components/reactions/ReactionChart";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MetricCard } from "@/components/common/MetricCard";
import {
  EVENTS,
  STOCKS,
  STOCK_EVENT_EXPOSURES,
  STOCK_EVENT_HISTORY,
  STOCK_REACTIONS,
} from "@/lib/mockData";

/**
 * Stock Detail — extends EVENT -> SECTOR -> STOCK to a single stock.
 * All data is mock; historical values are clearly labeled as
 * historical event-window observations, never a prediction.
 */
export default function StockDetailPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol.toUpperCase();
  const stock = STOCKS.find((item) => item.symbol === symbol);

  if (!stock) {
    notFound();
    return null;
  }

  const exposure = STOCK_EVENT_EXPOSURES.find((item) => item.symbol === symbol);
  const event = exposure ? EVENTS.find((item) => item.id === exposure.eventId) : undefined;
  const reaction = STOCK_REACTIONS.find((item) => item.symbol === symbol);
  const history = STOCK_EVENT_HISTORY[symbol] ?? [];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/stocks"
          className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-foreground"
        >
          ← Back to Stocks
        </Link>
        <h1 className="mt-3 text-xl font-semibold text-foreground">{stock.symbol}</h1>
        <p className="mt-1 text-sm text-muted">{stock.companyName}</p>
        <p className="mt-1 text-xs text-muted">
          Sector: <span className="font-medium text-foreground">{stock.sector}</span>
        </p>
      </div>

      <section>
        <SectionHeader title="Stock Overview" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MetricCard label="Sector" value={stock.sector} />
          <MetricCard label="Event Exposure" value={event ? event.title : "None"} />
          <MetricCard label="Impact Score" value={exposure ? String(exposure.impactScore) : "—"} />
          <MetricCard
            label="Historical Abnormal Return"
            value={reaction ? `${reaction.abnormalReturnPercent > 0 ? "+" : ""}${reaction.abnormalReturnPercent.toFixed(2)}%` : "—"}
            tone={
              reaction
                ? reaction.abnormalReturnPercent > 0.05
                  ? "positive"
                  : reaction.abnormalReturnPercent < -0.05
                    ? "negative"
                    : "default"
                : "default"
            }
          />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Impact Score measures the estimated relevance and severity of this
          event for this stock&apos;s sector — it does not represent expected
          stock return. Historical Abnormal Return is historical
          event-window information, not an expected future return.
        </p>
      </section>

      {event && exposure ? (
        <>
          <StockEventRelationship event={event} exposure={exposure} sector={stock.sector} />
          {reaction && (
            <>
              <StockHistoricalReaction reaction={reaction} />
              <ReactionChart timeline={reaction.timeline} />
            </>
          )}
        </>
      ) : (
        <p className="rounded-lg border border-border bg-surface p-6 text-sm text-muted">
          This stock has no current event exposure in this mock dataset.
        </p>
      )}

      <StockEventHistoryList entries={history} />

      <AIStockContext
        text={
          exposure && reaction
            ? `${stock.symbol} is classified within the ${stock.sector} sector. In the selected historical event context, the stock showed a ${
                reaction.abnormalReturnPercent > 0.05 ? "positive" : reaction.abnormalReturnPercent < -0.05 ? "negative" : "neutral"
              } abnormal reaction relative to its estimated normal return. This observation describes the historical event window and does not indicate future price direction.`
            : `${stock.symbol} is classified within the ${stock.sector} sector. No current historical event reaction is available for this stock in this mock dataset.`
        }
      />

      <StockSectorContext sector={stock.sector} eventId={event?.id} />

      <p className="text-xs text-muted">Mock historical data — for demonstration only.</p>
    </div>
  );
}


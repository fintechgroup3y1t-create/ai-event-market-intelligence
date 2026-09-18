import { MetricCard } from "@/components/common/MetricCard";
import { StocksExplorer } from "@/components/stocks/StocksExplorer";
import {
  EVENTS,
  STOCKS,
  STOCK_EVENT_EXPOSURES,
  STOCK_EVENT_HISTORY,
  STOCK_REACTIONS,
} from "@/lib/mockData";

/**
 * Stocks — extends the intelligence flow EVENT -> SECTOR -> STOCK. All
 * data is mock (lib/mockData.ts); summary counts below are plain
 * array counts/filters, not financial calculations.
 */
export default function StocksPage() {
  const sectorsCovered = new Set(STOCKS.map((stock) => stock.sector)).size;
  const stocksWithExposure = STOCK_EVENT_EXPOSURES.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Stocks</h1>
        <p className="mt-1 text-sm text-muted">
          Explore stocks exposed to major market events and sector-level
          impacts.
        </p>
        <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted">
          Stocks are grouped by sector and linked to relevant market events
          to provide context for historical market reactions.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Stocks Covered" value={String(STOCKS.length)} />
        <MetricCard label="Sectors Covered" value={String(sectorsCovered)} />
        <MetricCard label="Active Events" value={String(EVENTS.length)} />
        <MetricCard label="Stocks with Event Exposure" value={String(stocksWithExposure)} />
      </div>

      <StocksExplorer
        stocks={STOCKS}
        events={EVENTS}
        exposures={STOCK_EVENT_EXPOSURES}
        reactions={STOCK_REACTIONS}
        eventHistory={STOCK_EVENT_HISTORY}
      />

      <p className="text-xs leading-relaxed text-muted">
        Impact Score measures the estimated relevance and severity of an
        event for a sector or stock. It does not represent expected stock
        return. Historical Abnormal Return is historical event-window
        information, not an expected future return.
      </p>

      <p className="text-xs text-muted">Mock historical data — for demonstration only.</p>
    </div>
  );
}

import type { MarketOverviewItem } from "@/lib/types";

function formatChange(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function MarketOverview({ items }: { items: MarketOverviewItem[] }) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Market Overview
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => {
          const isPositive = item.changePercent > 0;
          const isNegative = item.changePercent < 0;
          const changeColor = isPositive
            ? "text-positive"
            : isNegative
              ? "text-negative"
              : "text-neutral";
          const arrow = isPositive ? "▲" : isNegative ? "▼" : "—";

          return (
            <div
              key={item.symbol}
              className="rounded-lg border border-border bg-surface p-4"
            >
              <p className="text-xs font-medium text-muted">{item.label}</p>
              <p className={`mt-1 flex items-center gap-1 text-lg font-semibold ${changeColor}`}>
                <span className="text-xs">{arrow}</span>
                {formatChange(item.changePercent)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

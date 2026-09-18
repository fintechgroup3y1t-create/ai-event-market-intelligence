import Link from "next/link";
import type {
  AbnormalReactionLevel,
  Stock,
  StockEventExposure,
  StockReaction,
} from "@/lib/types";
import { StatusBadge } from "@/components/common/StatusBadge";

const CLASSIFICATION_STYLE: Record<AbnormalReactionLevel, string> = {
  SIGNIFICANT_POSITIVE: "border-positive/30 bg-positive/10 text-positive",
  MODERATE_POSITIVE: "border-positive/30 bg-positive/10 text-positive",
  NEUTRAL: "border-neutral/30 bg-neutral/10 text-neutral",
  MODERATE_NEGATIVE: "border-negative/30 bg-negative/10 text-negative",
  SIGNIFICANT_NEGATIVE: "border-negative/30 bg-negative/10 text-negative",
};

function ClassificationBadge({ classification }: { classification: AbnormalReactionLevel }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${CLASSIFICATION_STYLE[classification]}`}
    >
      {classification.replace(/_/g, " ")}
    </span>
  );
}

function formatAbnormalReturn(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export interface StockRow {
  stock: Stock;
  exposure?: StockEventExposure;
  eventTitle?: string;
  reaction?: StockReaction;
  classification?: AbnormalReactionLevel;
}

/**
 * Stock | Company | Sector | Event Exposure | Impact Score | Direction |
 * Historical Abnormal Return | Classification. Mirrors the same
 * responsive dual-layout pattern used throughout this project (stacked
 * cards below `sm`, table from `sm` up, no fixed min-width). Impact
 * Score is explicitly not a return figure; Historical Abnormal Return
 * is historical event-window information, never called an "expected
 * future return".
 */
export function StockTable({ rows }: { rows: StockRow[] }) {
  return (
    <>
      {/* Small mobile: stacked cards, no horizontal scroll */}
      <div className="space-y-3 sm:hidden">
        {rows.map(({ stock, exposure, eventTitle, reaction, classification }) => (
          <Link
            key={stock.symbol}
            href={`/stocks/${stock.symbol}`}
            className="block rounded-lg border border-border bg-surface p-4 transition-colors hover:border-ai-accent/40 hover:bg-surface-hover"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">{stock.symbol}</p>
              {exposure && <StatusBadge label={exposure.direction} direction={exposure.direction} />}
            </div>
            <p className="mt-0.5 text-xs text-muted">{stock.companyName}</p>
            <p className="mt-1 text-xs text-muted">{stock.sector}</p>
            {exposure ? (
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="text-muted">
                  {eventTitle} · Impact <span className="font-medium text-foreground">{exposure.impactScore}</span>
                </span>
                {reaction && (
                  <span className="font-medium text-foreground">
                    {formatAbnormalReturn(reaction.abnormalReturnPercent)}
                  </span>
                )}
                {classification && <ClassificationBadge classification={classification} />}
              </div>
            ) : (
              <p className="mt-2 text-xs text-muted">No current event exposure</p>
            )}
          </Link>
        ))}
      </div>

      {/* Tablet and up: table, no fixed min-width */}
      <div className="hidden overflow-x-auto rounded-lg border border-border bg-surface sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Sector</th>
              <th className="px-4 py-3 font-medium">Event Exposure</th>
              <th className="px-4 py-3 font-medium">Impact Score</th>
              <th className="px-4 py-3 font-medium">Direction</th>
              <th className="px-4 py-3 font-medium">Historical Abnormal Return</th>
              <th className="px-4 py-3 font-medium">Classification</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ stock, exposure, eventTitle, reaction, classification }) => (
              <tr key={stock.symbol} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/stocks/${stock.symbol}`}
                    className="font-semibold text-ai-accent hover:underline"
                  >
                    {stock.symbol}
                  </Link>
                </td>
                <td className="px-4 py-3 text-muted">{stock.companyName}</td>
                <td className="px-4 py-3 text-foreground">{stock.sector}</td>
                <td className="px-4 py-3 text-muted">{eventTitle ?? "—"}</td>
                <td className="px-4 py-3 text-foreground">{exposure ? exposure.impactScore : "—"}</td>
                <td className="px-4 py-3">
                  {exposure ? (
                    <StatusBadge label={exposure.direction} direction={exposure.direction} />
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-foreground">
                  {reaction ? formatAbnormalReturn(reaction.abnormalReturnPercent) : "—"}
                </td>
                <td className="px-4 py-3">
                  {classification ? <ClassificationBadge classification={classification} /> : <span className="text-muted">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

import type { AbnormalReactionLevel, StockEventHistoryEntry } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";

const CLASSIFICATION_STYLE: Record<AbnormalReactionLevel, string> = {
  SIGNIFICANT_POSITIVE: "border-positive/30 bg-positive/10 text-positive",
  MODERATE_POSITIVE: "border-positive/30 bg-positive/10 text-positive",
  NEUTRAL: "border-neutral/30 bg-neutral/10 text-neutral",
  MODERATE_NEGATIVE: "border-negative/30 bg-negative/10 text-negative",
  SIGNIFICANT_NEGATIVE: "border-negative/30 bg-negative/10 text-negative",
};

function formatAbnormalReturn(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/**
 * "Event Impact History" — several historical mock events for the
 * selected stock. These are illustrative mock examples only.
 */
export function StockEventHistoryList({ entries }: { entries: StockEventHistoryEntry[] }) {
  if (entries.length === 0) {
    return (
      <section>
        <SectionHeader title="Event Impact History" />
        <p className="rounded-lg border border-border bg-surface p-6 text-sm text-muted">
          No historical event data is available for this stock yet.
        </p>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title="Event Impact History" />
      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.eventId} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">{entry.eventTitle}</p>
              <span className="text-xs text-muted">{entry.date}</span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
              <StatusBadge label={entry.direction} direction={entry.direction} />
              <span className="text-muted">
                Impact <span className="font-medium text-foreground">{entry.impactScore}</span>
              </span>
              <span className="text-muted">
                Abnormal Return{" "}
                <span className="font-medium text-foreground">
                  {formatAbnormalReturn(entry.abnormalReturnPercent)}
                </span>
              </span>
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 font-medium ${CLASSIFICATION_STYLE[entry.classification]}`}
              >
                {entry.classification.replace(/_/g, " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import type { MarketEvent } from "@/lib/types";
import { StatusBadge } from "@/components/common/StatusBadge";
import { SectionHeader } from "@/components/common/SectionHeader";

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-0">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

/**
 * "Event Summary" card — answers WHAT HAPPENED?. Every field is read
 * directly from the mock MarketEvent; nothing is computed here.
 */
export function EventSummaryCard({ event }: { event: MarketEvent }) {
  return (
    <section>
      <SectionHeader title="Event Summary" />
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="text-sm leading-relaxed text-muted">{event.summary}</p>

        <div className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <div>
            <InfoRow label="Actor" value={event.actor} />
            <InfoRow label="Action" value={event.action} />
            <InfoRow label="Affected Asset" value={event.affectedAsset} />
            <InfoRow
              label="Asset Movement"
              value={
                <span
                  className={
                    event.assetChangePercent >= 0
                      ? "text-positive"
                      : "text-negative"
                  }
                >
                  {event.assetChangePercent >= 0 ? "+" : ""}
                  {event.assetChangePercent.toFixed(2)}%
                </span>
              }
            />
          </div>
          <div>
            <InfoRow
              label="Direction"
              value={
                <StatusBadge label={event.direction} eventDirection={event.direction} />
              }
            />
            <InfoRow label="Magnitude" value={`${event.magnitude} / 5`} />
            <InfoRow label="Confidence" value={`${event.confidence}%`} />
            <InfoRow label="Source Count" value={event.sourceCount} />
          </div>
        </div>
      </div>
    </section>
  );
}

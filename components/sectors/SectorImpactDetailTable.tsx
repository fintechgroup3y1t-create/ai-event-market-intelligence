import type { ImpactClassification, SectorImpact } from "@/lib/types";
import { StatusBadge } from "@/components/common/StatusBadge";

const CLASSIFICATION_STYLE: Record<ImpactClassification, string> = {
  VERY_LOW: "border-neutral/30 bg-neutral/10 text-neutral",
  LOW: "border-neutral/30 bg-neutral/10 text-neutral",
  MODERATE: "border-mixed/30 bg-mixed/10 text-mixed",
  HIGH: "border-ai-accent/30 bg-ai-accent/10 text-ai-accent",
  VERY_HIGH: "border-ai-accent/40 bg-ai-accent/15 text-ai-accent",
};

function ClassificationBadge({ classification }: { classification: ImpactClassification }) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${CLASSIFICATION_STYLE[classification]}`}
    >
      {classification.replace("_", " ")}
    </span>
  );
}

/**
 * Extended Cross-Sector Impact table for the Sector Impact page —
 * adds a Classification column (and Confidence on the mobile card
 * view) beyond what components/dashboard/SectorImpactTable.tsx shows.
 *
 * This is a deliberate sibling component, not a modification of that
 * file: SectorImpactTable.tsx is a frozen Step-1 critical fix already
 * used as-is by the Dashboard and Event Detail pages, and changing its
 * columns would alter those pages' appearance too. This component
 * mirrors its exact responsive dual-layout pattern (stacked cards
 * below `sm`, table from `sm` up, no fixed min-width) so no new
 * responsive behavior is introduced — only the extra column.
 */
export function SectorImpactDetailTable({ items }: { items: SectorImpact[] }) {
  return (
    <>
      {/* Small mobile: stacked cards, no horizontal scroll */}
      <div className="space-y-3 sm:hidden">
        {items.map((item) => (
          <div key={item.sector} className="rounded-lg border border-border bg-surface p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">{item.sector}</p>
              <StatusBadge label={item.direction} direction={item.direction} />
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span>
                Impact Score{" "}
                <span className="font-medium text-foreground">{item.impactScore}</span>
              </span>
              <ClassificationBadge classification={item.classification} />
              {item.confidence !== undefined && (
                <span>
                  Confidence{" "}
                  <span className="font-medium text-foreground">{item.confidence}%</span>
                </span>
              )}
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">{item.reason}</p>
          </div>
        ))}
      </div>

      {/* Tablet and up: table, no fixed min-width */}
      <div className="hidden overflow-x-auto rounded-lg border border-border bg-surface sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Sector</th>
              <th className="px-4 py-3 font-medium">Direction</th>
              <th className="px-4 py-3 font-medium">Impact Score</th>
              <th className="px-4 py-3 font-medium">Classification</th>
              <th className="px-4 py-3 font-medium">Reason</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sector} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{item.sector}</td>
                <td className="px-4 py-3">
                  <StatusBadge label={item.direction} direction={item.direction} />
                </td>
                <td className="px-4 py-3 text-foreground">{item.impactScore}</td>
                <td className="px-4 py-3">
                  <ClassificationBadge classification={item.classification} />
                </td>
                <td className="px-4 py-3 text-muted">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

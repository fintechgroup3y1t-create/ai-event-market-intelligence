import type { ReactionTimelinePoint } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { toneForReturn, TONE_TEXT_CLASS } from "./reactionTone";

function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

function ToneValue({ value }: { value: number }) {
  const tone = toneForReturn(value);
  return <span className={TONE_TEXT_CLASS[tone]}>{formatPercent(value)}</span>;
}

/**
 * "Abnormal Return Table" — Event Day | Actual Return | Expected
 * Return | Abnormal Return. Mirrors the same responsive dual-layout
 * pattern already established in components/dashboard/SectorImpactTable.tsx
 * and components/sectors/SectorImpactDetailTable.tsx (stacked cards
 * below `sm`, table from `sm` up, no fixed min-width) — new sibling
 * component, no existing file modified.
 */
export function AbnormalReturnTable({ timeline }: { timeline: ReactionTimelinePoint[] }) {
  return (
    <section>
      <SectionHeader title="Abnormal Return Table" />

      {/* Small mobile: stacked cards, no horizontal scroll */}
      <div className="space-y-2 sm:hidden">
        {timeline.map((point) => (
          <div
            key={point.day}
            className="rounded-lg border border-border bg-surface p-3"
          >
            <p className="text-xs font-medium text-muted">
              Event Day {point.day > 0 ? `+${point.day}` : point.day}
            </p>
            <div className="mt-1 grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-[10px] text-muted">Actual</p>
                <ToneValue value={point.actualReturnPercent} />
              </div>
              <div>
                <p className="text-[10px] text-muted">Expected</p>
                <span className="text-foreground">{formatPercent(point.expectedReturnPercent)}</span>
              </div>
              <div>
                <p className="text-[10px] text-muted">Abnormal</p>
                <ToneValue value={point.abnormalReturnPercent} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet and up: table, no fixed min-width */}
      <div className="hidden overflow-x-auto rounded-lg border border-border bg-surface sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Event Day</th>
              <th className="px-4 py-3 font-medium">Actual Return</th>
              <th className="px-4 py-3 font-medium">Expected Return</th>
              <th className="px-4 py-3 font-medium">Abnormal Return</th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((point) => (
              <tr key={point.day} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">
                  {point.day > 0 ? `+${point.day}` : point.day}
                </td>
                <td className="px-4 py-3">
                  <ToneValue value={point.actualReturnPercent} />
                </td>
                <td className="px-4 py-3 text-foreground">
                  {formatPercent(point.expectedReturnPercent)}
                </td>
                <td className="px-4 py-3">
                  <ToneValue value={point.abnormalReturnPercent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

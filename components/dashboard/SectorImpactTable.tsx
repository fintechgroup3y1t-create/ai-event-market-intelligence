import type { SectorImpact } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";

export function SectorImpactTable({ items }: { items: SectorImpact[] }) {
  return (
    <section>
      <SectionHeader eyebrow="Who Is Affected?" title="Cross-Sector Impact" />

      {/* Small mobile: stacked card layout, no horizontal scroll */}
      <div className="space-y-3 sm:hidden">
        {items.map((item) => (
          <div
            key={item.sector}
            className="rounded-lg border border-border bg-surface p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-foreground">
                {item.sector}
              </p>
              <StatusBadge label={item.direction} direction={item.direction} />
            </div>
            <p className="mt-2 text-xs text-muted">
              Impact Score{" "}
              <span className="font-medium text-foreground">
                {item.impactScore}
              </span>
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {item.reason}
            </p>
          </div>
        ))}
      </div>

      {/* Tablet and up: normal table, no fixed min-width so it never
          forces horizontal scroll on the small-mobile view above */}
      <div className="hidden overflow-x-auto rounded-lg border border-border bg-surface sm:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-medium">Sector</th>
              <th className="px-4 py-3 font-medium">Direction</th>
              <th className="px-4 py-3 font-medium">Impact Score</th>
              <th className="px-4 py-3 font-medium">Reason</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.sector}
                className="border-b border-border last:border-0"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {item.sector}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge label={item.direction} direction={item.direction} />
                </td>
                <td className="px-4 py-3 text-foreground">{item.impactScore}</td>
                <td className="px-4 py-3 text-muted">{item.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

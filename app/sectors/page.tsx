import Link from "next/link";
import { MetricCard } from "@/components/common/MetricCard";
import { SectorImpactExplorer } from "@/components/sectors/SectorImpactExplorer";
import { ImpactDrivers } from "@/components/sectors/ImpactDrivers";
import { EVENTS, EVENT_SECTOR_IMPACTS, IMPACT_DRIVERS } from "@/lib/mockData";

/**
 * Sector Impact — answers WHO IS AFFECTED?. All data is mock
 * (lib/mockData.ts); the summary counts below are simple array
 * counts/filters over that mock data, not financial calculations.
 */
export default function SectorsPage() {
  const allSectorImpacts = Object.values(EVENT_SECTOR_IMPACTS).flat();
  const uniqueSectors = new Set(allSectorImpacts.map((item) => item.sector));
  const highImpactCount = allSectorImpacts.filter((item) => item.impactScore >= 70).length;
  const mixedCount = allSectorImpacts.filter((item) => item.direction === "MIXED").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Sector Impact</h1>
        <p className="mt-1 text-sm text-muted">
          Understand how major market events and economic drivers affect
          different sectors.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Active Events" value={String(EVENTS.length)} />
        <MetricCard label="Sectors Affected" value={String(uniqueSectors.size)} />
        <MetricCard label="High Impact Sectors" value={String(highImpactCount)} />
        <MetricCard label="Mixed Impact" value={String(mixedCount)} />
      </div>

      <SectorImpactExplorer events={EVENTS} sectorImpactsByEventId={EVENT_SECTOR_IMPACTS} />

      <ImpactDrivers drivers={IMPACT_DRIVERS} />

      <section className="rounded-lg border border-border bg-surface p-6">
        <h2 className="text-sm font-semibold text-foreground">Market Reaction</h2>
        <p className="mt-1 text-sm text-muted">
          See how the market actually responded after the event.
        </p>
        <Link
          href="/reactions"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
        >
          View Market Reaction →
        </Link>
      </section>
    </div>
  );
}

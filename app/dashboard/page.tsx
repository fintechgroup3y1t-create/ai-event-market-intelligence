import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { MajorEventCard } from "@/components/dashboard/MajorEventCard";
import { SectorImpactTable } from "@/components/dashboard/SectorImpactTable";
import { MarketReactionCard } from "@/components/dashboard/MarketReactionCard";
import { EventTimeline } from "@/components/dashboard/EventTimeline";
import { ExpectedActualChart } from "@/components/dashboard/ExpectedActualChart";
import {
  EVENT_TIMELINE,
  EXPECTED_VS_ACTUAL_CHART_DATA,
  MAJOR_EVENT,
  MARKET_OVERVIEW,
  MARKET_REACTION,
  SECTOR_IMPACTS,
} from "@/lib/mockData";

/**
 * Dashboard — Phase 3.1 mockup, mock data only (see lib/mockData.ts).
 * Communicates the Event -> Sector Impact -> Market Reaction flow.
 */
export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">
          What happened, who is affected, and how the market reacted.
        </p>
      </div>

      <MarketOverview items={MARKET_OVERVIEW} />
      <MajorEventCard event={MAJOR_EVENT} />
      <SectorImpactTable items={SECTOR_IMPACTS} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <MarketReactionCard reaction={MARKET_REACTION} />
        <ExpectedActualChart data={EXPECTED_VS_ACTUAL_CHART_DATA} />
      </div>
      <EventTimeline items={EVENT_TIMELINE} />
    </div>
  );
}

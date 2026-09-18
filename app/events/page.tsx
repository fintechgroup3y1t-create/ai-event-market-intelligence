import { MetricCard } from "@/components/common/MetricCard";
import { EventList } from "@/components/events/EventList";
import { EVENTS } from "@/lib/mockData";

/**
 * Events List — answers WHAT HAPPENED?. All data is mock (lib/mockData.ts);
 * the summary counts below are simple array counts over that mock data,
 * not financial calculations.
 */
export default function EventsPage() {
  const totalEvents = EVENTS.length;
  const highImpactCount = EVENTS.filter((event) => event.impactScore >= 70).length;
  const confirmedCount = EVENTS.filter((event) => event.status === "CONFIRMED").length;
  const monitoringCount = EVENTS.filter((event) => event.status === "MONITORING").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Market Events</h1>
        <p className="mt-1 text-sm text-muted">
          Monitor significant events detected from news and market data.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MetricCard label="Total Events" value={String(totalEvents)} />
        <MetricCard label="High Impact" value={String(highImpactCount)} />
        <MetricCard label="Confirmed Events" value={String(confirmedCount)} />
        <MetricCard label="Monitoring" value={String(monitoringCount)} />
      </div>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Recent Market Events
        </h2>
        <EventList events={EVENTS} />
      </section>
    </div>
  );
}

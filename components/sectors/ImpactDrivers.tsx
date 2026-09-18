import type { ImpactDriver } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";

/**
 * "Impact Drivers" — static, illustrative explainer cards (mock data
 * from lib/mockData.ts), plus one compact visual driver-to-sector
 * example. This is explanatory content only, not the real Knowledge
 * Base engine, and computes nothing.
 */
export function ImpactDrivers({ drivers }: { drivers: ImpactDriver[] }) {
  const exampleDriver = drivers.find((driver) => driver.exampleImpacts);

  return (
    <section>
      <SectionHeader title="Impact Drivers" />
      <p className="mb-4 text-sm text-muted">
        Common economic and market drivers this analysis considers, and the
        sectors each one typically transmits to.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {drivers.map((driver) => (
          <div key={driver.name} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-foreground">{driver.label}</p>
            <p className="mt-1 text-xs text-muted">{driver.affectedSectors.join(" · ")}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{driver.explanation}</p>
          </div>
        ))}
      </div>

      {exampleDriver?.exampleImpacts && (
        <div className="mt-5 rounded-lg border border-border bg-surface p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ai-accent">
            {exampleDriver.label} → Sector Example
          </p>
          <div className="mt-3 space-y-2">
            {exampleDriver.exampleImpacts.map((impact) => (
              <div
                key={impact.sector}
                className="flex items-center justify-between gap-3 border-b border-border pb-2 text-sm last:border-0 last:pb-0"
              >
                <span className="text-foreground">{impact.sector}</span>
                <StatusBadge label={impact.direction} direction={impact.direction} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

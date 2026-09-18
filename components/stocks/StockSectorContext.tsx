import Link from "next/link";
import { SectionHeader } from "@/components/common/SectionHeader";

/**
 * "Sector Context" — small section linking onward to the full Sector
 * Impact page and back to the related event's detail page.
 */
export function StockSectorContext({ sector, eventId }: { sector: string; eventId?: string }) {
  return (
    <section>
      <SectionHeader title="Sector Context" />
      <div className="rounded-lg border border-border bg-surface p-6">
        <p className="text-sm font-medium text-foreground">{sector}</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href="/sectors"
            className="inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
          >
            View Sector Impact →
          </Link>
          {eventId && (
            <Link
              href={`/events/${eventId}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-ai-accent hover:underline"
            >
              View Event Details →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

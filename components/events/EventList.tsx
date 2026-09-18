import type { MarketEvent } from "@/lib/types";
import { EventCard } from "./EventCard";

export function EventList({ events }: { events: MarketEvent[] }) {
  return (
    <div className="space-y-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

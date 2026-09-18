import type { TimelineEvent } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";

export function EventTimeline({ items }: { items: TimelineEvent[] }) {
  return (
    <section>
      <SectionHeader title="Event Timeline" />

      {/* Mobile: vertical list */}
      <ol className="space-y-4 sm:hidden">
        {items.map((item) => (
          <li key={item.time} className="flex gap-3">
            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ai-accent" />
            <div>
              <p className="text-xs font-medium text-muted">{item.time}</p>
              <p className="text-sm text-foreground">{item.label}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop: horizontal timeline */}
      <ol className="hidden items-start sm:flex">
        {items.map((item, index) => (
          <li key={item.time} className="flex flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <div
                className={`h-px flex-1 ${index === 0 ? "bg-transparent" : "bg-border"}`}
              />
              <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-ai-accent" />
              <div
                className={`h-px flex-1 ${index === items.length - 1 ? "bg-transparent" : "bg-border"}`}
              />
            </div>
            <p className="mt-2 text-xs font-medium text-muted">{item.time}</p>
            <p className="mt-0.5 max-w-[9rem] text-xs text-foreground">
              {item.label}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

"use client";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-surface/95 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Toggle navigation"
        className="rounded-md p-2 text-muted hover:bg-surface-hover hover:text-foreground md:hidden"
      >
        <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.75}>
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
      </button>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold tracking-wide text-foreground">
          AI EVENT-TO-MARKET INTELLIGENCE
        </h1>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-positive" />
            Data updated 2 min ago
          </span>
          <span className="flex items-center gap-1.5 text-ai-accent">
            <span aria-hidden="true">✦</span>
            AI analysis active
          </span>
          <span className="rounded border border-mixed/40 bg-mixed/10 px-1.5 py-0.5 font-medium text-mixed">
            DEMO / MOCK DATA
          </span>
        </div>
      </div>

      <div className="hidden items-center sm:flex">
        <input
          type="search"
          aria-label="Search events, sectors, stocks"
          placeholder="Search events, sectors, stocks…"
          className="w-64 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-ai-accent"
        />
      </div>
    </header>
  );
}

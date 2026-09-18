"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Structural nav for the dashboard. Only /dashboard is fully
 * implemented in Phase 3.1 — the rest are clean placeholders.
 */
const NAV_ITEMS: { href: string; label: string; icon: ReactNode }[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <path d="M3 13h4v7H3zM10 4h4v16h-4zM17 9h4v11h-4z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    href: "/events",
    label: "Events",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
      </>
    ),
  },
  {
    href: "/sectors",
    label: "Sector Impact",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v8l6 3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    href: "/reactions",
    label: "Market Reaction",
    icon: (
      <path
        d="M3 17l5-6 4 4 8-9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    href: "/stocks",
    label: "Stocks",
    icon: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      className="shrink-0"
    >
      {children}
    </svg>
  );
}

export function Sidebar({
  mobileOpen,
  onNavigate,
}: {
  mobileOpen: boolean;
  onNavigate: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={onNavigate}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface transition-transform md:static md:z-auto md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 flex-col justify-center border-b border-border px-6">
          <span className="text-sm font-bold leading-tight tracking-tight text-foreground">
            AI EVENT
          </span>
          <span className="text-xs font-medium leading-tight text-ai-accent">
            MARKET INTELLIGENCE
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              <NavIcon>{item.icon}</NavIcon>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border px-3 py-3">
          <Link
            href="/settings"
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <NavIcon>
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 11-4 0v-.09a1.7 1.7 0 00-1-1.55 1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.7 1.7 0 00.34-1.87 1.7 1.7 0 00-1.55-1H3a2 2 0 110-4h.09a1.7 1.7 0 001.55-1 1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06a1.7 1.7 0 001.87.34H9a1.7 1.7 0 001-1.55V3a2 2 0 114 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06a1.7 1.7 0 00-.34 1.87V9a1.7 1.7 0 001.55 1H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.55 1z" />
            </NavIcon>
            Settings
          </Link>
        </div>

        <div className="border-t border-border px-4 py-4 text-xs leading-relaxed text-muted">
          Market intelligence tool. Not a trading signal.
        </div>
      </aside>
    </>
  );
}

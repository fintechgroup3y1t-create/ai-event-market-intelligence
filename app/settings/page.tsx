import { SectionHeader } from "@/components/common/SectionHeader";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-0">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

/**
 * Settings — a simple, polished informational page for the demo
 * build. No authentication, no account management, no backend
 * settings — this is a static overview of the application and its
 * current mock/demo data mode.
 */
export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Application information and current data mode.
        </p>
      </div>

      <section>
        <SectionHeader title="Application" />
        <div className="rounded-lg border border-border bg-surface p-6">
          <InfoRow label="Product" value="AI Event-to-Market Impact Intelligence" />
          <InfoRow label="Data Mode" value="Mock / Demo" />
          <InfoRow label="Market" value="Thai Stock Market (SET)" />
          <InfoRow label="Theme" value="Dark" />
        </div>
      </section>

      <section>
        <SectionHeader title="About the System" />
        <div className="rounded-lg border border-border bg-surface p-6">
          <p className="text-sm leading-relaxed text-muted">
            This application is a market intelligence tool that explains how
            economic, corporate, and geopolitical events relate to
            sector-level impact and historical market reaction. It follows
            the flow Event → Sector Impact → Market Reaction → Stock, using
            AI-assisted interpretation to summarize and explain — not to
            predict future prices or issue trading recommendations.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            This build uses mock, illustrative data throughout for
            demonstration purposes. No live market data, external API, or
            backend connection is used in this phase.
          </p>
        </div>
      </section>

      <section className="rounded-lg border border-mixed/30 bg-mixed/10 p-4">
        <p className="text-xs font-medium text-mixed">
          Demo / Mock Data — all figures shown throughout this application
          are illustrative and not live market values.
        </p>
      </section>
    </div>
  );
}

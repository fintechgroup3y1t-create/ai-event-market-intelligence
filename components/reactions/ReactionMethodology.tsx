import { SectionHeader } from "@/components/common/SectionHeader";

function FormulaRow({ label, formula }: { label: string; formula: string }) {
  return (
    <div className="border-b border-border py-2.5 last:border-0">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 font-mono text-sm text-foreground">{formula}</p>
    </div>
  );
}

/**
 * "How Market Reaction Is Measured" — explanatory text only. These
 * formulas describe what the backend's Phase 2.14.x calculation
 * engines already compute (see backend/app/services/); the frontend
 * never implements or runs any of this math.
 */
export function ReactionMethodology() {
  return (
    <section>
      <SectionHeader title="How Market Reaction Is Measured" />
      <div className="rounded-lg border border-border bg-surface p-6">
        <FormulaRow label="Expected Return" formula="E(R_i,t) = α_i + β_i × R_m,t" />
        <FormulaRow label="Actual Return" formula="R_i,t = (P_t / P_t-1) - 1" />
        <FormulaRow label="Abnormal Return" formula="AR_i,t = Actual Return - Expected Return" />
        <FormulaRow label="Cumulative Abnormal Return" formula="CAR = Σ AR_i,t" />

        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-muted">Event Window</p>
            <p className="mt-1 text-sm text-foreground">
              Default <span className="font-medium">[-1, +1]</span> · Extended{" "}
              <span className="font-medium">[-5, +5]</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">Estimation Window</p>
            <p className="mt-1 text-sm text-foreground">
              Preferred <span className="font-medium">250</span> observations · Minimum{" "}
              <span className="font-medium">120</span>
            </p>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          These formulas are shown for explanation only. All figures on this
          page are historical, illustrative mock data — no calculation is
          performed by the frontend.
        </p>
      </div>
    </section>
  );
}

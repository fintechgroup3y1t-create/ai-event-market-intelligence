import type { AbnormalReactionLevel } from "@/lib/types";
import { SectionHeader } from "@/components/common/SectionHeader";
import { REACTION_LEVEL_LABEL, REACTION_LEVEL_TONE, TONE_BADGE_CLASS } from "./reactionTone";

/**
 * "Reaction Classification" explainer section. Named
 * ReactionClassificationSection (not ReactionClassification) to avoid
 * colliding with the existing `ReactionClassification` type in
 * lib/types.ts (used by the Step-1 Dashboard's sector-level
 * MarketReaction — a different concept, left untouched).
 */
export function ReactionClassificationSection({
  classification,
}: {
  classification: AbnormalReactionLevel;
}) {
  const tone = REACTION_LEVEL_TONE[classification];

  return (
    <section>
      <SectionHeader title="Reaction Classification" />
      <div className="rounded-lg border border-border bg-surface p-6">
        <span
          className={`inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium ${TONE_BADGE_CLASS[tone]}`}
        >
          {REACTION_LEVEL_LABEL[classification]}
        </span>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Classification describes the observed abnormal market reaction
          around the event window. It does not indicate future price
          direction.
        </p>
      </div>
    </section>
  );
}

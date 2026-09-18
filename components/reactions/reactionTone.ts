import type { AbnormalReactionLevel } from "@/lib/types";

/**
 * Direction-aware tone helper shared across the reactions/* components.
 * Deliberately NOT added to components/common/StatusBadge.tsx (kept
 * untouched per file-safety instructions) — this is a small, local
 * helper following the same pattern already used for one-off tone
 * needs elsewhere (e.g. the Sector Impact page's classification
 * badge), reusing the same underlying design tokens (positive/
 * negative/neutral).
 *
 * IMPORTANT: abnormal is never colored red just for being "abnormal" —
 * only its actual sign/magnitude determines the tone.
 */
export type ReactionTone = "positive" | "negative" | "neutral";

export function toneForReturn(value: number): ReactionTone {
  if (value > 0.05) return "positive";
  if (value < -0.05) return "negative";
  return "neutral";
}

export const REACTION_LEVEL_TONE: Record<AbnormalReactionLevel, ReactionTone> = {
  SIGNIFICANT_POSITIVE: "positive",
  MODERATE_POSITIVE: "positive",
  NEUTRAL: "neutral",
  MODERATE_NEGATIVE: "negative",
  SIGNIFICANT_NEGATIVE: "negative",
};

export const REACTION_LEVEL_LABEL: Record<AbnormalReactionLevel, string> = {
  SIGNIFICANT_POSITIVE: "Significant Positive",
  MODERATE_POSITIVE: "Moderate Positive",
  NEUTRAL: "Neutral",
  MODERATE_NEGATIVE: "Moderate Negative",
  SIGNIFICANT_NEGATIVE: "Significant Negative",
};

export const TONE_TEXT_CLASS: Record<ReactionTone, string> = {
  positive: "text-positive",
  negative: "text-negative",
  neutral: "text-neutral",
};

export const TONE_BADGE_CLASS: Record<ReactionTone, string> = {
  positive: "border-positive/30 bg-positive/10 text-positive",
  negative: "border-negative/30 bg-negative/10 text-negative",
  neutral: "border-neutral/30 bg-neutral/10 text-neutral",
};

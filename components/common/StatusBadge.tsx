import type {
  Direction,
  EventDirection,
  EventStatus,
  ReactionClassification,
} from "@/lib/types";

type BadgeTone = "positive" | "negative" | "neutral" | "mixed" | "ai-accent";

const DIRECTION_TONE: Record<Direction, BadgeTone> = {
  POSITIVE: "positive",
  NEGATIVE: "negative",
  NEUTRAL: "neutral",
  MIXED: "mixed",
};

const EVENT_DIRECTION_TONE: Record<EventDirection, BadgeTone> = {
  UP: "positive",
  DOWN: "negative",
  NEUTRAL: "neutral",
};

const EVENT_STATUS_TONE: Record<EventStatus, BadgeTone> = {
  DETECTED: "neutral",
  VALIDATING: "mixed",
  CONFIRMED: "positive",
  UPDATED: "ai-accent",
  MONITORING: "mixed",
  CLOSED: "neutral",
  REJECTED: "negative",
};

const CLASSIFICATION_TONE: Record<ReactionClassification, BadgeTone> = {
  NORMAL_REACTION: "neutral",
  STRONG_REACTION: "mixed",
  ABNORMAL_REACTION: "ai-accent",
  CONFOUNDED: "mixed",
  INSUFFICIENT_DATA: "neutral",
};

const TONE_CLASSES: Record<BadgeTone, string> = {
  positive: "bg-positive/10 text-positive border-positive/30",
  negative: "bg-negative/10 text-negative border-negative/30",
  neutral: "bg-neutral/10 text-neutral border-neutral/30",
  mixed: "bg-mixed/10 text-mixed border-mixed/30",
  "ai-accent": "bg-ai-accent/10 text-ai-accent border-ai-accent/30",
};

/**
 * Renders an analytical-direction, event-direction, event-status, or
 * reaction-classification label. Colors are semantic only (direction/
 * status of the analysis) — never a buy/sell signal.
 */
export function StatusBadge({
  label,
  direction,
  eventDirection,
  status,
  classification,
}: {
  label: string;
  direction?: Direction;
  eventDirection?: EventDirection;
  status?: EventStatus;
  classification?: ReactionClassification;
}) {
  const tone: BadgeTone = direction
    ? DIRECTION_TONE[direction]
    : eventDirection
      ? EVENT_DIRECTION_TONE[eventDirection]
      : status
        ? EVENT_STATUS_TONE[status]
        : classification
          ? CLASSIFICATION_TONE[classification]
          : "neutral";

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {label}
    </span>
  );
}

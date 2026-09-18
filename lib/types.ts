/**
 * Shared frontend TypeScript types (Phase 3.1).
 *
 * These shapes are intentionally kept close to what the backend's
 * Phase 2.14.x calculation engines already output (see
 * backend/app/schemas/*.py), so wiring real API calls in a later
 * phase should mostly be a matter of removing frontend/lib/mockData.ts
 * and fetching these same shapes from FastAPI instead. Nothing here is
 * calculated by the frontend — every numeric field is a value to be
 * displayed as given.
 */

export type Direction = "POSITIVE" | "NEGATIVE" | "NEUTRAL" | "MIXED";

/**
 * Direction of the affected asset's own movement for an Event (e.g.
 * "oil went UP"). Deliberately a separate type from `Direction` above
 * (which describes a sector's *impact* direction relative to an
 * event) — the two answer different questions and are never
 * interchangeable.
 */
export type EventDirection = "UP" | "DOWN" | "NEUTRAL";

/**
 * Event lifecycle status. Named to match the backend's real Event
 * status field (see backend/app/models — status: DETECTED,
 * VALIDATING, CONFIRMED, UPDATED, MONITORING, CLOSED, REJECTED) so
 * this type won't need to change shape once real data is wired up.
 */
export type EventStatus =
  | "DETECTED"
  | "VALIDATING"
  | "CONFIRMED"
  | "UPDATED"
  | "MONITORING"
  | "CLOSED"
  | "REJECTED";

export type ReactionClassification =
  | "NORMAL_REACTION"
  | "STRONG_REACTION"
  | "ABNORMAL_REACTION"
  | "CONFOUNDED"
  | "INSUFFICIENT_DATA";

export interface MarketOverviewItem {
  symbol: string;
  label: string;
  changePercent: number;
}

export interface MarketEvent {
  id: string;
  title: string;
  eventType: string;
  /** Who/what triggered the event, e.g. "OPEC", "Federal Reserve". */
  actor: string;
  /** Short description of what the actor did, e.g. "Announced a production cut". */
  action: string;
  affectedAsset: string;
  assetChangePercent: number;
  /** Direction of the affected asset's own movement — see EventDirection. */
  direction: EventDirection;
  /** 1-5, matching the backend's locked Event magnitude scale. */
  magnitude: number;
  summary: string;
  impactScore: number;
  /** 0-100 display percentage (not a 0-1 fraction). */
  confidence: number;
  status: EventStatus;
  /** Number of source articles backing this event. */
  sourceCount: number;
  date: string;
  /** Short display time, e.g. "10:05", consistent with TimelineEvent.time. */
  time: string;
}

export interface NewsSource {
  id: string;
  title: string;
  sourceName: string;
  /** Short display time, e.g. "10:12" — consistent with the rest of the app's lightweight time strings. */
  publishedAt: string;
  relevance: "HIGH" | "MEDIUM" | "LOW";
  /** Mock/non-functional — never fetched or opened by the app. */
  url: string;
}

/**
 * Impact Score magnitude bucket, reusing the backend's real locked
 * classification scale (Phase 2.13.3: <=20 VERY_LOW, <=40 LOW,
 * <=60 MODERATE, <=80 HIGH, <=100 VERY_HIGH) rather than inventing a
 * new one. This is authored directly as mock data (see mockData.ts),
 * never computed from impactScore at runtime by the frontend.
 */
export type ImpactClassification = "VERY_LOW" | "LOW" | "MODERATE" | "HIGH" | "VERY_HIGH";

export interface SectorImpact {
  sector: string;
  direction: Direction;
  impactScore: number;
  classification: ImpactClassification;
  reason: string;
  /** 0-100 display percentage; optional since not every mock record supplies it. */
  confidence?: number;
}

/**
 * A driver/transmission-mechanism explainer for the Sector Impact
 * page's "Impact Drivers" section — static, illustrative mock data
 * only. `exampleImpacts`, when present, powers the compact
 * driver-to-sector visual example (section 12 of the Step 3 spec).
 */
export interface ImpactDriver {
  name: string;
  label: string;
  affectedSectors: string[];
  explanation: string;
  exampleImpacts?: { sector: string; direction: Direction }[];
}

export interface MarketReaction {
  sector: string;
  expectedReturnPercent: number;
  actualReturnPercent: number;
  abnormalReturnPercent: number;
  volumeRatio: number;
  volatilityChangePercent: number;
  abnormalScore: number;
  classification: ReactionClassification;
}

/**
 * Compact subset of MarketReaction shown as a preview on the Event
 * Detail page (section 9) — deliberately excludes volume/volatility/
 * abnormalScore/classification, which belong to the future full
 * Market Reaction page, not this preview.
 */
export interface MarketReactionPreview {
  expectedReturnPercent: number;
  actualReturnPercent: number;
  abnormalReturnPercent: number;
}

export interface TimelineEvent {
  time: string;
  label: string;
}

/**
 * Abnormal-return significance+direction bucket for the Market
 * Reaction page (Step 4). Deliberately named distinctly from
 * `ReactionClassification` above (NORMAL_REACTION/STRONG_REACTION/
 * ABNORMAL_REACTION/CONFOUNDED/INSUFFICIENT_DATA, which powers the
 * Step 1 Dashboard's sector-level MarketReaction card) — the two are
 * different concepts with different value sets, and this avoids a
 * naming collision without touching that existing, working type or
 * the component that consumes it.
 */
export type AbnormalReactionLevel =
  | "SIGNIFICANT_POSITIVE"
  | "MODERATE_POSITIVE"
  | "NEUTRAL"
  | "MODERATE_NEGATIVE"
  | "SIGNIFICANT_NEGATIVE";

/** One event-day row in an event window (e.g. day -5 .. +5, 0 = event day). */
export interface ReactionTimelinePoint {
  day: number;
  actualReturnPercent: number;
  expectedReturnPercent: number;
  abnormalReturnPercent: number;
}

/**
 * Full historical market-reaction record for one event, for the
 * Market Reaction page. Deliberately named `EventMarketReaction`
 * (not `MarketReaction`) to avoid colliding with the existing
 * sector-level `MarketReaction` interface above.
 */
export interface EventMarketReaction {
  eventId: string;
  /** The observed return on the event day itself — same value as timeline day 0's actualReturnPercent. */
  marketReturnPercent: number;
  expectedReturnPercent: number;
  abnormalReturnPercent: number;
  /** Cumulative Abnormal Return summed over `eventWindow`. */
  carPercent: number;
  classification: AbnormalReactionLevel;
  /** [start, end] trading-day-relative bounds, e.g. [-1, 1]. */
  eventWindow: [number, number];
  /** Short, deterministic mock explanation — not a live AI call. */
  aiSummary: string;
  timeline: ReactionTimelinePoint[];
}

/**
 * Stock-level types (Step 5). Deliberately REUSE `Direction` (POSITIVE/
 * NEGATIVE/NEUTRAL/MIXED) and `AbnormalReactionLevel` (SIGNIFICANT_POSITIVE/
 * MODERATE_POSITIVE/NEUTRAL/MODERATE_NEGATIVE/SIGNIFICANT_NEGATIVE) rather
 * than introducing redundant `StockDirection`/`StockClassification` types
 * with identical value sets — inspected both existing types first and
 * found no genuine semantic difference for a stock's exposure direction
 * or its historical-reaction classification, so duplicating them would
 * only add maintenance burden without adding meaning. Likewise,
 * `ReactionTimelinePoint` (day/actualReturnPercent/expectedReturnPercent/
 * abnormalReturnPercent) is reused as-is for a stock's reaction timeline
 * rather than a redundant `StockReactionTimelinePoint`.
 */
export interface Stock {
  symbol: string;
  companyName: string;
  sector: string;
}

/** Connects one stock to one event's sector-impact context. */
export interface StockEventExposure {
  symbol: string;
  eventId: string;
  impactScore: number;
  direction: Direction;
  reason: string;
}

/**
 * A stock's historical reaction around one specific event's window.
 * Distinct from `EventMarketReaction` (keyed only by eventId, used by
 * the Step 4 Market Reaction page) since this is keyed by stock symbol
 * AND references the event it relates to.
 */
export interface StockReaction {
  symbol: string;
  eventId: string;
  actualReturnPercent: number;
  expectedReturnPercent: number;
  abnormalReturnPercent: number;
  carPercent: number;
  eventWindow: [number, number];
  timeline: ReactionTimelinePoint[];
}

/** One row in a stock's "Event Impact History" list. */
export interface StockEventHistoryEntry {
  eventId: string;
  eventTitle: string;
  date: string;
  direction: Direction;
  impactScore: number;
  abnormalReturnPercent: number;
  classification: AbnormalReactionLevel;
}

import type {
  EventMarketReaction,
  ImpactDriver,
  MarketEvent,
  MarketOverviewItem,
  MarketReaction,
  MarketReactionPreview,
  NewsSource,
  SectorImpact,
  Stock,
  StockEventExposure,
  StockEventHistoryEntry,
  StockReaction,
  TimelineEvent,
} from "./types";

/**
 * Mock data for the Phase 3.1 Dashboard mockup and the Phase 3.2
 * Step 2 Events List / Event Detail pages.
 *
 * All values here are fabricated for demonstration only — none of
 * this is calculated in the frontend. In a later phase this file is
 * replaced by real fetches to the FastAPI backend
 * (FastAPI -> Next.js -> UI), which already implements every one of
 * these calculations (Expected/Actual/Abnormal Return, CAR, p-value,
 * Impact Score, Abnormal Score, etc. — see backend/app/services/).
 */

export const MARKET_OVERVIEW: MarketOverviewItem[] = [
  { symbol: "SET", label: "SET Index", changePercent: 0.42 },
  { symbol: "OIL", label: "Crude Oil", changePercent: 8.5 },
  { symbol: "GOLD", label: "Gold", changePercent: -0.35 },
  { symbol: "USDTHB", label: "USD/THB", changePercent: 0.18 },
];

/**
 * All mock events, most recent first. EVENTS[0] is also exported as
 * MAJOR_EVENT below for the Dashboard's featured-event card, so the
 * two stay in sync rather than duplicating the same event twice.
 */
export const EVENTS: MarketEvent[] = [
  {
    id: "evt-2026-09-15-opec-cut",
    title: "OPEC Announces Production Cut",
    eventType: "COMMODITY",
    actor: "OPEC",
    action: "Announced a coordinated reduction in crude oil production",
    affectedAsset: "OIL",
    assetChangePercent: 8.5,
    direction: "UP",
    magnitude: 5,
    confidence: 94,
    status: "CONFIRMED",
    sourceCount: 12,
    summary:
      "OPEC announced a reduction in oil production, creating an immediate upward shock to crude oil prices.",
    impactScore: 92,
    date: "2026-09-15",
    time: "10:05",
  },
  {
    id: "evt-2026-09-16-fed-holds-rate",
    title: "Federal Reserve Holds Policy Rate",
    eventType: "MONETARY_POLICY",
    actor: "Federal Reserve",
    action: "Held the benchmark policy rate unchanged",
    affectedAsset: "USD",
    assetChangePercent: 0.1,
    direction: "NEUTRAL",
    magnitude: 3,
    confidence: 91,
    status: "CONFIRMED",
    sourceCount: 8,
    summary:
      "The Federal Reserve held its policy rate steady, signaling a cautious, data-dependent stance for coming meetings.",
    impactScore: 54,
    date: "2026-09-16",
    time: "14:00",
  },
  {
    id: "evt-2026-09-14-thb-weakens",
    title: "THB Weakens Against USD",
    eventType: "CURRENCY",
    actor: "FX Market",
    action: "USD/THB moved higher amid broad dollar strength",
    affectedAsset: "USD_THB",
    assetChangePercent: 1.2,
    direction: "UP",
    magnitude: 4,
    confidence: 88,
    status: "MONITORING",
    sourceCount: 6,
    summary:
      "The Thai baht weakened against the US dollar, tracked amid broader regional currency movements. Still under monitoring pending confirmation.",
    impactScore: 61,
    date: "2026-09-14",
    time: "09:15",
  },
];

export const MAJOR_EVENT: MarketEvent = EVENTS[0];

/**
 * Sector impacts keyed by event id. The OPEC event reuses the original
 * Phase 3.1 SECTOR_IMPACTS array rather than duplicating it; the other
 * two events get smaller mock sets sized for their lower magnitude.
 */
export const SECTOR_IMPACTS: SectorImpact[] = [
  {
    sector: "Transportation",
    direction: "NEGATIVE",
    impactScore: 92,
    classification: "VERY_HIGH",
    confidence: 90,
    reason: "Higher oil prices increase operating costs.",
  },
  {
    sector: "Logistics",
    direction: "NEGATIVE",
    impactScore: 84,
    classification: "VERY_HIGH",
    confidence: 85,
    reason: "Fuel-dependent shipping and freight costs rise.",
  },
  {
    sector: "Energy",
    direction: "POSITIVE",
    impactScore: 76,
    classification: "HIGH",
    confidence: 88,
    reason: "Higher oil prices can improve upstream revenue and margins.",
  },
  {
    sector: "Food & Beverage",
    direction: "MIXED",
    impactScore: 48,
    classification: "MODERATE",
    confidence: 70,
    reason: "Higher input/transport costs may pressure margins.",
  },
  {
    sector: "Banking",
    direction: "NEUTRAL",
    impactScore: 31,
    classification: "LOW",
    confidence: 60,
    reason: "No strong direct transmission mechanism.",
  },
];

export const EVENT_SECTOR_IMPACTS: Record<string, SectorImpact[]> = {
  "evt-2026-09-15-opec-cut": SECTOR_IMPACTS,
  "evt-2026-09-16-fed-holds-rate": [
    {
      sector: "Banking",
      direction: "NEUTRAL",
      impactScore: 38,
      classification: "LOW",
      confidence: 80,
      reason: "A steady policy rate leaves near-term net interest margins largely unchanged.",
    },
    {
      sector: "Real Estate",
      direction: "NEUTRAL",
      impactScore: 29,
      classification: "LOW",
      confidence: 74,
      reason: "Mortgage-rate expectations are unchanged by a hold decision.",
    },
  ],
  "evt-2026-09-14-thb-weakens": [
    {
      sector: "Tourism & Hospitality",
      direction: "POSITIVE",
      impactScore: 58,
      classification: "MODERATE",
      confidence: 82,
      reason: "A weaker baht can make Thai tourism relatively cheaper for foreign visitors.",
    },
    {
      sector: "Import-Reliant Manufacturing",
      direction: "NEGATIVE",
      impactScore: 52,
      classification: "MODERATE",
      confidence: 78,
      reason: "Imported input costs rise as the baht weakens against the dollar.",
    },
  ],
};

export const MARKET_REACTION: MarketReaction = {
  sector: "Transportation",
  expectedReturnPercent: -2.5,
  actualReturnPercent: -7.2,
  abnormalReturnPercent: -4.7,
  volumeRatio: 4.3,
  volatilityChangePercent: 82,
  abnormalScore: 95.4,
  classification: "ABNORMAL_REACTION",
};

/**
 * Compact Expected/Actual/Abnormal Return preview shown on the Event
 * Detail page (section 9), keyed by event id. The OPEC event reuses
 * the existing MARKET_REACTION values rather than duplicating them.
 */
export const EVENT_MARKET_REACTION_PREVIEW: Record<string, MarketReactionPreview> = {
  "evt-2026-09-15-opec-cut": {
    expectedReturnPercent: MARKET_REACTION.expectedReturnPercent,
    actualReturnPercent: MARKET_REACTION.actualReturnPercent,
    abnormalReturnPercent: MARKET_REACTION.abnormalReturnPercent,
  },
  "evt-2026-09-16-fed-holds-rate": {
    expectedReturnPercent: 0.1,
    actualReturnPercent: 0.3,
    abnormalReturnPercent: 0.2,
  },
  "evt-2026-09-14-thb-weakens": {
    expectedReturnPercent: 0.4,
    actualReturnPercent: 1.1,
    abnormalReturnPercent: 0.7,
  },
};

export const EVENT_NEWS_SOURCES: Record<string, NewsSource[]> = {
  "evt-2026-09-15-opec-cut": [
    {
      id: "news-opec-1",
      title: "OPEC+ agrees to deepen production cuts through next quarter",
      sourceName: "Reuters",
      publishedAt: "09:32",
      relevance: "HIGH",
      url: "https://example.com/mock/opec-cut-reuters",
    },
    {
      id: "news-opec-2",
      title: "Oil prices jump after OPEC supply announcement",
      sourceName: "Bloomberg",
      publishedAt: "09:41",
      relevance: "HIGH",
      url: "https://example.com/mock/opec-cut-bloomberg",
    },
    {
      id: "news-opec-3",
      title: "Energy stocks rally as crude climbs on OPEC news",
      sourceName: "CNBC",
      publishedAt: "10:15",
      relevance: "MEDIUM",
      url: "https://example.com/mock/opec-cut-cnbc",
    },
  ],
  "evt-2026-09-16-fed-holds-rate": [
    {
      id: "news-fed-1",
      title: "Fed holds rates steady, cites balanced risks",
      sourceName: "Reuters",
      publishedAt: "14:02",
      relevance: "HIGH",
      url: "https://example.com/mock/fed-hold-reuters",
    },
    {
      id: "news-fed-2",
      title: "Markets largely unmoved by widely expected Fed decision",
      sourceName: "Wall Street Journal",
      publishedAt: "14:20",
      relevance: "MEDIUM",
      url: "https://example.com/mock/fed-hold-wsj",
    },
  ],
  "evt-2026-09-14-thb-weakens": [
    {
      id: "news-thb-1",
      title: "Baht slips against dollar amid regional currency moves",
      sourceName: "Bangkok Post",
      publishedAt: "09:20",
      relevance: "HIGH",
      url: "https://example.com/mock/thb-weakens-bangkokpost",
    },
    {
      id: "news-thb-2",
      title: "Emerging-market currencies under pressure as dollar strengthens",
      sourceName: "Reuters",
      publishedAt: "09:48",
      relevance: "MEDIUM",
      url: "https://example.com/mock/thb-weakens-reuters",
    },
  ],
};

export const EXPECTED_VS_ACTUAL_CHART_DATA = [
  { label: "Expected Return", value: MARKET_REACTION.expectedReturnPercent },
  { label: "Actual Return", value: MARKET_REACTION.actualReturnPercent },
];

export const EVENT_TIMELINE: TimelineEvent[] = [
  { time: "09:30", label: "News detected" },
  { time: "10:05", label: "Event confirmed" },
  { time: "10:20", label: "Sector impact analyzed" },
  { time: "14:30", label: "Market reaction detected" },
  { time: "16:30", label: "Event monitoring" },
];

/**
 * Historical market reaction data for the Market Reaction page (Step
 * 4), one record per event in EVENTS. All values are hand-authored
 * mock data — none of this is calculated by the frontend. Every
 * timeline row satisfies abnormalReturnPercent = actualReturnPercent -
 * expectedReturnPercent exactly, and each record's carPercent is the
 * exact sum of abnormalReturnPercent across its eventWindow (verified
 * by hand before being written here — not computed at runtime).
 *
 * Note: the OPEC record's day -1/0/+1 figures and its CAR follow this
 * step's own worked example, except CAR is 1.43 rather than the
 * example's "+1.83%" — 1.83 does not equal the example table's own
 * abnormal returns summed (0.03 + 1.07 + 0.33 = 1.43), so 1.43 was
 * used here for internal consistency with the displayed table.
 */
export const MARKET_REACTIONS: EventMarketReaction[] = [
  {
    eventId: "evt-2026-09-15-opec-cut",
    marketReturnPercent: 1.42,
    expectedReturnPercent: 0.35,
    abnormalReturnPercent: 1.07,
    carPercent: 1.43,
    classification: "SIGNIFICANT_POSITIVE",
    eventWindow: [-1, 1],
    aiSummary:
      "The market moved above its estimated normal return during the event window, indicating a positive abnormal reaction.",
    timeline: [
      { day: -5, actualReturnPercent: 0.05, expectedReturnPercent: 0.04, abnormalReturnPercent: 0.01 },
      { day: -4, actualReturnPercent: -0.02, expectedReturnPercent: -0.03, abnormalReturnPercent: 0.01 },
      { day: -3, actualReturnPercent: 0.03, expectedReturnPercent: 0.02, abnormalReturnPercent: 0.01 },
      { day: -2, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -1, actualReturnPercent: 0.21, expectedReturnPercent: 0.18, abnormalReturnPercent: 0.03 },
      { day: 0, actualReturnPercent: 1.42, expectedReturnPercent: 0.35, abnormalReturnPercent: 1.07 },
      { day: 1, actualReturnPercent: 0.64, expectedReturnPercent: 0.31, abnormalReturnPercent: 0.33 },
      { day: 2, actualReturnPercent: 0.1, expectedReturnPercent: 0.08, abnormalReturnPercent: 0.02 },
      { day: 3, actualReturnPercent: -0.04, expectedReturnPercent: -0.05, abnormalReturnPercent: 0.01 },
      { day: 4, actualReturnPercent: 0.02, expectedReturnPercent: 0.01, abnormalReturnPercent: 0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.01, abnormalReturnPercent: -0.01 },
    ],
  },
  {
    eventId: "evt-2026-09-16-fed-holds-rate",
    marketReturnPercent: 0.05,
    expectedReturnPercent: 0.03,
    abnormalReturnPercent: 0.02,
    carPercent: 0.03,
    classification: "NEUTRAL",
    eventWindow: [-1, 1],
    aiSummary:
      "The market's return around the event window stayed close to its estimated normal return, consistent with a widely expected decision.",
    timeline: [
      { day: -5, actualReturnPercent: 0.02, expectedReturnPercent: 0.02, abnormalReturnPercent: 0.0 },
      { day: -4, actualReturnPercent: -0.01, expectedReturnPercent: -0.01, abnormalReturnPercent: 0.0 },
      { day: -3, actualReturnPercent: 0.01, expectedReturnPercent: 0.01, abnormalReturnPercent: 0.0 },
      { day: -2, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
      { day: -1, actualReturnPercent: 0.03, expectedReturnPercent: 0.02, abnormalReturnPercent: 0.01 },
      { day: 0, actualReturnPercent: 0.05, expectedReturnPercent: 0.03, abnormalReturnPercent: 0.02 },
      { day: 1, actualReturnPercent: 0.02, expectedReturnPercent: 0.02, abnormalReturnPercent: 0.0 },
      { day: 2, actualReturnPercent: -0.01, expectedReturnPercent: -0.01, abnormalReturnPercent: 0.0 },
      { day: 3, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
      { day: 4, actualReturnPercent: 0.01, expectedReturnPercent: 0.01, abnormalReturnPercent: 0.0 },
      { day: 5, actualReturnPercent: 0.02, expectedReturnPercent: 0.02, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    eventId: "evt-2026-09-14-thb-weakens",
    marketReturnPercent: 0.55,
    expectedReturnPercent: 0.2,
    abnormalReturnPercent: 0.35,
    carPercent: 0.5,
    classification: "MODERATE_POSITIVE",
    eventWindow: [-1, 1],
    aiSummary:
      "The market moved moderately above its estimated normal return during the event window, indicating a mild positive abnormal reaction.",
    timeline: [
      { day: -5, actualReturnPercent: 0.05, expectedReturnPercent: 0.04, abnormalReturnPercent: 0.01 },
      { day: -4, actualReturnPercent: 0.02, expectedReturnPercent: 0.02, abnormalReturnPercent: 0.0 },
      { day: -3, actualReturnPercent: -0.01, expectedReturnPercent: -0.01, abnormalReturnPercent: 0.0 },
      { day: -2, actualReturnPercent: 0.03, expectedReturnPercent: 0.03, abnormalReturnPercent: 0.0 },
      { day: -1, actualReturnPercent: 0.15, expectedReturnPercent: 0.1, abnormalReturnPercent: 0.05 },
      { day: 0, actualReturnPercent: 0.55, expectedReturnPercent: 0.2, abnormalReturnPercent: 0.35 },
      { day: 1, actualReturnPercent: 0.25, expectedReturnPercent: 0.15, abnormalReturnPercent: 0.1 },
      { day: 2, actualReturnPercent: 0.04, expectedReturnPercent: 0.03, abnormalReturnPercent: 0.01 },
      { day: 3, actualReturnPercent: 0.01, expectedReturnPercent: 0.01, abnormalReturnPercent: 0.0 },
      { day: 4, actualReturnPercent: -0.02, expectedReturnPercent: -0.02, abnormalReturnPercent: 0.0 },
      { day: 5, actualReturnPercent: 0.02, expectedReturnPercent: 0.02, abnormalReturnPercent: 0.0 },
    ],
  },
];

/**
 * Static, illustrative driver/transmission-mechanism explainers for
 * the Sector Impact page's "Impact Drivers" section. This is mock,
 * hand-authored explanatory content — not the real Knowledge Base
 * engine (backend/app/knowledge/), and no scoring is computed from it.
 */
export const IMPACT_DRIVERS: ImpactDriver[] = [
  {
    name: "OIL_PRICE",
    label: "Oil Price",
    affectedSectors: ["Energy", "Transportation", "Petrochemical"],
    explanation:
      "Changes in oil prices can affect energy revenue and fuel-related operating costs.",
    exampleImpacts: [
      { sector: "Energy", direction: "POSITIVE" },
      { sector: "Transportation", direction: "NEGATIVE" },
      { sector: "Petrochemical", direction: "MIXED" },
    ],
  },
  {
    name: "INTEREST_RATE",
    label: "Interest Rate",
    affectedSectors: ["Banking", "Real Estate"],
    explanation:
      "Rate changes affect borrowing costs and net interest margins across the economy.",
  },
  {
    name: "USD_THB",
    label: "USD/THB",
    affectedSectors: ["Tourism & Hospitality", "Import-Reliant Manufacturing"],
    explanation:
      "Currency moves change the relative cost of imports and the price of Thai exports and tourism for foreign visitors.",
  },
  {
    name: "INFLATION",
    label: "Inflation",
    affectedSectors: ["Food & Beverage", "Consumer Staples"],
    explanation: "Rising prices can compress margins for input-cost-sensitive sectors.",
  },
  {
    name: "GDP",
    label: "GDP Growth",
    affectedSectors: ["Banking", "Commerce"],
    explanation: "Broader economic growth or contraction shifts demand across most sectors.",
  },
  {
    name: "TOURISM_DEMAND",
    label: "Tourism Demand",
    affectedSectors: ["Tourism & Hospitality", "Transportation"],
    explanation:
      "Changes in visitor volumes directly affect hospitality and travel-related revenue.",
  },
  {
    name: "SUPPLY_DISRUPTION",
    label: "Supply Disruption",
    affectedSectors: ["Logistics", "Manufacturing"],
    explanation:
      "Disruptions to supply chains can delay production and raise input costs.",
  },
  {
    name: "COMMODITY_PRICE",
    label: "Commodity Price",
    affectedSectors: ["Energy", "Food & Beverage"],
    explanation:
      "Broad commodity price swings affect input costs and revenue for commodity-linked sectors.",
  },
  {
    name: "GOLD_PRICE",
    label: "Gold Price",
    affectedSectors: ["Banking", "Consumer Staples"],
    explanation:
      "Gold price moves affect safe-haven demand and consumer jewelry-related spending.",
  },
];

/**
 * Mock Thai stock universe for the Stocks / Stock Detail pages (Step
 * 5), spanning the 8 sectors already used elsewhere in this project.
 * These are illustrative demo stocks only — their inclusion or
 * exposure values do not imply they are currently the most affected
 * real-world stocks for any event.
 */
export const STOCKS: Stock[] = [
  { symbol: "PTT", companyName: "PTT Public Company Limited", sector: "Energy" },
  { symbol: "PTTEP", companyName: "PTT Exploration and Production Public Company Limited", sector: "Energy" },
  { symbol: "KBANK", companyName: "Kasikornbank Public Company Limited", sector: "Banking" },
  { symbol: "SCB", companyName: "Siam Commercial Bank Public Company Limited", sector: "Banking" },
  { symbol: "CPALL", companyName: "CP All Public Company Limited", sector: "Commerce" },
  { symbol: "CRC", companyName: "Central Retail Corporation Public Company Limited", sector: "Commerce" },
  { symbol: "AOT", companyName: "Airports of Thailand Public Company Limited", sector: "Transportation" },
  { symbol: "BEM", companyName: "Bangkok Expressway and Metro Public Company Limited", sector: "Transportation" },
  { symbol: "DELTA", companyName: "Delta Electronics (Thailand) Public Company Limited", sector: "Electronics" },
  { symbol: "HANA", companyName: "Hana Microelectronics Public Company Limited", sector: "Electronics" },
  { symbol: "IVL", companyName: "Indorama Ventures Public Company Limited", sector: "Petrochemical" },
  { symbol: "PTTGC", companyName: "PTT Global Chemical Public Company Limited", sector: "Petrochemical" },
  { symbol: "TVO", companyName: "Thai Vegetable Oil Public Company Limited", sector: "Food & Beverage" },
  { symbol: "CENTEL", companyName: "Central Plaza Hotel Public Company Limited", sector: "Tourism & Hospitality" },
];

/**
 * Connects a subset of STOCKS to the event whose sector impact most
 * directly touches them (EVENT -> SECTOR -> STOCK). Deliberately only
 * 10 of the 14 stocks have a current exposure — PTTGC, SCB, CRC, and
 * HANA are included in the stock universe but have no active event
 * exposure in this mock dataset, which is itself realistic (not every
 * stock is touched by every event).
 */
export const STOCK_EVENT_EXPOSURES: StockEventExposure[] = [
  {
    symbol: "PTT",
    eventId: "evt-2026-09-15-opec-cut",
    impactScore: 82,
    direction: "POSITIVE",
    reason: "Energy-sector companies may be affected by changes in crude oil prices and related commodity expectations.",
  },
  {
    symbol: "PTTEP",
    eventId: "evt-2026-09-15-opec-cut",
    impactScore: 78,
    direction: "POSITIVE",
    reason: "Upstream exploration and production revenue is directly linked to crude oil price levels.",
  },
  {
    symbol: "AOT",
    eventId: "evt-2026-09-15-opec-cut",
    impactScore: 90,
    direction: "NEGATIVE",
    reason: "Higher fuel costs increase airport and aviation-related operating expenses.",
  },
  {
    symbol: "BEM",
    eventId: "evt-2026-09-15-opec-cut",
    impactScore: 85,
    direction: "NEGATIVE",
    reason: "Higher fuel costs increase operating expenses for transportation infrastructure.",
  },
  {
    symbol: "TVO",
    eventId: "evt-2026-09-15-opec-cut",
    impactScore: 48,
    direction: "MIXED",
    reason: "Higher input and transport costs may pressure margins for edible-oil producers.",
  },
  {
    symbol: "IVL",
    eventId: "evt-2026-09-15-opec-cut",
    impactScore: 60,
    direction: "MIXED",
    reason: "Petrochemical feedstock costs are linked to crude oil price movements.",
  },
  {
    symbol: "KBANK",
    eventId: "evt-2026-09-16-fed-holds-rate",
    impactScore: 38,
    direction: "NEUTRAL",
    reason: "A steady policy rate leaves near-term net interest margins largely unchanged.",
  },
  {
    symbol: "CENTEL",
    eventId: "evt-2026-09-14-thb-weakens",
    impactScore: 58,
    direction: "POSITIVE",
    reason: "A weaker baht can make Thai tourism relatively cheaper for foreign visitors.",
  },
  {
    symbol: "DELTA",
    eventId: "evt-2026-09-14-thb-weakens",
    impactScore: 52,
    direction: "NEGATIVE",
    reason: "Imported component costs rise as the baht weakens against the dollar.",
  },
  {
    symbol: "CPALL",
    eventId: "evt-2026-09-14-thb-weakens",
    impactScore: 40,
    direction: "MIXED",
    reason: "Currency moves can affect both imported goods costs and consumer spending patterns.",
  },
];

/**
 * Historical event-window reaction per exposed stock. Every timeline
 * row satisfies abnormalReturnPercent = actualReturnPercent -
 * expectedReturnPercent exactly, and carPercent is the exact sum of
 * abnormalReturnPercent across eventWindow — verified by a standalone
 * script before being hand-transcribed here, never computed at
 * runtime by the frontend.
 */
export const STOCK_REACTIONS: StockReaction[] = [
  {
    symbol: "PTT",
    eventId: "evt-2026-09-15-opec-cut",
    actualReturnPercent: 1.65,
    expectedReturnPercent: 0.41,
    abnormalReturnPercent: 1.24,
    carPercent: 1.43,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -3, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -2, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -1, actualReturnPercent: 0.25, expectedReturnPercent: 0.2, abnormalReturnPercent: 0.05 },
      { day: 0, actualReturnPercent: 1.65, expectedReturnPercent: 0.41, abnormalReturnPercent: 1.24 },
      { day: 1, actualReturnPercent: 0.2, expectedReturnPercent: 0.06, abnormalReturnPercent: 0.14 },
      { day: 2, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: 3, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    symbol: "PTTEP",
    eventId: "evt-2026-09-15-opec-cut",
    actualReturnPercent: 1.1,
    expectedReturnPercent: 0.3,
    abnormalReturnPercent: 0.8,
    carPercent: 0.94,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -3, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -2, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -1, actualReturnPercent: 0.18, expectedReturnPercent: 0.14, abnormalReturnPercent: 0.04 },
      { day: 0, actualReturnPercent: 1.1, expectedReturnPercent: 0.3, abnormalReturnPercent: 0.8 },
      { day: 1, actualReturnPercent: 0.14, expectedReturnPercent: 0.04, abnormalReturnPercent: 0.1 },
      { day: 2, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: 3, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    symbol: "AOT",
    eventId: "evt-2026-09-15-opec-cut",
    actualReturnPercent: -1.2,
    expectedReturnPercent: -0.3,
    abnormalReturnPercent: -0.9,
    carPercent: -1.05,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: -4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: -3, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: -2, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: -1, actualReturnPercent: -0.25, expectedReturnPercent: -0.2, abnormalReturnPercent: -0.05 },
      { day: 0, actualReturnPercent: -1.2, expectedReturnPercent: -0.3, abnormalReturnPercent: -0.9 },
      { day: 1, actualReturnPercent: -0.2, expectedReturnPercent: -0.1, abnormalReturnPercent: -0.1 },
      { day: 2, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: 3, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    symbol: "BEM",
    eventId: "evt-2026-09-15-opec-cut",
    actualReturnPercent: -0.95,
    expectedReturnPercent: -0.25,
    abnormalReturnPercent: -0.7,
    carPercent: -0.82,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: -4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: -3, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: -2, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: -1, actualReturnPercent: -0.2, expectedReturnPercent: -0.16, abnormalReturnPercent: -0.04 },
      { day: 0, actualReturnPercent: -0.95, expectedReturnPercent: -0.25, abnormalReturnPercent: -0.7 },
      { day: 1, actualReturnPercent: -0.14, expectedReturnPercent: -0.06, abnormalReturnPercent: -0.08 },
      { day: 2, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: 3, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    symbol: "TVO",
    eventId: "evt-2026-09-15-opec-cut",
    actualReturnPercent: 0.15,
    expectedReturnPercent: 0.2,
    abnormalReturnPercent: -0.05,
    carPercent: -0.08,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: -4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: -3, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: -2, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: -1, actualReturnPercent: 0.04, expectedReturnPercent: 0.05, abnormalReturnPercent: -0.01 },
      { day: 0, actualReturnPercent: 0.15, expectedReturnPercent: 0.2, abnormalReturnPercent: -0.05 },
      { day: 1, actualReturnPercent: 0.03, expectedReturnPercent: 0.05, abnormalReturnPercent: -0.02 },
      { day: 2, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: 3, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    symbol: "IVL",
    eventId: "evt-2026-09-15-opec-cut",
    actualReturnPercent: 0.3,
    expectedReturnPercent: 0.15,
    abnormalReturnPercent: 0.15,
    carPercent: 0.2,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -3, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -2, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -1, actualReturnPercent: 0.08, expectedReturnPercent: 0.06, abnormalReturnPercent: 0.02 },
      { day: 0, actualReturnPercent: 0.3, expectedReturnPercent: 0.15, abnormalReturnPercent: 0.15 },
      { day: 1, actualReturnPercent: 0.09, expectedReturnPercent: 0.06, abnormalReturnPercent: 0.03 },
      { day: 2, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: 3, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    symbol: "KBANK",
    eventId: "evt-2026-09-16-fed-holds-rate",
    actualReturnPercent: 0.11,
    expectedReturnPercent: 0.03,
    abnormalReturnPercent: 0.08,
    carPercent: 0.1,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -3, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -2, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -1, actualReturnPercent: 0.03, expectedReturnPercent: 0.02, abnormalReturnPercent: 0.01 },
      { day: 0, actualReturnPercent: 0.11, expectedReturnPercent: 0.03, abnormalReturnPercent: 0.08 },
      { day: 1, actualReturnPercent: 0.03, expectedReturnPercent: 0.02, abnormalReturnPercent: 0.01 },
      { day: 2, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: 3, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    symbol: "CENTEL",
    eventId: "evt-2026-09-14-thb-weakens",
    actualReturnPercent: 0.7,
    expectedReturnPercent: 0.28,
    abnormalReturnPercent: 0.42,
    carPercent: 0.55,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -3, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -2, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -1, actualReturnPercent: 0.15, expectedReturnPercent: 0.1, abnormalReturnPercent: 0.05 },
      { day: 0, actualReturnPercent: 0.7, expectedReturnPercent: 0.28, abnormalReturnPercent: 0.42 },
      { day: 1, actualReturnPercent: 0.18, expectedReturnPercent: 0.1, abnormalReturnPercent: 0.08 },
      { day: 2, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: 3, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    symbol: "DELTA",
    eventId: "evt-2026-09-14-thb-weakens",
    actualReturnPercent: -0.55,
    expectedReturnPercent: -0.15,
    abnormalReturnPercent: -0.4,
    carPercent: -0.48,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: -4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: -3, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: -2, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: -1, actualReturnPercent: -0.13, expectedReturnPercent: -0.1, abnormalReturnPercent: -0.03 },
      { day: 0, actualReturnPercent: -0.55, expectedReturnPercent: -0.15, abnormalReturnPercent: -0.4 },
      { day: 1, actualReturnPercent: -0.15, expectedReturnPercent: -0.1, abnormalReturnPercent: -0.05 },
      { day: 2, actualReturnPercent: -0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.02 },
      { day: 3, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
  {
    symbol: "CPALL",
    eventId: "evt-2026-09-14-thb-weakens",
    actualReturnPercent: 0.2,
    expectedReturnPercent: 0.15,
    abnormalReturnPercent: 0.05,
    carPercent: 0.07,
    eventWindow: [-1, 1],
    timeline: [
      { day: -5, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -4, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -3, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: -2, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: -1, actualReturnPercent: 0.05, expectedReturnPercent: 0.04, abnormalReturnPercent: 0.01 },
      { day: 0, actualReturnPercent: 0.2, expectedReturnPercent: 0.15, abnormalReturnPercent: 0.05 },
      { day: 1, actualReturnPercent: 0.05, expectedReturnPercent: 0.04, abnormalReturnPercent: 0.01 },
      { day: 2, actualReturnPercent: 0.02, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.02 },
      { day: 3, actualReturnPercent: -0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: -0.01 },
      { day: 4, actualReturnPercent: 0.01, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.01 },
      { day: 5, actualReturnPercent: 0.0, expectedReturnPercent: 0.0, abnormalReturnPercent: 0.0 },
    ],
  },
];

/**
 * "Event Impact History" per stock, keyed by symbol. PTT is given the
 * full 3-event history matching this step's own worked example
 * (using this project's actual EVENTS dates rather than the spec
 * example's own inconsistent placeholder dates, for consistency with
 * every other page); the other 9 exposed stocks show their one
 * modeled event exposure, reshaped from STOCK_EVENT_EXPOSURES/
 * STOCK_REACTIONS rather than invented a second time. PTTGC, SCB, CRC,
 * and HANA have no entries (no current event exposure).
 */
export const STOCK_EVENT_HISTORY: Record<string, StockEventHistoryEntry[]> = {
  PTT: [
    {
      eventId: "evt-2026-09-15-opec-cut",
      eventTitle: "OPEC Announces Production Cut",
      date: "2026-09-15",
      direction: "POSITIVE",
      impactScore: 82,
      abnormalReturnPercent: 1.24,
      classification: "SIGNIFICANT_POSITIVE",
    },
    {
      eventId: "evt-2026-09-16-fed-holds-rate",
      eventTitle: "Federal Reserve Holds Policy Rate",
      date: "2026-09-16",
      direction: "NEUTRAL",
      impactScore: 31,
      abnormalReturnPercent: 0.08,
      classification: "NEUTRAL",
    },
    {
      eventId: "evt-2026-09-14-thb-weakens",
      eventTitle: "THB Weakens Against USD",
      date: "2026-09-14",
      direction: "MIXED",
      impactScore: 56,
      abnormalReturnPercent: 0.42,
      classification: "MODERATE_POSITIVE",
    },
  ],
  PTTEP: [
    { eventId: "evt-2026-09-15-opec-cut", eventTitle: "OPEC Announces Production Cut", date: "2026-09-15", direction: "POSITIVE", impactScore: 78, abnormalReturnPercent: 0.8, classification: "MODERATE_POSITIVE" },
  ],
  AOT: [
    { eventId: "evt-2026-09-15-opec-cut", eventTitle: "OPEC Announces Production Cut", date: "2026-09-15", direction: "NEGATIVE", impactScore: 90, abnormalReturnPercent: -0.9, classification: "SIGNIFICANT_NEGATIVE" },
  ],
  BEM: [
    { eventId: "evt-2026-09-15-opec-cut", eventTitle: "OPEC Announces Production Cut", date: "2026-09-15", direction: "NEGATIVE", impactScore: 85, abnormalReturnPercent: -0.7, classification: "MODERATE_NEGATIVE" },
  ],
  TVO: [
    { eventId: "evt-2026-09-15-opec-cut", eventTitle: "OPEC Announces Production Cut", date: "2026-09-15", direction: "MIXED", impactScore: 48, abnormalReturnPercent: -0.05, classification: "NEUTRAL" },
  ],
  IVL: [
    { eventId: "evt-2026-09-15-opec-cut", eventTitle: "OPEC Announces Production Cut", date: "2026-09-15", direction: "MIXED", impactScore: 60, abnormalReturnPercent: 0.15, classification: "MODERATE_POSITIVE" },
  ],
  KBANK: [
    { eventId: "evt-2026-09-16-fed-holds-rate", eventTitle: "Federal Reserve Holds Policy Rate", date: "2026-09-16", direction: "NEUTRAL", impactScore: 38, abnormalReturnPercent: 0.08, classification: "NEUTRAL" },
  ],
  CENTEL: [
    { eventId: "evt-2026-09-14-thb-weakens", eventTitle: "THB Weakens Against USD", date: "2026-09-14", direction: "POSITIVE", impactScore: 58, abnormalReturnPercent: 0.42, classification: "MODERATE_POSITIVE" },
  ],
  DELTA: [
    { eventId: "evt-2026-09-14-thb-weakens", eventTitle: "THB Weakens Against USD", date: "2026-09-14", direction: "NEGATIVE", impactScore: 52, abnormalReturnPercent: -0.4, classification: "MODERATE_NEGATIVE" },
  ],
  CPALL: [
    { eventId: "evt-2026-09-14-thb-weakens", eventTitle: "THB Weakens Against USD", date: "2026-09-14", direction: "MIXED", impactScore: 40, abnormalReturnPercent: 0.05, classification: "NEUTRAL" },
  ],
};

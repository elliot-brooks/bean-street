export interface MarketEventTemplate {
  label: string
  impact: number
  duration: number
  headlineTemplate: string
  tickerTemplate: string
  marketWide?: boolean
}

// Static headline copy used when the board first opens or when no clear movers exist.
export const marketHeadlines = {
  opening: 'BEAN STREET OPENS HOT',
  randomizedOpening: 'MARKET OPENS IN FULL CHAOS',
  flatMarket: 'MARKET FLAT, COMMENTATORS LOUD',
}

// Plain ticker lines shown on a fresh board before any event-driven summary takes over.
export const openingTickerItems = [
  'Welcome to Bean Street, where beans are discussed with absurd seriousness.',
  'Values are quoted as multipliers, not dollars. Every bean starts as itself.',
  'Analysts remain confident despite knowing nothing.',
]

// Random event templates are safe to extend in-place.
// Bean-targeted events support {SHORT_NAME} and {TICKER} in both headlineTemplate and tickerTemplate.
// Market-wide events should set marketWide: true and use plain text because no single bean is injected.
export const randomEventTemplates: MarketEventTemplate[] = [
  {
    label: 'Export Boom',
    impact: 0.28,
    duration: 1,
    headlineTemplate: '{SHORT_NAME} EXPORT BOOM',
    tickerTemplate: '{TICKER} jumps on sudden overseas demand',
  },
  {
    label: 'Bean Blight',
    impact: -0.26,
    duration: 1,
    headlineTemplate: '{SHORT_NAME} BLIGHT SCARE',
    tickerTemplate: '{TICKER} hit by crop anxiety and doom chatter',
  },
  {
    label: 'Festival Demand',
    impact: 0.18,
    duration: 1,
    headlineTemplate: '{SHORT_NAME} FESTIVAL SURGE',
    tickerTemplate: 'Street desks call {TICKER} the party bean of the week',
  },
  {
    label: 'Commodity Bubble',
    impact: 0.12,
    duration: 1,
    headlineTemplate: 'BEAN BUBBLE FEARS RISE',
    tickerTemplate: 'Analysts urge calm while everyone ignores them',
    marketWide: true,
  },
  {
    label: 'Market Panic',
    impact: -0.12,
    duration: 1,
    headlineTemplate: 'MARKET PANIC HITS BEAN STREET',
    tickerTemplate: 'Every bean suddenly looks overvalued to somebody',
    marketWide: true,
  },
]

// Selloff templates always target one bean and support {SHORT_NAME} and {TICKER}.
export const selloffEventTemplate: MarketEventTemplate = {
  label: 'Sell Wall',
  impact: -0.18,
  duration: 1,
  headlineTemplate: '{SHORT_NAME} HIT BY SELLING',
  tickerTemplate: 'Heavy selling pressure lands on {TICKER}',
}

// Trade templates always target two beans.
// Supported placeholders: {FIRST_SHORT_NAME}, {SECOND_SHORT_NAME}, {FIRST_TICKER}, {SECOND_TICKER}.
export const tradeEventTemplate: MarketEventTemplate = {
  label: 'Cross Trade',
  impact: 0.12,
  duration: 1,
  headlineTemplate: '{FIRST_SHORT_NAME} + {SECOND_SHORT_NAME} SPIKE',
  tickerTemplate: '{FIRST_TICKER}/{SECOND_TICKER} cross-trade lights up the floor',
}

// Round summary templates drive the non-event headline and ticker recap.
// Supported placeholders:
// - {COUNT}: number of distinct beans currently touched by active events
// - {WINNER_SHORT_NAME}, {LOSER_SHORT_NAME}: uppercased short bean names for the biggest mover and laggard
// - {WINNER_TICKER}, {LOSER_TICKER}: bean tickers for the biggest mover and laggard
// - {WINNER_VALUE}, {LOSER_VALUE}: current displayed bean values such as x1.24
// - {WINNER_DELTA}: displayed move for the winning bean such as x0.18
// - {LISTED_BEANS}: total number of beans listed in the catalog
// incomingEventContext is plain text and does not use placeholder replacement.
export const roundSummaryTemplates = {
  incomingEventCoverageTemplate: '{COUNT} bean sectors now under active coverage',
  incomingEventContext: 'Recent signals stay on screen so the table can keep overreacting.',
  marketLeaderHeadlineTemplate: '{WINNER_SHORT_NAME} LEADS, {LOSER_SHORT_NAME} WOBBLES',
  winnerTickerTemplate: '{WINNER_TICKER} now {WINNER_VALUE} after a {WINNER_DELTA} move',
  loserTickerTemplate: '{LOSER_TICKER} retreats to {LOSER_VALUE} as confidence evaporates',
  listedBeansTemplate: '{LISTED_BEANS} bean listings remain wildly overdiscussed',
}
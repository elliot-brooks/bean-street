export type BeanId = string

export type Momentum = 'crashing' | 'slipping' | 'steady' | 'rallying' | 'surging'

export type Sentiment = 'panic' | 'bearish' | 'mixed' | 'bullish' | 'euphoric'

export type EventType = 'random' | 'selloff' | 'trade'

export interface BeanDefinition {
  id: BeanId
  name: string
  ticker: string
  hue: string
  baseValue: number
  volatility: number
  tagline: string
}

export interface BeanMarketState {
  beanId: BeanId
  value: number
  previousValue: number
  delta: number
  momentumScore: number
  momentum: Momentum
  sentiment: Sentiment
  activeTags: string[]
}

export interface MarketEventBase {
  id: string
  label: string
  impact: number
  duration: number
  headline: string
}

export interface RandomMarketEvent extends MarketEventBase {
  type: 'random'
  target: BeanId | 'market'
  ticker: string
}

export interface SelloffEvent extends MarketEventBase {
  type: 'selloff'
  target: BeanId
  ticker: string
}

export interface TradeEvent extends MarketEventBase {
  type: 'trade'
  targets: [BeanId, BeanId]
  ticker: string
}

export type MarketEvent = RandomMarketEvent | SelloffEvent | TradeEvent

export interface MarketRoundSummary {
  headline: string
  tickerItems: string[]
  activeEvent?: MarketEvent
}

export interface MarketState {
  tick: number
  beans: Record<BeanId, BeanMarketState>
  activeEvents: MarketEvent[]
  latestHeadline: string
  tickerItems: string[]
}
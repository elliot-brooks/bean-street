import { beanCatalog } from '../../data/beans'
import { getEventImpact } from '../events/eventEffects'
import type { BeanDefinition, BeanMarketState, Momentum, Sentiment } from '../../types/market'
import type { MarketEvent } from '../../types/market'

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

const getMomentumLabel = (score: number): Momentum => {
  if (score <= -0.45) {
    return 'crashing'
  }

  if (score <= -0.2) {
    return 'slipping'
  }

  if (score >= 0.45) {
    return 'surging'
  }

  if (score >= 0.2) {
    return 'rallying'
  }

  return 'steady'
}

const getSentiment = (delta: number): Sentiment => {
  if (delta <= -0.22) {
    return 'panic'
  }

  if (delta < -0.05) {
    return 'bearish'
  }

  if (delta >= 0.22) {
    return 'euphoric'
  }

  if (delta > 0.05) {
    return 'bullish'
  }

  return 'mixed'
}

const getNoise = (volatility: number): number => {
  const roll = Math.random() - 0.5
  return Number((roll * volatility * 0.08).toFixed(2))
}

export const createInitialBeanState = (bean: BeanDefinition): BeanMarketState => ({
  beanId: bean.id,
  value: bean.baseValue,
  previousValue: bean.baseValue,
  delta: 0,
  momentumScore: 0,
  momentum: 'steady',
  sentiment: 'mixed',
  activeTags: [],
})

export const createInitialBeansState = (): Record<BeanDefinition['id'], BeanMarketState> =>
  Object.fromEntries(beanCatalog.map((bean) => [bean.id, createInitialBeanState(bean)])) as Record<
    BeanDefinition['id'],
    BeanMarketState
  >

export const createRandomizedBeansState = (): Record<BeanDefinition['id'], BeanMarketState> =>
  beanCatalog.reduce(
    (beans, bean) => {
      const value = clamp(Number((1 + (Math.random() - 0.5) * 1.5).toFixed(2)), 0.55, 2.35)
      const previousValue = clamp(
        Number((value - (Math.random() - 0.5) * 0.32).toFixed(2)),
        0.5,
        2.4,
      )
      const delta = Number((value - previousValue).toFixed(2))
      const momentumScore = clamp(Number((delta * 1.6).toFixed(2)), -0.8, 0.8)

      beans[bean.id] = {
        beanId: bean.id,
        value,
        previousValue,
        delta,
        momentumScore,
        momentum: getMomentumLabel(momentumScore),
        sentiment: getSentiment(delta),
        activeTags: [],
      }

      return beans
    },
    {} as Record<BeanDefinition['id'], BeanMarketState>,
  )

export const applyEventToBean = (
  bean: BeanDefinition,
  previous: BeanMarketState,
  event: MarketEvent,
): BeanMarketState => {
  const eventImpact = getEventImpact(event, bean.id)
  const noise = eventImpact === 0 ? 0 : getNoise(bean.volatility)
  const delta = clamp(eventImpact + noise, -0.35, 0.35)
  const nextValue = clamp(Number((previous.value + delta).toFixed(2)), 0.5, 3.5)
  const momentumScore = clamp(Number((previous.momentumScore + delta).toFixed(2)), -0.8, 0.8)

  return {
    beanId: bean.id,
    value: nextValue,
    previousValue: previous.value,
    delta,
    momentumScore,
    momentum: getMomentumLabel(momentumScore),
    sentiment: getSentiment(delta),
    activeTags: previous.activeTags,
  }
}
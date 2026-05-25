import { beanById, beanIds } from '../../data/beans'
import { marketHeadlines } from '../../data/marketContent'
import { getActiveTagsForBean } from '../events/eventEffects'
import { applyEventToBean, createInitialBeansState, createRandomizedBeansState } from './marketEngine'
import { buildRoundSummary, createOpeningTicker } from '../news/headlineGenerator'
import type { MarketEvent, MarketState } from '../../types/market'

const MAX_ACTIVE_EVENTS = 6

export const createInitialMarketState = (): MarketState => ({
  tick: 1,
  beans: createInitialBeansState(),
  activeEvents: [],
  latestHeadline: marketHeadlines.opening,
  tickerItems: createOpeningTicker(),
})

export const createRandomizedMarketState = (): MarketState => {
  const beans = createRandomizedBeansState()
  const summary = buildRoundSummary(beans, [])

  return {
    tick: Math.floor(Math.random() * 8) + 4,
    beans,
    activeEvents: [],
    latestHeadline: marketHeadlines.randomizedOpening,
    tickerItems: summary.tickerItems,
  }
}

export const applyImmediateEvent = (state: MarketState, event: MarketEvent): MarketState => {
  const activeEvents = [event, ...state.activeEvents].slice(0, MAX_ACTIVE_EVENTS)
  const beans = Object.fromEntries(
    beanIds.map((beanId) => {
      const definition = beanById[beanId]
      const previous = state.beans[beanId]
      const next = applyEventToBean(definition, previous, event)

      return [
        beanId,
        {
          ...next,
          activeTags: getActiveTagsForBean(activeEvents, beanId),
        },
      ]
    }),
  ) as MarketState['beans']
  const summary = buildRoundSummary(beans, activeEvents, event)

  return {
    tick: state.tick + 1,
    beans,
    activeEvents,
    latestHeadline: summary.headline,
    tickerItems: summary.tickerItems,
  }
}
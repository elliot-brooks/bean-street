import { beanById, beanIds } from '../../data/beans'
import { marketHeadlines, openingTickerItems, roundSummaryTemplates } from '../../data/marketContent'
import { fillCopyTemplate, shortBeanName } from '../../lib/copy'
import { countBeansTouchedByEvents } from '../events/eventEffects'
import type { BeanMarketState, MarketEvent, MarketRoundSummary } from '../../types/market'

const byDeltaDesc = (left: BeanMarketState, right: BeanMarketState) => right.delta - left.delta
const formatMultiple = (value: number) => `x${value.toFixed(2)}`

export const createOpeningTicker = (): string[] => [...openingTickerItems]

const getTopMovers = (beans: Record<string, BeanMarketState>) => {
  const values = Object.values(beans).sort(byDeltaDesc)
  return {
    winner: values[0],
    loser: values.at(-1),
  }
}

export const buildRoundSummary = (
  beans: Record<string, BeanMarketState>,
  activeEvents: MarketEvent[],
  incomingEvent?: MarketEvent,
): MarketRoundSummary => {
  if (incomingEvent) {
    return {
      headline: incomingEvent.headline,
      activeEvent: incomingEvent,
      tickerItems: [
        incomingEvent.ticker,
        fillCopyTemplate(roundSummaryTemplates.incomingEventCoverageTemplate, {
          COUNT: countBeansTouchedByEvents(activeEvents),
        }),
        roundSummaryTemplates.incomingEventContext,
      ],
    }
  }

  const { winner, loser } = getTopMovers(beans)

  if (!winner || !loser) {
    return {
      headline: marketHeadlines.flatMarket,
      tickerItems: createOpeningTicker(),
    }
  }

  const winnerBean = beanById[winner.beanId]
  const loserBean = beanById[loser.beanId]

  return {
    headline: fillCopyTemplate(roundSummaryTemplates.marketLeaderHeadlineTemplate, {
      WINNER_SHORT_NAME: shortBeanName(winnerBean.name).toUpperCase(),
      LOSER_SHORT_NAME: shortBeanName(loserBean.name).toUpperCase(),
    }),
    tickerItems: [
      fillCopyTemplate(roundSummaryTemplates.winnerTickerTemplate, {
        WINNER_TICKER: winnerBean.ticker,
        WINNER_VALUE: formatMultiple(winner.value),
        WINNER_DELTA: formatMultiple(winner.delta),
      }),
      fillCopyTemplate(roundSummaryTemplates.loserTickerTemplate, {
        LOSER_TICKER: loserBean.ticker,
        LOSER_VALUE: formatMultiple(loser.value),
      }),
      fillCopyTemplate(roundSummaryTemplates.listedBeansTemplate, {
        LISTED_BEANS: beanIds.length,
      }),
    ],
  }
}
import { beanById, beanIds } from '../../data/beans'
import { countBeansTouchedByEvents } from '../events/eventEffects'
import type { BeanMarketState, MarketEvent, MarketRoundSummary } from '../../types/market'

const byDeltaDesc = (left: BeanMarketState, right: BeanMarketState) => right.delta - left.delta
const formatMultiple = (value: number) => `x${value.toFixed(2)}`

export const createOpeningTicker = (): string[] => [
  'Welcome to Bean Street, where beans are discussed with absurd seriousness.',
  'Values are quoted as multipliers, not dollars. Every bean starts as itself.',
  'Analysts remain confident despite knowing nothing.',
]

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
        `${countBeansTouchedByEvents(activeEvents)} bean sectors now under active coverage`,
        'Recent signals stay on screen so the table can keep overreacting.',
      ],
    }
  }

  const { winner, loser } = getTopMovers(beans)

  if (!winner || !loser) {
    return {
      headline: 'THE MARKET STALLS WHILE COMMENTATORS PANIC ANYWAY',
      tickerItems: createOpeningTicker(),
    }
  }

  const winnerBean = beanById[winner.beanId]
  const loserBean = beanById[loser.beanId]

  return {
    headline: `${winnerBean.name.toUpperCase()} LEADS WHILE ${loserBean.name.toUpperCase()} FACES TOUGH QUESTIONS`,
    tickerItems: [
      `${winnerBean.ticker} now ${formatMultiple(winner.value)} after a ${formatMultiple(winner.delta)} move`,
      `${loserBean.ticker} retreats to ${formatMultiple(loser.value)} as confidence evaporates`,
      `${beanIds.length} bean listings remain wildly overdiscussed`,
    ],
  }
}
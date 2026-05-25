import { beanCatalog, beanIds } from '../../data/beans'
import type { BeanId, RandomMarketEvent, SelloffEvent, TradeEvent } from '../../types/market'

const shortName = (name: string): string => name.replace(/ bean/gi, '')

const randomTemplates = [
  {
    label: 'Export Boom',
    impact: 0.28,
    duration: 1,
    makeHeadline: (name: string) => `${shortName(name).toUpperCase()} EXPORT BOOM`,
    makeTicker: (ticker: string) => `${ticker} jumps on sudden overseas demand`,
  },
  {
    label: 'Bean Blight',
    impact: -0.26,
    duration: 1,
    makeHeadline: (name: string) => `${shortName(name).toUpperCase()} BLIGHT SCARE`,
    makeTicker: (ticker: string) => `${ticker} hit by crop anxiety and doom chatter`,
  },
  {
    label: 'Festival Demand',
    impact: 0.18,
    duration: 1,
    makeHeadline: (name: string) => `${shortName(name).toUpperCase()} FESTIVAL SURGE`,
    makeTicker: (ticker: string) => `Street desks call ${ticker} the party bean of the week`,
  },
  {
    label: 'Commodity Bubble',
    impact: 0.12,
    duration: 1,
    makeHeadline: () => 'BEAN BUBBLE FEARS RISE',
    makeTicker: () => 'Analysts urge calm while everyone ignores them',
    marketWide: true,
  },
  {
    label: 'Market Panic',
    impact: -0.12,
    duration: 1,
    makeHeadline: () => 'MARKET PANIC HITS BEAN STREET',
    makeTicker: () => 'Every bean suddenly looks overvalued to somebody',
    marketWide: true,
  },
]

const nextId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`

export const drawRandomEvent = (): RandomMarketEvent => {
  const template = randomTemplates[Math.floor(Math.random() * randomTemplates.length)]

  if (template.marketWide) {
    return {
      id: nextId('event'),
      type: 'random',
      label: template.label,
      impact: template.impact,
      duration: template.duration,
      target: 'market',
      headline: template.makeHeadline(),
      ticker: template.makeTicker(),
    }
  }

  const beanId = beanIds[Math.floor(Math.random() * beanIds.length)]
  const bean = beanCatalog.find((item) => item.id === beanId)

  if (!bean) {
    throw new Error('Missing bean definition for random event')
  }

  return {
    id: nextId('event'),
    type: 'random',
    label: template.label,
    impact: template.impact,
    duration: template.duration,
    target: beanId,
    headline: template.makeHeadline(bean.name),
    ticker: template.makeTicker(bean.ticker),
  }
}

export const createSelloffEvent = (beanId: BeanId): SelloffEvent => {
  const bean = beanCatalog.find((item) => item.id === beanId)

  if (!bean) {
    throw new Error(`Missing bean definition for selloff: ${beanId}`)
  }

  return {
    id: nextId('selloff'),
    type: 'selloff',
    label: 'Sell Wall',
    impact: -0.18,
    duration: 1,
    target: beanId,
    headline: `${shortName(bean.name).toUpperCase()} HIT BY SELLING`,
    ticker: `Heavy selling pressure lands on ${bean.ticker}`,
  }
}

export const createTradeEvent = (first: BeanId, second: BeanId): TradeEvent => {
  const firstBean = beanCatalog.find((item) => item.id === first)
  const secondBean = beanCatalog.find((item) => item.id === second)

  if (!firstBean || !secondBean) {
    throw new Error('Missing bean definition for trade event')
  }

  return {
    id: nextId('trade'),
    type: 'trade',
    label: 'Cross Trade',
    impact: 0.12,
    duration: 1,
    targets: [first, second],
    headline: `${shortName(firstBean.name).toUpperCase()} + ${shortName(secondBean.name).toUpperCase()} SPIKE`,
    ticker: `${firstBean.ticker}/${secondBean.ticker} cross-trade lights up the floor`,
  }
}

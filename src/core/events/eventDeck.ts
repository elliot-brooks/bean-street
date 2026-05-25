import { beanCatalog, beanIds } from '../../data/beans'
import { randomEventTemplates, selloffEventTemplate, tradeEventTemplate } from '../../data/marketContent'
import { fillCopyTemplate, shortBeanName } from '../../lib/copy'
import type { BeanId, RandomMarketEvent, SelloffEvent, TradeEvent } from '../../types/market'

const nextId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`

export const drawRandomEvent = (): RandomMarketEvent => {
  const template = randomEventTemplates[Math.floor(Math.random() * randomEventTemplates.length)]

  if (template.marketWide) {
    return {
      id: nextId('event'),
      type: 'random',
      label: template.label,
      impact: template.impact,
      duration: template.duration,
      target: 'market',
      headline: template.headlineTemplate,
      ticker: template.tickerTemplate,
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
    headline: fillCopyTemplate(template.headlineTemplate, {
      SHORT_NAME: shortBeanName(bean.name).toUpperCase(),
      TICKER: bean.ticker,
    }),
    ticker: fillCopyTemplate(template.tickerTemplate, {
      SHORT_NAME: shortBeanName(bean.name),
      TICKER: bean.ticker,
    }),
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
    label: selloffEventTemplate.label,
    impact: selloffEventTemplate.impact,
    duration: selloffEventTemplate.duration,
    target: beanId,
    headline: fillCopyTemplate(selloffEventTemplate.headlineTemplate, {
      SHORT_NAME: shortBeanName(bean.name).toUpperCase(),
      TICKER: bean.ticker,
    }),
    ticker: fillCopyTemplate(selloffEventTemplate.tickerTemplate, {
      SHORT_NAME: shortBeanName(bean.name),
      TICKER: bean.ticker,
    }),
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
    label: tradeEventTemplate.label,
    impact: tradeEventTemplate.impact,
    duration: tradeEventTemplate.duration,
    targets: [first, second],
    headline: fillCopyTemplate(tradeEventTemplate.headlineTemplate, {
      FIRST_SHORT_NAME: shortBeanName(firstBean.name).toUpperCase(),
      SECOND_SHORT_NAME: shortBeanName(secondBean.name).toUpperCase(),
      FIRST_TICKER: firstBean.ticker,
      SECOND_TICKER: secondBean.ticker,
    }),
    ticker: fillCopyTemplate(tradeEventTemplate.tickerTemplate, {
      FIRST_SHORT_NAME: shortBeanName(firstBean.name),
      SECOND_SHORT_NAME: shortBeanName(secondBean.name),
      FIRST_TICKER: firstBean.ticker,
      SECOND_TICKER: secondBean.ticker,
    }),
  }
}

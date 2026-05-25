import { beanById, beanIds } from '../../data/beans'
import { randomEventTemplates, selloffEventTemplate, tradeEventTemplate } from '../../data/marketContent'
import { fillTemplate, shortBeanName } from '../../lib/template'
import type { BeanId, RandomMarketEvent, SelloffEvent, TradeEvent } from '../../types/market'

const nextId = (prefix: string) => `${prefix}-${crypto.randomUUID()}`

const formatList = (values: string[]): string => {
  if (values.length <= 1) {
    return values[0] ?? ''
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`
  }

  return `${values.slice(0, -1).join(', ')}, and ${values.at(-1)}`
}

const buildSetCopyValues = (beanIds: BeanId[]) => {
  const beans = beanIds.map((beanId) => beanById[beanId])

  if (beans.some((bean) => !bean)) {
    throw new Error(`Missing bean definition for grouped random event: ${beanIds.join(', ')}`)
  }

  const shortNames = beans.map((bean) => shortBeanName(bean.name))

  return {
    SHORT_NAME_LIST: formatList(shortNames),
    SHORT_NAME_LIST_UPPER: formatList(shortNames.map((name) => name.toUpperCase())),
    TICKER_LIST: beans.map((bean) => bean.ticker).join('/'),
    COUNT: beanIds.length,
  }
}

export const drawRandomEvent = (): RandomMarketEvent => {
  const template = randomEventTemplates[Math.floor(Math.random() * randomEventTemplates.length)]

  if (template.target === 'market') {
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

  if (Array.isArray(template.target)) {
    if (template.target.length === 0) {
      throw new Error('Grouped random events must target at least one bean')
    }

    const copyValues = buildSetCopyValues(template.target)

    return {
      id: nextId('event'),
      type: 'random',
      label: template.label,
      impact: template.impact,
      duration: template.duration,
      target: [...template.target],
      headline: fillTemplate(template.headlineTemplate, copyValues),
      ticker: fillTemplate(template.tickerTemplate, copyValues),
    }
  }

  const beanId = beanIds[Math.floor(Math.random() * beanIds.length)]
  const bean = beanById[beanId]

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
    headline: fillTemplate(template.headlineTemplate, {
      SHORT_NAME: shortBeanName(bean.name).toUpperCase(),
      TICKER: bean.ticker,
    }),
    ticker: fillTemplate(template.tickerTemplate, {
      SHORT_NAME: shortBeanName(bean.name),
      TICKER: bean.ticker,
    }),
  }
}

export const createSelloffEvent = (beanId: BeanId): SelloffEvent => {
  const bean = beanById[beanId]

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
    headline: fillTemplate(selloffEventTemplate.headlineTemplate, {
      SHORT_NAME: shortBeanName(bean.name).toUpperCase(),
      TICKER: bean.ticker,
    }),
    ticker: fillTemplate(selloffEventTemplate.tickerTemplate, {
      SHORT_NAME: shortBeanName(bean.name),
      TICKER: bean.ticker,
    }),
  }
}

export const createTradeEvent = (first: BeanId, second: BeanId): TradeEvent => {
  const firstBean = beanById[first]
  const secondBean = beanById[second]

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
    headline: fillTemplate(tradeEventTemplate.headlineTemplate, {
      FIRST_SHORT_NAME: shortBeanName(firstBean.name).toUpperCase(),
      SECOND_SHORT_NAME: shortBeanName(secondBean.name).toUpperCase(),
      FIRST_TICKER: firstBean.ticker,
      SECOND_TICKER: secondBean.ticker,
    }),
    ticker: fillTemplate(tradeEventTemplate.tickerTemplate, {
      FIRST_SHORT_NAME: shortBeanName(firstBean.name),
      SECOND_SHORT_NAME: shortBeanName(secondBean.name),
      FIRST_TICKER: firstBean.ticker,
      SECOND_TICKER: secondBean.ticker,
    }),
  }
}

import { beanIds } from '../../data/beans'
import type { BeanId, MarketEvent } from '../../types/market'

export const getEventImpact = (event: MarketEvent | undefined, beanId: BeanId): number => {
  if (!event) {
    return 0
  }

  switch (event.type) {
    case 'random':
      return event.target === 'market' || event.target === beanId ? event.impact : 0
    case 'selloff':
      return event.target === beanId ? event.impact : 0
    case 'trade':
      return event.targets.includes(beanId) ? event.impact : 0
    default:
      return 0
  }
}

export const getActiveTagsForBean = (events: MarketEvent[], beanId: BeanId): string[] => {
  const tags: string[] = []

  for (const event of events) {
    if (event.type === 'trade' && event.targets.includes(beanId)) {
      tags.push('hot')
    }

    if (event.type === 'selloff' && event.target === beanId) {
      tags.push('selloff')
    }

    if (event.type === 'random' && (event.target === 'market' || event.target === beanId)) {
      tags.push(event.label.toLowerCase())
    }
  }

  return tags
}

export const countBeansTouchedByEvents = (events: MarketEvent[]): number => {
  const touched = new Set<BeanId>()

  for (const event of events) {
    if (event.type === 'trade') {
      event.targets.forEach((beanId) => touched.add(beanId))
      continue
    }

    if (event.target === 'market') {
      beanIds.forEach((beanId) => touched.add(beanId))
      continue
    }

    touched.add(event.target)
  }

  return touched.size
}
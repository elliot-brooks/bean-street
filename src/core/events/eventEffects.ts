import { beanIds } from '../../data/beans'
import type { BeanId, MarketEvent } from '../../types/market'

export const getEventTargetBeanIds = (event: MarketEvent): BeanId[] => {
  switch (event.type) {
    case 'trade':
      return event.targets
    case 'random':
      if (event.target === 'market') {
        return beanIds
      }

      return Array.isArray(event.target) ? event.target : [event.target]
    case 'selloff':
      return [event.target]
    default:
      return []
  }
}

export const eventTargetsBean = (event: MarketEvent, beanId: BeanId): boolean =>
  getEventTargetBeanIds(event).includes(beanId)

export const getEventImpact = (event: MarketEvent | undefined, beanId: BeanId): number => {
  if (!event) {
    return 0
  }

  return eventTargetsBean(event, beanId) ? event.impact : 0
}

export const getActiveTagsForBean = (events: MarketEvent[], beanId: BeanId): string[] => {
  const tags: string[] = []

  for (const event of events) {
    if (event.type === 'trade' && eventTargetsBean(event, beanId)) {
      tags.push('hot')
    }

    if (event.type === 'selloff' && eventTargetsBean(event, beanId)) {
      tags.push('selloff')
    }

    if (event.type === 'random' && eventTargetsBean(event, beanId)) {
      tags.push(event.label.toLowerCase())
    }
  }

  return tags
}

export const countBeansTouchedByEvents = (events: MarketEvent[]): number => {
  const touched = new Set<BeanId>()

  for (const event of events) {
    getEventTargetBeanIds(event).forEach((beanId) => touched.add(beanId))
  }

  return touched.size
}
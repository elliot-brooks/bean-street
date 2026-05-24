import { beanById } from '../../data/beans'
import { formatDelta, formatMultiple, titleCase } from '../../lib/formatters'
import type { BeanMarketState } from '../../types/market'

interface BeanCardProps {
  bean: BeanMarketState
}

export function BeanCard({ bean }: BeanCardProps) {
  const definition = beanById[bean.beanId]
  const direction = bean.delta > 0 ? 'up' : bean.delta < 0 ? 'down' : 'flat'
  const valueTier =
    bean.value >= 1.75
      ? 'very-high'
      : bean.value >= 1.3
        ? 'high'
        : bean.value >= 0.9
          ? 'mid'
          : 'low'

  return (
    <article className={`bean-card bean-card--${valueTier}`}>
      <div className="bean-card__header">
        <div>
          <p className="bean-card__ticker">{definition.ticker}</p>
          <h3 className="bean-card__name">{definition.name}</h3>
        </div>
        <span className="bean-card__sentiment">{titleCase(bean.sentiment)}</span>
      </div>

      <div className="bean-card__pricing">
        <span className="bean-card__price">{formatMultiple(bean.value)}</span>
        <span className={`bean-card__delta bean-card__delta--${direction}`}>
          {formatDelta(bean.delta)}
        </span>
      </div>

      <div className="bean-card__footer">
        <span className="bean-card__momentum">{titleCase(bean.momentum)}</span>
        <span className="bean-card__previous">Prev {formatMultiple(bean.previousValue)}</span>
      </div>
    </article>
  )
}
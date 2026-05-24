import { BeanCard } from './BeanCard'
import type { MarketState } from '../../types/market'

interface MarketBoardProps {
  beans: MarketState['beans']
}

export function MarketBoard({ beans }: MarketBoardProps) {
  const listings = Object.values(beans).sort((left, right) => {
    if (right.value !== left.value) {
      return right.value - left.value
    }

    return right.delta - left.delta
  })

  const advancers = listings.filter((bean) => bean.delta > 0).length
  const decliners = listings.filter((bean) => bean.delta < 0).length

  return (
    <div className="market-board">
      <div className="market-board__intro">
        <div>
          <p className="market-board__eyebrow">Commodity Exchange</p>
          <h2 className="market-board__title">Bean Futures Board</h2>
        </div>
        <div className="market-board__stats">
          <div>
            <span className="market-board__stat-label">Advancers</span>
            <strong>{advancers}</strong>
          </div>
          <div>
            <span className="market-board__stat-label">Decliners</span>
            <strong>{decliners}</strong>
          </div>
          <div>
            <span className="market-board__stat-label">Coverage</span>
            <strong>{listings.length} beans</strong>
          </div>
          <div>
            <span className="market-board__stat-label">Format</span>
            <strong>Relative x-values</strong>
          </div>
        </div>
      </div>

      <div className="market-board__grid">
        {listings.map((bean) => (
          <BeanCard bean={bean} key={bean.beanId} />
        ))}
      </div>
    </div>
  )
}
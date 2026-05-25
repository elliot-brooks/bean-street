import { useState } from 'react'
import type { BeanDefinition, BeanId, MarketEvent } from '../../types/market'

interface HostControlsProps {
  beanOptions: BeanDefinition[]
  latestEvent?: MarketEvent
  onRandomizeMarket: () => void
  onRandomEvent: () => void
  onSell: (beanId: BeanId) => void
  onTrade: (first: BeanId, second: BeanId) => void
  onReset: () => void
}

const formatBeanList = (beanNames: string[]): string => {
  if (beanNames.length <= 1) {
    return beanNames[0] ?? ''
  }

  if (beanNames.length === 2) {
    return `${beanNames[0]} and ${beanNames[1]}`
  }

  return `${beanNames.slice(0, -1).join(', ')}, and ${beanNames.at(-1)}`
}

const describeEvent = (event: MarketEvent | undefined, beanOptions: BeanDefinition[]): string => {
  if (!event) {
    return 'No events yet.'
  }

  const getBeanName = (beanId: BeanId): string => {
    return beanOptions.find((bean) => bean.id === beanId)?.name ?? beanId
  }

  const getBeanNames = (beanIds: BeanId[]): string => formatBeanList(beanIds.map(getBeanName))

  switch (event.type) {
    case 'selloff':
      return `${getBeanName(event.target)} marked sold.`
    case 'trade':
      return `${getBeanNames(event.targets)} marked traded.`
    case 'random':
      if (event.target === 'market') {
        return `${event.label} hit the whole market.`
      }

      return Array.isArray(event.target)
        ? `${event.label} hit ${getBeanNames(event.target)}.`
        : `${event.label} hit ${getBeanName(event.target)}.`
    default:
      return event satisfies never
  }
}

export function HostControls({
  beanOptions,
  latestEvent,
  onRandomizeMarket,
  onRandomEvent,
  onSell,
  onTrade,
  onReset,
}: HostControlsProps) {
  const [sellBean, setSellBean] = useState<BeanId>(beanOptions[0].id)
  const [tradeFirst, setTradeFirst] = useState<BeanId>(beanOptions[0].id)
  const [tradeSecond, setTradeSecond] = useState<BeanId>(beanOptions[1]?.id ?? beanOptions[0].id)
  const latestEventSummary = describeEvent(latestEvent, beanOptions)

  return (
    <div className="host-panel">
      <div className="host-panel__intro">
        <p className="host-panel__eyebrow">Host Desk</p>
        <h2 className="host-panel__title">Run the floor</h2>
      </div>

      <div className="host-panel__status">
        <p className="host-panel__copy">Latest event</p>
        <strong>{latestEventSummary}</strong>
      </div>

      <div className="host-panel__actions">
        <button className="host-button host-button--primary" type="button" onClick={onRandomizeMarket}>
          Randomize Market
        </button>

        <button className="host-button host-button--accent" type="button" onClick={onRandomEvent}>
          Trigger Random Event
        </button>

        <div className="host-panel__inline-action">
          <select value={sellBean} onChange={(event) => setSellBean(event.target.value as BeanId)}>
            {beanOptions.map((bean) => (
              <option key={bean.id} value={bean.id}>
                {bean.name}
              </option>
            ))}
          </select>
          <button className="host-button host-button--accent" type="button" onClick={() => onSell(sellBean)}>
            Mark Bean Sold
          </button>
        </div>

        <div className="host-panel__inline-action host-panel__inline-action--split">
          <select
            value={tradeFirst}
            onChange={(event) => setTradeFirst(event.target.value as BeanId)}
          >
            {beanOptions.map((bean) => (
              <option key={`${bean.id}-first`} value={bean.id}>
                {bean.name}
              </option>
            ))}
          </select>
          <select
            value={tradeSecond}
            onChange={(event) => setTradeSecond(event.target.value as BeanId)}
          >
            {beanOptions.map((bean) => (
              <option key={`${bean.id}-second`} value={bean.id}>
                {bean.name}
              </option>
            ))}
          </select>
          <button
            className="host-button host-button--accent"
            type="button"
            onClick={() => onTrade(tradeFirst, tradeSecond)}
            disabled={tradeFirst === tradeSecond}
          >
            Mark Beans Traded
          </button>
        </div>
      </div>

      <div className="host-panel__footer">
        <button className="host-button host-button--ghost" type="button" onClick={onReset}>
          Reset Market
        </button>
      </div>
    </div>
  )
}
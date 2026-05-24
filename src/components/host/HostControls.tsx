import { useState } from 'react'
import type { BeanDefinition, BeanId } from '../../types/market'

interface HostControlsProps {
  beanOptions: BeanDefinition[]
  signalCount: number
  activeEventCount: number
  onRandomizeMarket: () => void
  onRandomEvent: () => void
  onSell: (beanId: BeanId) => void
  onTrade: (first: BeanId, second: BeanId) => void
  onReset: () => void
}

export function HostControls({
  beanOptions,
  signalCount,
  activeEventCount,
  onRandomizeMarket,
  onRandomEvent,
  onSell,
  onTrade,
  onReset,
}: HostControlsProps) {
  const [sellBean, setSellBean] = useState<BeanId>(beanOptions[0].id)
  const [tradeFirst, setTradeFirst] = useState<BeanId>(beanOptions[0].id)
  const [tradeSecond, setTradeSecond] = useState<BeanId>(beanOptions[1]?.id ?? beanOptions[0].id)

  return (
    <div className="host-panel">
      <div className="host-panel__intro">
        <p className="host-panel__eyebrow">Host Desk</p>
        <h2 className="host-panel__title">Run the floor</h2>
      </div>

      <div className="host-panel__status">
        <span>{signalCount - 1} signals fired</span>
        <span>{activeEventCount} recent signals</span>
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
          <button className="host-button" type="button" onClick={() => onSell(sellBean)}>
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
            className="host-button"
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
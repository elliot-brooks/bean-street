import { startTransition, useState } from 'react'
import './App.css'
import { beanCatalog } from './data/beans'
import { createSelloffEvent, createTradeEvent, drawRandomEvent } from './features/events/eventDeck'
import {
  applyImmediateEvent,
  createInitialMarketState,
  createRandomizedMarketState,
} from './features/market/marketState'
import { AppShell } from './components/layout/AppShell'
import { BreakingNewsBanner } from './components/news/BreakingNewsBanner'
import { NewsTicker } from './components/news/NewsTicker'
import { MarketBoard } from './components/market/MarketBoard'
import { HostControls } from './components/host/HostControls'
import type { BeanId } from './types/market'

function App() {
  const [market, setMarket] = useState(createInitialMarketState)

  const handleRandomizeMarket = () => {
    startTransition(() => {
      setMarket(createRandomizedMarketState())
    })
  }

  const handleRandomEvent = () => {
    startTransition(() => {
      setMarket((current) => applyImmediateEvent(current, drawRandomEvent()))
    })
  }

  const handleSell = (beanId: BeanId) => {
    startTransition(() => {
      setMarket((current) => applyImmediateEvent(current, createSelloffEvent(beanId)))
    })
  }

  const handleTrade = (first: BeanId, second: BeanId) => {
    startTransition(() => {
      setMarket((current) => applyImmediateEvent(current, createTradeEvent(first, second)))
    })
  }

  const handleReset = () => {
    startTransition(() => {
      setMarket(createInitialMarketState())
    })
  }

  return (
    <AppShell
      banner={
        <BreakingNewsBanner
          headline={market.latestHeadline}
          signalCount={market.tick}
          activeEventCount={market.activeEvents.length}
        />
      }
      ticker={<NewsTicker items={market.tickerItems} />}
      board={<MarketBoard beans={market.beans} />}
      controls={
        <HostControls
          beanOptions={beanCatalog}
          signalCount={market.tick}
          activeEventCount={market.activeEvents.length}
          onRandomizeMarket={handleRandomizeMarket}
          onRandomEvent={handleRandomEvent}
          onSell={handleSell}
          onTrade={handleTrade}
          onReset={handleReset}
        />
      }
    />
  )
}

export default App

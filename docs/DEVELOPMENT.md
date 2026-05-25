# Development

Bean Street is a small Vite + React + TypeScript app with all market state held in the client.

## Commands

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run preview`

## Repo Shape

```text
src/
  App.tsx                  App wiring and top-level state
  components/
    host/                  Host control panel
    layout/                Shell layout
    market/                Board and bean cards
    news/                  Headline banner and ticker
  data/                    Static bean catalog
  core/
    events/                Event factories and event helpers
    market/                Pricing engine and market state
    news/                  Headline and ticker generation
  lib/                     Format helpers
  types/                   Shared domain types
```

## Runtime Flow

1. `App` creates the initial market state.
2. A host action creates a market event or resets the board.
3. `applyImmediateEvent()` applies the event across all beans.
4. The pricing engine recalculates value, delta, momentum, and sentiment.
5. News copy is regenerated from the latest event or board state.

## Important Files

- `src/App.tsx`: owns market state and wires the UI.
- `src/core/market/marketState.ts`: initial state, randomized state, event application.
- `src/core/market/marketEngine.ts`: bean-level pricing rules.
- `src/core/events/eventDeck.ts`: random, selloff, and trade event creation.
- `src/core/news/headlineGenerator.ts`: headline and ticker summaries.
- `src/components/host/HostControls.tsx`: host actions available in the UI.

## Working Rules

- Keep market behavior in `core/`, not in components.
- Update `src/types/market.ts` first when changing state or event shapes.

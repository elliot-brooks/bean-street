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
  data/                    Static bean catalog and tunable market
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
- `src/data/marketContent.ts`: tweakable market environment.
- `src/components/host/HostControls.tsx`: host actions available in the UI.

## Working Rules

- Keep market behavior in `core/`, not in components.
- Update `src/types/market.ts` first when changing state or event shapes.

## Extending Content

The extension path is intentionally data-first:

- Add a bean by appending one object in `src/data/beans.ts`.
- Add a random event by appending one object in `src/data/marketContent.ts` under `randomEventTemplates`.
- Add or tune default headlines and ticker copy in `src/data/marketContent.ts`.

### Example: Add a New Bean

Add one object to `beanCatalog` in `src/data/beans.ts`:

```ts
{
  id: 'cocoa',
  name: 'Cocoa Bean',
  ticker: 'COA',
  hue: '#6b4226',
  baseValue: 1,
  volatility: 1.2,
  tagline: 'luxury sentiment with fragile conviction',
}
```

That is enough for the bean to appear everywhere the app reads the catalog.

### Example: Add a New Random Event

Add one object to `randomEventTemplates` in `src/data/marketContent.ts`:

```ts
{
  label: 'Cafe Craze',
  impact: 0.22,
  duration: 1,
  headlineTemplate: '{SHORT_NAME} CAFE CRAZE TAKES HOLD',
  tickerTemplate: '{TICKER} rallies as cafe buyers suddenly discover taste',
}
```

Bean-targeted random events support `{SHORT_NAME}` and `{TICKER}` in both templates.

For market-wide events, set `marketWide: true` and use plain text templates.

`src/data/marketContent.ts` is the source of truth for which placeholders are valid in each template family.

### Example: Tune Round Headlines And Ticker Copy

Edit the strings in `roundSummaryTemplates` inside `src/data/marketContent.ts`:

```ts
marketLeaderHeadlineTemplate: '{WINNER_SHORT_NAME} DOMINATES, {LOSER_SHORT_NAME} FADES',
winnerTickerTemplate: '{WINNER_TICKER} climbs to {WINNER_VALUE} after a {WINNER_DELTA} jump',
```

The exact placeholder meanings now live next to `roundSummaryTemplates` in `src/data/marketContent.ts`, including what `{COUNT}` measures and which fields are plain text versus template-driven.

import type { ReactNode } from 'react'

interface AppShellProps {
  banner: ReactNode
  ticker: ReactNode
  board: ReactNode
  controls: ReactNode
}

export function AppShell({ banner, ticker, board, controls }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-shell__header">{banner}</header>
      <div className="app-shell__ticker">{ticker}</div>
      <main className="app-shell__main">
        <section className="app-shell__board">{board}</section>
        <aside className="app-shell__controls">{controls}</aside>
      </main>
    </div>
  )
}
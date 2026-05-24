interface NewsTickerProps {
  items: string[]
}

export function NewsTicker({ items }: NewsTickerProps) {
  return (
    <div className="news-ticker" aria-label="Market ticker">
      <div className="news-ticker__track">
        {[...items, ...items].map((item, index) => (
          <span className="news-ticker__item" key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
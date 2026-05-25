interface BreakingNewsBannerProps {
  headline: string
}

export function BreakingNewsBanner({ headline }: BreakingNewsBannerProps) {
  return (
    <div className="breaking-news">
      <div className="breaking-news__kicker">LIVE FROM BEAN STREET</div>
      <div className="breaking-news__headline-row">
        <h1 className="breaking-news__headline">{headline}</h1>
      </div>
    </div>
  )
}
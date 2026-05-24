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
      <p className="breaking-news__subhead">
        Every bean starts at x1.00. Events push them above or below their own baseline.
      </p>
    </div>
  )
}
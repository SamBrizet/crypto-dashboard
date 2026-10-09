export default function MetricCard({ label, value, hint, icon: Icon, tone = 'neutral' }) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <div className="metric-card__label">
        <span>{label}</span>
        {Icon ? <Icon aria-hidden="true" /> : null}
      </div>
      <strong className="metric-card__value">{value}</strong>
      <p className="metric-card__hint">{hint}</p>
    </article>
  )
}
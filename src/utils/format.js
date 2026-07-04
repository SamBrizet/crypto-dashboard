export function formatCurrency(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: value > 100 ? 0 : 2,
  }).format(value)
}

export function formatCompact(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatPercent(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`
}
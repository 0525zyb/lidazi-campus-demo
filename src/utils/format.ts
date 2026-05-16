export function formatCurrency(value: number) {
  return `${Math.round(value).toLocaleString('zh-CN')} 元`
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

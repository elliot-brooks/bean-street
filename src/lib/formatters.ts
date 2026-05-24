export const formatMultiple = (value: number): string => `x${value.toFixed(2)}`

export const formatDelta = (value: number): string => {
  if (value === 0) {
    return 'x0.00'
  }

  const formatted = `x${Math.abs(value).toFixed(2)}`

  return value > 0 ? `+${formatted}` : `-${formatted}`
}

export const titleCase = (value: string): string =>
  value
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
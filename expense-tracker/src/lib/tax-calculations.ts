export const TAX_RATES = {
  NZ: 0.15,  // 15% GST
  AU: 0.10,  // 10% GST
  UK: 0.20,  // 20% VAT
  US: 0      // No federal tax
} as const

export type Country = keyof typeof TAX_RATES

/**
 * Calculate tax amount from total amount
 * Formula: total - (total / (1 + rate))
 */
export const calculateTaxAmount = (total: number, country: Country): number => {
  const rate = TAX_RATES[country]
  if (rate === 0) return 0
  return total - (total / (1 + rate))
}

/**
 * Calculate net amount (amount excluding tax)
 */
export const calculateNetAmount = (total: number, country: Country): number => {
  const rate = TAX_RATES[country]
  if (rate === 0) return total
  return total / (1 + rate)
}

/**
 * Calculate total amount including tax
 */
export const calculateTotalWithTax = (netAmount: number, country: Country): number => {
  const rate = TAX_RATES[country]
  return netAmount * (1 + rate)
}

/**
 * Format tax rate as percentage string
 */
export const formatTaxRate = (country: Country): string => {
  const rate = TAX_RATES[country]
  if (rate === 0) return '0%'
  return `${(rate * 100).toFixed(0)}%`
}

/**
 * Get tax name for country
 */
export const getTaxName = (country: Country): string => {
  switch (country) {
    case 'NZ':
    case 'AU':
      return 'GST'
    case 'UK':
      return 'VAT'
    case 'US':
      return 'Tax'
    default:
      return 'Tax'
  }
}

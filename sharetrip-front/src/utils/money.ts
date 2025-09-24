const CURRENCY_EXPONENTS: Record<string, number> = {
  USD: 2, EUR: 2, GBP: 2, CAD: 2, AUD: 2, CHF: 2,
  JOD: 3, BHD: 3, KWD: 3, OMR: 3, TND: 3,
  JPY: 0, KRW: 0, VND: 0, CLP: 0, IDR: 0, ISK: 0,
  TWD: 0, HUF: 0, COP: 0, PYG: 0,
}

export function formatMinor(minor: number, currency: string): string {
  const exponent = CURRENCY_EXPONENTS[currency.toUpperCase()] ?? 2
  const major = minor / Math.pow(10, exponent)

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: exponent,
    maximumFractionDigits: exponent,
  }).format(major)
}
import type { LocaleCode } from '~/types/navigation'

/**
 * Formats an amount the backend supplied. It never computes or adjusts a price —
 * see docs/PROJECT-PLAN.md, Backend Boundaries. Currency is SEK in both locales.
 */
export function formatPrice(amount: number, locale: LocaleCode = 'sv'): string {
  const formatted = new Intl.NumberFormat(locale === 'en' ? 'en-GB' : 'sv-SE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  // Normalize the narrow no-break space Intl emits for sv-SE grouping so the
  // output is stable across Node and browser ICU builds.
  return `${formatted.replace(/ /g, ' ')} kr`
}

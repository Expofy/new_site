import { describe, expect, it } from 'vitest'
import { formatPrice } from '../app/utils/formatPrice'

describe('formatPrice', () => {
  it('formats a whole amount with two decimals and the SEK suffix', () => {
    expect(formatPrice(650)).toBe('650,00 kr')
  })

  it('groups thousands with a non-breaking space in Swedish', () => {
    expect(formatPrice(4531.25)).toBe('4\u00A0531,25 kr')
  })

  it('never emits the narrow no-break space that ICU builds disagree on', () => {
    expect(formatPrice(4531.25)).not.toContain('\u202F')
  })

  it('uses SEK in English too, with English separators', () => {
    expect(formatPrice(4531.25, 'en')).toBe('4,531.25 kr')
  })

  it('formats zero rather than rendering an empty cart summary blank', () => {
    expect(formatPrice(0)).toBe('0,00 kr')
  })

  it('rounds to two decimals for display without altering the given amount', () => {
    expect(formatPrice(199.999)).toBe('200,00 kr')
  })
})

import { describe, expect, it } from 'vitest'
import en from '../i18n/locales/en.json'
import sv from '../i18n/locales/sv.json'

type Messages = { [key: string]: string | Messages }

const flatten = (messages: Messages, prefix = ''): Record<string, string> =>
  Object.entries(messages).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    return typeof value === 'string'
      ? { ...acc, [path]: value }
      : { ...acc, ...flatten(value, path) }
  }, {})

const svKeys = flatten(sv as Messages)
const enKeys = flatten(en as Messages)

/**
 * A missing message is not a crash — vue-i18n renders the key path as the
 * string. In the <title> that ships "seo.defaultTitle" to search engines as the
 * page's name, and nothing in the UI looks broken enough to catch it.
 */
describe('locale message parity', () => {
  it('defines the same keys in both locales', () => {
    expect(Object.keys(svKeys).sort()).toEqual(Object.keys(enKeys).sort())
  })

  it('leaves no message empty', () => {
    for (const [key, value] of Object.entries({ ...svKeys, ...enKeys })) {
      expect(value.trim(), key).not.toBe('')
    }
  })
})

/**
 * Meta descriptions are truncated in results at roughly 160 characters. Past
 * that the tail is not shown, so a description that runs long is a description
 * whose ending was never read.
 */
describe('seo messages', () => {
  const descriptions = ['seo.defaultDescription', 'seo.searchDescription']

  it('keeps every description short enough to survive truncation', () => {
    for (const locale of [svKeys, enKeys]) {
      for (const key of descriptions) {
        expect(locale[key]!.length, `${key}: ${locale[key]}`).toBeLessThanOrEqual(160)
      }
    }
  })

  it('gives the default title the brand, since it takes no brand suffix', () => {
    expect(svKeys['seo.defaultTitle']).toContain(svKeys['site.name']!)
    expect(enKeys['seo.defaultTitle']).toContain(enKeys['site.name']!)
  })
})

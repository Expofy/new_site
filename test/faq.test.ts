import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { faqEntries } from '../app/data/faq'
import { services } from '../app/data/services'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

describe('faq entries', () => {
  /** The ids are the accordion's item values: a duplicate opens two at once. */
  it('gives every entry a unique id', () => {
    expect(duplicates(faqEntries.map(entry => entry.id))).toEqual([])
  })

  it('ships the five questions the design shows', () => {
    expect(faqEntries).toHaveLength(5)
  })

  it('writes both locales for every string', () => {
    for (const entry of faqEntries) {
      const strings = [['question', entry.question], ['answer', entry.answer]] as const
      for (const [field, value] of entry.link ? [...strings, ['link.label', entry.link.label] as const] : strings) {
        expect(value.sv, `${entry.id}.${field}`).toBeTruthy()
        expect(value.en, `${entry.id}.${field}`).toBeTruthy()
      }
    }
  })

  /** A renamed service slug would otherwise leave a dead link inside an answer. */
  it('links only to pages the services block links', () => {
    const servicePaths = services.map(service => service.to)
    for (const entry of faqEntries.filter(entry => entry.link)) {
      expect(servicePaths, entry.id).toContain(entry.link!.to)
    }
  })
})

describe('faq support photo', () => {
  const file = fileURLToPath(new URL('../public/faq/support.webp', import.meta.url))

  it('ships the photo the card references', () => {
    expect(existsSync(file)).toBe(true)
  })

  /** The card states 236×356 to reserve the box before the file loads. */
  it('matches the size the card states', async () => {
    const webp = await readFile(file)
    expect(webp.toString('ascii', 12, 16)).toBe('VP8X')
    expect(webp.readUIntLE(24, 3) + 1).toBe(236)
    expect(webp.readUIntLE(27, 3) + 1).toBe(356)
  })
})

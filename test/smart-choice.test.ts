import { existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { smartChoiceBlock, smartChoiceBlocks } from '../app/data/smart-choice'
import { mainNav } from '../app/data/navigation'
import type { Localized } from '../app/types/navigation'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

const navPaths = mainNav.flatMap(item => [
  ...(item.to ? [item.to] : []),
  ...(item.panel?.columns ?? []).flatMap(column => column.items.map(link => link.to)),
])

/** Every localised string a panel carries, flattened with a name to blame. */
const stringsOf = (block: typeof smartChoiceBlocks[number]): [string, Localized][] => [
  ['badge', block.badge],
  ['headline', block.headline],
  ['lead', block.lead],
  ['text', block.text],
  ['annotation', block.annotation],
  ['campaign', block.campaign],
  ...block.features.map(f => [`feature.${f.id}`, f.label] as [string, Localized]),
  ...block.swatches.flatMap(s => [
    [`swatch.${s.id}`, s.label],
    [`swatch.${s.id}.tagline`, s.tagline],
  ] as [string, Localized][]),
  ['button.primary', block.buttons.primary.label],
  ...(block.buttons.secondary ? [['button.secondary', block.buttons.secondary.label] as [string, Localized]] : []),
]

describe('smart choice panels', () => {
  it('gives every panel a unique id', () => {
    expect(duplicates(smartChoiceBlocks.map(b => b.id))).toEqual([])
  })

  it('finds a panel by id, and nothing by a name it does not have', () => {
    for (const block of smartChoiceBlocks) expect(smartChoiceBlock(block.id)).toBe(block)
    expect(smartChoiceBlock('no-such-panel')).toBeUndefined()
  })

  it('writes both locales for every string', () => {
    for (const block of smartChoiceBlocks) {
      for (const [field, value] of stringsOf(block)) {
        expect(value.sv, `${block.id}.${field}`).toBeTruthy()
        expect(value.en, `${block.id}.${field}`).toBeTruthy()
      }
    }
  })

  it('keeps feature and swatch ids unique within a panel', () => {
    for (const block of smartChoiceBlocks) {
      expect(duplicates(block.features.map(f => f.id)), block.id).toEqual([])
      expect(duplicates(block.swatches.map(s => s.id)), block.id).toEqual([])
    }
  })

  /**
   * The panel's whole argument is that one frame takes several prints, and the
   * swatch column is where that argument is made. One swatch does not make it,
   * and a switch with one position switches nothing.
   */
  it('shows a set of prints, not a single one', () => {
    for (const block of smartChoiceBlocks) {
      expect(block.swatches.length, block.id).toBeGreaterThanOrEqual(2)
    }
  })
})

/** WCAG relative luminance of a `#rrggbb` colour. */
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi! + 0.05) / (lo! + 0.05)
}

/**
 * The season's title is set in its `accent` on the wall above the display — a
 * plain, near-flat stretch of the photograph, so the pair is knowable. `wall`
 * is the darkest pixel of that stretch across all four display photographs; a
 * new photograph with a darker wall moves it. The title is large enough for
 * 3:1, but 4.5:1 leaves room for a smaller one in a narrow column.
 */
describe('season accents', () => {
  const wall = '#e3e9ee'

  it('is a six-digit hex', () => {
    for (const block of smartChoiceBlocks) {
      for (const swatch of block.swatches) expect(swatch.accent, `${block.id}.${swatch.id}`).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it('clears 4.5:1 on the wall', () => {
    for (const block of smartChoiceBlocks) {
      for (const swatch of block.swatches) {
        expect(contrast(swatch.accent, wall), `${block.id}.${swatch.id}`).toBeGreaterThanOrEqual(4.5)
      }
    }
  })
})

describe('every panel leads somewhere real', () => {
  it('uses locale-agnostic paths', () => {
    for (const block of smartChoiceBlocks) {
      for (const button of [block.buttons.primary, block.buttons.secondary]) {
        if (!button) continue
        expect(button.to, block.id).toMatch(/^\//)
        expect(button.to, block.id).not.toMatch(/^\/(sv|en)\//)
      }
    }
  })

  it('lands on pages the mega menu carries, or below one', () => {
    expect(navPaths.length).toBeGreaterThan(0)

    for (const block of smartChoiceBlocks) {
      for (const button of [block.buttons.primary, block.buttons.secondary]) {
        if (!button) continue
        const known = navPaths.some(path => button.to === path || button.to.startsWith(`${path}/`))
        expect(known, `${block.id} → ${button.to} is in no mega-menu panel`).toBe(true)
      }
    }
  })

  /**
   * The two CTAs are a sell and an offer of help. Pointing both at the same
   * page would make the second one decoration, and nothing else would say so.
   */
  it('sends the two buttons to different places', () => {
    for (const block of smartChoiceBlocks) {
      if (!block.buttons.secondary) continue
      expect(block.buttons.primary.to, block.id).not.toBe(block.buttons.secondary.to)
    }
  })
})

describe('smart choice images', () => {
  const publicDir = fileURLToPath(new URL('../public', import.meta.url))
  const imagesOf = (block: typeof smartChoiceBlocks[number]) =>
    block.swatches.flatMap(s => [s.image, s.display])

  it('ships a file for every image referenced', () => {
    for (const block of smartChoiceBlocks) {
      for (const image of imagesOf(block)) {
        expect(image.startsWith('/'), block.id).toBe(true)
        expect(existsSync(`${publicDir}${image}`), `missing public${image}`).toBe(true)
      }
    }
  })

  /** Same budget and reasoning as `test/promo.test.ts`. */
  it('keeps every image within the byte budget, in a lossy format', () => {
    for (const block of smartChoiceBlocks) {
      for (const image of imagesOf(block)) {
        expect(image, block.id).toMatch(/\.(jpe?g|webp|avif)$/i)
        const bytes = statSync(`${publicDir}${image}`).size
        expect(bytes, `${image} is ${Math.round(bytes / 1024)} KB`).toBeLessThan(600 * 1024)
      }
    }
  })
})

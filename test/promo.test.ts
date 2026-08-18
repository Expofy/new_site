import { existsSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { promoBanner, promoBanners } from '../app/data/promo'
import { mainNav } from '../app/data/navigation'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

/**
 * Every path the mega menu can reach — the set of pages that exist.
 *
 * Both levels, unlike `test/categories.test.ts`, which only walks the panels.
 * A band is free to point at a top-level destination like `/category`, where a
 * category tile by definition is not.
 */
const navPaths = mainNav.flatMap(item => [
  ...(item.to ? [item.to] : []),
  ...(item.panel?.columns ?? []).flatMap(column => column.items.map(link => link.to)),
])

describe('promo banners', () => {
  it('gives every band a unique id', () => {
    expect(duplicates(promoBanners.map(banner => banner.id))).toEqual([])
  })

  it('finds a band by id, and nothing by a name it does not have', () => {
    for (const banner of promoBanners) {
      expect(promoBanner(banner.id)).toBe(banner)
    }
    expect(promoBanner('no-such-band')).toBeUndefined()
  })

  it('writes both locales for every string', () => {
    for (const banner of promoBanners) {
      for (const [field, value] of Object.entries({
        headline: banner.headline,
        text: banner.text,
        label: banner.button.label,
      })) {
        expect(value.sv, `${banner.id}.${field}`).toBeTruthy()
        expect(value.en, `${banner.id}.${field}`).toBeTruthy()
      }
    }
  })
})

/**
 * The band is a call to action and nothing else, so a dead button is the whole
 * block failing silently — it still renders, still looks right, and lands on a
 * 404. The mega menu is the list of pages that exist.
 */
describe('every band leads somewhere real', () => {
  it('uses a locale-agnostic path', () => {
    for (const banner of promoBanners) {
      expect(banner.button.to, banner.id).toMatch(/^\//)
      expect(banner.button.to, banner.id).not.toMatch(/^\/(sv|en)\//)
    }
  })

  it('lands on a page the mega menu carries, or below one', () => {
    expect(navPaths.length).toBeGreaterThan(0)

    for (const banner of promoBanners) {
      const to = banner.button.to
      const known = navPaths.some(path => to === path || to.startsWith(`${path}/`))
      expect(known, `${banner.id} → ${to} is in no mega-menu panel`).toBe(true)
    }
  })
})

describe('promo banner images', () => {
  const publicDir = fileURLToPath(new URL('../public', import.meta.url))

  it('ships a file for every photograph referenced', () => {
    for (const banner of promoBanners) {
      expect(banner.image.startsWith('/'), banner.id).toBe(true)
      expect(existsSync(`${publicDir}${banner.image}`), `missing public${banner.image}`).toBe(true)
    }
  })

  /**
   * These are wide background photographs, so they arrive as whatever came off the
   * camera unless someone stops them: the source for the eco band was a 5.2 MB
   * PNG, which is thirteen times the JPEG that replaced it and larger than the
   * hero's own poster. Nothing else in the pipeline would report it — the block
   * renders identically either way, just far later on a phone.
   *
   * 600 KB is not a physical limit, it is the point at which a re-export is
   * worth a second look. Lossless formats are rejected outright: a photograph
   * saved as PNG has already lost this argument.
   */
  it('keeps every photograph within the byte budget, in a lossy format', () => {
    for (const banner of promoBanners) {
      expect(banner.image, banner.id).toMatch(/\.(jpe?g|webp|avif)$/i)

      const bytes = statSync(`${publicDir}${banner.image}`).size
      expect(bytes, `${banner.image} is ${Math.round(bytes / 1024)} KB`).toBeLessThan(600 * 1024)
    }
  })
})

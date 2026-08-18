import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { mainNav } from '../app/data/navigation'
import { services } from '../app/data/services'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

/** Every destination the mega menu can reach. */
const navPaths = new Set(
  mainNav.flatMap(item =>
    (item.panel?.columns ?? []).flatMap(column => column.items.map(link => link.to)),
  ),
)

describe('services', () => {
  it('gives every card a unique id', () => {
    expect(duplicates(services.map(service => service.id))).toEqual([])
  })

  it('ships the six services the old site publishes', () => {
    expect(services).toHaveLength(6)
  })

  it('sends every card somewhere different', () => {
    expect(duplicates(services.map(service => service.to))).toEqual([])
  })

  it('writes both locales for every string on every card', () => {
    for (const service of services) {
      for (const field of ['eyebrow', 'title', 'description'] as const) {
        expect(service[field].sv, `${service.id}.${field}`).toBeTruthy()
        expect(service[field].en, `${service.id}.${field}`).toBeTruthy()
      }
    }
  })
})

/**
 * A service is something Expofy does, not something with a price and a cart
 * button, so its page is a landing page. The distinction matters because the
 * two live in different route trees: `/category/` is the catalogue, and a
 * service that drifted into it would be rendered by the wrong page.
 */
describe('every card points at a landing page', () => {
  it('uses locale-agnostic landing paths', () => {
    for (const service of services) {
      expect(service.to, service.id).toMatch(/^\/landing\//)
    }
  })

  /**
   * Four of the six are also in the mega menu under "Behöver du hjälp?". Those
   * four have to agree with it — the block is a second door to the same page,
   * and a slug renamed in `navigation.ts` would otherwise leave this one
   * pointing at a 404 with nothing to report it.
   *
   * The other two (Avancerad filkontroll, Snabbproduktion) are deliberately not
   * in the menu, so there is nothing for them to agree with; this asserts the
   * overlap is real rather than accidentally empty.
   */
  it('agrees with the mega menu wherever the two overlap', () => {
    const shared = services.filter(service => navPaths.has(service.to))

    expect(shared).toHaveLength(4)
    expect(shared.map(service => service.id)).toEqual([
      'hjalp-original',
      'montage-montering',
      'projektledning-radgivning',
      'tryck-print',
    ])
  })
})

/**
 * The illustrations are drawn in this repo, not copied from the old site, and
 * a card whose drawing 404s is a hole above the title that nothing else
 * reports.
 */
describe('service illustrations', () => {
  const publicDir = fileURLToPath(new URL('../public', import.meta.url))

  it('ships a file for every drawing referenced', () => {
    for (const service of services) {
      expect(service.image.startsWith('/'), service.id).toBe(true)
      expect(existsSync(`${publicDir}${service.image}`), `missing public${service.image}`).toBe(true)
    }
  })

  /**
   * The card reserves one box for all six and fits each drawing into it with
   * `object-contain`, so a single odd aspect ratio would letterbox itself and
   * sit visibly smaller than its neighbours in the row.
   *
   * The ratio is compared between the assets rather than pinned to a literal,
   * because it is the assets' to choose — they have already moved from 3:2 to
   * 4:3 once. What the row cannot survive is them disagreeing with each other.
   */
  it('draws every illustration at the same aspect ratio', () => {
    const ratios = services.map((service) => {
      const svg = readFileSync(`${publicDir}${service.image}`, 'utf-8')
      const box = svg.match(/viewBox="([\d.\s-]+)"/)?.[1]

      expect(box, `${service.id} has no viewBox`).toBeTruthy()

      const [, , width, height] = box!.trim().split(/\s+/).map(Number)
      expect(width && height, `${service.id} has an empty viewBox`).toBeTruthy()

      return `${service.id}:${(width / height).toFixed(3)}`
    })

    const ratio = ratios[0]!.split(':')[1]
    expect(ratios).toEqual(services.map(service => `${service.id}:${ratio}`))
  })
})

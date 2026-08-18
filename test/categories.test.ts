import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { popularCategories } from '../app/data/categories'
import { mainNav } from '../app/data/navigation'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

/** Every path the mega menu can reach, which is the set of real categories. */
const navPaths = mainNav.flatMap(item =>
  (item.panel?.columns ?? []).flatMap(column => column.items.map(link => link.to)),
)

describe('popular categories', () => {
  it('gives every tile a unique id', () => {
    expect(duplicates(popularCategories.map(category => category.id))).toEqual([])
  })

  it('ships the ten tiles the Saved Page shows', () => {
    expect(popularCategories).toHaveLength(10)
  })

  it('sends every tile somewhere different', () => {
    expect(duplicates(popularCategories.map(category => category.to))).toEqual([])
  })

  it('writes both locales for every label', () => {
    for (const category of popularCategories) {
      expect(category.label.sv, category.id).toBeTruthy()
      expect(category.label.en, category.id).toBeTruthy()
    }
  })
})

/**
 * The block is a shortcut into the catalogue, so every tile has to land on a
 * category the menu also knows about — otherwise the front page advertises a
 * page nothing else links to, and a slug renamed in `navigation.ts` leaves a
 * dead tile behind with no error.
 *
 * Labels are deliberately not compared. The front page shortens them on
 * purpose: "Mässbord & diskar" is "Mässbord" here, "Folie & Dekaler" is
 * "Dekaler". The path is the thing that has to agree.
 */
describe('every tile points into the catalogue', () => {
  it('uses locale-agnostic category paths', () => {
    for (const category of popularCategories) {
      expect(category.to, category.id).toMatch(/^\/category\//)
    }
  })

  it('lands on a category the mega menu carries, or below one', () => {
    expect(navPaths.length).toBeGreaterThan(0)

    for (const category of popularCategories) {
      const known = navPaths.some(path => category.to === path || category.to.startsWith(`${path}/`))
      expect(known, `${category.id} → ${category.to} is in no mega-menu panel`).toBe(true)
    }
  })
})

/**
 * The renders live in the repo, not on the old site: a tile whose image 404s is
 * a bare label on an empty gradient, and nothing else would report it.
 */
describe('popular category images', () => {
  const publicDir = fileURLToPath(new URL('../public', import.meta.url))

  it('ships a file for every render referenced', () => {
    for (const category of popularCategories) {
      expect(category.image.startsWith('/'), category.id).toBe(true)
      expect(existsSync(`${publicDir}${category.image}`), `missing public${category.image}`).toBe(true)
    }
  })

  /**
   * The tile states one intrinsic box for all ten sources, the way the
   * mega-menu tiles do. That is only honest while every source is square.
   */
  it('keeps every render square, since the tile states one intrinsic size', async () => {
    const { readFile } = await import('node:fs/promises')

    for (const category of popularCategories) {
      const png = await readFile(`${publicDir}${category.image}`)
      const width = png.readUInt32BE(16)
      const height = png.readUInt32BE(20)
      expect(width, `${category.id} is ${width}x${height}`).toBe(height)
    }
  })
})

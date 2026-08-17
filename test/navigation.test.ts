import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { footerColumns, mainNav, partners } from '../app/data/navigation'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

const panels = mainNav.flatMap(item => (item.panel ? [{ item, panel: item.panel }] : []))
const columns = panels.flatMap(({ panel }) => panel.columns)

/**
 * Ids and paths in navigation.ts are UI state, not decoration: reka-ui opens a
 * mega-menu panel by `item.id` and Vue reconciles link lists by `link.to`.
 * A duplicate opens two panels at once, or reuses the wrong DOM node.
 */
describe('navigation data', () => {
  it('gives every main nav item a unique id, since the id selects the open panel', () => {
    expect(duplicates(mainNav.map(item => item.id))).toEqual([])
  })

  it('gives every footer column a unique id', () => {
    expect(duplicates(footerColumns.map(column => column.id))).toEqual([])
  })

  it('gives every partner a unique id', () => {
    expect(duplicates(partners.map(partner => partner.id))).toEqual([])
  })

  it('keeps link paths unique within each rendered list, since link.to is the Vue key', () => {
    const lists = [
      ...columns.map(column => column.items),
      ...footerColumns.map(column => column.links),
    ]

    expect(lists.length).toBeGreaterThan(0)
    for (const links of lists) {
      expect(duplicates(links.map(link => link.to))).toEqual([])
    }
  })

  it('allows the same path in different lists, as several use-case columns point at the same category', () => {
    const retail = columns.find(column => column.id === 'use-cases-retail')?.items ?? []
    const construction = columns.find(column => column.id === 'use-cases-construction')?.items ?? []

    expect(retail.map(link => link.to)).toContain('/category/skyltar')
    expect(construction.map(link => link.to)).toContain('/category/skyltar')
  })
})

/**
 * The column is the placement handle for submenu items: `column.id` becomes a
 * DOM id that ties a heading to the list it labels, and both renderers key
 * their columns by it. Two columns sharing an id would point one heading at the
 * wrong list — and both renderers are mounted at once when the drawer is open,
 * so uniqueness has to hold across the whole nav, not just within one panel.
 */
describe('mega-menu columns', () => {
  it('has panels to check', () => {
    expect(panels.length).toBeGreaterThan(0)
  })

  it('gives every column an id that is unique across the whole nav', () => {
    expect(duplicates(columns.map(column => column.id))).toEqual([])
  })

  it('never declares an empty column, which would render as a gap in the grid', () => {
    for (const column of columns) {
      expect(column.items.length, `column ${column.id}`).toBeGreaterThan(0)
    }
  })
})

/**
 * The two submenu types are a rendering fork, so the data has to commit to one:
 * an image panel whose items have no image draws a ragged column of bare labels,
 * and a list panel carrying images ships bytes nothing displays.
 */
describe('submenu variants', () => {
  it('gives every item in an image panel a tile image', () => {
    const imagePanels = panels.filter(({ panel }) => panel.variant === 'image')
    expect(imagePanels.length).toBeGreaterThan(0)

    for (const { item, panel } of imagePanels) {
      for (const link of panel.columns.flatMap(column => column.items)) {
        expect(link.image, `${item.id} → ${link.to}`).toBeTruthy()
      }
    }
  })

  it('leaves list panels imageless, since the list renderer never draws a tile', () => {
    for (const { panel } of panels.filter(({ panel }) => panel.variant === 'list')) {
      for (const link of panel.columns.flatMap(column => column.items)) {
        expect(link.image, link.to).toBeUndefined()
      }
    }
  })

  it('heads every column of a list panel, as the list renderer names its ul by that heading', () => {
    for (const { panel } of panels.filter(({ panel }) => panel.variant === 'list')) {
      for (const column of panel.columns) {
        expect(column.heading?.label, `column ${column.id}`).toBeTruthy()
      }
    }
  })
})

/**
 * Tile sources are real files under public/, not remote URLs, and a missing one
 * is invisible in review — the tile just renders empty next to a correct label.
 */
describe('mega-menu tile images', () => {
  const publicDir = fileURLToPath(new URL('../public', import.meta.url))
  const images = columns.flatMap(column => column.items.flatMap(link => (link.image ? [link.image] : [])))

  it('ships a file for every tile image referenced', () => {
    expect(images.length).toBeGreaterThan(0)

    for (const image of images) {
      expect(image.startsWith('/'), image).toBe(true)
      expect(existsSync(`${publicDir}${image}`), `missing public${image}`).toBe(true)
    }
  })
})

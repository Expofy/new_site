import { describe, expect, it } from 'vitest'
import { footerColumns, mainNav, partners } from '../app/data/navigation'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

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
      ...mainNav.flatMap(item => item.groups?.map(group => group.links) ?? []),
      ...footerColumns.map(column => column.links),
    ]

    expect(lists.length).toBeGreaterThan(0)
    for (const links of lists) {
      expect(duplicates(links.map(link => link.to))).toEqual([])
    }
  })

  it('allows the same path in different lists, as the mega-menu and footer both link to the guides', () => {
    const guides = mainNav.find(item => item.id === 'how-it-works')?.groups?.[0]?.links ?? []
    const information = footerColumns.find(column => column.id === 'information')?.links ?? []

    expect(guides.map(link => link.to)).toContain('/blog/tryckfil')
    expect(information.map(link => link.to)).toContain('/blog/tryckfil')
  })
})

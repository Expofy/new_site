import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { showroomTeaserCases } from '../app/data/showroom'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

describe('showroom teaser cases', () => {
  it('gives every card a unique id', () => {
    expect(duplicates(showroomTeaserCases.map(item => item.id))).toEqual([])
  })

  /** Three across from lg: fewer leaves a hole in the row, more wraps one card. */
  it('ships the three cards the design shows', () => {
    expect(showroomTeaserCases).toHaveLength(3)
  })

  it('sends every card to a different case', () => {
    expect(duplicates(showroomTeaserCases.map(item => item.to))).toEqual([])
  })

  it('uses locale-agnostic case paths', () => {
    for (const item of showroomTeaserCases) {
      expect(item.to, item.id).toMatch(/^\/showroom\/[a-z0-9-]+$/)
    }
  })

  it('writes both locales for every string', () => {
    for (const item of showroomTeaserCases) {
      for (const [field, value] of [
        ['title', item.title],
        ['description', item.description],
        ['category', item.category],
        ...item.tags.map((tag, i) => [`tags[${i}]`, tag] as const),
      ] as const) {
        expect(value.sv, `${item.id}.${field}`).toBeTruthy()
        expect(value.en, `${item.id}.${field}`).toBeTruthy()
      }
    }
  })
})

describe('showroom teaser images', () => {
  const publicDir = fileURLToPath(new URL('../public', import.meta.url))

  it('ships a file for every photo referenced', () => {
    for (const item of showroomTeaserCases) {
      expect(item.image.startsWith('/showroom/'), item.id).toBe(true)
      expect(existsSync(`${publicDir}${item.image}`), `missing public${item.image}`).toBe(true)
    }
  })

  /**
   * The card states one intrinsic box, 2:1, for every source. A photo at
   * another ratio would be cropped by `object-cover` where nobody chose.
   */
  it('keeps every photo at the ratio the card states', async () => {
    for (const item of showroomTeaserCases) {
      const png = await readFile(`${publicDir}${item.image}`)
      const width = png.readUInt32BE(16)
      const height = png.readUInt32BE(20)
      expect(width, `${item.id} is ${width}x${height}`).toBe(height * 2)
    }
  })
})

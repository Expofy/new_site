import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { newsProducts } from '../app/data/news'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

describe('news products', () => {
  it('gives every card a unique id', () => {
    expect(duplicates(newsProducts.map(product => product.id))).toEqual([])
  })

  /** Four across from lg: fewer leaves a hole in the row, more wraps one card. */
  it('ships the four cards the design shows', () => {
    expect(newsProducts).toHaveLength(4)
  })

  it('sends every card to a different product', () => {
    expect(duplicates(newsProducts.map(product => product.to))).toEqual([])
  })

  it('uses locale-agnostic product paths', () => {
    for (const product of newsProducts) {
      expect(product.to, product.id).toMatch(/^\/product\/[a-z0-9-]+$/)
    }
  })

  it('writes both locales for every string', () => {
    for (const product of newsProducts) {
      for (const field of ['category', 'name', 'description'] as const) {
        expect(product[field].sv, `${product.id}.${field}`).toBeTruthy()
        expect(product[field].en, `${product.id}.${field}`).toBeTruthy()
      }
    }
  })
})

describe('news product images', () => {
  const publicDir = fileURLToPath(new URL('../public', import.meta.url))

  it('ships a file for every photo referenced', () => {
    for (const product of newsProducts) {
      expect(product.image.startsWith('/news/'), product.id).toBe(true)
      expect(existsSync(`${publicDir}${product.image}`), `missing public${product.image}`).toBe(true)
    }
  })

  /**
   * The card states one intrinsic box, 192×140, for every source. A photo at
   * another ratio would be cropped by `object-cover` where nobody chose.
   */
  it('keeps every photo at the ratio the card states', async () => {
    for (const product of newsProducts) {
      const png = await readFile(`${publicDir}${product.image}`)
      const width = png.readUInt32BE(16)
      const height = png.readUInt32BE(20)
      expect(width * 140, `${product.id} is ${width}x${height}`).toBe(height * 192)
    }
  })
})

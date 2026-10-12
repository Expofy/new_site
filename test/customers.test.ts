import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { customerLogos } from '../app/data/customers'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

/** Pixel size from a PNG or a lossless/extended WebP header. */
const imageSize = (file: Buffer) => {
  if (file.toString('ascii', 1, 4) === 'PNG') {
    return { width: file.readUInt32BE(16), height: file.readUInt32BE(20) }
  }
  const chunk = file.toString('ascii', 12, 16)
  if (chunk === 'VP8L') {
    const bits = file.readUInt32LE(21)
    return { width: (bits & 0x3FFF) + 1, height: ((bits >> 14) & 0x3FFF) + 1 }
  }
  if (chunk === 'VP8X') {
    return { width: file.readUIntLE(24, 3) + 1, height: file.readUIntLE(27, 3) + 1 }
  }
  throw new Error(`unsupported image chunk ${chunk}`)
}

describe('customer logos', () => {
  it('gives every tile a unique id', () => {
    expect(duplicates(customerLogos.map(customer => customer.id))).toEqual([])
  })

  /** 2, 3, 4 and 6 across all divide twelve: any other count leaves a hole. */
  it('ships the twelve tiles the grid is laid out for', () => {
    expect(customerLogos).toHaveLength(12)
  })

  it('names every customer, since the name is the logo\'s alt', () => {
    for (const customer of customerLogos) {
      expect(customer.name.trim(), customer.id).not.toBe('')
    }
  })
})

describe('customer logo files', () => {
  const publicDir = fileURLToPath(new URL('../public', import.meta.url))

  it('ships a file for every logo referenced', () => {
    for (const customer of customerLogos) {
      expect(customer.logo.startsWith('/customers/'), customer.id).toBe(true)
      expect(existsSync(`${publicDir}${customer.logo}`), `missing public${customer.logo}`).toBe(true)
    }
  })

  /**
   * Each tile states its logo's size to reserve the box before the file
   * loads. A stale size draws the logo squashed until the file arrives.
   */
  it('states each logo\'s real pixel size', async () => {
    for (const customer of customerLogos) {
      const size = imageSize(await readFile(`${publicDir}${customer.logo}`))
      expect(size, customer.id).toEqual({ width: customer.width, height: customer.height })
    }
  })
})

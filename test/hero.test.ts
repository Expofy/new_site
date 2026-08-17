import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { heroSlides, slidesInGroup } from '../app/data/hero'

const duplicates = (values: string[]) => values.filter((v, i) => values.indexOf(v) !== i)

const isVideoFile = (resource?: string) => /\.(mp4|webm|ogv)(\?.*)?$/i.test(resource ?? '')

describe('hero slides', () => {
  it('gives every slide a unique id', () => {
    expect(duplicates(heroSlides.map(slide => slide.id))).toEqual([])
  })

  it('returns a group in admin order, lowest first', () => {
    const slides = slidesInGroup('front-page')

    expect(slides.length).toBeGreaterThan(1)
    expect(slides.map(slide => slide.order)).toEqual([...slides.map(slide => slide.order)].sort((a, b) => a - b))
    expect(slides.every(slide => slide.group === 'front-page')).toBe(true)
  })

  it('returns nothing for a group that does not exist, rather than every slide', () => {
    expect(slidesInGroup('no-such-group')).toEqual([])
  })

  /**
   * The rotation walks the group by position, so two slides sharing an Order
   * leave their sequence to whatever the sort does with a tie — which is stable
   * but arbitrary, and reshuffles the moment an unrelated slide is added.
   */
  it('gives every slide in a group its own Order', () => {
    for (const group of new Set(heroSlides.map(slide => slide.group))) {
      const orders = slidesInGroup(group).map(slide => slide.order)
      expect(duplicates(orders.map(String)), group).toEqual([])
    }
  })
})

/**
 * Slide Type decides which media field the renderer reads. A slide whose type
 * does not match the field it filled in renders as an empty coloured band —
 * there is no error, just a hero with nothing in it.
 */
describe('slide type matches the field it carries', () => {
  it('gives an image slide an image', () => {
    for (const slide of heroSlides.filter(slide => slide.type === 'image')) {
      expect(slide.image, slide.id).toBeTruthy()
    }
  })

  it('gives a video slide a resource URL', () => {
    for (const slide of heroSlides.filter(slide => slide.type === 'video')) {
      expect(slide.resource, slide.id).toBeTruthy()
    }
  })

  it('gives a self-hosted video a poster, since it is what shows while paused', () => {
    for (const slide of heroSlides.filter(slide => isVideoFile(slide.resource))) {
      expect(slide.image, slide.id).toBeTruthy()
    }
  })

  it('gives an html slide markup', () => {
    for (const slide of heroSlides.filter(slide => slide.type === 'html')) {
      expect(slide.html?.sv, slide.id).toBeTruthy()
      expect(slide.html?.en, slide.id).toBeTruthy()
    }
  })
})

/**
 * A slide-wide Link URL turns the whole slide into one anchor. Anything
 * interactive inside it — the overlay button, the video's pause control —
 * would be an anchor or a button nested in an anchor: invalid HTML, and the
 * inner control is no longer reachable. The renderer drops the slide link
 * rather than emit that, so data combining them loses a setting silently.
 */
describe('a linked slide has nothing interactive of its own', () => {
  it('never pairs a slide link with an overlay button or a playable video', () => {
    for (const slide of heroSlides.filter(slide => slide.link)) {
      expect(slide.overlay.button, `${slide.id} has both a slide link and a button`).toBeUndefined()
      expect(isVideoFile(slide.resource), `${slide.id} has both a slide link and a video`).toBe(false)
    }
  })
})

/**
 * The overlay sits on a photograph, so its contrast is only knowable when the
 * scrim is on. Light text without one is the case that actually goes wrong:
 * white on a pale image is unreadable, and nothing in the data says how pale
 * the image is.
 */
describe('overlay contrast', () => {
  it('scrims every slide that puts light text over media', () => {
    for (const slide of heroSlides) {
      const hasMedia = slide.type !== 'html'
      const hasText = Boolean(slide.overlay.headline ?? slide.overlay.text)

      if (hasMedia && hasText && slide.overlay.theme === 'light') {
        expect(slide.overlay.dark, `${slide.id} is light text on media without a scrim`).toBe(true)
      }
    }
  })
})

describe('hero assets', () => {
  const publicDir = fileURLToPath(new URL('../public', import.meta.url))

  it('ships a file for every local image, and leaves remote ones absolute', () => {
    const images = heroSlides.flatMap(slide => (slide.image ? [slide.image] : []))
    expect(images.length).toBeGreaterThan(0)

    for (const image of images) {
      if (image.startsWith('http')) continue
      expect(existsSync(`${publicDir}${image}`), `missing public${image}`).toBe(true)
    }
  })

  it('points every Resource URL somewhere absolute, as the admin field expects', () => {
    for (const slide of heroSlides.filter(slide => slide.resource)) {
      expect(slide.resource, slide.id).toMatch(/^https?:\/\//)
    }
  })
})

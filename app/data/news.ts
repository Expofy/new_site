import type { NewsProduct } from '~/types/news'

/**
 * The four cards of the front page's "Nyheter" block, in the design's order.
 * Backend owns this list once products are connected — "new" is then a date on
 * the product, not a hand-kept array.
 *
 * Every `to` points at a product page that does not exist yet. The paths are
 * the ones those pages will have, so the cards need no change when they land.
 *
 * The photos are placeholders cropped out of the design mock-up, 192×140 each.
 * They are soft at the card's full width; swap in the real product photos
 * before launch, all at one aspect ratio, since the card states one intrinsic
 * size for every source.
 */
export const newsProducts: NewsProduct[] = [
  {
    id: 'uppblasbar-display',
    category: { sv: 'Displayer', en: 'Displays' },
    name: { sv: 'Uppblåsbar display', en: 'Inflatable display' },
    description: {
      sv: 'Maximal synlighet – enkel att transportera och montera.',
      en: 'Maximum visibility – easy to transport and set up.',
    },
    to: '/product/uppblasbar-display',
    image: '/news/uppblasbar-display.png',
  },
  {
    id: 'led-podium',
    category: { sv: 'Mässmöbler', en: 'Trade fair furniture' },
    name: { sv: 'LED podium', en: 'LED podium' },
    description: {
      sv: 'Stilren och belyst disk som fångar uppmärksamhet.',
      en: 'A sleek, lit counter that catches the eye.',
    },
    to: '/product/led-podium',
    image: '/news/led-podium.png',
  },
  {
    id: 'textilvagg-modular',
    category: { sv: 'Textilväggar', en: 'Fabric walls' },
    name: { sv: 'Textilvägg modulär', en: 'Modular fabric wall' },
    description: {
      sv: 'Flexibel lösning för stora ytor och starkt budskap.',
      en: 'A flexible solution for large spaces and a strong message.',
    },
    to: '/product/textilvagg-modular',
    image: '/news/textilvagg-modular.png',
  },
  {
    id: 'barbar-massdisk',
    category: { sv: 'Mässdiskar', en: 'Trade fair counters' },
    name: { sv: 'Bärbar mässdisk', en: 'Portable trade fair counter' },
    description: {
      sv: 'Lätt, smidig och professionell – perfekt för event och butik.',
      en: 'Light, handy and professional – perfect for events and retail.',
    },
    to: '/product/barbar-massdisk',
    image: '/news/barbar-massdisk.png',
  },
]

import type { PromoBanner } from '~/types/promo'

/**
 * The front page's promo bands. Backend owns these once the CMS is connected —
 * they are editorial, not derived from the catalogue.
 *
 * Array order is render order, but nothing iterates it: a band is placed by id
 * where the page wants it, because a promo's whole job is to sit between two
 * particular blocks. That is also why there is no `group` field like the hero's
 * — a hero rotates a set, a band is one thing in one place.
 */
export const promoBanners: PromoBanner[] = [
  {
    id: 'eco',
    icon: 'leaf',
    image: '/promo/small-forest.jpg',
    headline: {
      sv: 'Tillsammans för en grönare framtid',
      en: 'Together for a greener future',
    },
    text: {
      sv: 'Välj miljövänliga material utan att kompromissa med kvalitet eller synlighet.',
      en: 'Choose eco-friendly materials without compromising on quality or visibility.',
    },
    button: {
      label: { sv: 'Välj miljöprodukter', en: 'Choose eco products' },
      to: '/category',
    },
  },
]

/** One band by id. `undefined` when the page names one that is not here. */
export function promoBanner(id: string): PromoBanner | undefined {
  return promoBanners.find(banner => banner.id === id)
}

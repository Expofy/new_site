import type { Localized } from '~/types/navigation'

/**
 * One card of the front page's "Tjänster" slider.
 *
 * A service is not a category: it is something Expofy does for the customer
 * rather than something they put in a cart, so it carries a sentence of its own
 * and lands on a landing page, never on `/category/`.
 */
export interface Service {
  id: string
  /**
   * The small uppercase line above the title — "ORIGINAL", "TRYCK & PRODUKTION".
   *
   * A grouping, not a heading: several services share one. It is read out,
   * because it is the only thing that says a card about files and a card about
   * proofing belong to the same part of the offer.
   */
  eyebrow: Localized
  /** The card's heading, and the second half of its link's accessible name. */
  title: Localized
  /** Two lines at the card's width. Longer than that and the cards go ragged. */
  description: Localized
  /** Locale-agnostic path. The locale prefix is added by useLocalePath(). */
  to: string
  /**
   * Line-art illustration, in `public/services/`.
   *
   * Always rendered `alt=""`. The drawing restates the title — a printer for
   * "Tryck & print" — so naming it would announce the service twice, the same
   * rule the category tiles and mega-menu tiles follow.
   *
   * These are SVG, not the PNG renders the category tiles use: they are
   * drawings, not photographed product. The card fits each into one reserved
   * box with `object-contain` rather than trusting a particular aspect ratio,
   * so a re-export at a new size cannot move the row.
   */
  image: string
}

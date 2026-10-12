import type { Localized } from '~/types/navigation'

/**
 * One card of the front page's "Nyheter" block: a recently added product.
 *
 * Not a Product — `docs/DATA-MODEL.md` owns that shape, and a card needs only
 * the handful of fields it draws. When products come from the backend this
 * becomes a projection of one, and `to` is its path.
 */
export interface NewsProduct {
  id: string
  /**
   * The small uppercase line above the name — "Displayer". Text only, not a
   * link: the whole card is one link, to the product.
   */
  category: Localized
  /** The card's heading, and the core of the link's accessible name. */
  name: Localized
  /**
   * One short line under the name. Not clamped: at 1024px four columns already
   * need a third line, and a clamp would cut it off for everyone and for anyone
   * who widens text spacing (1.4.12). The card grows instead.
   */
  description: Localized
  /** Locale-agnostic product path. The locale prefix is added by useLocalePath(). */
  to: string
  /**
   * Product photo, in `public/news/`. Rendered `alt=""` for the same reason as
   * the category tiles: the name beside it is already the link's name.
   */
  image: string
}

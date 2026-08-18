import type { Localized } from '~/types/navigation'

/**
 * A promo band: one wide photograph with a short pitch and one call to action
 * over it. The front page's "grönare framtid" strip is the first, and
 * the type is written for the shape rather than for that one banner, because a
 * band advertising express delivery or the showroom is the same block with
 * different words.
 *
 * There is no equivalent block on the old site — this is new in V2, so nothing
 * here is reverse-engineered from an admin screen the way `HeroSlide` is. When
 * the CMS grows a Promo post type, this is the field list to give it.
 *
 * `Localized` lives in ~/types/navigation because that is where the content
 * types started; it is the shared content string type, not a nav-only one.
 */

/**
 * The mark drawn in the ring beside the headline.
 *
 * A union of what the component can actually draw, not a free string: the
 * shapes are inline SVG so they inherit `currentColor` and cost no request, and
 * a name with no path behind it would render an empty ring. Grows by one entry
 * and one `<path>` when a second banner wants a different mark.
 */
export type PromoIcon = 'leaf'

export interface PromoBanner {
  id: string
  /** Optional. Without one the headline simply starts at the left edge. */
  icon?: PromoIcon
  /**
   * The background photograph, in `public/promo/`.
   *
   * Always decorative, so no alt text travels with it and the component renders
   * it `alt=""`. That is not a shortcut: the band's message is the headline and
   * the paragraph, which are real text, and the picture behind them is mood.
   * A photograph that had something to say would need to be a figure, not a
   * background — and it would then have to survive being cropped to a 120px
   * strip, which nothing informative does.
   */
  image: string
  headline: Localized
  text: Localized
  /**
   * The band's reason to exist. Required, unlike the hero's, because a promo
   * band with nothing to click is a decorative photograph with a slogan on it.
   */
  button: { label: Localized, to: string }
}

import type { Localized } from '~/types/navigation'

/**
 * The "Smart val" panel: a pitch on one side, a picture of the idea on the
 * other. New in V2 — the old site has no equivalent — so nothing here is
 * reverse-engineered from an admin screen the way `HeroSlide` is.
 *
 * The block is written to survive being half as wide as the page, because that
 * is a layout the front page is expected to want: two panels in one row. What
 * makes that possible is that the component owns no page furniture — no band,
 * no `max-w-site`, no gutter — and switches between its two forms on *its own*
 * width with a container query rather than on the viewport's. See the note at
 * the top of AppSmartChoice.vue.
 *
 * `Localized` lives in ~/types/navigation because that is where the content
 * types started; it is the shared content string type, not a nav-only one.
 */

/**
 * The marks the component can draw beside a feature, and the one in the badge.
 * A union rather than a free string for the same reason `PromoIcon` is one: the
 * shapes are inline SVG, and a name with no path behind it renders an empty
 * circle. Grows by one entry and one `<path>`.
 */
export type SmartChoiceIcon = 'cycle' | 'calendar' | 'tag'

export interface SmartChoiceFeature {
  id: string
  icon: SmartChoiceIcon
  /** One string, not two. The mockup's two lines are a wrap, not a field. */
  label: Localized
}

/**
 * One interchangeable print in the swatch column — the thing the panel is
 * actually about, since the whole pitch is that these change and the frame
 * does not.
 */
export interface SmartChoiceSwatch {
  id: string
  /** Rendered as real text over the image, never baked into it — the site is
   *  bilingual, and "Vår" has to be able to say "Spring". */
  label: Localized
  image: string
}

export interface SmartChoiceBlock {
  id: string
  /** The pill above the headline — "SMART VAL". */
  badge: Localized
  headline: Localized
  /** The bold line under the headline. One sentence, the offer in short. */
  lead: Localized
  /** The paragraph under that. The same offer with the detail in it. */
  text: Localized
  features: SmartChoiceFeature[]
  /** The handwritten-looking aside pointing at the swatches. */
  annotation: Localized
  swatches: SmartChoiceSwatch[]
  /**
   * The product photograph beside the swatches, in `public/smart-choice/`.
   * Decorative: the panel's message is its text, and the picture shows the
   * same frame the copy is describing.
   */
  image: string
  /**
   * Both or neither for `secondary`. The primary sells, the secondary offers
   * help — the two voices the site already has.
   */
  buttons: {
    primary: { label: Localized, to: string }
    secondary?: { label: Localized, to: string }
  }
}

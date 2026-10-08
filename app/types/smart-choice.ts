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
 * One interchangeable print — the thing the panel is actually about, since the
 * whole pitch is that these change and the frame does not. Each is a thumbnail
 * in the swatch column and, when picked, the display beside it.
 */
export interface SmartChoiceSwatch {
  id: string
  /**
   * Rendered as real text over the image, never baked into it — the site is
   * bilingual, and "Vår" has to be able to say "Spring". Also the big title
   * over the display, which in the design is always the same word.
   */
  label: Localized
  /** The thumbnail in the swatch column, in `public/smart-choice/`. */
  image: string
  /**
   * The display — the wall, flag and counter — wearing this print, shown
   * beside the swatches when it is picked. A photograph with no words on it:
   * the title and tagline are text laid over it from `label` and `tagline`,
   * so they translate. They are placed by percentages measured against this
   * composition, so a new file has to keep it — empty wall across the top
   * ~22%, the display below. The current files are square, with the picture
   * moved down 165px of the 1254px render and the clean wall above it mirrored into the gap:
   * as rendered, the flag started at ~12%, under the tagline.
   */
  display: string
  /** The spaced-out line under the season's title. */
  tagline: Localized
  /**
   * The season's own colour for its title. Content rather than a brand token:
   * it belongs to the photograph it was picked against. Held to 4.5:1 on the display's wall by
   * test/smart-choice.test.ts.
   */
  accent: string
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
  /** The small spaced-out line over the display — "SÄSONGSKAMPANJ". */
  campaign: Localized
  swatches: SmartChoiceSwatch[]
  /**
   * Both or neither for `secondary`. The primary sells, the secondary offers
   * help — the two voices the site already has.
   */
  buttons: {
    primary: { label: Localized, to: string }
    secondary?: { label: Localized, to: string }
  }
}

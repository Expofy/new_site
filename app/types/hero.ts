import type { Localized } from '~/types/navigation'

/**
 * The Hero block, modelled field-for-field on the "Add New Slide" admin screen
 * so the backend mapping is mechanical. Admin field names are quoted on each
 * property that was renamed.
 *
 * `Localized` lives in ~/types/navigation because that is where the content
 * types started; it is the shared content string type, not a nav-only one.
 */

/** "Slide Type" — decides which media field is read, and nothing else. */
export type HeroSlideType = 'image' | 'video' | 'html'

/** "Horizontal align" */
export type HeroAlignX = 'left' | 'center' | 'right'
/** "Vertical align" */
export type HeroAlignY = 'top' | 'middle' | 'bottom'
/** "Text theme" — which way the overlay text is coloured. */
export type HeroTextTheme = 'light' | 'dark'

export interface HeroLink {
  /** "Link URL (optional)". Locale-agnostic path, or an absolute URL. */
  to: string
  /** "Open in new tab" / "Open in same tab". */
  newTab: boolean
}

/** The "Overlay Content" panel. */
export interface HeroOverlay {
  /** "Headline" */
  headline?: Localized
  /** "Text" */
  text?: Localized
  /** "Button text" + "Button URL". Both or neither. */
  button?: { label: Localized, to: string }
  alignX: HeroAlignX
  alignY: HeroAlignY
  theme: HeroTextTheme
  /**
   * "Add dark overlay behind text".
   *
   * Named for what the admin calls it, but the renderer follows the theme: a
   * black scrim under light text, a white one under dark text. Either way it is
   * the only thing that makes the text's contrast predictable, because what is
   * behind it is a photograph nobody has measured. See docs/WCAG-STATUS.md.
   */
  dark: boolean
}

export interface HeroSlide {
  id: string
  /** "Slider Groups". A hero renders one group. */
  group: string
  /** "Post Attributes → Order". Ascending. */
  order: number
  type: HeroSlideType
  /**
   * "Link URL" — wraps the whole slide.
   *
   * Mutually exclusive with `overlay.button`: an anchor inside an anchor is
   * invalid HTML and the inner one stops being reachable. A test enforces it
   * rather than the renderer silently dropping one of them.
   */
  link?: HeroLink
  /** "Featured image" — the picture when type is `image`, the poster when `video`. */
  image?: string
  /**
   * Not an admin field yet. Empty string means decorative, which is correct
   * whenever the overlay carries the message; anything else needs real text.
   */
  imageAlt?: Localized
  /** "Resource URL" — an .mp4/.webm file, or a YouTube/Vimeo embed URL. */
  resource?: string
  /** "Custom HTML (used when type = HTML)". Read only when type is `html`. */
  html?: Localized
  overlay: HeroOverlay
}

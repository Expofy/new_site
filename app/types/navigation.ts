export type LocaleCode = 'sv' | 'en'

/** Content strings carried by fake data. UI chrome lives in i18n/locales instead. */
export type Localized = Record<LocaleCode, string>

export interface NavLink {
  label: Localized
  /** Locale-agnostic path. The locale prefix is added by useLocalePath(). */
  to: string
}

/**
 * One entry inside a mega-menu column.
 *
 * `image` is only read by `variant: 'image'` panels. Every tile source is a
 * square in `public/nav/`, so the renderer can state one intrinsic size for all
 * of them instead of carrying width/height per item.
 */
export interface NavPanelItem extends NavLink {
  image?: string
}

/**
 * A column of a mega-menu panel.
 *
 * The column is the placement handle: an item belongs to the column whose
 * `items` array it sits in, and the panel is exactly as many columns wide as
 * this array is long. Both renderers walk the columns in order, so the desktop
 * grid reads left-to-right and the mobile drawer — which flattens the panel
 * into one scrolling list — reads column by column, in the same order.
 *
 * `id` is the stable name for the column: it keys the render, ties a column
 * heading to the list it labels, and is what you point at when moving an item.
 */
export interface NavColumn {
  id: string
  /**
   * Column heading. Shown by `variant: 'list'` panels; image panels leave it
   * out, since their tiles carry the wayfinding. `to` is optional because a
   * heading is sometimes only a grouping label with no page behind it.
   */
  heading?: { label: Localized, to?: string }
  items: NavPanelItem[]
}

/**
 * The two submenu types.
 *
 * - `image` — one tile per item: picture beside label, no column headings.
 * - `list`  — plain text links under a column heading, divided by a rule.
 */
export type NavPanelVariant = 'image' | 'list'

export interface NavPanel {
  variant: NavPanelVariant
  /** Panel title, repeated from the trigger. Also names the panel's lists. */
  heading: Localized
  /** Optional "see all" escape hatch beside the heading. */
  seeAll?: NavLink
  columns: NavColumn[]
}

export interface NavItem {
  id: string
  label: Localized
  to?: string
  /** Present on items that open a mega-menu panel. */
  panel?: NavPanel
}

export interface FooterColumn {
  id: string
  label: Localized
  links: NavLink[]
}

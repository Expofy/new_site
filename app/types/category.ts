import type { Localized } from '~/types/navigation'

/**
 * One tile of the "Populära kategorier" block.
 *
 * `Localized` lives in ~/types/navigation because that is where the content
 * types started; it is the shared content string type, not a nav-only one.
 */
export interface PopularCategory {
  id: string
  /**
   * The tile's visible text, and the whole link's accessible name.
   *
   * Deliberately free to differ from the same category's mega-menu label: the
   * front page shortens "Mässbord & diskar" to "Mässbord" and "Folie & Dekaler"
   * to "Dekaler" because a tile is read at a glance. `to` is what ties the two
   * together, and what `test/categories.test.ts` checks.
   */
  label: Localized
  /** Locale-agnostic path. The locale prefix is added by useLocalePath(). */
  to: string
  /**
   * Transparent product render, in `public/categories/`.
   *
   * No alt text travels with it. The tile always renders it `alt=""`, because
   * the label beside it is already the link's accessible name and repeating it
   * would announce the category twice — the same rule the mega-menu tiles
   * follow. A render that needed describing would not belong in a tile.
   */
  image: string
}

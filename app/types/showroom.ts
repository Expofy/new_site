import type { Localized } from '~/types/navigation'

/**
 * One card of the front page's "Våra senaste arbeten" block: a showroom case.
 *
 * Not a Showroom Case — `docs/DATA-MODEL.md` owns that shape, and a card needs
 * only the handful of fields it draws. When cases come from the backend this
 * becomes a projection of one, and `to` is its path.
 */
export interface ShowroomTeaserCase {
  id: string
  /** The card's heading, and the core of the link's accessible name. */
  title: Localized
  /**
   * One or two lines under the title. Not clamped, for the same reason as the
   * news cards: a clamp cuts text off for anyone who widens text spacing
   * (1.4.12). The card grows instead.
   */
  description: Localized
  /**
   * The first chip, drawn in brand pink — "Mässmonter". Text only, not a link:
   * the whole card is one link, to the case.
   */
  category: Localized
  /** The grey chips after it — "Design", "Montage". */
  tags: Localized[]
  /** Locale-agnostic case path. The locale prefix is added by useLocalePath(). */
  to: string
  /**
   * Case photo, in `public/showroom/`. Rendered `alt=""`: the title below is
   * already the link's name.
   */
  image: string
}

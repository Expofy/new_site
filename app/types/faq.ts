import type { Localized, NavLink } from '~/types/navigation'

/**
 * The groups the help drawer's FAQ is listed under, in the order it shows
 * them. Labels live in the locale files under `help.categories`.
 */
export type FaqCategory = 'order' | 'design' | 'delivery'

/**
 * One question, shown in two places: the front page's "Vanliga frågor" block,
 * where the question is the accordion's trigger and the answer its panel, and
 * the help drawer, where it is listed under its `category`.
 */
export interface FaqEntry {
  id: string
  /** The help drawer's group. The front-page block ignores it. */
  category: FaqCategory
  /** The trigger's text, inside an `h3`. Keep it a question, and short. */
  question: Localized
  /** One paragraph. Plain text: a link belongs in `link`, not in the string. */
  answer: Localized
  /**
   * An optional "read more" under the answer, to the page that covers the
   * subject properly — usually one of the services.
   */
  link?: NavLink
}

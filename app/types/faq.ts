import type { Localized, NavLink } from '~/types/navigation'

/**
 * One question of the front page's "Vanliga frågor" block. The question is the
 * accordion's trigger, the answer its panel.
 */
export interface FaqEntry {
  id: string
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

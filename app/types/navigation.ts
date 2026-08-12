export type LocaleCode = 'sv' | 'en'

/** Content strings carried by fake data. UI chrome lives in i18n/locales instead. */
export type Localized = Record<LocaleCode, string>

export interface NavLink {
  label: Localized
  /** Locale-agnostic path. The locale prefix is added by useLocalePath(). */
  to: string
}

export interface NavGroup {
  label: Localized
  links: NavLink[]
}

export interface NavItem {
  id: string
  label: Localized
  to?: string
  /** Present on items that open a mega-menu panel. */
  groups?: NavGroup[]
}

export interface FooterColumn {
  id: string
  label: Localized
  links: NavLink[]
}

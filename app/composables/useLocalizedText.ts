import type { LocaleCode, Localized } from '~/types/navigation'

/**
 * Resolves a Localized value from fake data against the active locale.
 * UI chrome uses i18n messages; content strings use this.
 */
export function useLocalizedText() {
  const { locale } = useI18n()
  return (value: Localized) => value[locale.value as LocaleCode] ?? value.sv
}

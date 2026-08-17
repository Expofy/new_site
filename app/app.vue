<script setup lang="ts">
const { t } = useI18n()

// Sets <html lang> plus hreflang/canonical alternates from the active locale.
// Without this the page has no language declaration (WCAG 3.1.1).
const head = useLocaleHead()
useHead(head)

/**
 * Site-wide <title> and description. Both are the fallback, not a fixed value:
 * a page that sets its own title gets it suffixed with the brand, and a page
 * that sets none gets `seo.defaultTitle` whole — which is why titleTemplate is
 * a function rather than a "%s | Expofy" string. A string template would render
 * the bare separator on every page that has no title of its own.
 *
 * Wrapped in computed() so the strings are re-resolved when the locale changes:
 * unhead tracks the reactive input, not the i18n call inside it.
 */
useHead(computed(() => ({
  titleTemplate: (title?: string) =>
    title ? `${title} | ${t('site.name')}` : t('seo.defaultTitle'),
  meta: [
    { name: 'description', content: t('seo.defaultDescription') },
  ],
})))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

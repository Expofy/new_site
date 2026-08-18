<script setup lang="ts">
// Phase 1 verification page: proves tokens, fonts, and locale routing are wired.
// Replaced by the real front page in Phase 3.
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const swatches = [
  { name: 'brand', klass: 'bg-brand', note: 'non-text fills only — 4.40:1' },
  { name: 'brand-strong', klass: 'bg-brand-strong', note: 'accent text, button fill — 4.50:1 worst case' },
  { name: 'brand-deep', klass: 'bg-brand-deep', note: 'links, hover — 11.01:1' },
  { name: 'brand-tint', klass: 'bg-brand-tint', note: 'soft surface' },
  { name: 'support', klass: 'bg-support', note: 'help/contact voice — 4.54:1 worst case' },
  { name: 'critical', klass: 'bg-critical', note: 'required markers, errors — 9.56:1 worst case' },
  { name: 'ink', klass: 'bg-ink', note: 'body text, nav, footer' },
  { name: 'ink-muted', klass: 'bg-ink-muted', note: 'secondary text — 5.74:1' },
  { name: 'surface-raised', klass: 'bg-surface-raised', note: 'cards, inputs' },
  { name: 'surface-sunken', klass: 'bg-surface-sunken', note: 'section bands' },
  { name: 'surface-header', klass: 'bg-surface-header', note: 'topbar' },
]
</script>

<template>
  <!-- Front-page blocks, in the Saved Page's order — except the promo band,
       which has no counterpart on the old site and is placed here because it
       breaks the run of white blocks between the categories and the services.
       Everything below them is still the Phase 1 verification page and goes
       when Phase 3 lands. -->
  <AppHero group="front-page" />
  <AppCategoryGrid />
  <AppPromoBanner id="eco" />
  <AppServiceSlider :columns="5" />

  <div class="mx-auto max-w-site px-4 py-12">
    <h1 class="text-h1 mb-2">{{ t('site.name') }}</h1>
    <p class="text-ink-muted mb-8">{{ t('site.tagline') }}</p>

    <nav class="mb-12 flex items-center gap-3" :aria-label="t('locale.switch')">
      <NuxtLink
        v-for="l in locales"
        :key="l.code"
        :to="switchLocalePath(l.code)"
        class="rounded-full px-4 py-2 text-sm"
        :class="l.code === locale ? 'bg-brand-strong text-white' : 'bg-surface-sunken text-brand-deep'"
      >
        {{ l.name }}
      </NuxtLink>
    </nav>

    <h2 class="text-h2 mb-4">Palette</h2>
    <ul class="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="s in swatches" :key="s.name" class="flex items-center gap-3">
        <span class="size-12 shrink-0 rounded-md border border-black/10" :class="s.klass" />
        <span>
          <code class="text-sm">{{ s.name }}</code>
          <span class="text-ink-muted block text-sm">{{ s.note }}</span>
        </span>
      </li>
    </ul>

    <h2 class="text-h2 mb-4">Type scale</h2>
    <p class="text-h1">Heading 1</p>
    <p class="text-h2">Heading 2</p>
    <p class="text-h3">Heading 3</p>
    <p class="text-h4">Heading 4</p>
    <p class="text-base">Body 16px</p>
    <p class="text-sm">Small 14px</p>
  </div>
</template>

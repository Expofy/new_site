<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <header>
    <AppTopBar />

    <div class="bg-surface-header">
      <!-- One search field, repositioned by flex order: inline on desktop,
           wrapped onto its own row on mobile. Rendering it twice would
           duplicate its id, its label target and the search landmark. -->
      <!-- On desktop the logo and the actions each take an equal share, which is
           what centers the search field between them regardless of how wide
           either side happens to be. Below md the search drops to its own row.
           Below 360px the logo and the actions (296px at full size) outgrow
           the 280px a 320px phone leaves, and the actions wrap under the logo:
           there the gap narrows to 12px and the logo to 40px tall (AppLogo). -->
      <div class="mx-auto flex max-w-site flex-wrap items-center gap-stack px-gutter py-stack max-[22.5rem]:gap-x-3">
        <div class="order-1 md:flex-1">
          <AppLogo />
        </div>

        <div class="order-2 ml-auto flex items-center gap-2 sm:gap-6 md:order-3 md:ml-0 md:flex-1 md:justify-end">
          <!-- From lg the nav band carries the quote button, so the header
               shows the account link in its place. Below lg the band is
               hidden and the drawer holds the account link instead. -->
          <div class="lg:hidden">
            <AppQuoteRequest />
          </div>
          <NuxtLink
            :to="localePath('/account/orders')"
            class="hidden items-center gap-2 font-medium text-ink lg:flex"
          >
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 20a7 7 0 0 1 14 0" stroke-linecap="round" />
            </svg>
            {{ t('nav.account') }}
          </NuxtLink>
          <AppCartSummary />
          <AppMobileDrawer />
        </div>

        <div class="order-3 w-full md:order-2 md:max-w-xl md:flex-1">
          <AppSearchField />
        </div>
      </div>
    </div>
  </header>
</template>

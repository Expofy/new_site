<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const cart = useCartStore()
</script>

<template>
  <NuxtLink
    :to="localePath('/cart')"
    class="flex items-center gap-3 text-ink"
    :aria-label="t('cart.itemCount', { count: cart.itemCount })"
  >
    <span class="relative shrink-0">
      <svg
        class="size-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        aria-hidden="true"
      >
        <path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.55L20.5 8H6" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="10" cy="20" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
      </svg>
      <span
        class="absolute -right-2 -top-1 flex size-5 items-center justify-center rounded-full bg-brand-strong text-xs text-white"
        aria-hidden="true"
      >{{ cart.itemCount }}</span>
    </span>

    <span class="hidden leading-tight sm:block">
      <span class="block font-medium">{{ formatPrice(cart.totals.subtotalExclVat, locale as 'sv' | 'en') }}</span>
      <span class="block text-xs text-ink-muted">{{ t('cart.exclVat') }}</span>
    </span>
  </NuxtLink>
</template>

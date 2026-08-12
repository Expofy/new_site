<script setup lang="ts">
const props = withDefaults(defineProps<{ inverse?: boolean }>(), { inverse: false })

const { t } = useI18n()
const localePath = useLocalePath()

/**
 * The two lockups are not the same shape — the SVG is 231.3x124.3, the inverse
 * PNG is 437x105 — so intrinsic size travels with the asset. A single hardcoded
 * 160x40 reserved a box neither one fills, and the header shifted on load.
 */
const asset = computed(() =>
  props.inverse
    ? { src: '/brand/expofy-logo-inverse.png', width: 437, height: 105 }
    : { src: '/brand/expofy-logo.svg', width: 231, height: 124 },
)
</script>

<template>
  <NuxtLink :to="localePath('/')" class="inline-flex shrink-0 items-center">
    <img
      :src="asset.src"
      :alt="t('site.name')"
      class="h-12 w-auto md:h-16"
      :width="asset.width"
      :height="asset.height"
    >
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BandBackground } from '~/types/band'

/**
 * The full-width strip a front-page block sits in: its background and its
 * vertical padding, nothing else — the container and gutter stay with the
 * block. Every block carries padding on both sides, so any order of blocks
 * spaces itself; the one case that would double the gap, two same-coloured
 * bands in a row, is collapsed by `.band` in main.css.
 */
withDefaults(defineProps<{ bg?: BandBackground, as?: string }>(), { bg: 'surface', as: 'section' })

const bgClass: Record<BandBackground, string> = {
  surface: 'bg-surface',
  raised: 'bg-surface-raised',
  sunken: 'bg-surface-sunken',
}
</script>

<template>
  <component :is="as" class="band" :class="bgClass[bg]" :data-band="bg">
    <slot />
  </component>
</template>

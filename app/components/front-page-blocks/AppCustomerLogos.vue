<script setup lang="ts">
import { customerLogos } from '~/data/customers'
import type { BandBackground } from '~/types/band'

withDefaults(defineProps<{ bg?: BandBackground }>(), { bg: 'surface' })

const { t } = useI18n()
</script>

<template>
  <!-- White band, white tiles: the tile border alone draws the grid. -->
  <AppBand :bg="bg" aria-labelledby="customers-heading">
    <div class="mx-auto max-w-site px-gutter">
      <div class="mb-stack">
        <h2 id="customers-heading" class="text-h2 font-semibold">
          {{ t('customers.heading') }}
        </h2>
        <p class="mt-1 text-lg text-ink-muted">
          {{ t('customers.subheading') }}
        </p>
      </div>

      <!-- Twelve tiles divide evenly at every step: 2, 3, 4, 6 across. -->
      <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4">
        <!-- Not links, so the 1.25:1 tile border is decoration, not a control
             boundary (1.4.11 does not apply). The pink hover border is
             decoration too: it marks nothing a keyboard user would miss. -->
        <li
          v-for="customer in customerLogos"
          :key="customer.id"
          class="flex h-20 items-center justify-center rounded-md border border-black/10 bg-surface px-4 transition-colors hover:border-brand"
        >
          <!-- The logo is the tile's content, so its alt is the company name.
               Greyscale as in the design: twelve brand palettes side by side
               would outshout the page. Logotypes are exempt from 1.4.3.
               Capped on both axes so a 12:1 wordmark and a round emblem
               both fit the tile. -->
          <img
            :src="customer.logo"
            :alt="customer.name"
            :width="customer.width"
            :height="customer.height"
            loading="lazy"
            class="h-auto max-h-12 w-auto max-w-full object-contain grayscale"
          >
        </li>
      </ul>
    </div>
  </AppBand>
</template>

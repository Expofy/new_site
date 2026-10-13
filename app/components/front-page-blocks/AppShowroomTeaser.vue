<script setup lang="ts">
import { showroomTeaserCases } from '~/data/showroom'
import type { BandBackground } from '~/types/band'

withDefaults(defineProps<{ bg?: BandBackground }>(), { bg: 'sunken' })

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()
</script>

<template>
  <!-- The same shell as "Nyheter", on `surface-sunken` instead of
       `surface-raised` so the two adjacent bands do not run together. -->
  <AppBand :bg="bg" aria-labelledby="showroom-teaser-heading">
    <div class="mx-auto max-w-site px-gutter">
      <div class="mb-stack flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="showroom-teaser-heading" class="text-h2 font-semibold">
            {{ t('showroomTeaser.heading') }}
          </h2>
          <p class="mt-1 text-lg text-ink-muted">
            {{ t('showroomTeaser.subheading') }}
          </p>
        </div>

        <!-- Below `sm` it is an outline pill — a lighter weight under a heading
             that already fills a phone's width; `brand-strong` on the band is
             4.50:1 at worst. From `sm` up it is the filled pill, and hover goes
             to `brand-deep`, not lighter `brand`: white on `brand` is 4.40:1,
             under the 4.5:1 a 16px label needs. -->
        <NuxtLink
          :to="localePath('/showroom')"
          class="group inline-flex shrink-0 items-center gap-2 rounded-full border border-brand-strong px-4 py-2 text-sm font-medium text-brand-strong transition-colors hover:bg-brand-tint active:brightness-90 sm:border-0 sm:bg-brand-strong sm:px-6 sm:py-3 sm:text-base sm:text-white sm:hover:bg-brand-deep"
        >
          {{ t('showroomTeaser.seeAll') }}
          <svg class="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <!-- One column until lg. Three cards in two columns would leave a hole,
           and at md three columns are 224px wide with the chips stacked one per
           row. So md keeps one column but lays each card on its side, photo
           left — stacked, the 2:1 photo alone is 350px tall there. -->
      <ul class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <li v-for="item in showroomTeaserCases" :key="item.id">
          <!-- One link per card, the whole card. Its accessible name reads
               title, description, chips — in that order, as on screen.
               No `overflow-hidden`: the photo rounds its own top corners, so
               nothing can clip the focus ring. The transparent resting border
               keeps hover from shifting the card. Hover does not tint the
               fill as the news cards do: the pink chip is `brand-tint` and
               would vanish into it. -->
          <NuxtLink
            :to="localePath(item.to)"
            class="group flex h-full flex-col rounded-md border border-transparent bg-surface shadow-sm transition-colors hover:border-brand md:flex-row lg:flex-col"
          >
            <!-- alt="" — the title below is the link's accessible name. Every
                 source is 2:1, stated once here. On its side (md) the photo
                 drops the ratio and stretches to the text's height instead,
                 cropped by `object-cover`; its 2:1 box is only the floor. -->
            <img
              :src="item.image"
              alt=""
              width="380"
              height="190"
              loading="lazy"
              class="aspect-[2/1] w-full rounded-t-md object-cover md:w-2/5 md:shrink-0 md:rounded-l-md md:rounded-tr-none lg:w-full lg:rounded-t-md lg:rounded-bl-none"
            >

            <div class="flex flex-1 flex-col p-4 sm:p-5">
              <h3 class="text-lg font-bold text-ink">{{ text(item.title) }}</h3>
              <p class="mt-1 text-ink-muted">{{ text(item.description) }}</p>

              <div class="mt-auto flex items-end gap-3 pt-4">
                <!-- Chips are labels, not filters: on the card they are text
                     inside the one link. Pink chip `brand-strong` on
                     `brand-tint` 4.50:1; grey `ink-muted` on `surface-sunken`
                     5.04:1. -->
                <ul class="flex min-w-0 flex-1 flex-wrap gap-2 text-sm">
                  <li class="rounded-full bg-brand-tint px-3 py-1 text-brand-strong">
                    {{ text(item.category) }}
                  </li>
                  <li
                    v-for="tag in item.tags"
                    :key="tag.sv"
                    class="rounded-full bg-surface-sunken px-3 py-1 text-ink-muted"
                  >
                    {{ text(tag) }}
                  </li>
                </ul>

                <!-- Decorative: the whole card is the link. -->
                <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-ink transition-colors group-hover:bg-brand-strong group-hover:text-white" aria-hidden="true">
                  <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </AppBand>
</template>

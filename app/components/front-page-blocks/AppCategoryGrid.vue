<script setup lang="ts">
import { popularCategories } from '~/data/categories'
import type { BandBackground } from '~/types/band'

withDefaults(defineProps<{ bg?: BandBackground }>(), { bg: 'raised' })

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()
</script>

<template>
  <!-- `surface-raised` behind white cards: the tiles need an edge, and a tint
       under the whole block gives them one without a border on every card. -->
  <AppBand :bg="bg" aria-labelledby="popular-categories-heading">
    <div class="mx-auto max-w-site px-gutter">
      <!-- The "see all" pill sits beside the heading where there is room and
           drops under the subheading where there is not; `items-end` keeps it
           level with the subheading's baseline side rather than the h2's. -->
      <div class="mb-stack flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="popular-categories-heading" class="text-h2 font-semibold">
            {{ t('categories.heading') }}
          </h2>
          <p class="mt-1 text-lg text-ink-muted">
            {{ t('categories.subheading') }}
          </p>
        </div>

        <NuxtLink
          :to="localePath('/category')"
          class="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-strong px-6 py-3 font-medium text-white transition-colors hover:bg-brand-deep active:brightness-90"
        >
          {{ t('categories.seeAll') }}
          <svg class="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <!-- A list, not a bare row of links: ten sibling destinations are a set,
           and the count is worth announcing before the user walks it.

           Two columns from the smallest width up — the tiles are image-led, and
           a full-width one on a phone is a 360px render of a roll-up. Five
           across from 1024px is two even rows of the ten. -->
      <ul class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        <li v-for="category in popularCategories" :key="category.id">
          <!-- One link per tile, the whole card. Its accessible name is the
               label plus the tagline, which reads as one sentence.

               The border is there at rest in transparent so the hover state
               only changes a colour and the card does not shift by a pixel. -->
          <NuxtLink
            :to="localePath(category.to)"
            class="group flex h-full flex-col rounded-md border border-transparent bg-surface p-3 shadow-sm transition-colors hover:border-brand hover:bg-brand-tint sm:p-4"
          >
            <!-- alt="" — the label below is the link's accessible name, and the
                 render would only say the category twice. Every source is a
                 transparent square, so the intrinsic box is stated once here.

                 A tile with a `hoverImage` stacks both renders in one grid
                 cell and cross-fades on hover and on keyboard focus, so the
                 box never changes size. The second one is lazy too: it costs
                 nothing until the block scrolls into view. -->
            <div class="mb-3 grid">
              <img
                :src="category.image"
                alt=""
                width="300"
                height="300"
                loading="lazy"
                class="col-start-1 row-start-1 h-32 w-full object-contain sm:h-44"
                :class="category.hoverImage && 'transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none'"
              >
              <img
                v-if="category.hoverImage"
                :src="category.hoverImage"
                alt=""
                width="300"
                height="300"
                loading="lazy"
                class="col-start-1 row-start-1 h-32 w-full object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none sm:h-44"
              >
            </div>

            <div class="mt-auto flex items-end gap-2">
              <div class="min-w-0 flex-1">
                <h3 class="font-bold text-ink">{{ text(category.label) }}</h3>
                <p class="mt-1 line-clamp-2 text-sm text-ink-muted">{{ text(category.description) }}</p>
              </div>

              <!-- Decorative: the whole card is the link. White on
                   `brand-strong` is 5.46:1 on hover. -->
              <span class="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-sunken text-ink transition-colors group-hover:bg-brand-strong group-hover:text-white sm:size-10" aria-hidden="true">
                <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </AppBand>
</template>

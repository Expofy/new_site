<script setup lang="ts">
import { popularCategories } from '~/data/categories'

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()
</script>

<template>
  <section class="bg-surface py-section" aria-labelledby="popular-categories-heading">
    <div class="mx-auto max-w-site px-gutter">
      <h2 id="popular-categories-heading" class="mb-stack text-h2 font-semibold">
        {{ t('categories.heading') }}
      </h2>

      <!-- A list, not a bare row of links: ten sibling destinations are a set,
           and the count is worth announcing before the user walks it.

           Five across is the reference's only desktop step — it drops straight
           to one column under 768px. Two columns are inserted between them
           because five 150px tiles at tablet width leave the labels no room.

           The reference rounds the four outer corners of the block as a whole
           and squares them on mobile, which is a 5-column assumption dressed as
           a style. Each tile carries the `md` card radius instead: it survives
           any column count, and it does not need the `overflow-hidden` that
           corner-only rounding would — which would clip the focus ring off
           every tile on an edge of the grid, most of them. -->
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <li v-for="category in popularCategories" :key="category.id">
          <!-- One link per tile. The Saved Page nests two anchors to the same
               URL in every cell — one around the image, one around the label,
               some of them empty — which is three tab stops per category and
               two of them nameless. -->
          <NuxtLink
            :to="localePath(category.to)"
            class="flex h-28 items-center gap-2 rounded-md bg-radial from-surface-raised from-40% to-surface-sunken px-2 font-bold text-ink transition-colors hover:text-brand-deep"
          >
            <!-- alt="" — the label beside it is the link's accessible name, and
                 the render would only say the category twice. Every source is a
                 transparent square, so the intrinsic box is stated once here. -->
            <img
              :src="category.image"
              alt=""
              width="300"
              height="300"
              loading="lazy"
              class="size-25 shrink-0 object-contain"
            >
            <span class="flex-1 text-center">{{ text(category.label) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

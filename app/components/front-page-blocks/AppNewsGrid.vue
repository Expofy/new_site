<script setup lang="ts">
import { newsProducts } from '~/data/news'

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()
</script>

<template>
  <!-- The same shell as "Populära kategorier": `surface-raised` behind white
       cards, heading and "see all" pill in one wrapping row. -->
  <section class="bg-surface-raised py-section" aria-labelledby="news-heading">
    <div class="mx-auto max-w-site px-gutter">
      <div class="mb-stack flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="news-heading" class="text-h2 font-semibold">
            {{ t('news.heading') }}
          </h2>
          <p class="mt-1 text-lg text-ink-muted">
            {{ t('news.subheading') }}
          </p>
        </div>

        <!-- Hover goes to `brand-deep`, not lighter `brand`: white on `brand`
             is 4.40:1, under the 4.5:1 a 16px label needs. -->
        <NuxtLink
          :to="localePath('/nyheter')"
          class="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-strong px-6 py-3 font-medium text-white transition-colors hover:bg-brand-deep active:brightness-90"
        >
          {{ t('news.seeAll') }}
          <svg class="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </NuxtLink>
      </div>

      <!-- One column on a phone: unlike the category renders these are
           photographs with two lines of copy, and half a 360px screen leaves
           the copy three words wide. Two from sm, four from lg. -->
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="product in newsProducts" :key="product.id">
          <!-- One link per card, the whole card. Its accessible name reads
               category, name, tagline — in that order, as on screen. The
               transparent resting border keeps hover from shifting the card. -->
          <NuxtLink
            :to="localePath(product.to)"
            class="group flex h-full flex-col rounded-md border border-transparent bg-surface p-3 shadow-sm transition-colors hover:border-brand hover:bg-brand-tint sm:p-4"
          >
            <!-- alt="" — the name below is the link's accessible name. Every
                 source shares one aspect ratio, stated once here. -->
            <img
              :src="product.image"
              alt=""
              width="192"
              height="140"
              loading="lazy"
              class="mb-4 aspect-[192/140] w-full rounded-sm object-cover"
            >

            <!-- `brand-strong`, the accent-text token: 5.46:1 on the card,
                 4.50:1 on the `brand-tint` hover fill. -->
            <p class="text-xs font-semibold uppercase tracking-wider text-brand-strong">
              {{ text(product.category) }}
            </p>

            <div class="mt-1 flex flex-1 items-end gap-2">
              <div class="min-w-0 flex-1 self-start">
                <h3 class="text-lg font-bold text-ink">{{ text(product.name) }}</h3>
                <p class="mt-1 text-sm text-ink-muted">{{ text(product.description) }}</p>
              </div>

              <!-- Decorative: the whole card is the link. -->
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
  </section>
</template>

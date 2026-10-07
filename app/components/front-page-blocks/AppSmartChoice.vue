<script setup lang="ts">
import { smartChoiceBlock } from '~/data/smart-choice'
import type { SmartChoiceIcon } from '~/types/smart-choice'

const props = defineProps<{ id: string }>()

const localePath = useLocalePath()
const text = useLocalizedText()

const block = computed(() => smartChoiceBlock(props.id))

/**
 * Feature marks, spelled out rather than fetched. `stroke` shapes so they
 * inherit `currentColor`, the same idiom as every other icon on the front page.
 */
const icons: Record<SmartChoiceIcon, string> = {
  cycle: 'M3.5 12a8.5 8.5 0 0 1 14.5-6M20.5 12a8.5 8.5 0 0 1-14.5 6M18 2.5V6h-3.5M6 21.5V18h3.5',
  calendar: 'M4 7.5h16v12H4zM4 11.5h16M8.5 3.5v4M15.5 3.5v4',
  tag: 'M3.5 11.2V4a.5.5 0 0 1 .5-.5h7.2a1 1 0 0 1 .7.3l8.3 8.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.8 12.6a1 1 0 0 1-.3-.7ZM8 8h.01',
}
</script>

<template>
  <!--
    The panel and nothing else — no band, no `max-w-site`, no gutter. That is
    deliberate and it is the whole reason two of these fit in one row: page
    furniture inside a block is what stops the block being placed twice. The
    page owns the band and the column count; see `pages/index.vue`.

    Which form it draws is decided by `@container` — the panel's own width —
    not by the viewport. Dropped into a half-width grid cell, each copy sees
    ~700px and stacks itself, without the page having to tell it anything and
    without a second component existing. A viewport media query cannot do this:
    at 1440px both a full-width panel and a half-width one are "desktop", and
    only one of them has room for two columns.

    56rem (896px) is where the two-column form stops working rather than a
    round number: the text column needs ~26rem before the headline breaks to
    three lines and the two CTAs stop sharing a row, and the visual needs ~28rem
    before the frame photograph is smaller than the swatches beside it.
  -->
  <section
    v-if="block"
    class="@container rounded-md bg-surface p-card shadow-lg"
    :aria-labelledby="`smart-${block.id}-heading`"
  >
    <div class="grid items-center gap-10 @min-[56rem]:grid-cols-[1fr_1.1fr] @min-[56rem]:gap-12">
      <!-- ── The pitch ─────────────────────────────────────────────────── -->
      <div>
        <!-- White on `brand-strong` is 5.46:1. The star is decorative: the
             word beside it already says "Smart val". -->
        <p class="inline-flex items-center gap-2 rounded-full bg-brand-strong px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-white">
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M12 3.5l2.6 5.5 6 .9-4.3 4.2 1 6-5.3-2.8-5.3 2.8 1-6L3.4 9.9l6-.9z" stroke-linejoin="round" />
          </svg>
          {{ text(block.badge) }}
        </p>

        <!-- `h2`, like every other front-page block, so this is a sibling of
             "Populära kategorier" rather than a level below it. `text-h1` is
             the size: the design draws this at ~62px, which is half again the
             42px the scale tops out at, and the scale wins — see the note in
             DESIGN-TOKENS.md. -->
        <h2
          :id="`smart-${block.id}-heading`"
          class="mt-stack text-h1 font-semibold text-balance"
        >
          {{ text(block.headline) }}
        </h2>

        <p class="mt-stack text-h4 font-semibold text-ink">{{ text(block.lead) }}</p>
        <p class="mt-4 max-w-prose text-ink-muted">{{ text(block.text) }}</p>

        <!-- A list, not three stacked divs: it is a set of three claims and the
             count is worth announcing before it is walked. The marks are
             `aria-hidden` — each one restates its own label. -->
        <ul class="mt-stack space-y-4">
          <li v-for="feature in block.features" :key="feature.id" class="flex items-center gap-4">
            <!-- `brand` on `brand-tint` is 3.63:1 — past the 3:1 bar this has
                 to clear, and it is non-text, so 4.5:1 does not apply. -->
            <span class="grid size-11 shrink-0 place-items-center rounded-full bg-brand-tint text-brand" aria-hidden="true">
              <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <path :d="icons[feature.icon]" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span class="font-semibold text-ink">{{ text(feature.label) }}</span>
          </li>
        </ul>

        <!-- `flex-wrap`, so the two pills drop onto separate rows rather than
             shrinking when the panel is half-width. -->
        <div class="mt-stack flex flex-wrap items-center gap-4">
          <NuxtLink
            :to="localePath(block.buttons.primary.to)"
            class="inline-flex items-center gap-2 rounded-full bg-brand-strong px-6 py-3 font-medium text-white transition-colors hover:bg-brand-deep active:brightness-90"
          >
            {{ text(block.buttons.primary.label) }}
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>

          <!-- Outlined, not filled, so the two CTAs cannot be mistaken for each
               other. `brand-strong` text is 5.46:1 on white and the `brand`
               border is 4.40:1 — both past their own bars. -->
          <NuxtLink
            v-if="block.buttons.secondary"
            :to="localePath(block.buttons.secondary.to)"
            class="inline-flex items-center gap-2 rounded-full border border-brand px-6 py-3 font-medium text-brand-strong transition-colors hover:bg-brand-tint"
          >
            {{ text(block.buttons.secondary.label) }}
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- ── The idea, in a picture ────────────────────────────────────── -->
      <!-- Assembled from parts rather than dropped in as one exported image,
           for one reason that outranks the extra markup: the swatch labels are
           words. "Vår" has to be able to say "Spring", and a label baked into a
           JPEG cannot. -->
      <div>
        <p class="mb-2 flex items-end gap-2 text-sm font-medium italic text-brand-strong">
          {{ text(block.annotation) }}
          <!-- The mockup draws this arrow by hand. Outfit is the only family
               here, so it is an italic line and a curve rather than a script
               face. -->
          <svg class="size-8 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M4 6c10 0 18 6 20 16" stroke-linecap="round" />
            <path d="M19 21l5 2 1-5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </p>

        <div class="flex items-stretch gap-3">
          <!-- The prints that change. `ul` for the same reason as the features:
               a set with a count. -->
          <ul class="grid shrink-0 basis-40 gap-3">
            <li v-for="swatch in block.swatches" :key="swatch.id" class="relative overflow-hidden rounded-md">
              <img :src="swatch.image" alt="" loading="lazy" class="aspect-2/1 size-full object-cover">
              <!-- A chip, where the design sets the word straight on the photo.
                   Behind it is a picture nobody has measured, and this is the
                   cheapest way to make the label's contrast knowable: `ink` on
                   `surface/90` is 10.4:1 over a black frame and 12.82:1 over a
                   white one, so it reads whatever the season looks like. -->
              <span class="absolute bottom-1.5 right-1.5 rounded-sm bg-surface/90 px-1.5 py-0.5 text-xs font-semibold text-ink">
                {{ text(swatch.label) }}
              </span>
            </li>
          </ul>

          <!-- The bracket tying the four prints to the one frame, and the swap
               mark on it. Decoration: the annotation above and the copy on the
               left both already say it in words. -->
          <div class="relative flex w-8 shrink-0 items-center" aria-hidden="true">
            <span class="absolute inset-y-4 left-0 w-4 rounded-l-full border-y border-l border-brand" />
            <span class="relative ml-1 grid size-8 place-items-center rounded-full bg-brand-strong text-white">
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 9h14l-3.5-3.5M20 15H6l3.5 3.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>

          <!-- The frame that stays. Decorative — see the note on `image` in
               ~/types/smart-choice.ts. -->
          <img
            :src="block.image"
            alt=""
            loading="lazy"
            class="min-w-0 flex-1 rounded-md object-contain object-bottom"
          >
        </div>
      </div>
    </div>
  </section>
</template>

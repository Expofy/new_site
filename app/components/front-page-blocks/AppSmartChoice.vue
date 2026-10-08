<script setup lang="ts">
import { smartChoiceBlock } from '~/data/smart-choice'
import type { SmartChoiceIcon } from '~/types/smart-choice'

const props = defineProps<{ id: string }>()

const localePath = useLocalePath()
const text = useLocalizedText()

const block = computed(() => smartChoiceBlock(props.id))

/** Which print is on the display. The first, until someone picks another. */
const active = ref(0)
watch(() => props.id, () => { active.value = 0 })

/**
 * Where the swap mark sits: level with the middle of the picked
 * swatch. The column is `n` equal rows with `gap-3` between them, so row `i`'s
 * middle is `(i + ½)` pitches down, less half a gap, where a pitch is
 * `(height + gap) / n`.
 */
const swapMarkTop = computed(() => {
  const count = block.value?.swatches.length ?? 1
  return `calc((100% + 0.75rem) * ${active.value + 0.5} / ${count} - 0.375rem)`
})

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
    three lines and the two CTAs stop sharing a row. The visual adapts on its own
    width below that — see the note on its container.
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
             "Populära kategorier" rather than a level below it — and `text-h2`
             for the same reason: a block heading drawn a step larger than its
             neighbours' reads as the page's headline. The design draws it at
             ~62px; the scale wins — see the note in DESIGN-TOKENS.md.

             The lead is `text-lg`, the size the subheading under "Populära
             kategorier" uses. Semibold and in full ink rather than muted,
             because here it is the offer itself, not a caption. -->
        <h2
          :id="`smart-${block.id}-heading`"
          class="mt-stack text-h2 font-semibold text-balance"
        >
          {{ text(block.headline) }}
        </h2>

        <p class="mt-2 text-lg font-semibold text-ink">{{ text(block.lead) }}</p>
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
      <!-- Assembled from parts rather than dropped in as exported images, for
           one reason that outranks the extra markup: every word in it — the
           swatch labels, the season's title and tagline — is text. "Vår" has
           to be able to say "Spring", and a word baked into a JPEG cannot.

           A container of its own, because whether the swatches can stand in a
           column beside the display depends on this column's width, not the
           panel's: below 34rem the display would be narrower than the swatches,
           so they go into a two-by-two block above it instead. Two, not four
           across: four thumbnails at phone width leave "Sommar" no room. -->
      <div class="@container/visual">
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

        <div class="flex flex-col gap-3 @min-[34rem]/visual:flex-row @min-[34rem]/visual:items-stretch">
          <!-- The prints that change, and the control that changes them. Still
               a `ul` — a set with a count — of toggle buttons: `aria-pressed`
               says which print is on the display, and `aria-controls` says
               where. The list is named by the annotation it sits under. -->
          <ul
            class="grid grid-cols-2 gap-3 @min-[34rem]/visual:shrink-0 @min-[34rem]/visual:basis-36 @min-[34rem]/visual:grid-cols-1"
            :aria-label="text(block.annotation)"
          >
            <li v-for="(swatch, i) in block.swatches" :key="swatch.id">
              <!-- The pick is a 2px `brand` ring 2px out — 4.40:1 on the white
                   panel, past 1.4.11's 3:1 — and `aria-pressed`, so it is not
                   colour alone. Focus is pushed 4px out to sit just outside
                   that ring rather than on top of it: both are `brand`. -->
              <button
                type="button"
                class="relative block size-full cursor-pointer overflow-hidden rounded-md ring-offset-2 transition-shadow focus-visible:outline-offset-4"
                :class="i === active ? 'ring-2 ring-brand' : 'hover:ring-2 hover:ring-brand/40'"
                :aria-pressed="i === active"
                :aria-controls="`smart-${block.id}-display`"
                @click="active = i"
              >
                <img :src="swatch.image" alt="" loading="lazy" class="block aspect-2/1 size-full object-cover">
                <!-- A chip, where the design sets the word straight on the
                     photo. Behind it is a picture nobody has measured, and this
                     is the cheapest way to make the label's contrast knowable:
                     `ink` on `surface/90` is 10.4:1 over a black frame and
                     12.82:1 over a white one, so it reads whatever the season
                     looks like. -->
                <span class="absolute bottom-1.5 right-1.5 rounded-sm bg-surface/90 px-1.5 py-0.5 text-xs font-semibold text-ink">
                  {{ text(swatch.label) }}
                </span>
              </button>
            </li>
          </ul>

          <!-- The swap mark, which slides to whichever print is up. Decoration:
               the annotation and the pressed button both already say it. Column
               form only — in a row it would have nothing to sit level with. -->
          <div class="relative hidden w-8 shrink-0 @min-[34rem]/visual:block" aria-hidden="true">
            <span
              class="absolute left-0 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-brand-strong text-white transition-[top] duration-300 motion-reduce:transition-none"
              :style="{ top: swapMarkTop }"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 9h14l-3.5-3.5M20 15H6l3.5 3.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </div>

          <!-- The display. One layer per season, stacked in one grid cell and
               cross-faded the way the hero is — see AppHero.vue for why only
               the incoming layer animates and the outgoing one holds. Inactive
               layers are `invisible`, so only the season on show is in the
               accessibility tree.

               Each layer is the season's photograph of the frame and flags,
               with the title and tagline as text on the empty wall above them.
               They are placed in percentages of the photograph and sized in
               `cqw` of it, so they stay on the wall at any width: a picture
               scales as one piece, and fixed type would sit right at one width
               only. The positions belong to the photographs — see `display` in
               ~/types/smart-choice.ts. -->
          <div
            :id="`smart-${block.id}-display`"
            class="@container/display isolate grid min-w-0 flex-1 overflow-hidden rounded-md bg-surface-raised"
          >
            <div
              v-for="(swatch, i) in block.swatches"
              :key="swatch.id"
              class="relative col-start-1 row-start-1 motion-reduce:transition-none"
              :class="i === active
                ? 'z-10 opacity-100 transition-opacity duration-500'
                : 'invisible opacity-0 transition-[opacity,visibility] delay-500 duration-0'"
            >
              <img :src="swatch.display" alt="" width="1000" height="1000" loading="lazy" class="block h-auto w-full">

              <!-- On the empty wall above the display. `ink-muted` is 4.69:1
                   on its darkest pixel, and each `accent` is held to 4.5:1 on
                   it by the tests. The floor on the small lines keeps them from
                   going under 9px in a narrow column, and the whole stack has
                   to end above the tallest piece of the display, which starts at
                   ~22% — which is why the
                   title is smaller than the design's, and why the spacing
                   tightens on a phone, where the 9px floor would otherwise
                   wrap the tagline onto the frame. -->
              <div class="absolute left-[5.2%] top-[3%] right-[5%]">
                <p class="text-[max(0.5625rem,1.5cqw)] leading-[1.2] uppercase tracking-[0.3em] text-ink-muted @max-[24rem]/display:tracking-[0.12em]">{{ text(block.campaign) }}</p>
                <p class="mt-[0.4cqw] text-[10.5cqw] leading-none font-medium" :style="{ color: swatch.accent }">{{ text(swatch.label) }}</p>
                <p class="mt-[1.4cqw] text-[max(0.5625rem,1.5cqw)] leading-[1.2] uppercase tracking-[0.25em] text-ink-muted @max-[24rem]/display:tracking-[0.12em]">{{ text(swatch.tagline) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { promoBanner } from '~/data/promo'
import type { PromoIcon } from '~/types/promo'

const props = defineProps<{ id: string }>()

const localePath = useLocalePath()
const text = useLocalizedText()

/**
 * A page names the band it wants rather than the block iterating a list — see
 * the note in ~/data/promo.ts. An id nothing matches renders nothing at all,
 * which is the right failure for a promotion: a band that cannot say what it is
 * advertising is worse than no band.
 */
const banner = computed(() => promoBanner(props.id))

/**
 * The marks, spelled out rather than built from data. `stroke` shapes, not
 * fills, so they inherit the ring's `currentColor` and match the arrow icons
 * the rest of the front page draws.
 */
const icons: Record<PromoIcon, string> = {
  leaf: 'M5 19C5 11 11 5 19 5c0 8-6 14-14 14zM5 19c3-3 6-5 10-6',
}
</script>

<template>
  <!--
    Contained, not full-bleed: the band sits in the same `max-w-site px-gutter`
    column as the blocks above and below it and carries the `md` card radius, so
    it reads as a panel in the page rather than as a break in it. Its own text is
    then inset a second time by `px-card`, which is what a panel does — the
    headline deliberately does *not* line up with "Populära kategorier" above,
    because it is inside something.

    This is the one structural decision the scrim's stop positions depend on.
    They are percentages of the *band*, and the band is no longer the viewport —
    it is capped at `max-w-site` and inset by two gutters, which is why the
    numbers below are not the ones that were measured when it was full-bleed.

    `min-h-50` is a floor, not the height. The band measures 220px at every
    width from 504 to 2560, because the text column is capped and the paragraph
    takes two lines throughout — but a headline that wraps, a long translation,
    or a user's own text-spacing settings all have to be able to push it taller,
    and a fixed height would clip the paragraph off the bottom (1.4.4, 1.4.12)
    rather than growing. The floor sits below the drawn height on purpose: it
    keeps the band reading as a band if the copy ever gets shorter, without
    capping it if the copy gets longer.

    `--color-focus` flips to white for the same reason `.on-ink` does: this band
    is dark, and brand pink on it is 2.92:1, under the 3:1 non-text bar.

    `mb-section` and no matching top margin: the band owns the gap to whatever
    comes after it, because the block that does — `AppServiceSlider` — carries
    `pb-section` only, on the assumption that the block above it ends in one.
    That assumption holds for a white block and not for this one, whose padding
    is inside the panel, so without this the cards would start against the
    photograph's bottom edge. The gap *above* still comes from the block before,
    which is the arrangement the rest of the page already runs on.
  -->
  <div v-if="banner" class="mx-auto mb-section max-w-site px-gutter">
    <section
      class="relative isolate flex min-h-50 items-center overflow-hidden rounded-md bg-eco-deep [--color-focus:var(--color-surface)]"
      :aria-labelledby="`promo-${banner.id}-heading`"
    >
      <!-- alt="" by type, not by omission — see the note on `image` in
           ~/types/promo.ts.

           `object-position` only does half the framing here, and it is worth
           knowing which half. The band is far wider than it is tall, so `cover`
           scales the photograph to the band's *width* and crops it vertically
           only — which means the horizontal component of `object-position` does
           nothing at any viewport this block is used at. Putting the deer and the
           sunbeam on the right is therefore a property of the file, not of this
           class: the source is cut at the column where the composition ends on
           lit foliage rather than on a trunk — 1650 of the original 2878 — which
           both removes the dark trunks that used to close the right edge and
           carries the deer out to about 87% of what remains. Re-crop the file,
           not this rule, to move them again — the original and the full recipe
           are in docs/assets/promo/, deliberately outside `public/` so the 7 MB
           of PNG behind this 327 KB JPEG never reaches the build.

           The vertical 88% is doing real work: at 1440 the band keeps roughly
           27% of the photograph's height, and centre would hold tree trunks. 88%
           lands the window on the clearing and the deer standing in it. -->
      <img
        :src="banner.image"
        alt=""
        width="1650"
        height="961"
        loading="lazy"
        class="absolute inset-0 -z-10 size-full object-cover object-[center_88%]"
      >

      <!--
        The scrim, and the only reason the white text has a knowable contrast at
        all — behind it is a photograph nobody measured. `eco-deep` at 80% over
        the brightest thing a frame could be (white) composites to #59784c, and
        white on that is 4.98:1; over the darkest it is 10.78:1. So the text
        passes whatever the picture does.

        That margin has narrowed at every restyle — 7.98:1 when the band was a
        near-black green at 85%, 5.29:1 once it was lightened, 4.98:1 now that it
        is warm — because brightness and warmth are both bought with luminance.
        Against a 4.5:1 floor there is no free step left: changing the base or the
        alpha again means recomputing the composite, not nudging the hex.

        The stops are what make that true across the whole text column rather than
        just at the left edge, and they are the part of this component that was
        actually measured rather than reasoned about. The rule they have to obey
        is that the scrim is still flat where the text ends — a gradient that has
        begun to fade under the last words puts them on partial scrim, which over
        a bright frame is around 2.4:1: a failure that appears only at some widths
        and only for some strings, which is the kind that ships.

        Measured in-browser, the text column's right edge sits at 70.4% of the
        band at 768px, 52.6% at 1023px, 52.5% at 1024px, 36.3% at 1440px, and
        34.4% from 1580px up, where the band stops growing. It peaks at the
        *narrow* end, because the column is a fixed `max-w-md` while the padding
        around it barely moves — which is why the reveal starts at `lg` and not
        at `md`.

        From `lg` up the flat region runs to 58%. The worst case it has to clear
        is the one immediately at the breakpoint — 52.5% at 1024px — and after
        that the margin only widens: the band caps at `max-w-site` minus two
        gutters, so the text's share of it falls monotonically to 34.4% and pins
        there from 1580px up. Below `lg` there is no fade at all — two stops of
        the same colour make a flat fill, which is correct for a band whose text
        column is 70% of its width and more.
      -->
      <div
        class="absolute inset-0 -z-10 bg-linear-to-r from-eco-deep/80 from-58% to-eco-deep/80 to-80% lg:to-transparent"
        aria-hidden="true"
      />

        <div class="w-full px-card py-9">
        <div class="flex max-w-md flex-col gap-2.5 text-white">
          <div class="flex items-center gap-3">
            <!-- Decorative. The headline beside it says the same thing in words,
                 and a leaf announced as "leaf" before "Tillsammans för en grönare
                 framtid" is the message twice. The ring is `white/70`, which over the
                 scrim composites to #c8d6cd — 3.51:1 against it at worst, past
                 the 3:1 non-text bar but no longer by much, because lightening
                 the scrim closed the gap from the other side. -->
            <span
              v-if="banner.icon"
              class="grid size-11 shrink-0 place-items-center rounded-full border border-white/70"
              aria-hidden="true"
            >
              <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <path :d="icons[banner.icon]" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>

            <!-- `h2`, like every other front-page block, so the band is a sibling
                 of "Populära kategorier" rather than a level below it. It names
                 the section via aria-labelledby. -->
            <h2
              :id="`promo-${banner.id}-heading`"
              class="text-xl font-semibold leading-tight"
            >
              {{ text(banner.headline) }}
            </h2>
          </div>

          <p class="text-sm">{{ text(banner.text) }}</p>

          <!-- The same pill as the hero's overlay button, in the band's own
               colour. White on `eco` is 4.82:1 and on the darker hover step
               5.57:1 — the label reads whatever the photograph does, because the
               fill is opaque.

               The ring is not decoration. Warming the palette took the pill's
               luminance to within a hair of the scrim's — 1.03:1, so the fill and
               what surrounds it are the same *brightness* and differ only in hue,
               which is exactly the separation a low-vision or greyscale reader
               does not get. `white/70` composites to #cdd6c9 over the scrim,
               which is 3.33:1 against it and 3.23:1 against the fill: the pill
               now has a boundary that clears 1.4.11 on both sides rather than
               leaning on its label alone, which is the weaker position the
               hero's overlay button still occupies (A11Y-10).

               `mt-1` rather than padding on the link, so the white focus ring —
               drawn 2px outside the box — lands around the pill and not across
               the paragraph's last line. -->
          <NuxtLink
            :to="localePath(banner.button.to)"
            class="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-eco px-5 py-2.5 ring-1 ring-white/70 text-sm font-medium text-white transition-colors hover:bg-eco-strong active:brightness-90"
          >
            {{ text(banner.button.label) }}
            <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

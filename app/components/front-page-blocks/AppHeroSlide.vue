<script setup lang="ts">
import { NuxtLink } from '#components'
import type { HeroSlide } from '~/types/hero'

const props = withDefaults(defineProps<{
  slide: HeroSlide
  /** False while another slide of the group is showing. */
  active?: boolean
  /** False when the hero is paused, by the user or by reduced-motion. */
  motion?: boolean
}>(), { active: true, motion: true })

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()

const overlay = computed(() => props.slide.overlay)

/**
 * A Resource URL is either a file this component can drive itself or a
 * third-party embed it cannot. The difference matters for SC 2.2.2: an
 * autoplaying loop needs a pause control, and there is no way to put one on a
 * YouTube iframe — so embeds do not autoplay and lean on the player's own
 * controls instead.
 */
const videoFile = computed(() =>
  props.slide.type === 'video' && /\.(mp4|webm|ogv)(\?.*)?$/i.test(props.slide.resource ?? '')
    ? props.slide.resource
    : undefined,
)
const videoEmbed = computed(() =>
  props.slide.type === 'video' && !videoFile.value ? props.slide.resource : undefined,
)

/**
 * The slide-wide link only applies when the slide has nothing interactive of
 * its own: an anchor or a button nested inside an anchor is invalid HTML, and
 * the inner control stops being reachable. Data is not supposed to combine
 * them — see test/hero.test.ts — this is the renderer refusing to emit broken
 * markup if it ever does.
 */
const linked = computed(() =>
  Boolean(props.slide.link) && !overlay.value.button && !videoFile.value,
)

const linkProps = computed(() => {
  const link = props.slide.link
  if (!linked.value || !link) return {}
  return {
    to: localePath(link.to),
    target: link.newTab ? '_blank' : undefined,
    rel: link.newTab ? 'noopener noreferrer' : undefined,
  }
})

// Alignment and theme are looked up, never interpolated: Tailwind only emits a
// class it can see spelled out at build time.
// Bottom-aligned content gets extra room so it clears the hero's control pill,
// which is anchored to the same edge. `pb-20` wins over `py-section` because
// Tailwind orders the narrower utility last.
const alignY = { top: 'justify-start', middle: 'justify-center', bottom: 'justify-end pb-20' }
const alignX = { left: 'items-start text-left', center: 'items-center text-center', right: 'items-end text-right' }

/**
 * Focus rings follow the theme for the same reason `.on-ink` flips them: light
 * text means a dark backdrop, where brand pink is 2.92:1 and fails the 3:1
 * non-text bar.
 */
const themeClass = {
  light: 'text-white [--color-focus:var(--color-surface)]',
  dark: 'text-ink [--color-focus:var(--color-brand)]',
}

/**
 * The scrim is the only reason the overlay's contrast is knowable at all —
 * behind it is a photograph nobody measured. It comes in two layers so the
 * media can show through everywhere the text is not: a light one over the
 * whole slide, and a denser one behind the text block only, soft-edged by
 * `.hero-text-scrim` in main.css. The second is attached to the text block, so
 * it follows any alignment and any width without being told.
 *
 * Under the text the two composite, and that sum is what is sized for the
 * worst case — the media being the opposite extreme:
 *
 * - black/25 + black/50 is 62.5% black; over a pure white frame that is
 *   #606060, and white on it is 6.33:1. Any darker frame only helps.
 * - Dark text has no slide-wide layer, only white/80 behind the text: over
 *   pure black that is #cccccc, and ink on it is 7.99:1 — brand-strong, the
 *   HTML headline's accent, 3.40:1, which large text needs to clear 3:1. Dark text goes on
 *   pale media, and a white wash over a pale photo only fogs it — on the wall
 *   the text usually sits on, the glow behind it is all but invisible.
 *
 * The slide-wide layer alone is not enough for text, so nothing may be drawn
 * outside the text block. The fade lives in the padding around it.
 */
const scrimClass = {
  light: { slide: 'bg-black/25', text: 'before:bg-black/50' },
  dark: { slide: '', text: 'before:bg-white/80' },
}

const videoEl = ref<HTMLVideoElement>()

/**
 * The `autoplay` attribute stays on the element so a slide that is active on
 * first paint starts without waiting for JavaScript. Everything after that is
 * driven from here: an off-screen slide must not play to nobody, and a paused
 * hero must not keep moving. `play()` rejects when the browser declines to
 * start it, which is not something this component can do anything about.
 */
watch(() => props.active && props.motion, (mayPlay) => {
  const el = videoEl.value
  if (!el) return
  if (mayPlay) void el.play().catch(() => {})
  else el.pause()
}, { immediate: true, flush: 'post' })
</script>

<template>
  <component
    :is="linked ? NuxtLink : 'div'"
    v-bind="linkProps"
    class="relative isolate flex min-h-[65vh] w-full overflow-hidden bg-surface-sunken"
  >
    <!-- Media layer. `alt` comes from the data: empty is correct while the
         overlay carries the message, which is the case for every slide the
         Saved Pages ship. An HTML slide may carry an image too, as the
         backdrop for its markup. -->
    <img
      v-if="(slide.type === 'image' || slide.type === 'html') && slide.image"
      :src="slide.image"
      :alt="slide.imageAlt ? text(slide.imageAlt) : ''"
      class="absolute inset-0 -z-10 size-full object-cover"
    >

    <!-- aria-hidden: a muted, looping background video is decoration. What it
         is there to say is said by the overlay text. -->
    <video
      v-else-if="videoFile"
      ref="videoEl"
      :src="videoFile"
      :poster="slide.image"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
      class="absolute inset-0 -z-10 size-full object-cover"
    />

    <!-- `allow` deliberately omits `autoplay`. A Resource URL is whatever the
         admin pasted, so it may well carry `?autoplay=1` — and this component
         has no way to offer a pause control for a cross-origin player, which
         SC 2.2.2 would then require. Permissions Policy defaults the `autoplay`
         feature to `self`, so leaving it off this list is what denies it to the
         embed. Do not add it. -->
    <iframe
      v-else-if="videoEmbed"
      :src="videoEmbed"
      :title="t('hero.videoTitle')"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="absolute inset-0 -z-10 size-full"
    />

    <div
      v-if="overlay.dark && scrimClass[overlay.theme].slide"
      class="absolute inset-0 -z-10"
      :class="scrimClass[overlay.theme].slide"
      aria-hidden="true"
    />

    <div
      class="mx-auto flex w-full max-w-site flex-col px-gutter py-section sm:px-[max(var(--spacing-gutter),4.5rem)]"
      :class="[alignY[overlay.alignY], alignX[overlay.alignX], themeClass[overlay.theme]]"
    >
      <!-- From `sm` up the side padding is at least 4.5rem, which clears the
           carousel's prev/next arrows (1rem inset + 2.75rem button + a gap),
           so left- or right-aligned text never runs under them. -->
      <!-- The text block, shrink-wrapped to its widest line so the dense scrim
           layer drawn from it covers the text and not the whole column. -->
      <div
        class="relative isolate flex flex-col gap-stack"
        :class="[alignX[overlay.alignX], overlay.dark && ['hero-text-scrim', scrimClass[overlay.theme].text]]"
      >
        <!--
          Custom HTML is rendered verbatim. It is authored in the admin by staff,
          so it is trusted the same way the rest of the CMS output is — but it is
          the one place in this app where markup arrives as a string, and it must
          stay sanitised on the backend. Never point this at anything a customer
          can write.
        -->
        <!-- `.hero-html` in main.css styles the markup by element, so an
             editor writes plain HTML and gets the house typography: `small`
             is the eyebrow, `h2` the headline with `em` as its accent, `p`
             the lead, and `ul` a row of check-marked pills. -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div
          v-if="slide.type === 'html' && slide.html"
          class="hero-html max-w-3xl"
          v-html="text(slide.html)"
        />

        <h2 v-if="overlay.headline" class="max-w-3xl text-h1 font-semibold">
          {{ text(overlay.headline) }}
        </h2>

        <p v-if="overlay.text" class="max-w-2xl text-lg">
          {{ text(overlay.text) }}
        </p>

        <NuxtLink
          v-if="overlay.button"
          :to="localePath(overlay.button.to)"
          class="mt-2 inline-flex items-center rounded-full bg-brand-strong px-6 py-3 font-medium text-white transition-colors hover:bg-brand-deep active:brightness-90"
        >
          {{ text(overlay.button.label) }}
        </NuxtLink>

        <span v-if="linked && slide.link?.newTab" class="sr-only">{{ t('hero.newTab') }}</span>
      </div>
    </div>

  </component>
</template>

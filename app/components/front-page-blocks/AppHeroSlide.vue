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
 * behind it is a photograph nobody measured. Both values are picked for their
 * worst case, which is the media being the opposite extreme:
 *
 * - black/60 over a pure white image composites to #666, and white on #666 is
 *   5.74:1. Any darker image only helps. (black/45 would give #8c8c8c and
 *   3.36:1 — enough for large text, not for the paragraph.)
 * - white/70 over pure black composites to #b2b2b2, and ink on #b2b2b2 is
 *   6.05:1.
 */
const scrimClass = { light: 'bg-black/60', dark: 'bg-white/70' }

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
         Saved Pages ship. -->
    <img
      v-if="slide.type === 'image' && slide.image"
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
      v-if="overlay.dark"
      class="absolute inset-0 -z-10"
      :class="scrimClass[overlay.theme]"
      aria-hidden="true"
    />

    <div
      class="mx-auto flex w-full max-w-site flex-col gap-stack px-gutter py-section"
      :class="[alignY[overlay.alignY], alignX[overlay.alignX], themeClass[overlay.theme]]"
    >
      <!--
        Custom HTML is rendered verbatim. It is authored in the admin by staff,
        so it is trusted the same way the rest of the CMS output is — but it is
        the one place in this app where markup arrives as a string, and it must
        stay sanitised on the backend. Never point this at anything a customer
        can write.
      -->
      <!-- Lists are inline-block so the container's own text-align places them:
           centred under centred text, flush left under left-aligned text. As
           blocks they span the full column and the markers strand themselves at
           the padding edge, far from the text they belong to. -->
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div
        v-if="slide.type === 'html' && slide.html"
        class="max-w-3xl [&_h2]:text-h2 [&_h2]:font-semibold [&_li]:mt-1 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:inline-block [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-left"
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
        class="mt-2 inline-flex items-center rounded-full bg-brand-strong px-6 py-3 font-medium text-white transition-colors hover:bg-brand active:brightness-90"
      >
        {{ text(overlay.button.label) }}
      </NuxtLink>

      <span v-if="linked && slide.link?.newTab" class="sr-only">{{ t('hero.newTab') }}</span>
    </div>

  </component>
</template>

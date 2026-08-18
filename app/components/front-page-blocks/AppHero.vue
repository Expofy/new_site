<script setup lang="ts">
import { slidesInGroup } from '~/data/hero'

const props = withDefaults(defineProps<{ group?: string }>(), { group: 'front-page' })

const { t } = useI18n()

/** One Slider Group, in admin Order. */
const slides = computed(() => slidesInGroup(props.group))

const index = ref(0)
const canRotate = computed(() => slides.value.length > 1)

/**
 * Two kinds of motion live here and one control governs both: the rotation
 * between slides, and whatever the active slide is playing. Neither belongs to
 * the slide — a slide cannot know it is one of several — so `AppHeroSlide` is
 * told whether it may move and does as it is told.
 *
 * `paused` is the deliberate state: the user pressed pause, or the OS says they
 * want reduced motion. `hovered`/`focused` are the temporary one — reading a
 * slide or tabbing into it should not have it yanked away mid-sentence — and
 * they hold the rotation only, never the video.
 */
const paused = ref(false)
const hovered = ref(false)
const focused = ref(false)

const autoAdvance = computed(() =>
  canRotate.value && !paused.value && !hovered.value && !focused.value,
)

const AUTOPLAY_MS = 7000
let timer: ReturnType<typeof setInterval> | undefined

function clearTimer() {
  if (timer) {
    clearInterval(timer)
    timer = undefined
  }
}

function go(to: number) {
  const total = slides.value.length
  index.value = (to + total) % total
}

if (import.meta.client) {
  // `index` is a dependency so that navigating by hand restarts the countdown,
  // rather than leaving a part-elapsed one to snatch the slide away.
  watch([autoAdvance, index], () => {
    clearTimer()
    if (autoAdvance.value) timer = setInterval(() => go(index.value + 1), AUTOPLAY_MS)
  }, { immediate: true })

  onBeforeUnmount(clearTimer)

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) paused.value = true
  })
}

/**
 * A live region that announces while it is still rotating on a timer talks over
 * itself. It is only useful once the rotation has stopped and the user is
 * driving — per the APG carousel pattern.
 */
const liveMode = computed(() => (autoAdvance.value ? 'off' : 'polite'))

const activeSlide = computed(() => slides.value[index.value])
const activePlaysVideo = computed(() =>
  activeSlide.value?.type === 'video'
  && /\.(mp4|webm|ogv)(\?.*)?$/i.test(activeSlide.value.resource ?? ''),
)

/** Nothing moves on a single still slide, so nothing needs stopping. */
const showControls = computed(() => canRotate.value || activePlaysVideo.value)

// Name what the control actually stops. It differs when there is only one
// slide and the motion is the video rather than the rotation.
const motionLabel = computed(() => {
  if (paused.value) return canRotate.value ? t('hero.play') : t('hero.playVideo')
  return canRotate.value ? t('hero.pause') : t('hero.pauseVideo')
})
</script>

<template>
  <section
    v-if="slides.length"
    class="relative isolate"
    :aria-roledescription="t('hero.carousel')"
    :aria-label="t('hero.carouselLabel')"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @focusin="focused = true"
    @focusout="focused = false"
  >
    <!-- Every slide stays in the DOM and stacks in one grid cell, so the block
         is as tall as its tallest slide and crawlers see all of the content.
         Inactive slides are `invisible`, not `hidden`: visibility:hidden takes
         them out of the tab order and the accessibility tree just the same, but
         still allows the cross-fade.

         Only the incoming slide animates. It fades up on top while the outgoing
         one holds at full opacity underneath, and the outgoing one's `opacity-0`
         and `invisible` both land 500ms late — `duration-0 delay-500` — by which
         time an opaque slide is already covering it.

         Fading the pair against each other instead is what made the hero flash:
         two half-transparent slides composite the page's own background through
         them, and hiding the outgoing one outright (visibility is not animated by
         `transition-opacity`) shows nothing but that background for the whole
         500ms. The cost of holding it is that it stays in the accessibility tree
         until the fade ends; nothing announces, because a live region's default
         `aria-relevant` covers additions, not removals.

         `isolate` keeps the active slide's `z-10` scoped to this grid, so it
         stacks over its siblings without also covering the controls below. -->
    <div class="isolate grid" :aria-live="liveMode">
      <div
        v-for="(slide, i) in slides"
        :key="slide.id"
        class="col-start-1 row-start-1 motion-reduce:transition-none"
        :class="i === index
          ? 'z-10 opacity-100 transition-opacity duration-500'
          : 'invisible opacity-0 transition-[opacity,visibility] delay-500 duration-0'"
        role="group"
        :aria-roledescription="t('hero.slide')"
        :aria-label="t('hero.slideOf', { index: i + 1, total: slides.length })"
      >
        <AppHeroSlide :slide="slide" :active="i === index" :motion="!paused" />
      </div>
    </div>

    <!-- Controls sit on unknown media, so they carry their own dark pill: white
         on it is 5.74:1 even if the media behind is pure white, where brand pink
         would be 1.46:1.
         The focus ring has to stay ON that pill. The global `:focus-visible`
         outline is offset 2px OUTSIDE its element, which put a white ring on the
         slide itself — invisible on a pale photograph, and 1.10:1 on the HTML
         slide's `surface-sunken`. So these draw their own ring inset instead,
         the same fix and the same pseudo-element mechanism as A11Y-05/07/08. -->
    <template v-if="canRotate">
      <button
        type="button"
        class="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 p-3 text-white transition-colors after:pointer-events-none after:absolute after:inset-1 after:rounded-full after:border-2 after:border-transparent hover:bg-black/80 focus-visible:outline-hidden focus-visible:after:border-white"
        :aria-label="t('hero.previous')"
        @click="go(index - 1)"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-black/60 p-3 text-white transition-colors after:pointer-events-none after:absolute after:inset-1 after:rounded-full after:border-2 after:border-transparent hover:bg-black/80 focus-visible:outline-hidden focus-visible:after:border-white"
        :aria-label="t('hero.next')"
        @click="go(index + 1)"
      >
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </template>

    <div
      v-if="showControls"
      class="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/60 px-2 text-white [--color-focus:var(--color-surface)]"
    >
      <!-- The pause button is exactly as tall as the pill it sits in, so an
           outset ring would hang 2px over the pill's edge onto the slide. It
           rings itself inset for the same reason the arrows do. The dots below
           are 24px in a 40px pill, so their outset ring still lands on the
           pill and is left alone. -->
      <button
        type="button"
        class="relative cursor-pointer rounded-full p-3 after:pointer-events-none after:absolute after:inset-1 after:rounded-full after:border-2 after:border-transparent focus-visible:outline-hidden focus-visible:after:border-white"
        :aria-label="motionLabel"
        @click="paused = !paused"
      >
        <svg v-if="paused" class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5.5v13l11-6.5z" />
        </svg>
        <svg v-else class="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
        </svg>
      </button>

      <ul v-if="canRotate" class="flex items-center">
        <li v-for="(slide, i) in slides" :key="slide.id">
          <!-- The dot itself is 8px; the padding is what gets the target to the
               24x24 of SC 2.5.8. The current slide is marked by width as well as
               fill, so the state does not rest on colour alone (SC 1.4.1). -->
          <button
            type="button"
            class="block cursor-pointer rounded-full p-2"
            :aria-label="t('hero.goToSlide', { index: i + 1 })"
            :aria-current="i === index ? 'true' : undefined"
            @click="go(i)"
          >
            <span
              class="block h-2 rounded-full transition-all"
              :class="i === index ? 'w-6 bg-white' : 'w-2 bg-white/60'"
            />
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

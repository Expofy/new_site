<script setup lang="ts">
import { services } from '~/data/services'

/**
 * How many cards are on screen at the widest step. Backend-owned once the CMS
 * is connected — it is an editorial call about how much of the offer to show at
 * a glance, not a layout constant, so it arrives as data rather than living in
 * a stylesheet.
 *
 * It is a *maximum*, not a fixed count: the narrower breakpoints clamp down
 * from it (see `.card-track` in main.css), so setting 3 here gives three across
 * on desktop and still one on a phone, rather than three squeezed onto 360px.
 */
const props = withDefaults(defineProps<{ columns?: number }>(), { columns: 6 })

/**
 * Guarded because the value comes from outside. It divides the row width, so a
 * 0 would be a division by zero and a fraction would leave a card cut down the
 * middle at every breakpoint — neither is worth shipping to find out.
 */
const columns = computed(() => Math.max(1, Math.round(props.columns)))

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()

/**
 * The track is a real scroll container, not a transform the arrows drive. That
 * choice is what makes the rest of this component small: the browser already
 * owns momentum, trackpad and touch swipe, snapping, and — because every card
 * holds a link — scrolling a card into view when it is tabbed to. The arrows
 * only push the same scroller the user can push by hand, so the two input
 * routes can never disagree about where the block is.
 *
 * Nothing moves on its own. This block is six links, not a promotion, and an
 * auto-rotation would drag content out from under someone mid-sentence to no
 * purpose — which is also why the hero's pause button has no counterpart here.
 */
const track = ref<HTMLElement>()

/** Arrow state. Both ends are disabled rather than hidden, so the row of
 *  controls does not change width as the user walks it. */
const atStart = ref(true)
const atEnd = ref(false)

/**
 * Whether the track overflows at all. At `xl` all six cards fit, so there is
 * nothing to scroll and the arrows would sit there permanently disabled —
 * controls for a thing that cannot happen. Starts `false` because that is the
 * design width and the common case; the arrows appear on hydration at the
 * narrower ones rather than flashing away at the wide one.
 */
const scrollable = ref(false)

function syncEdges() {
  const el = track.value
  if (!el) return

  // 1px of slack: fractional layout widths mean scrollLeft rarely lands exactly
  // on its maximum, and a hair short would leave a live-looking dead arrow.
  const max = el.scrollWidth - el.clientWidth
  scrollable.value = max > 1
  atStart.value = el.scrollLeft <= 1
  atEnd.value = el.scrollLeft >= max - 1
}

/**
 * One card plus one gap, measured rather than declared: the card width is three
 * breakpoint-dependent `calc()`s in the template, and a number copied here to
 * match them would be wrong at two widths out of three.
 */
function step() {
  const el = track.value
  const first = el?.firstElementChild as HTMLElement | undefined
  if (!el || !first) return 0

  const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0
  return first.getBoundingClientRect().width + gap
}

/**
 * Reduced motion is decided here rather than by a `motion-reduce:scroll-auto`
 * class on the track, because the class would lose: an explicit `behavior` in
 * `scrollBy` overrides the element's CSS `scroll-behavior`, so the pair would
 * have animated the scroll for exactly the users who asked it not to. The CSS
 * property is left off the track entirely for the same reason — one place
 * decides, and it is this one.
 *
 * Read per click, not once at mount: the setting can change while the page is
 * open, and a slider that keeps animating until reload would be a stale answer
 * to a live preference.
 */
function scrollByCard(direction: 1 | -1) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  track.value?.scrollBy({
    left: direction * step(),
    behavior: reduced ? 'auto' : 'smooth',
  })
}

onMounted(() => {
  syncEdges()
  // The card width is a percentage of the track, so a resize can move the
  // scroller off either edge without anyone scrolling.
  window.addEventListener('resize', syncEdges)
})

onBeforeUnmount(() => window.removeEventListener('resize', syncEdges))
</script>

<template>
  <!-- `pb-section` only. The block above is also white and already ends in a
       full `py-section`, so a top padding here would stack two of them and open
       twice the gap the hero leaves above "Populära kategorier". -->
  <section class="bg-surface pb-section" aria-labelledby="services-heading">
    <div class="mx-auto max-w-site px-gutter">
      <div class="mb-stack flex items-center justify-between gap-4">
        <h2 id="services-heading" class="text-h2 font-semibold">
          {{ t('services.heading') }}
        </h2>

        <!-- Shortcuts, not the only way through: everything the arrows reach is
             reachable by swiping, by dragging the scrollbar, and by tabbing from
             card to card. They are hidden from assistive tech for that reason —
             announcing two buttons that only re-scroll a region the user is
             already walking link by link is noise, not help. -->
        <div v-if="scrollable" class="flex shrink-0 items-center gap-2" aria-hidden="true">
          <button
            type="button"
            tabindex="-1"
            class="cursor-pointer rounded-full border border-ink/15 bg-surface p-2.5 text-ink transition-colors hover:border-brand hover:text-brand-deep disabled:cursor-default disabled:opacity-40 disabled:hover:border-ink/15 disabled:hover:text-ink"
            :disabled="atStart"
            @click="scrollByCard(-1)"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            tabindex="-1"
            class="cursor-pointer rounded-full border border-ink/15 bg-surface p-2.5 text-ink transition-colors hover:border-brand hover:text-brand-deep disabled:cursor-default disabled:opacity-40 disabled:hover:border-ink/15 disabled:hover:text-ink"
            :disabled="atEnd"
            @click="scrollByCard(1)"
          >
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <!-- A plain list. It was an `ol` while the cards were numbered, because
           the number drawn on a card was its position and nothing else; with the
           numbers gone, an `ol` would assert a sequence nothing on screen backs
           up. Array order is still render order — it is just a curated order
           now, not a ranking, which is what `ul` says.

           `.card-track` in main.css owns the grid and how many cards are on
           screen — six, four, three, two, one. All six fit at the 1366px
           boundary, which is the width the design is drawn for, so the track
           only actually scrolls below it; the arrows take themselves away when
           it does not. -->
      <ul
        ref="track"
        class="card-track list-none pb-2 snap-x snap-mandatory"
        :style="{ '--card-track-columns-max': columns }"
        @scroll.passive="syncEdges"
      >
        <li
          v-for="service in services"
          :key="service.id"
          class="group relative flex snap-start flex-col rounded-md border border-ink/10 bg-surface p-4 transition-shadow hover:shadow-lg"
        >
          <!-- The eyebrow used to be right-aligned as a counterweight to the
               card's number, and carried a short rule beneath it; both are gone
               and it now reads from the left, alone. It wraps rather than
               truncates — "Produktion & installation" does not fit on one line
               at a sixth of the row, and a clipped grouping is worse than a
               two-line one — and reserves both lines so losing the second does
               not shorten the card.

               `support` is the site's help-and-service voice, which is the
               right register for a block of services; `brand` stays with the
               pieces that sell. -->
          <div class="mb-4">
            <span class="line-clamp-2 min-h-[1.625rem] text-[0.625rem] font-medium uppercase leading-tight tracking-wider text-support">
              {{ text(service.eyebrow) }}
            </span>
          </div>

          <!-- alt="" — the drawing is the title in pictures, and the title is
               already half the link's accessible name below.

               A fixed height, `object-contain`. Left to scale with the card it
               would be the main reason a card's height moved when the column
               count changed: a 4:3 drawing at `w-full` is 143px tall across a
               sixth of the row and 240px across a third. The reserved 108px
               holds whatever the assets' aspect ratio turns out to be, because
               `object-contain` fits them into it rather than the other way
               round — which is what keeps a re-export from moving the card.

               This box is also the card's height dial. It is the one band that
               is a fixed number rather than a reservation sized to the longest
               string, so taking height out of it costs nothing but drawing
               size — where the same 20px off the text block would have made the
               cards uneven at narrow column counts, which is the thing the
               reservations exist to prevent. -->
          <img
            :src="service.image"
            alt=""
            width="200"
            height="150"
            loading="lazy"
            class="mb-4 h-27 w-full object-contain"
          >

          <!-- No reserved height here, deliberately. Cards are grid items in
               one row, so they already stretch to a common height without being
               told to; a `min-h` adds nothing to that, and only buys the card
               the same height across *different* column counts — which nobody
               ever sees side by side. Measured, that guarantee cost 48px of
               blank in every card at six columns' worth of reservation while
               the block was configured for five.

               The clamps stay. They are not about layout — they stop a long
               string from a CMS field running the card away from its
               neighbours, which is a thing that can still happen. -->
          <h3
            :id="`service-${service.id}-title`"
            class="line-clamp-2 text-lg font-semibold text-ink"
          >
            {{ text(service.title) }}
          </h3>
          <p class="mb-4 mt-2 line-clamp-3 text-sm text-ink-muted">
            {{ text(service.description) }}
          </p>

          <!-- One link per card, stretched over the whole card by its own
               `after` layer: the card is the click target the mockup implies,
               without the second tab stop a separate wrapping anchor would add.

               Six links all named "Läs mer" would be six identical entries in a
               screen reader's link list, so the name is built from the visible
               "Läs mer" plus the card's own h3 — "Läs mer, Hjälp med original".
               `mt-auto` keeps them on one line across cards whose descriptions
               wrap to different heights.

               The gap above it is the paragraph's `mb-4`, not padding on the
               link. Padding here inflates the link's own box upward, and the
               focus ring — drawn 2px outside that box — then lands across the
               last line of the description. Same gap, ring around the words. -->
          <NuxtLink
            :to="localePath(service.to)"
            :aria-labelledby="`service-${service.id}-more service-${service.id}-title`"
            class="mt-auto after:absolute after:inset-0 after:rounded-md"
          >
            <span
              :id="`service-${service.id}-more`"
              class="inline-flex items-center gap-1.5 text-sm font-bold text-support group-hover:underline"
            >
              {{ t('services.readMore') }}
              <svg class="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>

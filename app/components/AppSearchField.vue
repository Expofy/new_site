<script setup lang="ts">
/**
 * The header and the mobile drawer are on screen at the same time — the drawer
 * covers the header rather than replacing it — so this renders twice and each
 * instance needs its own `id` for the label to point at.
 *
 * `landmark` exists for the same reason. Two `role="search"` landmarks with the
 * same name are worse than one, so the drawer's copy drops the role: inside an
 * open dialog it is a form the user has already navigated to, not a region to
 * be found by landmark.
 */
const props = withDefaults(defineProps<{ id?: string, landmark?: boolean }>(), {
  id: 'site-search',
  landmark: true,
})

const { t } = useI18n()
const localePath = useLocalePath()
const router = useRouter()

const query = ref('')

function onSubmit() {
  const trimmed = query.value.trim()
  if (!trimmed) return
  router.push({ path: localePath('/search'), query: { q: trimmed } })
}
</script>

<template>
  <form :role="props.landmark ? 'search' : undefined" class="flex w-full items-stretch" @submit.prevent="onSubmit">
    <label :for="props.id" class="sr-only">{{ t('search.label') }}</label>
    <!-- The field's whole focus indicator is its own 1px border turning `focus`.
         That is a deliberate call — see A11Y-09 in docs/WCAG-STATUS.md for the
         contrast it costs. Anything thicker has to be added *outside* the border,
         and every mechanism for that misrenders somewhere: an outline is
         positioned independently of the box it belongs to, so whenever this
         field's flexible width put the seam on a fractional pixel, Firefox left
         a 1px white sliver between the ring and the submit button and the ring
         read as a stray divider splitting the pill. If a thicker ring is ever
         wanted back, it belongs in an inset `box-shadow`, which is painted with
         the element's own background on the same snapped box and follows
         border-radius in every engine.
         `outline-hidden`, not `outline-none`: it drops the global outline — an
         *outer* ring, which on this half-rounded control draws a square edge
         across the submit button — but keeps a transparent one under
         forced-colors, where the UA repaints outlines and drops box-shadows. -->
    <input
      :id="props.id"
      v-model="query"
      type="search"
      name="q"
      :placeholder="t('search.placeholder')"
      class="min-w-0 flex-1 rounded-l-full border border-r-0 border-black/45 bg-surface px-4 py-2 text-base text-ink placeholder:text-ink-muted focus-visible:border-focus focus-visible:outline-hidden"
    >
    <!-- The pill ring alone cannot say which half has focus, and `focus` on the
         brand-strong fill is 1.24:1 — invisible. White is 5.46:1 there, drawn
         4px inside the button instead of crossing the input. It is a
         pseudo-element border rather than an inset outline for the reason above,
         and rather than a box-shadow because a shadow cannot be offset inward;
         a border curves with the pill cap in every engine. -->
    <!-- Hover and active go to `brand`. White on it is 4.40:1, which clears the
         3:1 non-text bar but NOT the 4.5:1 text bar — so this holds only while
         the button's content is the icon. Putting a text label in here means
         hovering to `brand-deep` instead (11.01:1), per docs/DESIGN-TOKENS.md.
         `active` also covers touch, where there is no hover state at all.
         Tailwind v4's preflight no longer makes buttons cursor-pointer. -->
    <button
      type="submit"
      class="relative flex cursor-pointer items-center rounded-r-full bg-brand-strong px-5 text-white transition-colors after:pointer-events-none after:absolute after:inset-1 after:rounded-r-full after:border-2 after:border-transparent hover:bg-brand active:bg-brand active:brightness-90 focus-visible:outline-hidden focus-visible:after:border-white"
      :aria-label="t('search.submit')"
    >
      <svg
        class="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" stroke-linecap="round" />
      </svg>
    </button>
  </form>
</template>

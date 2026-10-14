<script setup lang="ts">
/**
 * Trustpilot "Mini" TrustBox: logo, stars, TrustScore and review count,
 * stacked to fit a footer column. The numbers come from Trustpilot, never from
 * us — Trustpilot's terms only allow a rating shown through its own widgets,
 * and a copied figure goes stale.
 *
 * Mini rather than the live site's "Horizontal": Horizontal needs ~650px for
 * its rating word and count, and off expofy.se it shows only stars and logo.
 * Mini renders in full on any host, localhost included.
 *
 * The bootstrap script is added on mount, not through useHead: it swaps the
 * placeholder for an iframe, and doing that before hydration is a mismatch.
 * It scans the page once, on load. The footer outlives route changes, but a
 * locale switch rebuilds the box (it is keyed on the locale), so after that
 * the box is initialised by hand.
 */
const props = withDefaults(defineProps<{ theme?: 'light' | 'dark' }>(), {
  theme: 'dark',
})

const { locale } = useI18n()

const BUSINESS_UNIT_ID = '5ef2f657ae862c000108c75e'
const TEMPLATE_MINI = '53aa8807dec7e10d38f59f32'

const trustboxLocale = computed(() => (locale.value === 'en' ? 'en-GB' : 'sv-SE'))
const reviewUrl = computed(() =>
  locale.value === 'en'
    ? 'https://uk.trustpilot.com/review/expofy.se'
    : 'https://se.trustpilot.com/review/expofy.se',
)

const SCRIPT_ID = 'trustpilot-bootstrap'
const SCRIPT_SRC = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'

type TrustpilotGlobal = { loadFromElement: (el: HTMLElement, force?: boolean) => void }

const box = ref<HTMLElement | null>(null)

function load() {
  const trustpilot = (window as { Trustpilot?: TrustpilotGlobal }).Trustpilot
  if (trustpilot) {
    if (box.value) trustpilot.loadFromElement(box.value, true)
    return
  }
  // Still loading: its own scan on load will pick the box up.
  if (document.getElementById(SCRIPT_ID)) return
  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.src = SCRIPT_SRC
  script.async = true
  document.head.append(script)
}

onMounted(load)
watch(trustboxLocale, load, { flush: 'post' })
</script>

<template>
  <div
    ref="box"
    :key="trustboxLocale"
    class="trustpilot-widget"
    :data-locale="trustboxLocale"
    :data-template-id="TEMPLATE_MINI"
    :data-businessunit-id="BUSINESS_UNIT_ID"
    data-style-height="96px"
    data-style-width="100%"
    :data-theme="props.theme"
  >
    <!-- Shown until the script swaps in the iframe, and for good if it is
         blocked. -->
    <a :href="reviewUrl" target="_blank" rel="noopener" class="hover:underline">Trustpilot</a>
  </div>
</template>

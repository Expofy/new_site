<script setup lang="ts">
import { contactDetails, footerColumns, legalLinks, partners, socialLinks } from '~/data/navigation'

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()

const year = new Date().getFullYear()

// Stroke paths on a 24px grid, as in AppTopBar; the truck is the same one.
const promiseIcons = {
  lock: ['M5 11h14v10H5z', 'M8 11V7a4 4 0 0 1 8 0v4', 'M12 15v2'],
  truck: [
    'M2 6h12v9H2z',
    'M14 9h4l3 3.5V15h-7',
    'M4 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    'M15 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  ],
  leaf: ['M5 19C5 11 10 5 20 5c0 10-6 15-14 15', 'M5 19l8-8'],
} as const

const promises = [
  { key: 'securePayment', icon: 'lock' },
  { key: 'fastDelivery', icon: 'truck' },
  { key: 'sustainable', icon: 'leaf' },
] as const

// Brand glyphs on a 24px grid. Instagram is drawn in strokes, the other two
// are filled, as the brands draw them.
const socialIcons: Record<(typeof socialLinks)[number]['id'], { d: string[], fill: boolean }> = {
  instagram: {
    d: ['M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5z', 'M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0', 'M17.5 6.5h.01'],
    fill: false,
  },
  linkedin: {
    d: ['M4 9h3.5v11H4z', 'M5.75 3.5a2 2 0 1 1 0 4a2 2 0 0 1 0-4z', 'M10 9h3.4v1.6c.5-.9 1.7-1.9 3.6-1.9 3.1 0 4 2 4 4.7V20h-3.5v-5.9c0-1.4-.3-2.6-1.8-2.6s-2.2 1.1-2.2 2.6V20H10z'],
    fill: true,
  },
  facebook: {
    d: ['M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21z'],
    fill: true,
  },
}
</script>

<template>
  <footer class="on-ink">
    <div class="mx-auto max-w-site px-4 py-12">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <nav
          v-for="column in footerColumns"
          :key="column.id"
          :aria-label="text(column.label)"
        >
          <h2 class="mb-5 text-xl font-semibold uppercase">{{ text(column.label) }}</h2>
          <ul class="space-y-2">
            <li v-for="link in column.links" :key="link.to">
              <NuxtLink :to="localePath(link.to)" class="text-[15px] hover:underline">
                {{ text(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <h2 class="mb-5 text-xl font-semibold uppercase">{{ t('footer.customerService') }}</h2>
          <ul class="space-y-3">
            <li>
              <a :href="`mailto:${contactDetails.email}`" class="flex items-center gap-3 text-[17px] hover:underline">
                <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" stroke-linejoin="round" />
                </svg>
                {{ contactDetails.email }}
              </a>
            </li>
            <li>
              <a :href="contactDetails.phoneHref" class="flex items-center gap-3 text-[17px] hover:underline">
                <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" stroke-linejoin="round" />
                </svg>
                {{ contactDetails.phone }}
              </a>
            </li>
          </ul>

          <p class="mt-5 text-[15px]">
            <strong class="block font-semibold">{{ t('footer.phoneHours') }}</strong>
            {{ text(contactDetails.hours) }}
          </p>
        </div>
      </div>

      <hr class="my-10 border-white/20">

      <!-- Three columns from lg, split by rules: who we support, what
           customers say, how they pay. Below lg they stack. -->
      <div class="grid gap-10 lg:grid-cols-[1.3fr_1fr_1.2fr] lg:gap-0 lg:divide-x lg:divide-white/20">
        <section aria-labelledby="footer-partners-heading" class="lg:pr-8 xl:pr-10">
          <h2 id="footer-partners-heading" class="text-base font-semibold uppercase tracking-wide">{{ t('partners.heading') }}</h2>
          <p class="mt-2 max-w-xs text-sm text-white/80">{{ t('partners.intro') }}</p>
          <ul class="mt-4 flex flex-wrap gap-3">
            <!-- White tiles: both logos carry their own colour field, which
                 reads as a hole cut in the ink without a frame around it. -->
            <li
              v-for="partner in partners"
              :key="partner.id"
              class="flex h-20 w-32 items-center justify-center rounded-lg bg-white p-2.5 lg:max-xl:h-16 lg:max-xl:w-28"
            >
              <img
                :src="partner.logo"
                :alt="partner.name"
                :width="partner.width"
                :height="partner.height"
                loading="lazy"
                class="max-h-full w-auto object-contain"
              >
            </li>
          </ul>
        </section>

        <section aria-labelledby="footer-reviews-heading" class="lg:px-8 xl:px-10">
          <h2 id="footer-reviews-heading" class="text-base font-semibold uppercase tracking-wide">{{ t('footer.reviewsHeading') }}</h2>
          <div class="mt-3 flex items-center gap-5">
            <AppTrustpilotMini class="w-48 min-w-0" />
            <img
              src="/trust/iso-9001-14001.png"
              :alt="t('footer.isoAlt')"
              width="170"
              height="170"
              loading="lazy"
              class="size-20 shrink-0 lg:max-xl:size-16"
            >
          </div>
        </section>

        <section aria-labelledby="footer-payments-heading" class="lg:pl-8 xl:pl-10">
          <h2 id="footer-payments-heading" class="text-base font-semibold uppercase tracking-wide">{{ t('footer.paymentsHeading') }}</h2>
          <p class="mt-2 text-sm text-white/80">{{ t('footer.paymentsIntro') }}</p>
          <img
            src="/trust/betalsatt.png"
            :alt="t('footer.paymentMethodsAlt')"
            width="1000"
            height="125"
            loading="lazy"
            class="mt-4 h-auto w-full max-w-xs"
          >
          <!-- Always three across, split by rules; between lg and xl the column
               is too narrow for icon beside text, so the icon goes on top. -->
          <ul class="mt-5 grid max-w-sm grid-cols-3 divide-x divide-white/20">
            <li
              v-for="promise in promises"
              :key="promise.key"
              class="flex items-center gap-2 px-3 text-xs text-white/80 first:pl-0 lg:max-xl:flex-col lg:max-xl:items-start"
            >
              <svg class="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path v-for="d in promiseIcons[promise.icon]" :key="d" :d="d" />
              </svg>
              <span>{{ t(`footer.promises.${promise.key}`) }}</span>
            </li>
          </ul>
        </section>
      </div>

      <div class="mt-12 flex flex-col items-center gap-6 border-t border-white/20 pt-8 text-sm lg:flex-row lg:justify-between">
        <p class="text-white/80">{{ t('footer.copyright', { year }) }}</p>

        <nav :aria-label="t('footer.legalNav')">
          <ul class="flex flex-wrap justify-center">
            <li v-for="link in legalLinks" :key="link.to" class="border-white/30 px-4 not-first:border-l">
              <NuxtLink :to="localePath(link.to)" class="hover:underline">{{ text(link.label) }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <nav :aria-label="t('footer.socialNav')">
          <ul class="flex items-center gap-5">
            <li v-for="link in socialLinks" :key="link.id">
              <a :href="link.href" target="_blank" rel="noopener" :aria-label="link.name" class="block transition-opacity hover:opacity-70">
                <svg
                  class="size-6"
                  viewBox="0 0 24 24"
                  :fill="socialIcons[link.id].fill ? 'currentColor' : 'none'"
                  :stroke="socialIcons[link.id].fill ? 'none' : 'currentColor'"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path v-for="d in socialIcons[link.id].d" :key="d" :d="d" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

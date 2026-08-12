<script setup lang="ts">
import { contactDetails, footerColumns } from '~/data/navigation'

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()
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

      <!-- Certification and payment marks are not in the Saved Page exports.
           The row is reserved so the layout does not shift when they land. -->
      <div class="flex flex-wrap items-center gap-6 text-sm text-white/70">
        <p>{{ t('site.name') }} AB</p>
      </div>
    </div>
  </footer>
</template>

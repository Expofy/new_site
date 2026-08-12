<script setup lang="ts">
import { contactDetails } from '~/data/navigation'

const { t } = useI18n()
const localePath = useLocalePath()

const sent = ref(false)

// No backend exists yet. The form validates natively and reports a local
// success state so the block is honest about what it does.
function onSubmit() {
  sent.value = true
}
</script>

<template>
  <section class="bg-surface-sunken py-12" aria-labelledby="support-heading">
    <div class="mx-auto grid max-w-site gap-10 px-4 lg:grid-cols-2">
      <div>
        <h2 id="support-heading" class="text-h2 mb-6 text-support">
          {{ t('support.heading') }}
        </h2>
        <h3 class="mb-3 text-lg font-semibold">{{ t('support.contactHeading') }}</h3>
        <p class="mb-6 max-w-prose">{{ t('support.intro') }}</p>

        <ul class="space-y-3">
          <li>
            <a
              :href="contactDetails.phoneHref"
              class="inline-flex items-center gap-3 rounded-full border border-support px-5 py-2 text-support"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M5 4h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" stroke-linejoin="round" />
              </svg>
              {{ contactDetails.phone }}
            </a>
          </li>
          <li>
            <a
              :href="`mailto:${contactDetails.email}`"
              class="inline-flex items-center gap-3 rounded-full border border-support px-5 py-2 text-support"
            >
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" stroke-linejoin="round" />
              </svg>
              {{ contactDetails.email }}
            </a>
          </li>
        </ul>
      </div>

      <div>
        <div class="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h3 class="text-lg font-semibold">{{ t('support.formHeading') }}</h3>
          <p class="text-sm text-ink-muted">{{ t('support.requiredNote') }}</p>
        </div>

        <p v-if="sent" role="status" class="rounded-md bg-brand-tint px-4 py-3 text-brand-deep">
          {{ t('support.sent') }}
        </p>

        <form v-else class="grid gap-4 sm:grid-cols-2" @submit.prevent="onSubmit">
          <div>
            <label for="support-name" class="mb-1 block text-sm font-medium">
              {{ t('support.name') }}
              <span class="text-critical" :title="t('support.required')">*</span>
            </label>
            <input
              id="support-name"
              name="name"
              type="text"
              required
              autocomplete="name"
              class="w-full rounded-md border border-black/10 bg-surface px-3 py-2"
            >
          </div>

          <div>
            <label for="support-email" class="mb-1 block text-sm font-medium">
              {{ t('support.email') }}
              <span class="text-critical" :title="t('support.required')">*</span>
            </label>
            <input
              id="support-email"
              name="email"
              type="email"
              required
              autocomplete="email"
              class="w-full rounded-md border border-black/10 bg-surface px-3 py-2"
            >
          </div>

          <div class="sm:col-span-2">
            <label for="support-message" class="mb-1 block text-sm font-medium">
              {{ t('support.message') }}
              <span class="text-critical" :title="t('support.required')">*</span>
            </label>
            <textarea
              id="support-message"
              name="message"
              required
              rows="5"
              class="w-full rounded-md border border-black/10 bg-surface px-3 py-2"
            />
          </div>

          <p class="text-sm text-ink-muted sm:col-span-2">
            {{ t('support.privacy') }}
            <NuxtLink :to="localePath('/landing/policys')" class="text-brand-strong underline">
              {{ t('support.privacyLink') }}
            </NuxtLink>
          </p>

          <div class="sm:col-span-2">
            <button
              type="submit"
              class="rounded-full bg-brand-strong px-6 py-3 text-white"
            >
              {{ t('support.submit') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

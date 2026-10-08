<script setup lang="ts">
const { t } = useI18n()

const areaKeys = ['design', 'advice', 'largeOrder', 'installation'] as const

const open = ref(false)
const sent = ref(false)
const areas = ref<string[]>([])
const firstArea = ref<HTMLInputElement>()

// A fresh form each time the dialog opens, so a second request does not start
// from the previous one's thank-you message.
watch(open, (isOpen) => {
  if (isOpen) {
    sent.value = false
    areas.value = []
  }
})

// "At least one area" has no native attribute — `required` on a checkbox means
// that one box. The message is set on the first box instead, so the browser's
// own validation reports it in field order with everything else.
watchEffect(() => {
  firstArea.value?.setCustomValidity(areas.value.length ? '' : t('quote.areaRequired'))
})

// No backend exists yet. Same as AppSupportBlock: native validation, then a
// local success state.
function onSubmit() {
  sent.value = true
}

const field = 'w-full rounded-sm border border-black/45 bg-surface-raised px-3 py-1.5 text-ink'
</script>

<template>
  <DialogRoot v-model:open="open">
    <!-- White on support is 5.50:1. Hover darkens rather than lightens, so the
         label only gains contrast — there is no lighter teal token it survives.
         The icons match the label's 20px line box, so the height is unchanged. -->
    <DialogTrigger
      class="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-support px-3 py-2 text-sm font-medium text-white transition hover:brightness-90 active:brightness-90 sm:px-5"
    >
      <svg class="hidden size-5 sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
      {{ t('quote.open') }}
      <svg class="hidden size-5 sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-black/50" />

      <DialogContent
        class="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-surface p-6 text-ink shadow-xl"
      >
        <DialogClose
          class="absolute right-3 top-3 cursor-pointer rounded-md p-2 text-ink"
          :aria-label="t('quote.close')"
        >
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </DialogClose>

        <DialogTitle class="text-h3 mb-1 pr-10 font-bold">{{ t('quote.heading') }}</DialogTitle>
        <DialogDescription class="mb-4 text-sm text-ink-muted">{{ t('support.requiredNote') }}</DialogDescription>

        <p v-if="sent" role="status" class="rounded-md bg-brand-tint px-4 py-3 text-brand-deep">
          {{ t('quote.sent') }}
        </p>

        <form v-else class="grid gap-4" @submit.prevent="onSubmit">
          <fieldset class="grid gap-3 sm:grid-cols-2">
            <legend class="mb-2 font-semibold">
              {{ t('quote.name') }}
              <span class="text-critical" :title="t('support.required')">*</span>
            </legend>
            <div>
              <label for="quote-name" class="mb-1 block text-sm">{{ t('quote.name') }}</label>
              <input id="quote-name" name="name" type="text" required autocomplete="name" :class="field">
            </div>
            <div>
              <label for="quote-company" class="mb-1 block text-sm">{{ t('quote.company') }}</label>
              <input id="quote-company" name="company" type="text" autocomplete="organization" :class="field">
            </div>
          </fieldset>

          <div class="grid gap-3 sm:grid-cols-2">
            <div>
              <label for="quote-email" class="mb-1 block font-semibold">
                {{ t('quote.email') }}
                <span class="text-critical" :title="t('support.required')">*</span>
              </label>
              <input id="quote-email" name="email" type="email" required autocomplete="email" :class="field">
            </div>
            <div>
              <label for="quote-phone" class="mb-1 block font-semibold">{{ t('quote.phone') }}</label>
              <input id="quote-phone" name="phone" type="tel" autocomplete="tel" :class="field">
            </div>
          </div>

          <fieldset class="grid gap-3 sm:grid-cols-2">
            <legend class="mb-2 font-semibold">
              {{ t('quote.address') }}
              <span class="text-critical" :title="t('support.required')">*</span>
            </legend>
            <div class="sm:col-span-2">
              <label for="quote-street" class="mb-1 block text-sm">{{ t('quote.street') }}</label>
              <input id="quote-street" name="street" type="text" required autocomplete="street-address" :class="field">
            </div>
            <div>
              <label for="quote-city" class="mb-1 block text-sm">{{ t('quote.city') }}</label>
              <input id="quote-city" name="city" type="text" required autocomplete="address-level2" :class="field">
            </div>
            <div>
              <label for="quote-postcode" class="mb-1 block text-sm">{{ t('quote.postcode') }}</label>
              <input id="quote-postcode" name="postcode" type="text" required autocomplete="postal-code" :class="field">
            </div>
          </fieldset>

          <fieldset>
            <legend class="mb-2 font-semibold">
              {{ t('quote.area') }}
              <span class="text-critical" :title="t('support.required')">*</span>
            </legend>
            <ul class="grid gap-x-6 gap-y-1 sm:grid-cols-2">
              <li v-for="(key, index) in areaKeys" :key="key">
                <label class="inline-flex cursor-pointer items-center gap-2">
                  <input
                    :ref="(el) => { if (index === 0) firstArea = el as HTMLInputElement }"
                    v-model="areas"
                    type="checkbox"
                    name="areas"
                    :value="key"
                    class="size-4 accent-brand-strong"
                  >
                  {{ t(`quote.areas.${key}`) }}
                </label>
              </li>
            </ul>
          </fieldset>

          <div>
            <label for="quote-message" class="mb-1 block font-semibold">{{ t('quote.message') }}</label>
            <textarea id="quote-message" name="message" rows="3" :class="field" />
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="cursor-pointer rounded-md bg-brand-strong px-6 py-2.5 text-white transition-colors hover:bg-brand-deep active:bg-brand-deep"
            >
              {{ t('quote.submit') }}
            </button>
          </div>
        </form>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

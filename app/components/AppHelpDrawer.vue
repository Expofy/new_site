<script setup lang="ts">
import { faqEntries } from '~/data/faq'
import { contactDetails } from '~/data/navigation'
import type { FaqCategory, FaqEntry } from '~/types/faq'

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()
const route = useRoute()

const open = ref(false)
const sent = ref(false)

/**
 * Which screen the drawer shows. The FAQ is a list of questions and then one
 * answer, as on the live site, rather than an accordion squeezed into a panel
 * this narrow.
 */
const view = ref<'contact' | 'faq' | 'answer'>('contact')
const entry = ref<FaqEntry>()
const title = ref<{ $el: HTMLElement }>()
const question = ref<HTMLElement>()

const categories: FaqCategory[] = ['order', 'design', 'delivery']
const groups = computed(() => categories
  .map(id => ({ id, entries: faqEntries.filter(e => e.category === id) }))
  .filter(group => group.entries.length))

// An answer keeps the list's title: a question is too long for the header.
const heading = computed(() => view.value === 'contact' ? t('help.heading') : t('help.faqHeading'))

// Every opening starts on the first screen with a fresh form.
watch(open, (isOpen) => {
  if (isOpen) {
    view.value = 'contact'
    entry.value = undefined
    sent.value = false
  }
})

// An answer's "read more" navigates, and the drawer must not survive that.
watch(() => route.fullPath, () => {
  open.value = false
})

/**
 * Switching screens removes the button that had focus, which would drop focus
 * to <body>. It goes to the new screen's heading instead — the dialog's title,
 * or on an answer the question — so a screen reader announces where the user
 * has landed.
 */
async function show(next: typeof view.value, picked?: FaqEntry) {
  view.value = next
  entry.value = picked
  await nextTick()
  const target = next === 'answer' ? question.value : title.value?.$el
  target?.focus()
}

function back() {
  show(view.value === 'answer' ? 'faq' : 'contact')
}

// No backend exists yet. Same as AppQuoteRequest: native validation, then a
// local success state.
function onSubmit() {
  sent.value = true
}

const field = 'w-full rounded-sm border border-black/45 bg-surface-raised px-3 py-1.5 text-ink'
</script>

<template>
  <DialogRoot v-model:open="open">
    <!-- On every page, so it lives in the layout, last in the DOM: it is
         reached after the footer by Tab, which is where its contents — contact
         details, a form — sit on a page anyway.

         Vertical text, read top to bottom. The writing mode is on a span, not
         the button: Chrome rotates a button's text but still sizes the button
         as if it were horizontal, which made the tab as wide as the word.
         White on `brand-strong` is 5.46:1. z-20 keeps it under the sticky nav
         (z-30) and its mega panels. -->
    <DialogTrigger
      class="fixed right-0 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-l-md bg-brand-strong px-2 py-4 text-sm font-semibold leading-none tracking-wide text-white shadow-sm transition-colors hover:bg-brand-deep active:bg-brand-deep print:hidden"
    >
      <span class="block [writing-mode:vertical-rl]">{{ t('help.tab') }}</span>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-black/50" />

      <DialogContent
        class="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface text-ink shadow-xl"
        :aria-describedby="undefined"
      >
        <div class="flex shrink-0 items-center gap-3 border-b border-black/10 px-6 py-3">
          <button
            v-if="view !== 'contact'"
            type="button"
            class="-ml-2 cursor-pointer rounded-md p-2 text-ink transition-colors hover:text-brand-deep"
            :aria-label="t('help.back')"
            @click="back"
          >
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M20 12H5M11 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <DialogTitle ref="title" tabindex="-1" class="text-h3 min-w-0 flex-1 font-bold focus:outline-hidden">
            {{ heading }}
          </DialogTitle>

          <DialogClose
            class="shrink-0 cursor-pointer rounded-md bg-ink p-2 text-white transition-colors hover:bg-brand-deep"
            :aria-label="t('help.close')"
          >
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </DialogClose>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-5">
          <!-- ── Contact ─────────────────────────────────────────────────── -->
          <template v-if="view === 'contact'">
            <i18n-t keypath="help.contact" tag="p" scope="global" class="text-sm leading-relaxed">
              <template #hours>
                <strong class="font-semibold">{{ text(contactDetails.hours) }}</strong>
              </template>
              <template #phone>
                <a :href="contactDetails.phoneHref" class="text-brand-strong underline hover:text-brand-deep">{{ contactDetails.phone }}</a>
              </template>
              <template #email>
                <a :href="`mailto:${contactDetails.email}`" class="text-brand-strong underline hover:text-brand-deep">{{ contactDetails.email }}</a>
              </template>
            </i18n-t>

            <!-- A button, not a link: it changes the drawer's screen, it does
                 not go anywhere. `ink` on `brand-tint` is 10.58:1. -->
            <button
              type="button"
              class="mt-4 flex w-full cursor-pointer items-center gap-4 rounded-md border border-brand/30 bg-brand-tint px-4 py-2.5 text-left font-semibold transition-colors hover:border-brand"
              @click="show('faq')"
            >
              <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-strong text-white" aria-hidden="true">?</span>
              <span class="flex-1">{{ t('help.faqLink') }}</span>
              <svg class="size-4 shrink-0 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <div class="mb-3 mt-5 flex flex-wrap items-baseline justify-between gap-2">
              <h3 class="text-lg font-semibold">{{ t('support.formHeading') }}</h3>
              <p class="text-sm text-ink-muted">{{ t('support.requiredNote') }}</p>
            </div>

            <p v-if="sent" role="status" class="rounded-md bg-brand-tint px-4 py-3 text-brand-deep">
              {{ t('support.sent') }}
            </p>

            <!-- Two columns for the four short fields, three rows for the
                 message: the whole first screen fits a 650px-tall viewport
                 without scrolling, which is a laptop with its browser chrome. -->
            <form v-else class="grid grid-cols-2 gap-3" @submit.prevent="onSubmit">
              <div>
                <label for="help-name" class="mb-1 block text-sm font-medium">{{ t('support.name') }}</label>
                <input id="help-name" name="name" type="text" autocomplete="name" :class="field">
              </div>
              <div>
                <label for="help-company" class="mb-1 block text-sm font-medium">{{ t('support.company') }}</label>
                <input id="help-company" name="company" type="text" autocomplete="organization" :class="field">
              </div>
              <div>
                <label for="help-email" class="mb-1 block text-sm font-medium">
                  {{ t('support.email') }}
                  <span class="text-critical" :title="t('support.required')">*</span>
                </label>
                <input id="help-email" name="email" type="email" required autocomplete="email" :class="field">
              </div>
              <div>
                <label for="help-phone" class="mb-1 block text-sm font-medium">{{ t('support.phone') }}</label>
                <input id="help-phone" name="phone" type="tel" autocomplete="tel" :class="field">
              </div>
              <div class="col-span-2">
                <label for="help-message" class="mb-1 block text-sm font-medium">
                  {{ t('support.message') }}
                  <span class="text-critical" :title="t('support.required')">*</span>
                </label>
                <p id="help-message-hint" class="mb-1.5 text-sm text-ink-muted">{{ t('support.messageHint') }}</p>
                <textarea id="help-message" name="message" required rows="3" aria-describedby="help-message-hint" :class="field" />
              </div>

              <!-- The consent note beside the button, not above it, and first in
                 the DOM, so it is read — and its link tabbed to — before the
                 button that acts on it, in the same order it is seen. -->
              <div class="col-span-2 flex items-center justify-between gap-4">
                <p class="text-sm text-ink-muted">
                  {{ t('support.privacy') }}
                  <NuxtLink :to="localePath('/landing/policys')" class="text-brand-strong underline hover:text-brand-deep">
                    {{ t('support.privacyLink') }}
                  </NuxtLink>
                </p>

                <button
                  type="submit"
                  class="shrink-0 cursor-pointer rounded-full bg-brand-strong px-6 py-2.5 font-medium text-white transition-colors hover:bg-brand-deep active:bg-brand-deep"
                >
                  {{ t('support.submit') }}
                </button>
              </div>
            </form>
          </template>

          <!-- ── FAQ list ────────────────────────────────────────────────── -->
          <template v-else-if="view === 'faq'">
            <section v-for="group in groups" :key="group.id" class="mb-6 last:mb-0" :aria-labelledby="`help-faq-${group.id}`">
              <h3 :id="`help-faq-${group.id}`" class="mb-1 font-semibold text-brand-deep">
                {{ t(`help.categories.${group.id}`) }}
              </h3>
              <ul>
                <li v-for="item in group.entries" :key="item.id" class="border-b border-black/10 last:border-b-0">
                  <button
                    type="button"
                    class="flex w-full cursor-pointer items-center justify-between gap-3 py-3 text-left transition-colors hover:text-brand-strong"
                    @click="show('answer', item)"
                  >
                    {{ text(item.question) }}
                    <svg class="size-4 shrink-0 text-ink-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </li>
              </ul>
            </section>
          </template>

          <!-- ── One answer ──────────────────────────────────────────────── -->
          <template v-else-if="entry">
            <h3 ref="question" tabindex="-1" class="mb-3 text-lg font-semibold focus:outline-hidden">
              {{ text(entry.question) }}
            </h3>
            <p class="leading-relaxed text-ink-muted">{{ text(entry.answer) }}</p>
            <NuxtLink
              v-if="entry.link"
              :to="localePath(entry.link.to)"
              class="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-strong underline hover:text-brand-deep"
            >
              {{ text(entry.link.label) }}
              <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink>
          </template>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

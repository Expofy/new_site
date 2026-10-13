<script setup lang="ts">
import { faqEntries } from '~/data/faq'
import type { BandBackground } from '~/types/band'

withDefaults(defineProps<{ bg?: BandBackground }>(), { bg: 'raised' })

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()

const helpPoints = ['fast', 'personal', 'quote'] as const
</script>

<template>
  <!-- `surface-raised`, so the white question cards and the white customer
       logo band above both stay distinct from it. -->
  <AppBand :bg="bg" aria-labelledby="faq-heading">
    <div class="mx-auto grid max-w-site gap-8 px-gutter lg:grid-cols-[1.3fr_1fr]">
      <div>
        <div class="mb-stack">
          <h2 id="faq-heading" class="text-h2 font-semibold">
            {{ t('faq.heading') }}
          </h2>
          <p class="mt-1 text-lg text-ink-muted">
            {{ t('faq.subheading') }}
          </p>
        </div>

        <!-- APG accordion: each question is a button inside an h3. `multiple`,
             so a reader can keep two answers open to compare them. Closed
             answers stay in the DOM as `hidden="until-found"` rather than
             unmounting, so they are in the server HTML for crawlers and the
             browser's find-in-page opens the one it matches. -->
        <AccordionRoot as="ul" type="multiple" :unmount-on-hide="false" class="space-y-3">
          <!-- The card border is 1.25:1 decoration, not the control's
               boundary: the question and the chevron identify the button. -->
          <AccordionItem
            v-for="entry in faqEntries"
            :key="entry.id"
            as="li"
            :value="entry.id"
            class="rounded-md border border-black/10 bg-surface shadow-sm transition-colors hover:border-brand"
          >
            <!-- `aria-controls` is set here because reka-ui leaves it empty:
                 it names the panel only after the trigger has rendered, and
                 does not re-render the trigger. It points at the answer's own
                 div, since the panel's id is reka's and cannot be set. -->
            <AccordionHeader as="h3">
              <AccordionTrigger
                :aria-controls="`faq-answer-${entry.id}`"
                class="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-md px-5 py-4 text-left font-medium text-ink sm:px-8"
              >
                {{ text(entry.question) }}
                <svg class="size-4 shrink-0 transition-transform duration-150 group-data-[state=open]:rotate-180 motion-reduce:transition-none" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </AccordionTrigger>
            </AccordionHeader>

            <!-- Padding on the inner div, not on the panel: `until-found`
                 hides by `content-visibility`, which keeps the panel's own
                 padding on screen under a closed question. -->
            <AccordionContent>
              <div :id="`faq-answer-${entry.id}`" class="px-5 pb-5 sm:px-8">
                <p class="max-w-prose text-ink-muted">{{ text(entry.answer) }}</p>
                <NuxtLink
                  v-if="entry.link"
                  :to="localePath(entry.link.to)"
                  class="mt-2 inline-block font-medium text-brand-strong underline underline-offset-4 hover:text-brand-deep"
                >
                  {{ text(entry.link.label) }}
                </NuxtLink>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>

      <!-- The photo sits beside the text only when the card itself is wide
           enough for both; otherwise it is left out, because it is decoration
           and a 356px-tall picture under the button on a phone pushes the
           next block a screen further down. The card decides by its own width,
           not the viewport's: it is half a row from lg and a full row below. -->
      <div class="@container rounded-md border border-brand-tint bg-brand-tint/50">
        <div class="grid h-full @min-[35rem]:grid-cols-[1fr_auto]">
          <div class="p-card @min-[35rem]:pr-4">
            <p class="text-sm font-semibold uppercase tracking-wide text-brand-strong">
              {{ t('faq.help.eyebrow') }}
            </p>
            <h3 class="mt-2 text-h3 font-semibold text-ink">
              {{ t('faq.help.heading') }}
            </h3>
            <p class="mt-3 text-ink-muted">
              {{ t('faq.help.text') }}
            </p>

            <ul class="mt-4 space-y-2">
              <li v-for="point in helpPoints" :key="point" class="flex items-center gap-3 text-ink">
                <span class="grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand-strong" aria-hidden="true">
                  <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="m5 12.5 4.5 4.5L19 7.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                {{ t(`faq.help.points.${point}`) }}
              </li>
            </ul>

            <!-- Same pill as the showroom teaser's: hover to `brand-deep`,
                 since white on lighter `brand` is 4.40:1. -->
            <NuxtLink
              :to="localePath('/landing/kontakta-oss')"
              class="group mt-6 inline-flex items-center gap-3 rounded-full bg-brand-strong px-8 py-3 font-medium text-white transition-colors hover:bg-brand-deep active:brightness-90"
            >
              {{ t('faq.help.cta') }}
              <svg class="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M4 12h15M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink>
          </div>

          <!-- alt="": decoration, the heading beside it says what it means.
               Its left and top edges fade into the card, because the crop
               ends in a hard edge through the monitor in the foreground. It
               rounds its own corner, so the card needs no `overflow-hidden`
               that could clip the button's focus ring. -->
          <img
            src="/faq/support.webp"
            alt=""
            width="236"
            height="356"
            loading="lazy"
            class="hidden self-end rounded-br-md [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,#000_35%),linear-gradient(transparent,#000_15%)] @min-[35rem]:block"
          >
        </div>
      </div>
    </div>
  </AppBand>
</template>

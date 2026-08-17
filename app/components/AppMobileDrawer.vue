<script setup lang="ts">
import { mainNav } from '~/data/navigation'

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()

const open = ref(false)
const route = useRoute()

// Close on navigation so the drawer never survives a route change.
watch(() => route.fullPath, () => {
  open.value = false
})
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger
      class="flex cursor-pointer items-center gap-2 rounded-md p-2 text-ink lg:hidden"
      :aria-label="t('nav.openMenu')"
    >
      <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
      </svg>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-black/50" />

      <!-- Full-bleed panel, matching the Saved Page's mobile menu: it covers the
           header rather than sitting beside it, which is why it carries its own
           logo, cart and search row — none of the real ones are reachable while
           it is open. The reference puts the close control outside the panel; it
           is inside here so the hit area and focus order stay predictable. -->
      <DialogContent
        class="fixed inset-0 z-50 flex h-dvh w-full flex-col bg-surface text-ink"
      >
        <DialogTitle class="sr-only">{{ t('nav.menu') }}</DialogTitle>
        <DialogDescription class="sr-only">{{ t('nav.primary') }}</DialogDescription>

        <div class="shrink-0 bg-surface-header px-4 py-3">
          <div class="flex items-center gap-3">
            <DialogClose
              class="cursor-pointer rounded-md p-2 text-ink"
              :aria-label="t('nav.closeMenu')"
            >
              <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
              </svg>
            </DialogClose>

            <AppLogo class="mx-auto" />
            <AppCartSummary />
          </div>

          <!-- Second instance of the field. See AppSearchField for why it takes
               its own id and drops the search landmark. -->
          <div class="mt-3">
            <AppSearchField id="drawer-search" :landmark="false" />
          </div>
        </div>

        <nav :aria-label="t('nav.primary')" class="flex-1 overflow-y-auto pb-8">
          <!-- One accordion for the whole menu, not one per item: `type="single"`
               keeps a single section open, so a long panel like Produkter cannot
               be stacked under another one and scrolled past. -->
          <AccordionRoot as="ul" type="single" collapsible>
            <template v-for="item in mainNav" :key="item.id">
              <AccordionItem v-if="item.panel" as="li" :value="item.id">
                <!-- h2, not the primitive's default h3: the page's h1 is the
                     only heading above this, and a skipped level is a 1.3.1
                     failure. -->
                <AccordionHeader as="h2">
                  <AccordionTrigger
                    class="on-ink group flex w-full cursor-pointer items-center justify-between gap-3 border-t border-white/20 px-4 py-4 text-left text-sm font-semibold uppercase tracking-wide"
                  >
                    {{ text(item.label) }}
                    <svg class="size-3 shrink-0 transition-transform duration-150 group-data-[state=open]:rotate-180" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                    </svg>
                  </AccordionTrigger>
                </AccordionHeader>

                <AccordionContent>
                  <NuxtLink
                    v-if="item.panel.seeAll"
                    :to="localePath(item.panel.seeAll.to)"
                    class="flex items-center gap-2 px-4 py-3 font-medium text-brand-deep underline underline-offset-4"
                  >
                    {{ text(item.panel.seeAll.label) }}
                    <svg class="size-3.5" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </NuxtLink>

                  <!-- The panel's columns flatten into one scrolling list, walked
                       in the order they are declared — so what reads down a
                       desktop column reads down the drawer in the same order. -->
                  <div v-for="column in item.panel.columns" :key="column.id" class="pb-2">
                    <p
                      v-if="column.heading"
                      :id="`drawer-column-${column.id}`"
                      class="px-4 pb-2 pt-3 font-semibold uppercase tracking-wide text-support"
                    >
                      <NuxtLink v-if="column.heading.to" :to="localePath(column.heading.to)">
                        {{ text(column.heading.label) }}
                      </NuxtLink>
                      <template v-else>{{ text(column.heading.label) }}</template>
                    </p>

                    <ul
                      :aria-labelledby="column.heading ? `drawer-column-${column.id}` : undefined"
                      :aria-label="column.heading ? undefined : text(item.panel.heading)"
                    >
                      <li v-for="link in column.items" :key="link.to">
                        <NuxtLink
                          :to="localePath(link.to)"
                          class="flex items-center gap-4 px-4 py-2 text-ink"
                        >
                          <!-- alt="" — the label beside it is the link's name. -->
                          <img
                            v-if="item.panel.variant === 'image' && link.image"
                            :src="link.image"
                            alt=""
                            width="150"
                            height="150"
                            loading="lazy"
                            class="size-14 shrink-0 rounded-sm border border-black/10 bg-surface object-contain"
                          >
                          <span>{{ text(link.label) }}</span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <li v-else>
                <NuxtLink
                  :to="localePath(item.to!)"
                  class="on-ink block border-t border-white/20 px-4 py-4 text-sm font-semibold uppercase tracking-wide"
                >
                  {{ text(item.label) }}
                </NuxtLink>
              </li>
            </template>

            <li>
              <NuxtLink
                :to="localePath('/account/orders')"
                class="on-ink block border-t border-white/20 px-4 py-4 text-sm font-semibold uppercase tracking-wide"
              >
                {{ t('nav.account') }}
              </NuxtLink>
            </li>
          </AccordionRoot>
        </nav>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

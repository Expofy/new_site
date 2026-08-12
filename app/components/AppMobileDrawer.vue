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
      class="flex items-center gap-2 rounded-md p-2 text-ink lg:hidden"
      :aria-label="t('nav.openMenu')"
    >
      <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
      </svg>
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-40 bg-black/50" />

      <!-- Right-anchored panel capped at 300px, matching the Saved Page.
           The reference puts the close control outside the panel; it is inside
           here so the hit area and focus order stay predictable. -->
      <DialogContent
        class="on-ink fixed right-0 top-0 z-50 flex h-dvh w-[min(100vw-2.5rem,300px)] flex-col overflow-y-auto"
      >
        <DialogTitle class="sr-only">{{ t('nav.menu') }}</DialogTitle>
        <DialogDescription class="sr-only">{{ t('nav.primary') }}</DialogDescription>

        <DialogClose
          class="m-3 self-start rounded-md p-2 text-white"
          :aria-label="t('nav.closeMenu')"
        >
          <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </DialogClose>

        <nav :aria-label="t('nav.primary')" class="pb-8">
          <ul>
            <li v-for="item in mainNav" :key="item.id" class="border-t border-white/15">
              <AccordionRoot v-if="item.groups" type="single" collapsible>
                <AccordionItem :value="item.id">
                  <AccordionHeader>
                    <AccordionTrigger
                      class="flex w-full items-center justify-between px-4 py-4 text-left text-sm uppercase tracking-wide text-white"
                    >
                      {{ text(item.label) }}
                      <svg class="size-3 shrink-0" viewBox="0 0 12 12" aria-hidden="true">
                        <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                      </svg>
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent class="pb-2">
                    <div v-for="group in item.groups" :key="text(group.label)" class="px-4 pb-3">
                      <p class="mb-2 text-xs uppercase tracking-wide text-white/60">
                        {{ text(group.label) }}
                      </p>
                      <ul class="space-y-1">
                        <li v-for="link in group.links" :key="link.to">
                          <NuxtLink :to="localePath(link.to)" class="block py-1 text-white">
                            {{ text(link.label) }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </AccordionRoot>

              <NuxtLink
                v-else
                :to="localePath(item.to!)"
                class="block px-4 py-4 text-sm uppercase tracking-wide text-white"
              >
                {{ text(item.label) }}
              </NuxtLink>
            </li>

            <li class="border-t border-white/15">
              <NuxtLink
                :to="localePath('/account/orders')"
                class="block px-4 py-4 text-sm uppercase tracking-wide text-white"
              >
                {{ t('nav.account') }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

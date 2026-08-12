<script setup lang="ts">
import { mainNav } from '~/data/navigation'

const { t } = useI18n()
const localePath = useLocalePath()
const text = useLocalizedText()
</script>

<template>
  <!-- .on-ink flips the focus ring to white; brand pink is 2.92:1 here and
       fails the 3:1 non-text bar. See docs/DESIGN-TOKENS.md. -->
  <div class="on-ink hidden lg:block">
    <div class="mx-auto flex max-w-site items-center justify-between px-4">
      <NavigationMenuRoot :aria-label="t('nav.primary')" class="relative">
        <NavigationMenuList class="flex items-center gap-1">
          <NavigationMenuItem v-for="item in mainNav" :key="item.id" :value="item.id">
            <template v-if="item.groups">
              <NavigationMenuTrigger
                class="flex items-center gap-1 px-3 py-3 text-sm uppercase tracking-wide text-white hover:underline data-[state=open]:underline"
              >
                {{ text(item.label) }}
                <svg class="size-3" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                </svg>
              </NavigationMenuTrigger>

              <NavigationMenuContent
                class="absolute left-0 top-full z-40 w-full bg-surface text-ink shadow-lg"
              >
                <div class="mx-auto grid max-w-site grid-cols-2 gap-8 p-8 xl:grid-cols-4">
                  <div v-for="group in item.groups" :key="text(group.label)">
                    <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-support">
                      {{ text(group.label) }}
                    </p>
                    <ul class="space-y-2">
                      <li v-for="link in group.links" :key="link.to">
                        <NavigationMenuLink as-child>
                          <NuxtLink :to="localePath(link.to)" class="text-brand-deep hover:underline">
                            {{ text(link.label) }}
                          </NuxtLink>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </NavigationMenuContent>
            </template>

            <NavigationMenuLink v-else as-child>
              <NuxtLink
                :to="localePath(item.to!)"
                class="block px-3 py-3 text-sm uppercase tracking-wide text-white hover:underline"
              >
                {{ text(item.label) }}
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenuRoot>

      <NuxtLink
        :to="localePath('/account/orders')"
        class="flex items-center gap-2 px-3 py-3 text-sm uppercase tracking-wide text-white hover:underline"
      >
        <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20a7 7 0 0 1 14 0" stroke-linecap="round" />
        </svg>
        {{ t('nav.account') }}
      </NuxtLink>
    </div>
  </div>
</template>

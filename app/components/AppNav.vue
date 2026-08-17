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
      <NavigationMenuRoot :aria-label="t('nav.primary')">
        <NavigationMenuList class="flex items-center gap-1">
          <NavigationMenuItem v-for="item in mainNav" :key="item.id" :value="item.id">
            <template v-if="item.panel">
              <NavigationMenuTrigger
                class="group flex cursor-pointer items-center gap-1 px-3 py-3 text-sm uppercase tracking-wide text-white hover:underline data-[state=open]:underline"
              >
                {{ text(item.label) }}
                <svg class="size-3 transition-transform duration-150 group-data-[state=open]:rotate-180" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M2 4.5 6 8.5l4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
                </svg>
              </NavigationMenuTrigger>

              <!-- reka-ui only teleports NavigationMenuContent when a
                   NavigationMenuViewport exists, and there is none here, so the
                   panel stays inside its item. It cannot be positioned against
                   the site container either: reka-ui wraps the menu list in its
                   own `position: relative` div, and that wrapper — not this
                   component's markup — is the containing block. Its left edge is
                   the container's left edge, so `left-0` lands correctly and
                   only the width has to be restated: the site container, minus
                   its own px-4, exactly as the header computes it.
                   A11Y-01: the panel is a light surface living inside the dark
                   band, and custom properties inherit by DOM position — so
                   without this it would keep .on-ink's white focus ring and
                   draw white-on-white, 1:1. It opts out of the band's focus
                   colour the same way it already opts out of its background. -->
              <NavigationMenuContent
                class="absolute left-0 top-full z-40 w-[calc(min(var(--container-site),100vw)-2rem)] bg-surface text-ink shadow-lg [--color-focus:var(--color-brand)]"
              >
                <div class="px-card py-card">
                  <div class="mb-8 flex flex-wrap items-baseline gap-x-8 gap-y-2">
                    <p :id="`nav-panel-${item.id}`" class="text-h4 font-semibold uppercase text-support">
                      {{ text(item.panel.heading) }}
                    </p>

                    <NavigationMenuLink v-if="item.panel.seeAll" as-child>
                      <NuxtLink
                        :to="localePath(item.panel.seeAll.to)"
                        class="inline-flex items-center gap-2 font-medium text-brand-deep underline underline-offset-4 hover:no-underline"
                      >
                        {{ text(item.panel.seeAll.label) }}
                        <svg class="size-3.5" viewBox="0 0 12 12" aria-hidden="true">
                          <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </NuxtLink>
                    </NavigationMenuLink>
                  </div>

                  <div
                    class="nav-panel-grid gap-x-8 gap-y-6"
                    :style="{ '--nav-columns': item.panel.columns.length }"
                  >
                    <div
                      v-for="(column, index) in item.panel.columns"
                      :key="column.id"
                      :class="item.panel.variant === 'list' && index > 0 ? 'border-l border-black/10 pl-8' : undefined"
                    >
                      <p
                        v-if="column.heading"
                        :id="`nav-column-${column.id}`"
                        class="mb-4 font-semibold uppercase tracking-wide text-support"
                      >
                        <NavigationMenuLink v-if="column.heading.to" as-child>
                          <NuxtLink :to="localePath(column.heading.to)" class="hover:underline">
                            {{ text(column.heading.label) }}
                          </NuxtLink>
                        </NavigationMenuLink>
                        <template v-else>{{ text(column.heading.label) }}</template>
                      </p>

                      <!-- Every list is named: by its own column heading where
                           there is one, and by the panel heading otherwise, so
                           an image column is never an unlabelled list of links. -->
                      <ul
                        :aria-labelledby="column.heading ? `nav-column-${column.id}` : `nav-panel-${item.id}`"
                        :class="item.panel.variant === 'image' ? 'space-y-3' : undefined"
                      >
                        <li v-for="link in column.items" :key="link.to">
                          <NavigationMenuLink as-child>
                            <!-- py-1: as an inline box a text link is only as
                                 tall as its glyphs, which is under the 24x24
                                 target of WCAG 2.2 SC 2.5.8. The padding makes
                                 the box 32px and, in the list panels, supplies
                                 the row rhythm the `space-y` used to. -->
                            <NuxtLink
                              :to="localePath(link.to)"
                              class="flex items-center gap-4 py-1 text-ink hover:underline"
                            >
                              <!-- alt="" — the tile repeats the label beside it,
                                   and the label is the link's accessible name.
                                   Every source is a 150x150 square, so the
                                   intrinsic box is stated once here. -->
                              <img
                                v-if="item.panel.variant === 'image' && link.image"
                                :src="link.image"
                                alt=""
                                width="150"
                                height="150"
                                loading="lazy"
                                class="size-16 shrink-0 rounded-sm border border-black/10 bg-surface object-contain"
                              >
                              <span>{{ text(link.label) }}</span>
                            </NuxtLink>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </div>
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

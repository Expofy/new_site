<script setup lang="ts">
const { t } = useI18n()

// Stroke paths on a 24px grid. Circles are written as two arcs so every icon
// is one list of `d` strings and the template needs no per-icon markup.
const icons = {
  truck: [
    'M2 6h12v9H2z',
    'M14 9h4l3 3.5V15h-7',
    'M4 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    'M15 17a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  ],
  diamond: [
    'M6 4h12l3 5-9 11L3 9z',
    'M3 9h18',
    'M9 4l-1 5 4 11 4-11-1-5',
  ],
  people: [
    'M9 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
    'M6.5 20a5.5 5.5 0 0 1 11 0',
    'M2.5 10a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    'M17.5 10a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
    'M1.5 18a3.5 3.5 0 0 1 4.5-3.3M22.5 18a3.5 3.5 0 0 0-4.5-3.3',
  ],
} as const

const promises = [
  { key: 'delivery', icon: 'truck' },
  { key: 'quality', icon: 'diamond' },
  { key: 'experts', icon: 'people' },
] as const
</script>

<template>
  <!-- Below lg only the bold titles show, smaller and without dividers, so the
       three fit a 360px phone; on anything narrower they wrap rather than
       scroll. The full lines need 928px with `px-4` between items, and a
       1024px viewport leaves the row 944px; `px-6` would need 960, so it waits
       for xl. The row may still wrap at lg: with WCAG 1.4.12 text spacing it
       needs ~1160px, and nowrap would scroll the page sideways. -->
  <div class="bg-surface">
    <div class="mx-auto flex max-w-site items-center justify-center px-4 py-2 text-xs lg:px-gutter lg:text-sm">
      <ul class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 lg:gap-x-0 lg:divide-x lg:divide-black/15">
        <li v-for="item in promises" :key="item.key" class="flex items-center gap-1.5 lg:gap-2 lg:px-4 xl:px-6 lg:first:pl-0 lg:last:pr-0">
          <svg class="size-4 shrink-0 text-support lg:size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path v-for="d in icons[item.icon]" :key="d" :d="d" />
          </svg>
          <span class="whitespace-nowrap">
            <!-- Vue condenses the whitespace between two elements on separate
                 lines away, so the space between title and text is explicit. -->
            <span class="font-semibold">{{ t(`topBar.${item.key}.title`) }}</span>{{ ' ' }}
            <span class="hidden text-ink-muted lg:inline">{{ t(`topBar.${item.key}.text`) }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

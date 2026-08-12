<script setup lang="ts">
import { partners } from '~/data/navigation'

const { t } = useI18n()
</script>

<template>
  <section class="bg-surface py-8" :aria-label="t('partners.heading')">
    <div class="mx-auto max-w-site px-4">
      <h2 class="mb-4 text-lg font-semibold">{{ t('partners.heading') }}</h2>
      <ul class="flex flex-wrap gap-4">
        <!-- Partner logos are not present in the Saved Page exports; the name
             stands in until real assets are supplied. -->
        <li
          v-for="partner in partners"
          :key="partner.id"
          class="flex h-20 w-32 items-center justify-center rounded-sm border border-black/10 bg-surface px-3 text-center text-sm text-ink-muted"
        >
          {{ partner.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

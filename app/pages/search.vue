<script setup lang="ts">
// Placeholder so the header search field resolves somewhere real. Product
// search lands with the category/search template in Phase 3.
const { t } = useI18n()
const route = useRoute()

const query = computed(() => String(route.query.q ?? '').trim())
</script>

<template>
  <div class="mx-auto max-w-site px-4 py-12">
    <h1 class="text-h1 mb-6">
      {{ query ? t('search.resultsFor', { query }) : t('search.label') }}
    </h1>

    <p v-if="!query" class="text-ink-muted">{{ t('search.noQuery') }}</p>

    <div v-else class="rounded-md bg-surface-raised p-8">
      <p class="mb-2 font-medium">{{ t('search.empty') }}</p>
      <p class="text-ink-muted">{{ t('search.emptyHint') }}</p>
    </div>
  </div>
</template>

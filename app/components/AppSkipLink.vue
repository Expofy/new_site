<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <!-- Visually hidden until focused, then pinned to the top-left. -->
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-brand-deep focus:shadow-lg"
  >
    {{ t('nav.skipToContent') }}
  </a>
</template>

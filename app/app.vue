<script setup lang="ts">
// Sets <html lang> plus hreflang/canonical alternates from the active locale.
// Without this the page has no language declaration (WCAG 3.1.1).
const head = useLocaleHead()
useHead(head)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

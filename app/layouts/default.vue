<template>
  <div class="flex min-h-dvh flex-col">
    <AppSkipLink />
    <AppHeader />
    <!-- A sibling of the header, not inside it: sticky only holds an element
         within its parent's box, and the header ends right under the band. -->
    <AppNav />

    <main id="main-content" tabindex="-1" class="flex-1">
      <slot />
    </main>

    <!-- Footer stack: closes all 14 Saved Pages, in this order.
         See docs/COMPONENT-INVENTORY.md. -->
    <AppPartnerStrip />
    <AppSupportBlock />
    <AppFooter />
  </div>
</template>

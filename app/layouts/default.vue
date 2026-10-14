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

    <!-- The Saved Pages close with a partner strip, a support block and the
         footer. V2 folds the partner strip into the footer and replaces the
         support block with the help drawer. See docs/COMPONENT-INVENTORY.md. -->
    <AppFooter />

    <AppHelpDrawer />
  </div>
</template>

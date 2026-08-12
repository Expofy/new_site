<template>
  <header>
    <div class="bg-surface-header">
      <!-- One search field, repositioned by flex order: inline on desktop,
           wrapped onto its own row on mobile. Rendering it twice would
           duplicate its id, its label target and the search landmark. -->
      <!-- On desktop the logo and the actions each take an equal share, which is
           what centers the search field between them regardless of how wide
           either side happens to be. Below md the search drops to its own row. -->
      <div class="mx-auto flex max-w-site flex-wrap items-center gap-stack px-gutter py-stack">
        <div class="order-1 md:flex-1">
          <AppLogo />
        </div>

        <div class="order-2 ml-auto flex items-center gap-3 md:order-3 md:ml-0 md:flex-1 md:justify-end">
          <AppCartSummary />
          <AppMobileDrawer />
        </div>

        <div class="order-3 w-full md:order-2 md:max-w-xl md:flex-1">
          <AppSearchField />
        </div>
      </div>
    </div>

    <AppNav />
  </header>
</template>

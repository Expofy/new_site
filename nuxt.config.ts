import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/fonts', '@nuxtjs/i18n', '@pinia/nuxt', 'reka-ui/nuxt'],

  css: ['~/assets/css/main.css'],

  // Subdirectories of components/ group files without renaming what they
  // register. By default Nuxt prefixes a component with its path, so moving the
  // front page's blocks into `front-page-blocks/` would have turned `AppHero`
  // into `FrontPageBlocksAppHero` at every call site. The `App` prefix every
  // component already carries is what keeps these names unique, so the path
  // does not need to.
  components: [{ path: '~/components', pathPrefix: false }],

  vite: {
    plugins: [tailwindcss()],
  },

  // Outfit is the single family across the storefront. @nuxt/fonts downloads and
  // self-hosts it, so no request leaves the page at runtime.
  fonts: {
    families: [{ name: 'Outfit', provider: 'google', weights: [400, 600, 700] }],
  },

  // Both locales are prefixed: /sv/... and /en/... per docs/PROJECT-PLAN.md.
  i18n: {
    defaultLocale: 'sv',
    strategy: 'prefix',
    locales: [
      { code: 'sv', language: 'sv-SE', name: 'Svenska', file: 'sv.json' },
      { code: 'en', language: 'en-GB', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'expofy_locale',
      redirectOn: 'root',
    },
  },
})

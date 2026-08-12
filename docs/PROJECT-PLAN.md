# Project Plan

Expofy V2 will be built as a new Nuxt 4, Vue, TypeScript, Tailwind CSS storefront. It will use uploaded saved pages as design references and local fake data until backend integration is defined.

## Goals

- Build a fast local Storefront with realistic fake content.
- Rebuild templates cleanly in Nuxt instead of copying saved-page HTML as production code.
- Preserve the existing visual direction where possible.
- Improve design where WCAG, usability, mobile ergonomics, or conversion clarity requires it.
- Support Swedish and English from the first build.
- Document layouts, components, forms, data structures, accessibility checks, and workflow as the project grows.

## Stack

- Nuxt 4
- Vue
- TypeScript
- Tailwind CSS
- Reka UI for unstyled interaction primitives: dialog, drawer, popover, accordion, tabs, combobox, listbox, slider, toggle group
- Pinia for shared local state such as cart, favorites, demo user, checkout progress, and fake orders
- Local typed fake data for products, categories, posts, showroom cases, and navigation

Stack rules:

- Reka UI covers generic interaction behavior only. It ships no styling, so all visual design is applied with project Tailwind tokens.
- Commerce components are built in-project: product card, price display, purchase panels, calculated form renderer, cart line item, order summary.
- Design tokens are extracted from the uploaded saved pages, then audited for WCAG contrast before component work begins.

## Backend Boundaries

- Backend will own production slugs and localized paths.
- Backend will own production filter facets.
- Backend will own calculated-product conditional logic.
- Backend will own or verify final production pricing before order placement.
- Frontend fake data simulates these contracts locally.

## Initial Route Map

Routes are provisional and may change when backend routing is defined. They should be locale-prefixed for Swedish and English.

- /sv/ and /en/
- /sv/category/[slug] and /en/category/[slug]
- /sv/product/[slug] and /en/product/[slug]
- /sv/showroom and /en/showroom
- /sv/showroom/[slug] and /en/showroom/[slug]
- /sv/blog and /en/blog
- /sv/blog/[slug] and /en/blog/[slug]
- /sv/landing/[slug] and /en/landing/[slug]
- /sv/cart and /en/cart
- /sv/checkout and /en/checkout
- /sv/login and /en/login
- /sv/register and /en/register
- /sv/account/orders and /en/account/orders
- /sv/account/orders/[id] and /en/account/orders/[id]
- /sv/account/favorites and /en/account/favorites

## Page Templates

- Front page
- Product category page
- Simple Product page
- Variation Product page
- Calculated Product page
- Showroom listing page
- Showroom detail page
- Article page
- Blog/category of posts page
- Landing page
- Cart page
- Multi-step checkout page
- Login page
- Register page
- Orders list page
- Order detail page
- Favorite products page

## Build Phases

- Phase 1: design token extraction and contrast audit, project scaffold, Tailwind, i18n routing, Pinia, fake data, global layout shell.
- Phase 2: base components, form components, product cards, price display, accessibility primitives.
- Phase 3: front page, category page, search, filters, showroom listing/detail.
- Phase 4: product detail layout and Simple, Variation, and Calculated purchase panels.
- Phase 5: cart, checkout, fake order success, account pages, favorites.
- Phase 6: full responsive/accessibility review, performance pass, documentation polish.

## Checkout Scope

- Checkout is multi-step: contact information, shipping address, shipping method, payment method placeholder, review, and fake order success.
- Guest checkout is allowed.
- Signed-in Demo User checkout may prefill fields and save fake orders to account history.
- No real payment processing is included in the local fake build.

## Mobile Scope

- Existing mobile Saved Pages are the baseline.
- Mobile behavior must be planned and tested for every layout and component.
- Mobile navigation uses an accessible drawer or full-screen menu.
- Mobile product filters use an accessible drawer.
- Showroom tag filters stay lightweight and chip-based.

## Definition Of Done

- Desktop layout matches or intentionally improves the Saved Page reference.
- Mobile layout matches or intentionally improves the Saved Page reference.
- Keyboard navigation works.
- WCAG checklist is reviewed.
- Fake data works in Swedish and English.
- Loading, empty, and error states exist where relevant.
- Cart, favorites, order, form, and checkout interactions work where present.
- No obvious layout shift, text overlap, clipping, or broken responsive behavior remains.
- The local dev page is manually tested.
- Documentation is updated.

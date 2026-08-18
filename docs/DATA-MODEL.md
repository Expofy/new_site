# Data Model

This document describes the fake local data structures the Nuxt storefront should use before backend integration. The shapes should imitate likely backend contracts without making frontend-owned business rules permanent.

## Locales

- Supported locales: sv, en.
- Swedish is the primary reference language.
- English labels and core fake content should exist from the first build.
- Currency is SEK/kr for both locales.
- Slugs and localized paths are backend-owned later; local fake data only simulates them.

## Navigation

Typed in `app/types/navigation.ts`, populated in `app/data/navigation.ts`.

- Content strings carry both locales inline as `Localized = Record<'sv' | 'en', string>`. UI chrome lives in `i18n/locales/` instead; navigation labels are content, not chrome, so they do not belong in the message catalogues.
- Paths are stored locale-agnostic (`/category/tygvepor`) and prefixed at render time by `useLocalePath()`. Slugs and localized paths are backend-owned later; this only simulates them.
- `NavItem` carries optional `groups`, which is what makes an item open a mega-menu panel rather than link directly.
- The same shape backs the footer columns, so one renderer serves both.

## Popular Categories

Typed in `app/types/category.ts`, populated in `app/data/categories.ts`. Backs the front page's "Populära kategorier" block.

- A tile is `id`, `label`, `to`, `image` — no more. Array order is render order, so there is no `order` field that could disagree with it.
- "Popular" is editorial, not computed. On the live site the block is hand-built, and it stays a curated list when the backend owns it; nothing here derives from sales.
- `to` is a locale-agnostic path into the catalogue and is the only tie between a tile and the mega menu. Labels are deliberately allowed to differ — the front page shows "Mässbord" where the menu shows "Mässbord & diskar" — so `test/categories.test.ts` checks the path, not the wording, and accepts a path *below* a menu category (Ljuslådor sits under Displayer).
- No alt text travels with the image. The tile always renders it `alt=""`, because the label is already the link's accessible name.
- Renders are the Saved Page's own transparent PNGs in `public/categories/`, renamed after the category. They are square, which is what lets the tile state one intrinsic size for all ten; a test fails if one stops being square, or if a file is missing.

## Prices

- The frontend never computes a price or a total. It formats amounts it was given — see Backend Boundaries in `PROJECT-PLAN.md`.
- `formatPrice()` in `app/utils/formatPrice.ts` is the single formatting entry point, covered by `test/formatPrice.test.ts`.
- Cart totals are stored as a supplied `CartTotals` object, not derived from line items. Item *count* is derived, because a count is not a price.

## Product

A Product is one of Simple Product, Variation Product, or Calculated Product.

Shared product fields:

- id
- type: simple, variation, or calculated
- locale content: name, slug/path, short description, long description
- category ids and tags
- images and gallery media
- badges
- base price and VAT display data
- product details/specification sections
- service option blocks
- selectable add-on blocks
- You may also need recommendation groups
- optional related/inspiration groups

## Simple Product

- Uses the shared product fields.
- Has fixed price and fixed configuration.
- Can be quick-added from listings when product data allows it.

## Variation Product

- Has option groups such as size, color, material, format, or finish.
- Option selectors may render as dropdowns, radios, color swatches, image swatches, text buttons, or quantity controls.
- Options may be unavailable or disabled.
- Options may change price.
- Options may change the active product image.
- Variations may have their own URLs and appear as browseable/filterable category results.
- Defaults should create a valid minimum-price selection when possible.

## Calculated Product

- Uses a schema-driven Calculated Product Form.
- Each Calculated Product can define different fields and pricing inputs.
- Default dimensions and options should create a valid minimum-price configuration when possible.
- Local price previews are for UX only.
- Production pricing must be backend-owned or backend-verified before order placement.

Calculated form field types:

- text input
- number input
- textarea
- select dropdown
- radio group
- checkbox
- checkbox group
- toggle/switch
- file upload
- color swatch picker
- image swatch picker
- button option group
- quantity stepper
- range slider
- date picker
- hidden/calculated field
- info/help text block
- validation error message
- conditional field group
- price summary row

## Service Option Block

- id and type
- localized title and description
- expanded/collapsed default state
- segmented choices or option buttons
- choice prices and descriptions
- optional file upload configuration
- optional delivery estimate
- optional shipping cost
- inline show-more content
- price summary rows
- validation rules and actionable tips

Examples:

- Print-file/design help: basic file check, advanced file check, graphic design, file upload.
- Delivery/production time: standard, fast, express, estimated delivery date, shipping cost.

## Category Filters

- Product category filters are backend-owned later.
- Local fake facets should include labels, options, counts, selected state, disabled state, and result behavior.
- Product category pages use desktop filter sidebar and mobile filter drawer.
- Showroom listing uses lightweight category/tag chips, not commerce facets.

## Cart Line Item

- product id and product type
- localized product name and path
- thumbnail
- quantity
- selected variation options
- calculated form values
- uploaded file names
- selected service options
- selected add-ons when bundled with the main product
- unit price, VAT data, and line total
- edit/remove capability where appropriate

## Checkout And Orders

- Checkout supports guest checkout and Demo User checkout.
- Checkout state includes contact information, shipping address, shipping method, payment placeholder, review state, and fake success state.
- Fake orders should include order id, created date, customer/contact data, line items, totals, status, and delivery summary.
- Demo User orders appear in account order history.

## User And Favorites

- Demo User is signed in by default for protected account pages.
- Fake login and registration screens exist for UX only.
- Favorites are local Pinia state and can be shown on product cards and the favorites page.

## Showroom Case

- id
- localized title, slug/path, intro/body text, and collaboration/customer line
- category/tag chips
- image gallery with alt text and captions
- lightbox image data
- products used in this project
- optional call to action

## Blog And Landing Content

- Blog listing uses article cards and category/tag navigation where needed.
- Article pages use readable typography, body content, images, related content, and SEO-ready metadata placeholders.
- Landing pages are content/commerce pages composed from reusable content and product blocks.

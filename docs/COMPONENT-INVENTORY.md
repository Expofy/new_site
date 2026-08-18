# Component Inventory

Inventory for the Nuxt 4, Vue, TypeScript, Tailwind storefront, decomposed from the 14 Saved Pages in `old_site/`.

## How To Read This

Every item is marked:

- **[REF]** — a Saved Page shows it. Rebuild it against the reference.
- **[NEW]** — `PROJECT-PLAN.md` requires it but no Saved Page shows it. It must be designed before it can be built, and the Definition of Done clause "matches the Saved Page reference" cannot apply.

The `[NEW]` items are collected in **Gaps Without A Reference** at the end. They are the real risk in this project: they are not a rebuild, they are new product design.

## Layouts

- **Default storefront layout [REF]** — topbar (logo, search field, cart summary) over a dark ink navigation bar, then content, then the global footer stack. Used by every page except checkout.
- **Checkout layout [REF]** — minimal header: centered logo on a grey band, no navigation, no search, no cart. Keeps the full global footer stack. Confirmed on the Checkout Saved Page.
- **Account layout [REF]** — default storefront layout plus a horizontal plum tab bar over a white bordered panel. Not the WooCommerce sidebar; the theme overrides the stock 30% float.
- **Content layout with sidebar [REF]** — article pages carry a widget sidebar ("Senaste inläggen" and related widgets). This contradicts the earlier draft, which assumed a single readable column.
- **Centered content layout [REF]** — showroom listing and showroom detail use a centered intro with no breadcrumb, distinct from the article layout.
- **Minimal auth layout [NEW]** — no login or register Saved Page exists.

Layout rules:

- Every layout must define desktop and mobile behavior before implementation.
- Existing mobile Saved Pages are the baseline. The four account/simple-product references are desktop-only; their mobile behavior is deferred by decision, not overlooked.
- Mobile navigation should use an accessible drawer or full-screen menu.

## Page Composition

What each template is actually made of, in document order.

| Page | Layout | Composition |
| --- | --- | --- |
| Front page [REF] | Default | Hero carousel · popular category grid · campaign + product panels · info/CTA tiles · Expomera promo · showroom teaser (3-up) · "Se fler case" CTA · Trustpilot strip · footer stack |
| Category page [REF] | Default | Breadcrumb · title + intro · subcategory chips · sort select + result count · product grid (infinite scroll) · long-form SEO article with anchor chips and tint info cards · footer |
| Simple Product [REF] | Default | Breadcrumb · gallery + bullet highlights ǀ purchase panel · tab group · tab body · You May Also Need · partner strip · support block · footer |
| Variation Product [REF] | Default | Same shell; purchase panel adds option button group + Selectable Add-ons panel; adds "Du kanske också gillar" and a Trustpilot strip |
| Calculated Product [REF] | Default | Same shell; purchase panel is a schema-driven form; gallery column carries an intro text block |
| Showroom listing [REF] | Centered | Centered intro · tag chip row · masonry card grid · "+ Mer" load-more · partner strip · support block · footer |
| Showroom detail [REF] | Centered | Centered title · collaboration line · two-column intro (pull quote ǀ body) · image gallery · product category link · "Utforska mera" related grid · footer stack |
| Blog listing [REF] | Content + sidebar | Breadcrumb · title · article cards · pagination · sidebar widgets · footer stack |
| Article [REF] | Content + sidebar | Breadcrumb · article body · "was this helpful?" feedback block · latest-posts widget · sidebar · footer stack |
| Cart [REF] | Default | Title · line items with configuration detail, file upload, and indented child lines ǀ totals card · footer stack |
| Checkout [REF] | Checkout | Back link · returning-customer link · country select · order summary card ǀ payment panel · account/notes/business fields · footer stack |
| Account details [REF] | Account | Tab bar · profile form · password fields · save button |
| Orders list [REF] | Account | Tab bar · orders table (order · date · status · total + item count · action pill) |
| Order detail [REF] | Account | Tab bar · order details table · billing address ǀ shipping address |
| Landing page [NEW] | — | No reference |
| Login / Register [NEW] | Minimal auth | No reference |
| Favorites [NEW] | Account | No reference, and no tab position on the old site |

## Global Blocks

Appear across many pages; build these first.

**Footer stack** is used throughout this document as shorthand for the three blocks that close every single Saved Page, in this order: partner strip, support block, footer.

- **Site header [REF]** — logo, product search field with pink submit, cart summary with count and excl-VAT total.
- **Main navigation [REF]** — dark ink bar, mega-menu dropdowns, account link on the right. Uses `.on-ink` for focus handling.
- **Mobile navigation drawer [REF]** — reference is `Front page/Screenshot_front_mobile_menu.png`.
- **Breadcrumbs [REF]** — rendered on category and all three product pages only. Absent on front, showroom listing, showroom detail, blog listing, article, cart, checkout and account pages. The breadcrumb markup those pages carry is JSON-LD structured data, not a visible trail.
- **Partner strip [REF]** — "Vi stödjer:" logo row. On all 14 Saved Pages.
- **Support block [REF]** — "Behöver du hjälp?" in support teal: contact intro, phone and email pills, and a contact form. On all 14 Saved Pages, including the front page and checkout.
- **Footer [REF]** — four link columns on ink, then a trust row (certifications, credit rating, payment provider logos).
- **Trustpilot review strip [REF]** — front page and product pages.
- **Skip link, toast, modal, drawer, loading / empty / error states [NEW]** — no reference; required by the accessibility checklist.

## Commerce Components

- **Product card [REF]** — image, name, price. The CTA label is driven by product type: "Lägg i varukorg" (simple), "Välj (N varianter)" (variation), "Anpassa" (calculated). One component, three CTA behaviors.
- **Product gallery [REF]** — main image plus thumbnail strip, with a PhotoSwipe lightbox on all three product pages.
- **Price display [REF]** — pink price with a secondary incl-VAT line; "Från" prefix and `/ m²` unit for calculated products.
- **Quantity stepper [REF]** — round − / + buttons flanking a value.
- **Add to cart button [REF]** — full-width plum.
- **Service Option Block [REF]** — collapsed `brand-tint` accordion row with icon, label and `+` toggle. Two instances everywhere: print files and delivery time. Identical across all three product types.
- **Selectable Add-ons Block [REF]** — bordered tint panel, "LÄGG TILL MARKFÄSTE", grid of add-on cards each with image, name, price and its own quantity stepper. Dismissible.
- **Price summary [REF]** — "Prissammanställning" heading with plum rule, label/value rows, total. Calculated products add a minimum-charge note.
- **Variation option selector [REF]** — horizontal text button group. Only this form is evidenced; dropdowns, colour and image swatches in `DATA-MODEL.md` are unevidenced and should not be built until a product needs them.
- **Calculated Product Form renderer [REF]** — number inputs with steppers, selects, required markers, per-field help text. The Saved Page evidences these field types only; the full list in `DATA-MODEL.md` is aspirational.
- **Product tab group [REF]** — pill tabs, active filled plum, inactive tint. Tab count varies by product from 1 to 5, so it must be data-driven.
- **You May Also Need [REF]** — "Passar perfekt tillsammans med:" card row. Browse-only.
- **Related / inspiration block [REF]** — "Du kanske också gillar ...".
- **Cart line item [REF]** — thumbnail, name, quantity stepper, remove link, line total; a configuration detail panel with pink labels and ink values; a file upload block; and indented child lines for service add-ons.
- **File upload [REF]** — panel with pink browse button, max-size hint, and an uploaded-file list on tint with a delete control.
- **Order summary [REF]** — checkout table with quantity badge, thumbnail, "Visa detaljer" toggle, and totals.
- **Orders table [REF]** — order number link, date, status, total with item count, tint pill action.
- **Address block [REF]** — billing and shipping, side by side on order detail.
- **Checkout progress, shipping method selector, payment placeholder, order success panel [NEW]** — see gaps.

## Form Components

Evidenced by the Saved Pages: text input, number input with stepper, textarea, select dropdown, checkbox, file upload, required marker (`critical` red asterisk), help text, form field wrapper, password field with reveal toggle.

Not evidenced, listed in `DATA-MODEL.md`, build on demand: radio group, checkbox group, toggle switch, colour swatch picker, image swatch picker, button option group beyond the variation selector, range slider, date picker, conditional field group, validation error, actionable validation tip.

## Content Blocks

Blocks used by a single template live in a folder named for it — the front page's are in `app/components/front-page-blocks/`. `app/components/` proper holds global chrome and anything shared between pages. Names are unaffected: the components directory is registered with `pathPrefix: false`.

- Hero carousel [REF]
- Category navigation grid [REF] — built as `AppCategoryGrid.vue`, the front page's "Populära kategorier". Ten tiles, each a transparent product render on a light radial gradient with the category name beside it. Five across on desktop, two on tablet, one on mobile. One link per tile, whose name is the label; the render is `alt=""`. Content is `app/data/categories.ts`, images `public/categories/`.
- Service slider [NEW] — built as `AppServiceSlider.vue`, the front page's "Tjänster". Cards — eyebrow, illustration, title, one sentence, "Läs mer" — on a horizontal scroll-snap track. How many *exist* is `app/data/services.ts` (six today); how many are *on screen* is a `columns` prop (default 6, currently 5) that the backend will own, with the narrower breakpoints clamping down from it. Every card in a row is the same height; that height is not pinned across different column counts. Both knobs, and the rest, are written up under "How the Tjänster block is configured" in `CURRENT-STATE.md`. Nothing auto-rotates, and the arrows remove themselves at any width where the whole row fits. The whole card is the click target, via one stretched link named "Läs mer" plus the card's own heading. Eyebrow, link and scrollbar are `support` teal, not `brand`. Content is `app/data/services.ts`, illustrations `public/services/`. No counterpart on the old site; built from the supplied design.
- Product grid and card row [REF]
- Campaign / promo panel [REF]
- Info tile row [REF]
- Anchor chip navigation [REF] — category page SEO section
- Tint info card [REF] — bullet lists inside the long-form content
- Article card [REF]
- Article body [REF]
- Article feedback block [REF] — "Tyckte du att den här artikeln var till hjälp?"
- Sidebar widget [REF] — latest posts and related
- Showroom teaser [REF]
- Showroom tag chips [REF]
- Showroom card [REF] — image with watermark, uppercase title, pipe-separated tags
- Showroom masonry grid [REF] — variable-height, not an equal-height grid
- Showroom gallery [REF] — plain 2-up images, no lightbox on the old site
- Pull quote [REF]
- Load more [REF] — "+ Mer"
- FAQ accordion [NEW]
- Accessible lightbox for showroom [NEW]

## Product Page Structure

- Simple, Variation and Calculated pages share one shell, confirmed across all three Saved Pages: breadcrumb, then a two-column gallery/purchase split, then the tab group, tab body, You May Also Need, and the global footer stack.
- Only the middle of the purchase panel varies by type. Everything below it — Service Option Blocks, price summary, quantity stepper, add to cart — is identical across all three.
- The gallery column carries a slot beneath the image: bullet highlights on Simple, an intro text block on Calculated.
- Purchase panels load with defaults selected, representing the minimum valid price.
- Prices use SEK/kr for both locales. VAT visibility is configurable and shown for now.

## Category And Filter Rules

The Saved Page shows a sort select, a result count ("Visar alla 10 resultat"), subcategory chips, and infinite scroll. **There are no filter facets, no sidebar, and no filter drawer anywhere on the old site.**

- Sort select, result count and subcategory chips are **[REF]**.
- Filtering in all forms is **[NEW]**.
- Infinite scroll should be replaced by pagination or an explicit load-more. Infinite scroll strands keyboard and screen-reader users, who cannot reach the footer, and `PROJECT-PLAN.md` already specifies "pagination or load more".
- Category pages carry a substantial long-form SEO article below the grid. This is a large part of the template and was not represented in the earlier draft.

## Showroom Rules

- Showroom is a first-class area with listing and detail templates.
- Listing uses lightweight tag chips, not commerce facets, matching the reference.
- Cards show image, uppercase title and tags. The grid is masonry.
- Detail pages carry title, collaboration line, two-column intro with a pull quote, gallery, product category link, and a related-cases grid.
- `DATA-MODEL.md` lists "products used in this project" for showroom cases. The reference shows only a "Produktkategori:" link, not a product block. Treat the richer version as **[NEW]**.
- An accessible lightbox for the showroom gallery is **[NEW]**; PhotoSwipe on the old site is product-gallery only.

## Account Rules

- Account navigation is a horizontal tab bar, not the WooCommerce sidebar.
- Plum band, 5px top radius, white 16px Outfit tabs, 2px white underline on the active tab, sitting on a white plum-bordered panel.
- Saved Page tabs: dashboard, orders, addresses, account details, log out.
- Orders table columns: order number (link), date, status, total with item count, action pill.
- The partner strip and support block sit below the panel on every account page and belong to the global footer stack, not the account layout.

## Gaps Without A Reference

Everything below is required by `PROJECT-PLAN.md` but has no Saved Page. Each needs a design decision before it can be built.

1. **Category filtering.** The plan calls it "a core feature" with a desktop sidebar, mobile drawer, active filter chips, counts, disabled states and empty filtered states. None of it exists on the old site. This is the largest single piece of new design in the project.
2. **Multi-step checkout.** The old checkout is one page with an embedded Svea widget handling identification and payment. The plan specifies six steps: contact, shipping address, shipping method, payment placeholder, review, success. The step flow, the progress indicator, the shipping method selector and the success panel are all new.
3. **Login and register pages**, and the minimal auth layout.
4. **Favorites** — the page, the card control, and its position in the account tab row.
5. **Landing page** and its composable content/product blocks.
6. **Showroom lightbox** with keyboard navigation and focus management.
7. **Global states** — skip link, toast, modal, drawer, loading, empty and error states.
8. **FAQ accordion** — listed as a front-page block in the plan; the reference front page has an info tile row instead.

## Reuse Rules

- Every Saved Page must be mapped to existing or new reusable blocks before implementation.
- New blocks only when existing blocks cannot express the page without harming accessibility, usability or maintainability.
- Components must be keyboard accessible and expose labels, help text and validation errors accessibly.
- Components must support Swedish and English through the i18n structure.
- Components use the tokens in `DESIGN-TOKENS.md`; never raw hex.
- Backend-owned business logic is simulated locally, not hard-coded as final frontend truth.
- Do not build unevidenced variants from `DATA-MODEL.md` speculatively. Build the evidenced form, and extend when a product actually needs more.

## Definition Of Done

- Desktop layout matches or intentionally improves the Saved Page reference.
- Mobile layout matches or intentionally improves the Saved Page reference, where one exists.
- Keyboard navigation works.
- WCAG checklist is reviewed.
- Fake data works in Swedish and English.
- Loading, empty, and error states exist where relevant.
- Cart, favorites, order, form, and checkout interactions work where present.
- No obvious layout shift, text overlap, clipping, or broken responsive behavior remains.
- The local dev page is manually tested.
- Documentation is updated.

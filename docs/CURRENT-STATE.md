# Current State

Where the build stands right now, and what is picked up next. One page, updated as work closes — the detail lives in the documents it points at.

## Done — Header

The header bar is **checked against WCAG 2.1 AA and closed**. That covers the components inside `AppHeader.vue`:

| Component | Status |
| --- | --- |
| `AppSkipLink` | ✅ pass |
| `AppHeader` | ✅ pass |
| `AppLogo` | ✅ pass |
| `AppSearchField` | ✅ closed — A11Y-04/05/07/08 fixed |
| `AppCartSummary` | ✅ closed — A11Y-03 open by decision |
| `AppMobileDrawer` | ✅ pass |

Contrast pairs were computed from the token values rather than eyeballed, alpha colours composited against their real backdrop first, and markup read for landmark, label, role, and heading semantics. Full per-component findings are in `WCAG-STATUS.md`; the criteria applied are in `ACCESSIBILITY-CHECKLIST.md`.

Two items stay open **as recorded decisions, not as unfinished work**:

- **A11Y-09** — the search field's focus indicator is a 1px border colour change (`black/45` → `focus`, 1.31:1) by product decision. Written down so it is a choice rather than an oversight.
- **A11Y-03** — the cart link's `aria-label` replaces its inner text, so the subtotal is not announced. Not a clean AA failure; sighted and non-sighted users simply get different information.

Both should be confirmed against a real low-vision and screen-reader pass when one is available.

## Done — Main Menu

`AppNav.vue` (desktop mega menu) and `AppMobileDrawer.vue` (mobile) are rebuilt against the Saved Pages, and **A11Y-01 is closed** — the panel re-asserts `--color-focus`, verified pink rather than white in headless Chrome.

### How a submenu is configured

The shape lives in `app/types/navigation.ts`; the content is `app/data/navigation.ts`.

- **Two submenu types.** `variant: 'image'` renders one tile per item — 150×150 thumbnail beside the label, no column headings. `variant: 'list'` renders plain text links under a teal column heading, with a rule between columns. Produkter is the image panel; Användningsområden and Hur funkar det? are list panels.
- **Column count is a setting.** A panel is exactly as many columns wide as its `columns` array is long. Adding or removing a column object is how the width changes — nothing else needs touching.
- **Each column has an id.** `products-1`, `use-cases-retail`, and so on. An item belongs to the column whose `items` array it is written into, so moving an entry between columns is a cut and paste, and the id is what the heading, the render key and the tests refer to.
- **Column order is the mobile order.** The drawer flattens the panel into one scrolling list by walking the columns in order, which is how the reference behaves: Banderoller, Vepor, Mässväggar, Ramar & tavlor, then the second column.

Tile images are the Saved Pages' own category thumbnails, copied to `public/nav/`. A test fails if data points at a file that is not there.

### What changed beyond the menu itself

- **The mobile drawer is a different component now.** It was a 300px dark panel; it is a full-bleed light one with its own close/logo/cart row and search field, matching the reference. It covers the header rather than sitting beside it, which is why it carries its own copies.
- **`AppSearchField` takes `id` and `landmark` props.** Two instances are on screen at once, so they cannot share an input id, and the drawer's copy drops `role="search"` rather than adding a second identically-named search landmark.
- **Panel width is restated in CSS.** reka-ui wraps the menu list in its own `position: relative` div, so the panel cannot be positioned against the site container; the width is recomputed as `min(--container-site, 100vw) - 2rem`. There is a comment at the call site.

Verified in headless Chrome at 1900px, 1024px (where columns wrap intact rather than reflowing), and 537px.

## In Progress — Front Page Blocks

The blocks that only the front page uses live in `app/components/front-page-blocks/`. Everything in `app/components/` proper is either global chrome or shared across pages — the footer stack included, which closes all 14 Saved Pages and is mounted by the layout, not by the page.

They keep their plain names. `nuxt.config.ts` sets `pathPrefix: false` on the components directory, so a subdirectory groups files without renaming what they register: `AppHero` stays `AppHero` rather than becoming `FrontPageBlocksAppHero`. The `App` prefix every component already carries is what keeps the names unique, so the path does not need to.

### Hero

`AppHero.vue` picks a Slider Group and renders its lowest-`order` slide; `AppHeroSlide.vue` holds every setting. Types in `app/types/hero.ts` are modelled field-for-field on the "Add New Slide" admin screen, with the admin's own field name quoted on anything that was renamed, so connecting the backend is a mapping exercise rather than a translation.

| Admin field | Data |
| --- | --- |
| Slide Type | `type: 'image' \| 'video' \| 'html'` |
| Link URL + Open in new tab | `link: { to, newTab }` |
| Resource URL | `resource` — `.mp4`/`.webm` file, or a YouTube/Vimeo embed |
| Custom HTML | `html` (localized) |
| Featured image | `image` — the picture for `image`, the poster for `video` |
| Headline / Text | `overlay.headline` / `overlay.text` |
| Button text + Button URL | `overlay.button: { label, to }` |
| Horizontal / Vertical align | `overlay.alignX` / `overlay.alignY` |
| Text theme | `overlay.theme: 'light' \| 'dark'` |
| Add dark overlay behind text | `overlay.dark` |
| Slider Groups | `group` |
| Post Attributes → Order | `order` |

Three rules the renderer enforces that the admin screen does not:

- **A linked slide has nothing interactive inside it.** A slide-wide Link URL makes the whole slide one anchor, so an overlay button or a video pause control inside it would be a control nested in an anchor — invalid, and unreachable. The renderer drops the slide link rather than emit that, and a test fails if data ever combines them.
- **Self-hosted video autoplays; embeds do not.** An autoplaying loop needs a pause control under SC 2.2.2, and there is no way to put one on a YouTube iframe — so embeds render with the provider's own controls instead. Reduced motion pauses the video after mount.
- **The scrim is load-bearing, not decorative.** It is the only reason the overlay's contrast is knowable — see A11Y-10 in `WCAG-STATUS.md`.

One field was added that the admin has no box for: `imageAlt`. An empty string means decorative, which is correct for every slide here because the overlay carries the message — but a hero image that ever carries meaning on its own needs real text, and there is currently nowhere for an editor to type it.

### Hero rotation

The group rotates, and it rotates through **mixed types** — the front-page group is one video, one image and one HTML slide, in that order, on a 7-second timer.

Motion is owned by `AppHero`, not by the slide: a slide cannot know it is one of several. It is handed `active` and `motion` and does as it is told, which is what keeps an off-screen video from playing to nobody.

- **One control stops everything.** Rotation and whatever the active slide is playing are both motion under SC 2.2.2, and two separate pause buttons in the same corner is worse than one. Its label changes to name what it actually stops when the group holds a single video slide.
- **Two kinds of pause.** `paused` is deliberate — the user pressed it, or the OS asks for reduced motion. Hover and focus are the temporary kind: they hold the rotation so a slide is not yanked away mid-sentence, but never touch the video.
- **All slides stay in the DOM**, stacked in one grid cell, so the block is as tall as its tallest slide and a crawler sees every slide's content. Inactive ones are `invisible` rather than `hidden` — visibility:hidden leaves the tab order and the accessibility tree just as `hidden` does, but still allows the cross-fade.
- **Navigating by hand restarts the countdown** instead of leaving a part-elapsed timer to move the slide out from under you.

Follows the APG carousel pattern: `aria-roledescription`, per-slide `role="group"` labelled "N of M", and a live region that is `off` while the timer runs and `polite` once it stops — a region that announces while it is also rotating talks over itself.

### Popular categories

`AppCategoryGrid.vue` is the block under the hero: "Populära kategorier", ten tiles, each a transparent product render on a light radial gradient with the category name beside it. Content is `app/data/categories.ts`; the shape is in `DATA-MODEL.md`.

"Popular" is an editorial list, not a computed one — the live block is hand-built, and the backend inherits a curated list rather than a sales query. A tile is only `id`, `label`, `to`, `image`, and array order is render order.

Four places the rebuild departs from the Saved Page, each on purpose:

- **One link per tile.** The reference nests two anchors to the same URL in every cell, one around the render and one around the label, and several of the label anchors are empty — three tab stops per category, two of them with no accessible name. Here the tile is a single link named by its label, and the render is `alt=""`.
- **A tablet step.** The reference goes straight from five columns to one at 768px, which leaves five 150px tiles fighting for label room in between. Two columns are inserted for that range.
- **Every tile carries the `md` card radius**, rather than the reference's trick of rounding only the four outer corners of the block. That trick is a five-column assumption dressed as a style — the reference itself switches it off on mobile — and reproducing it needs an `overflow-hidden` that would clip the focus ring off every tile on an edge of the grid.
- **The heading is an `h2`.** The reference uses `h3` with no `h2` above it.

Labels are free to differ from the mega menu's — the front page shows "Mässbord" where the menu shows "Mässbord & diskar" — so the test pins the **path**, not the wording: every tile has to land on a category the menu carries, or below one. That is what catches a slug renamed in `navigation.ts` leaving a dead tile behind.

### Services

`AppServiceSlider.vue` is the block under the popular categories: "Tjänster", cards on a horizontal scroll-snap track. Content is `app/data/services.ts`; the shape is in `DATA-MODEL.md`.

This block does not exist on the old site. It was built from a supplied design, so there is no Saved Page to depart from — but the six services are all pages the old site already publishes, and four of them are the ones the mega menu carries under "Behöver du hjälp?". The block is a front-page entrance to pages that previously only had one deep in a menu.

- **The track is a real scroll container**, not a transform the arrows drive. The browser already owns momentum, swipe, snapping, and scrolling a card into view when it is tabbed to; the arrows only push the same scroller the user can push by hand, so the two input routes cannot disagree about where the block is.
- **Nothing rotates on its own.** Six links are not a promotion, and an auto-advance would drag content out from under a reader to no purpose — which is why there is no counterpart to the hero's pause button here.
- **The arrows are a mouse shortcut**, `aria-hidden` and out of the tab order. Everything they reach is reachable by tabbing card to card. They disable rather than hide at each *end*, so the control row does not change width as it is used — but they leave entirely at the width where the whole row fits, rather than sitting there permanently disabled as controls for something that cannot happen.
- **One link per card**, stretched over the whole card by its own `after` layer — the card is the click target the design implies, without the second tab stop a wrapping anchor would add. Its name is the visible "Läs mer" plus the card's `h3`, because six links all named "Läs mer" are six identical entries in a screen reader's link list.
- **No numbers on the cards**, and no rule above the eyebrow — the design showed a `01`–`06` counter and an underline beneath it; both were dropped. The list is a `ul` because of the first: an `ol` would assert an order nothing on screen backs up.
- **The card speaks in `support`, not `brand`.** The eyebrow, the "Läs mer" link and the track's scrollbar are all teal — the site's help-and-service voice, which is the register a block of services belongs in, and it leaves `brand` to the pieces that sell. "Läs mer" hovers to an underline instead of a second colour: there is only one `support` token, and jumping to `brand-deep` on hover would cross voices mid-interaction.
- **The band is white and the block has no top padding.** The categories block above it is also white and already ends in a full `py-section`; a top padding here would stack two of them and open twice the gap the hero leaves above "Populära kategorier".
- **How many cards show is a `columns` prop, default 6.** It is an editorial call about how much of the offer to show at a glance, not a layout constant, so it is data the backend will own rather than a number in a stylesheet. The component clamps it — `Math.max(1, Math.round())` — because it divides the row width, and a 0 from the CMS would be a division by zero.
- **The prop is a maximum, not a fixed count.** It reaches CSS as `--card-track-columns-max` on the element, and each breakpoint takes `min()` of it and its own ceiling: 2 at 640px, 3 at 768px, 4 at 1024px, the full value at 1366px. So `columns: 3` gives three across on desktop and still one on a phone, instead of three squeezed onto 360px. Same idiom as the mega menu's `--nav-columns`.
- **Every card in the row is the same height**, which grid stretch gives for free — the cards are items in one grid row. The illustration also has a fixed 108px box with `object-contain` rather than scaling with the card, because a 4:3 drawing at `w-full` is 143px tall across a sixth of the row and 240px across a third, and a band that swings by 100px between configurations is not a band. That box is the card's height dial.
- **Card height is *not* pinned across different column counts**, and that is a deliberate reversal. It was, briefly, via a `min-h` on the title-and-description block sized to the tallest shape those can take. The cost was measured: at six columns' worth of reservation while the block was configured for five, every card carried **48px of blank** between its description and "Läs mer" — and the guarantee bought nothing anyone sees, since two column counts never appear side by side. The reservation went; the `line-clamp`s stayed, because those guard against a long CMS string running one card away from its neighbours, which is a real risk rather than a hypothetical one. Measured: 364px at six columns, 316px at five and four, 296px at three, two and one.
- **The column counts live in `main.css`, not in `sm:`/`xl:` utilities.** This project overrides `--breakpoint-xl` to 1366px, which makes Tailwind emit the `xl` block *before* `sm`/`md`/`lg` — so above 1366px the later `lg` rule wins and `xl:` silently loses. `.card-track` uses hand-written media queries for the same reason `.nav-panel-grid` does. Noted in `DESIGN-TOKENS.md`; this block is the first place in the codebase to have used an `xl:` variant at all.
- **The gap above "Läs mer" belongs to the paragraph, not the link.** It was `pt-4` on the anchor, which inflated the anchor's own box upward — and the focus ring, drawn 2px outside that box, then landed across the last line of the description. Moved to `mb-4` on the `p`: same spacing, ring around the words. Found by re-auditing the block in-browser rather than by reading it.
- **Reduced motion is decided in the click handler**, not by a `motion-reduce:scroll-auto` class. An explicit `behavior` in `scrollBy` overrides the element's CSS `scroll-behavior`, so the class would have lost — and animated for exactly the users who asked it not to.

The illustrations in `public/services/` are the real assets, dropped in over the placeholders this block was first built with — same filenames, no code change, which is what the placeholder arrangement was for. They are PNGs wrapped in an SVG at 200x150 (4:3, where the placeholders were 3:2), around 45KB each. The card never assumed either ratio: it reserves a 108px box and fits the drawing into it, so the swap moved nothing. Worth knowing that they are raster inside the wrapper — they will not scale crisply past their pixel size, and the six together are roughly 270KB.

### How the Tjänster block is configured

Two different numbers are easy to confuse, so they are named apart here: **how many services exist** (the data) and **how many are on screen at once** (the layout). Changing one does not change the other.

**How many services exist** — `app/data/services.ts`. The array is the block; array order is render order. Adding or removing an entry is the whole edit, plus:

1. Drop an illustration into `public/services/` named after the service, at the same aspect ratio as its siblings. A test compares the assets' ratios against *each other*, so an odd one out fails.
2. Update the two counts that `test/services.test.ts` deliberately pins — `toHaveLength(6)` for the array, and `toHaveLength(4)` for the services that also appear in the mega menu. They are pinned so a card cannot appear or vanish unnoticed; they are meant to be edited when the change is intended, not deleted.
3. Give it a `/landing/` path. A test rejects `/category/` — services are not catalogue entries, and the two live in different route trees.

There is no maximum. Nothing in the component or the CSS caps the array, and the track scrolls however long it gets. What sets the *practical* ceiling is that everything past the visible count sits off the right edge behind an arrow, so a list long enough to need several pushes stops being a front-page glance.

**How many are on screen at once** — the `columns` prop, set where the block is used in `app/pages/index.vue`:

```vue
<AppServiceSlider :columns="5" />
```

It defaults to 6 and is currently 5. Backend will own it once the CMS is connected — it is an editorial call about how much of the offer to show at a glance, not a layout constant, which is why it is a prop rather than a number in a stylesheet.

It is a **maximum, not a fixed count**. The narrower breakpoints clamp down from it, so `:columns="3"` gives three across on desktop and still one on a phone, rather than three squeezed onto 360px. The ladder is in `.card-track` in `app/assets/css/main.css` — each step is `min()` of the prop and its own ceiling:

| From | Cards shown |
| --- | --- |
| base (< 640px) | 1 |
| 640px | min(columns, 2) |
| 768px | min(columns, 3) |
| 1024px | min(columns, 4) |
| 1366px | columns |

To change how many appear at a *given width*, edit that ceiling — not the prop. To change the widths themselves, edit the media queries there; do not reach for `sm:`/`xl:` utilities, for the reason in the bullet above.

Values are guarded in the component (`Math.max(1, Math.round())`) because the number divides the row width: a `0` from the CMS would be a division by zero, a fraction would cut a card down the middle at every breakpoint.

**The other dials**, all in the same two files:

| What | Where | Now |
| --- | --- | --- |
| Card height | `h-27` on the `img` in `AppServiceSlider.vue` | 108px illustration box; each Tailwind step is 4px |
| Space between cards | `--card-track-gap` in `.card-track` | `1rem` — the width formula subtracts it, so the two cannot drift |
| Longest title / description before truncation | `line-clamp-2` / `line-clamp-3` on the `h3` and `p` | 2 and 3 lines; they guard against a long CMS string running one card taller than its neighbours |

Card height is *not* pinned across column counts — see the bullet above for why that was tried and removed. Every card in a row is the same height regardless, because they are grid items in one row.

### Promo band

`AppPromoBanner.vue` sits between the categories and the services: a photograph of a sunlit forest with a deer in it, a leaf mark in a ring, "Tillsammans för en grönare framtid", one sentence, and a single CTA. New in V2 — the old site has no equivalent — and built from a supplied design. Content is `app/data/promo.ts`; the shape is in `DATA-MODEL.md`.

It is a **contained panel**, not a full-bleed band. It sits in the same `max-w-site px-gutter` column as the blocks above and below and carries the `md` card radius, and its own text is inset again with `px-card`. The headline therefore does not line up with "Populära kategorier" above it, which is correct — it is inside something.

The block draws at 220px and `min-h-50` (200px) is a floor below that, not the height. A fixed height would clip the paragraph rather than grow; under the 1.4.12 text-spacing overrides the band goes to 267px instead of losing a line.

**The scrim is the whole accessibility story.** White text sits on a photograph nobody has measured, so `eco-deep` at 80% is what makes its contrast knowable at all: over the brightest frame possible it composites to `#59784c`, and white on that is 4.98:1. Unlike the hero's, this scrim cannot be switched off by data, so `AppHeroSlide`'s A11Y-10 failure mode does not exist here.

**The scrim's stop positions are load-bearing and were got wrong twice.** They are percentages of the *band*, and the rule they have to obey is that the scrim is still flat where the text ends — a gradient already fading under the last words puts them on partial scrim, around 2.4:1 over a bright frame, which is a failure that only shows at some widths and only for some strings. The first version faded from 48% while the text ran to 62.5% at 768px. Containing the block later changed the band from "the viewport" to "`max-w-site` minus two gutters" and invalidated the numbers again. What holds now, measured across thirteen widths: the reveal starts at `lg`, and below it both gradient stops are the same opaque colour so the fill is flat and text position cannot matter; at and above `lg` the flat region runs to 58% against a worst case of 52.5% at exactly 1024px, after which the text's share falls monotonically to 34.4% and pins there from 1580px up.

### How the promo band's look is dialled

| Knob | Where | Notes |
| --- | --- | --- |
| Which band renders | `id` prop on `<AppPromoBanner>` | Named per page, not iterated. An unknown id renders nothing at all |
| Band height | `py-9` on the inner wrapper, floored by `min-h-50` | 220px today. The floor must stay *below* the drawn height or it stops being a floor |
| Where the photo's subject sits | the file in `public/promo/`, **not** `object-position` | Horizontal `object-position` is inert at this aspect ratio — see `DATA-MODEL.md`. Vertical `object-[center_88%]` does work, and picks the slice |
| How much photo is revealed | the two gradient stops on the scrim | Re-measure the text's share of the band before moving them; the worst case is at the `lg` breakpoint, not at the widest viewport |
| Green | `--color-eco` / `-strong` / `-deep` in `main.css` | Warm 94° yellow-green. Little margin left — `DESIGN-TOKENS.md` has the arithmetic |

The greens were lightened once and warmed once on the brief that the block should read brighter and warmer, and both are paid for in luminance: white on the scrim went 7.98 → 5.29 → 4.98:1 against a 4.5 floor, and the icon ring 4.89 → 3.51 → 3.33:1 against a 3.0 floor. Warming also took the button's fill to 1.03:1 against the scrim — the same brightness as its surroundings, separated only by hue — which is why the pill carries a `white/70` ring rather than leaning on its label the way the hero's overlay button still does.

## Next

Nothing is claimed for the main menu beyond the above. The remaining known queue, in order:

- `AppSupportBlock` — A11Y-02 (form controls at 1.25:1 where 3:1 is required) and A11Y-06 (submit button has no hover, active, or pointer). It is the last unaudited interactive component.
- The systemic items from the audit notes: a `--color-border-field` token so the correct border is the default one, and a single `@layer base` rule for `cursor-pointer` on buttons.
- A real keyboard and screen-reader pass over the finished header + menu + hero, which is the only thing that can close A11Y-03 and A11Y-09, and the only way to know whether the carousel's live region actually reads well.
- The next front-page block, whichever it is.
- `docs/assets/promo/` holds 7.4 MB of PNG sources outside `public/`. Fine in git for now, but worth a decision before more photographic blocks land — the repo will accumulate one uncropped original per band.

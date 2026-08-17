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

## Next

Nothing is claimed for the main menu beyond the above. The remaining known queue, in order:

- `AppSupportBlock` — A11Y-02 (form controls at 1.25:1 where 3:1 is required) and A11Y-06 (submit button has no hover, active, or pointer). It is the last unaudited interactive component.
- The systemic items from the audit notes: a `--color-border-field` token so the correct border is the default one, and a single `@layer base` rule for `cursor-pointer` on buttons.
- A real keyboard and screen-reader pass over the finished header + menu + hero, which is the only thing that can close A11Y-03 and A11Y-09, and the only way to know whether the carousel's live region actually reads well.
- The next front-page block, whichever it is.

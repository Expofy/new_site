# WCAG Status

Audit status of the components that **exist in `app/`** today. This is the built-so-far ledger, and it is deliberately narrower than two neighbouring documents:

- `COMPONENT-INVENTORY.md` — everything the storefront will need, decomposed from the Saved Pages. Forward-looking; most of it is not built.
- `ACCESSIBILITY-CHECKLIST.md` — the criteria applied to each component. The *questions*.
- **This file** — the *answers*, per component, as of the last audit.

## Bar And Method

The bar is **WCAG 2.1 Level AA**, matching the contrast audit in `DESIGN-TOKENS.md`. AAA criteria are recorded when a component lands close to one, but do not make a component fail.

How each row was checked:

- Every colour pair computed from the token values, not eyeballed. Alpha colours (`white/70`, `black/10`) were composited against their real backdrop first.
- Markup read for landmark, label, role, and heading semantics.
- Focus behaviour traced through the CSS cascade, including inherited `--color-focus`.

**Almost nothing here is verified in a browser.** The project has no Playwright or Puppeteer, so findings are derived from source and computed values rather than from a rendered screenshot, a real screen-reader pass, or a real keyboard walk. The one exception is A11Y-08, which is a rendering defect and was compared in headless Firefox and Chrome. Anything marked ⚠ should also be confirmed by hand before it is closed.

## Status

| Component | Status | Notes |
| --- | --- | --- |
| `AppSkipLink` | ✅ pass | Visible on focus, `brand-deep` on white 11.01:1, targets `#main-content` which is `tabindex="-1"`. |
| `AppHeader` | ✅ pass | Layout only, no interactive elements of its own. |
| `AppLogo` | ✅ pass | Linked home, `alt` from `site.name`, intrinsic size matches each asset. |
| `AppSearchField` | ⚠ partial | Audited and repaired this session — see A11Y-04/05/07/08 in Closed. Focus indicator is now a 1px colour change by decision — **A11Y-09**. |
| `AppCartSummary` | ⚠ partial | Passes AA. `aria-label` suppresses the visible subtotal for screen readers — **A11Y-03**. |
| `AppNav` | ❌ **fail** | Mega-menu focus ring is white on a white panel, 1:1 — **A11Y-01**. |
| `AppMobileDrawer` | ✅ pass | reka-ui `Dialog` gives focus trap, Escape, and focus restore. Labels on trigger and close. `white/60` group labels on ink 5.71:1. |
| `AppPartnerStrip` | ✅ pass | Tile borders are 1.25:1 but the tiles are non-interactive and carry their own text, so 1.4.11 does not apply. |
| `AppSupportBlock` | ❌ **fail** | Four form controls with a 1.25:1 boundary — **A11Y-02**. Submit button has no hover/active/pointer — **A11Y-06**. |
| `AppFooter` | ✅ pass | Columns are labelled `nav` landmarks; `white/70` meta text 7.20:1. |
| `layouts/default` | ✅ pass | Landmark order header → main → footer; skip-link target present. |
| `pages/search` | ✅ pass | Single `h1`, no interactive content yet. |
| `pages/index` | — n/a | Phase 1 token-verification scratch page, replaced in Phase 3. Not audited; note that its locale switcher marks the current locale by colour alone. |

Page level, both locales: `<html lang="sv-SE">` / `lang="en-GB"` ✓ (3.1.1), single `h1` with no skipped levels ✓ (1.3.1).

## Open Findings

### A11Y-01 — Mega-menu focus ring is invisible ❌

**`AppNav.vue`, SC 2.4.7 (AA).** `.on-ink` sets `--color-focus: var(--color-surface)` so the ring stays visible on the dark bar. Custom properties inherit by DOM position, and `NavigationMenuContent` renders *inside* that element — reka-ui only teleports it when a `NavigationMenuViewport` exists, and `AppNav` has none, so its `Teleport` is disabled. The panel is `bg-surface`, so every mega-menu link gets a **white ring on a white panel: 1:1**. Keyboard users lose their position entirely inside the largest navigation surface on the site.

Fix: re-assert `--color-focus` on the panel, since it is a light surface living inside a dark band. The panel already opts out of `.on-ink`'s colours (`bg-surface text-ink`); it should opt out of its focus colour too.

⚠ Confirm by tabbing into an open mega menu once a browser is available.

### A11Y-02 — Support form controls have no visible boundary ❌

**`AppSupportBlock.vue`, SC 1.4.11 (AA).** The name, email, and message controls use `border-black/10` = `#e6e6e6` = **1.25:1** against their own white fill, where 3:1 is required. The surrounding band is `surface-sunken` `#f0f0f0`, so the fill differs from the page by only **1.12:1** — the boundary cannot be inferred from the fill either.

This is the identical defect already fixed in `AppSearchField` (A11Y-04). `border-black/45` (`#8c8c8c`, 3.36:1) is the first step on the alpha scale that clears the bar.

### A11Y-09 — Search field's focus indicator is a 1px colour change ⚠

**`AppSearchField.vue`, SC 1.4.11 (AA).** The input's focus indicator was reduced to its own 1px border turning `focus` — no ring — by product decision, so the pill reads as one hairline outline in every state. The border colour is the only thing that changes, and `black/45` `#8c8c8c` → `focus` `#d63494` is **1.31:1**. Where a state is signalled by a contrast change alone, 1.4.11 wants 3:1 between the two states; a low-vision user tabbing into the header may not see that the field took focus at all. The pink itself is fine against what surrounds it (4.40:1 on the white fill, 3.93:1 on the header grey) — it is the grey-to-pink *step* that is small.

Three ways out, cheapest first, none of which thicken the border:

- Focus to `brand-deep` `#64254b` instead of `focus`: **3.27:1** against the unfocused grey, 11.01:1 on the white fill. Clears the bar with a one-token change, but the focused field is plum rather than brand pink.
- Focus to `ink` `#323232`: **3.81:1**, and no brand colour spent on a state — but it reads as "disabled-ish" next to the pink submit button.
- Lighten the *resting* border so the step is bigger. Blocked: A11Y-04 raised it to `black/45` precisely because anything lighter fails 1.4.11 against the white fill.

⚠ Decided knowingly, recorded so it is a choice rather than an oversight. Confirm against a real low-vision pass before it is closed.

### A11Y-03 — Cart link hides its own subtotal from assistive tech ⚠

**`AppCartSummary.vue`, information parity.** The link's `aria-label` is the item count, which *replaces* rather than supplements the inner text — so the visible subtotal and "excl. VAT" line are never announced. Not a clean AA failure (the visible text is a value, not a label, so 2.5.3 does not bite), but sighted and non-sighted users are given different information by the same control.

Fix: drop the `aria-label` and let the inner text form the accessible name, moving the count into visually-hidden text so it is announced in reading order.

### A11Y-06 — Support submit button has no hover, active, or pointer ⚠

**`AppSupportBlock.vue`, usability.** Same three gaps `AppSearchField`'s button had before this session: no hover colour, no press state, and no `cursor-pointer` (Tailwind v4's preflight stopped supplying it). No SC requires a hover state, so this is not a failure — but it is the last unstyled primary button in the codebase, and the fix is already decided in `DESIGN-TOKENS.md`.

## Closed

| ID | Component | What it was |
| --- | --- | --- |
| A11Y-04 | `AppSearchField` | Input boundary `black/10`, 1.25:1 vs the required 3:1 → `black/45`, 3.36:1. |
| A11Y-05 | `AppSearchField` | Submit button's focus ring was `brand` on `brand-strong` — **1.24:1**, effectively invisible → white, 5.46:1, drawn inset. |
| A11Y-07 | `AppSearchField` | Focus ring on the input was an *outer* ring on a half-rounded control, so it drew a square edge across the submit button. Both halves now ring themselves inset. |
| A11Y-08 | `AppSearchField` | The inset rings from A11Y-05/07 were `outline`s. An outline is positioned independently of its element, so when the field's flexible width put the seam on a fractional pixel Firefox snapped it a pixel short and left a white sliver between the input's ring and the submit button — the ring read as a stray divider bar. Neither ring is an outline any more: the input dropped its ring entirely (A11Y-09) and the button's is a pseudo-element border, which also keeps it on the pill's curve in WebKit before Safari 16.4. Compared side by side in headless Firefox and Chrome. |

## Known AAA Gaps

Recorded so they are decisions rather than oversights. None of these fail the AA bar.

- **2.5.5 Target Size (44×44)** — the search submit button is 60×42, two pixels short. Every other control clears it. Under WCAG 2.2's AA equivalent (2.5.8, 24×24) everything passes comfortably.
- **1.4.6 Contrast (Enhanced, 7:1)** — `brand-strong` text tops out at 5.46:1 on white. Raising it would break the visual direction the rebuild is preserving.

<!-- ─────────────────────────────────────────────────────────────────────────
     COMMENTS — working notes from the audit pass, not audit results.
     Safe to delete wholesale; nothing above depends on this section.
     ───────────────────────────────────────────────────────────────────── -->

## Comments

Observations from reading the components that are not accessibility findings.

**The weak-border pattern is systemic, not local.** `border-black/10` appears in `AppSearchField` (fixed), `AppSupportBlock` (A11Y-02), `AppPartnerStrip`, and `pages/index`. Only the first two are violations, because only they wrap interactive controls — but it is one habit producing both, and it will keep producing them. A `--color-border-field` token set to a value that clears 3:1 would make the correct choice the default one. Worth considering before more form components land.

**Spacing tokens have one adopter.** `AppHeader` uses `px-gutter` / `py-stack`; `AppFooter`, `AppSupportBlock`, `AppPartnerStrip`, and both pages still hardcode `px-4 py-12`. Not urgent, but the longer the split lasts the more call sites have to be revisited later.

**`cursor-pointer` is missing project-wide.** Tailwind v4's preflight no longer sets it on `<button>`. `AppSearchField` was fixed inline; `AppMobileDrawer`'s trigger and close, and `AppSupportBlock`'s submit, still show the default arrow. A single `@layer base` rule for `button:not(:disabled)` would close all of them at once and prevent recurrence — probably better than patching each component.

**`AppSupportBlock` is the most complex thing built so far** and the only real form. It is the natural place for the first validation-error pattern, and the checklist's "error summaries" and "errors associated with their field" lines are currently untested because nothing can fail — `onSubmit` only flips a local flag. Expect this component to need a second audit once a backend exists.

**`AppPartnerStrip` names its region twice** — `aria-label` on the `<section>` plus a visible `<h2>` with the same string. Harmless (the `aria-label` simply wins), but `aria-labelledby` pointing at the heading would keep the two from drifting apart when the copy changes.

**`pages/index` is scratch.** It renders the palette and type scale to prove the tokens are wired, and Phase 3 replaces it. Its locale switcher signalling the active locale by background colour alone would be a 1.4.1 finding on a real page; it is listed here rather than above so it is not mistaken for shipped work.

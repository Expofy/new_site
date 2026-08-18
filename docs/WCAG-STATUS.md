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

**Most of this is not verified in a browser.** The project has no Playwright or Puppeteer, so findings are derived from source and computed values rather than from a rendered screenshot, a real screen-reader pass, or a real keyboard walk. The exceptions are the three rendering claims: A11Y-08, compared in headless Firefox and Chrome; A11Y-01, screenshotted in headless Chrome with the focus declarations forced on; and A11Y-11, screenshotted the same way before and after, with the control geometry read back from `getBoundingClientRect()`. Anything marked ⚠ should also be confirmed by hand before it is closed.

## Status

| Component | Status | Notes |
| --- | --- | --- |
| `AppSkipLink` | ✅ pass | Visible on focus, `brand-deep` on white 11.01:1, targets `#main-content` which is `tabindex="-1"`. |
| `AppHeader` | ✅ pass | Layout only, no interactive elements of its own. |
| `AppLogo` | ✅ pass | Linked home, `alt` from `site.name`, intrinsic size matches each asset. |
| `AppSearchField` | ⚠ partial | Audited and repaired — see A11Y-04/05/07/08 in Closed. Focus indicator is a 1px colour change by decision — **A11Y-09**. Now renders twice (header + drawer); the instances take separate `id`s and the drawer's drops `role="search"` so there is one search landmark. |
| `AppCartSummary` | ⚠ partial | Passes AA. `aria-label` suppresses the visible subtotal for screen readers — **A11Y-03**. |
| `AppNav` | ✅ pass | Mega-menu rebuilt this session. A11Y-01 closed: the panel re-asserts `--color-focus`, verified pink not white in headless Chrome. Panel and column headings name their lists via `aria-labelledby`; tile images are `alt=""` because the label beside them is the link's name. |
| `AppMobileDrawer` | ✅ pass | Rebuilt this session as a full-bleed light panel. reka-ui `Dialog` gives focus trap, Escape, and focus restore; `Accordion` headers are `h2` so no level is skipped. Section bars are `.on-ink`, white on ink 12.82:1; teal column headings on white 4.54:1. |
| `AppHero` | ⚠ partial | APG carousel: `aria-roledescription`, per-slide `role="group"` with "N of M", `aria-live` that is `off` while rotating and `polite` once stopped. One control stops both rotation and video (2.2.2); rotation also holds on hover and focus. Dots are 24×24 targets marked by width as well as fill. A11Y-11 closed: the arrows and the pause button ring themselves inset, so the indicator stays on their own pill instead of the slide. **Not verified with a screen reader** — the live region is the part that most needs it. |
| `AppHeroSlide` | ⚠ partial | Contrast holds **only because the scrim is on** — see A11Y-10. Background video is `aria-hidden` decoration; it plays only while its slide is active and the hero is unpaused. Focus rings follow the text theme; the overlay button's is white on the scrim, 5.74:1 at worst, which is why the scrim test now counts a button as overlay content. Embeds cannot autoplay because `allow` omits the `autoplay` feature — 2.2.2 would want a pause control this component cannot give a cross-origin player. |
| `AppPartnerStrip` | ✅ pass | Tile borders are 1.25:1 but the tiles are non-interactive and carry their own text, so 1.4.11 does not apply. |
| `AppSupportBlock` | ❌ **fail** | Four form controls with a 1.25:1 boundary — **A11Y-02**. Submit button has no hover/active/pointer — **A11Y-06**. |
| `AppFooter` | ✅ pass | Columns are labelled `nav` landmarks; `white/70` meta text 7.20:1. |
| `layouts/default` | ✅ pass | Landmark order header → main → footer; skip-link target present. |
| `pages/search` | ✅ pass | Single `h1`, no interactive content yet. |
| `pages/index` | — n/a | Phase 1 token-verification scratch page, replaced in Phase 3. Not audited; note that its locale switcher marks the current locale by colour alone. |

Page level, both locales: `<html lang="sv-SE">` / `lang="en-GB"` ✓ (3.1.1), single `h1` with no skipped levels ✓ (1.3.1).

## Open Findings

### A11Y-10 — Hero overlay contrast is only as good as its scrim ⚠

**`AppHeroSlide.vue`, SC 1.4.3 (AA).** The overlay sits on a photograph or a video frame, so nothing in the data says what colour is behind the text. The only thing that makes it measurable is "Add dark overlay behind text", and the renderer sizes that scrim for its worst case — the media being the opposite extreme of the text:

- Light text: `black/60` over a pure white frame composites to `#666`, and white on `#666` is **5.74:1**. Any darker media only helps. (`black/45`, the more usual choice, gives `#8c8c8c` and **3.36:1** — enough for the headline as large text, not for the paragraph.)
- Dark text: `white/70` over pure black composites to `#b2b2b2`, and `ink` on `#b2b2b2` is **6.05:1**.

So a scrimmed slide passes whatever the media is. **A slide with the scrim off does not have a knowable contrast at all** — it depends on the frame. `test/hero.test.ts` fails the build if data puts light text on media without one, which covers the case that actually goes wrong; dark text on a pale image is left to editorial judgement because the test cannot see the image either.

The test counts the overlay button as light content too, which it did not before A11Y-11. Not for its label — white on `brand-strong` reads whatever is behind the slide — but for its focus ring, which is white and drawn outside the pill. On a scrim that is 5.74:1 at worst; on raw media it is exactly as unknowable as the text. So an overlay that is a button and nothing else now needs the scrim as well.

⚠ Whoever connects the backend should keep this test, or the setting becomes decoration and the failure mode returns silently.

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
| A11Y-01 | `AppNav` | Mega-menu focus ring was white on a white panel, **1:1**. `.on-ink` sets `--color-focus: var(--color-surface)` so the ring stays visible on the dark bar; custom properties inherit by DOM position, and `NavigationMenuContent` renders *inside* that element — reka-ui only teleports it when a `NavigationMenuViewport` exists, and there is none here. The panel now re-asserts `--color-focus: var(--color-brand)`, the same way it already opted out of the band's background. **Verified**, not derived: the focus declarations were forced onto every panel link and screenshotted in headless Chrome — the ring draws pink (3.93:1 on white), not white. |
| A11Y-04 | `AppSearchField` | Input boundary `black/10`, 1.25:1 vs the required 3:1 → `black/45`, 3.36:1. |
| A11Y-05 | `AppSearchField` | Submit button's focus ring was `brand` on `brand-strong` — **1.24:1**, effectively invisible → white, 5.46:1, drawn inset. |
| A11Y-07 | `AppSearchField` | Focus ring on the input was an *outer* ring on a half-rounded control, so it drew a square edge across the submit button. Both halves now ring themselves inset. |
| A11Y-11 | `AppHero` | The carousel's own controls drew their focus ring **on the slide**. `:focus-visible` is `outline-offset: 2px`, so the white ring landed 2px outside each control's dark pill, on media nobody has measured — and on the HTML slide, whose background is `surface-sunken`, white is **1.10:1**: no visible indicator at all. Measured, not guessed: the arrows are 44×44 with no backdrop of their own but their own `black/60`, and the pause button is 40px tall inside a 40px pill, so its ring cleared the pill's top and bottom edges by exactly 2px. Both now suppress the outline and draw a 2px white border inset 4px — the A11Y-05/07/08 pseudo-element again — which puts the indicator on `black/60`, 5.74:1 even over a pure white frame. The dots are 24px in a 40px pill, so their outset ring already landed on the pill and was left alone. **Verified**: the focus declarations were forced onto every hero control and the HTML slide screenshotted in headless Chrome before and after — nothing visible before, a ring on the pill after. |
| A11Y-08 | `AppSearchField` | The inset rings from A11Y-05/07 were `outline`s. An outline is positioned independently of its element, so when the field's flexible width put the seam on a fractional pixel Firefox snapped it a pixel short and left a white sliver between the input's ring and the submit button — the ring read as a stray divider bar. Neither ring is an outline any more: the input dropped its ring entirely (A11Y-09) and the button's is a pseudo-element border, which also keeps it on the pill's curve in WebKit before Safari 16.4. Compared side by side in headless Firefox and Chrome. |

## Known AAA Gaps

Recorded so they are decisions rather than oversights. None of these fail the AA bar.

- **2.5.5 Target Size (44×44)** — the search submit button is 60×42, two pixels short, and the drawer's text-only menu rows are 40px tall. Both clear WCAG 2.2's AA equivalent (2.5.8, 24×24), as does everything else. Mega-menu text links needed `py-1` to get there: an inline box is only as tall as its glyphs, so without padding a 16px link is roughly 19px, under the 24px bar.
- **1.4.6 Contrast (Enhanced, 7:1)** — `brand-strong` text tops out at 5.46:1 on white. Raising it would break the visual direction the rebuild is preserving.

<!-- ─────────────────────────────────────────────────────────────────────────
     COMMENTS — working notes from the audit pass, not audit results.
     Safe to delete wholesale; nothing above depends on this section.
     ───────────────────────────────────────────────────────────────────── -->

## Comments

Observations from reading the components that are not accessibility findings.

**The outgoing hero slide stays in the accessibility tree for the length of the fade.** The cross-fade holds the outgoing slide at full opacity underneath the incoming one and only hides it once the fade is over, because hiding it up front is what made the hero flash its own background — so for 500ms after a slide change, two slides are visible to assistive tech instead of one. Nothing announces twice: a live region's default `aria-relevant` is `additions text`, so the removal is not spoken. The residue is that a screen-reader user moving through the hero during that window can meet the slide that just left. Half a second, and the alternative is a visible flash for everyone.

**The hero's arrows sit on top of the overlay text on a narrow viewport.** Not an SC — WCAG 2.1 AA has nothing about content obscuring other content, and 2.4.11 Focus Not Obscured is 2.2 — but it is a real defect. The arrows are pinned to `left-4` / `right-4` at the vertical middle whatever the viewport is, while the overlay column grows to fill it. Measured at a 500px viewport: the headline box runs x 24–461 and y 293–418, the previous arrow 16–60 and 395–439, so the pill covers the start of the headline's last line. At 1280 the headline starts at x 240 and there is no contact. The usual treatment is to drop the arrows below `md` and leave the dots, which are keyboard-operable and do the same job.

**The background video has no text alternative (SC 1.2.1, Level A).** A muted, looping `<video>` is prerecorded video-only content, and 1.2.1 asks for an alternative for it. The position taken here is that it is decoration — it is `aria-hidden`, it carries no information the overlay headline does not, and its poster is the same picture. That is the common reading and almost certainly the right one, but it is a judgement rather than a pass, so it is written down. It stops being defensible the moment a slide's video says something the overlay does not.

**The hero's headline is an `h2` and comes before the page's `h1`.** Deliberate on the component's side: a rotating group of three slides cannot each hold the page's `h1`. But on `pages/index` it means the first heading in the document is an `h2` — the `h1` is below the hero, in the Phase 1 scratch content. The status table's "single `h1` with no skipped levels" line predates the hero and no longer describes this page. Phase 3 has to decide where the front page's `h1` actually lives.

**Reduced motion is sampled once.** `matchMedia('(prefers-reduced-motion: reduce)')` is read in `onMounted` and never listened to, so a user who changes the OS setting with the page open keeps the old behaviour until reload. Nothing requires otherwise; a `change` listener would be two lines. The `autoplay` attribute also stays on the `<video>` element so a first-paint slide starts without waiting for JavaScript, which means a reduced-motion user sees a moment of video before the mount pauses it.

**The mega-menu tile border is decoration, not a control boundary.** The image panels draw each 64px tile with `border-black/10` — 1.25:1, the same weak border A11Y-02 is about. It is not a 1.4.11 failure here for the reason `AppPartnerStrip` passes: what identifies the link is the label beside the tile, which is also its accessible name, and the tile itself is `alt=""`. If the label is ever dropped so the tile becomes the whole target, this border has to clear 3:1.

**The weak-border pattern is systemic, not local.** `border-black/10` appears in `AppSearchField` (fixed), `AppSupportBlock` (A11Y-02), `AppPartnerStrip`, `AppNav`/`AppMobileDrawer` (tiles, above), and `pages/index`. Only the first two are violations, because only they wrap interactive controls — but it is one habit producing both, and it will keep producing them. A `--color-border-field` token set to a value that clears 3:1 would make the correct choice the default one. Worth considering before more form components land.

**Spacing tokens have one adopter.** `AppHeader` uses `px-gutter` / `py-stack`; `AppFooter`, `AppSupportBlock`, `AppPartnerStrip`, and both pages still hardcode `px-4 py-12`. Not urgent, but the longer the split lasts the more call sites have to be revisited later.

**`cursor-pointer` is missing project-wide.** Tailwind v4's preflight no longer sets it on `<button>`. `AppSearchField`, `AppMobileDrawer`'s trigger/close/accordion and `AppNav`'s trigger were each fixed inline; `AppSupportBlock`'s submit still shows the default arrow. A single `@layer base` rule for `button:not(:disabled)` would close all of them at once and prevent recurrence — probably better than patching each component.

**`AppSupportBlock` is the most complex thing built so far** and the only real form. It is the natural place for the first validation-error pattern, and the checklist's "error summaries" and "errors associated with their field" lines are currently untested because nothing can fail — `onSubmit` only flips a local flag. Expect this component to need a second audit once a backend exists.

**`AppPartnerStrip` names its region twice** — `aria-label` on the `<section>` plus a visible `<h2>` with the same string. Harmless (the `aria-label` simply wins), but `aria-labelledby` pointing at the heading would keep the two from drifting apart when the copy changes.

**`pages/index` is scratch.** It renders the palette and type scale to prove the tokens are wired, and Phase 3 replaces it. Its locale switcher signalling the active locale by background colour alone would be a 1.4.1 finding on a real page; it is listed here rather than above so it is not mistaken for shipped work.

# Design Tokens

Design tokens extracted from the Saved Pages in `old_site/`, then audited for WCAG 2.1 contrast. This is the Phase 1 prerequisite: tokens are fixed here before component work begins.

## Extraction Method

- Source of truth is the CSS the old site actually shipped, not the screenshots.
- The old site is WordPress with the GeneratePress theme, GenerateBlocks, WooCommerce, and Max Mega Menu.
- The theme palette is declared as CSS custom properties in a `:root` block present in every Saved Page.
- WP Rocket inlines a merged `wpr-usedcss` stylesheet into `Front page/*.html` and `Category page/*.html`. Those two pages carry the fullest picture; the other pages keep their CSS in `*_files/`.
- WooCommerce, Font Awesome, and Max Mega Menu ship their own custom properties (`--wc-*`, `--fa-*`, `--navigation-layout-*`). Those are plugin defaults, not brand tokens, and are excluded.

## Color Primitives

The GeneratePress global palette, verbatim from the Saved Pages:

| Theme name | Value | Role on the old site |
| --- | --- | --- |
| `--accent` | `#d63494` | Brand pink: logo, primary buttons, search submit, link hover, highlighted search terms |
| `--contrast-2` | `#64254b` | Deep plum: link color, button hover/active, emphasis text |
| `--contrast-3` | `#f5e5ee` | Pale pink tint: notice panels, soft surfaces, input focus border |
| `--contrast` | `#323232` | Body text, dark navigation bar, footer background |
| `--base` | `#f0f0f0` | Light surface |
| `--base-2` | `#f7f8f9` | Card/panel surface, input background |
| `--base-3` | `#ffffff` | Page background |

Additional non-palette colors observed in shipped rules:

- `#f2f2f2` — topbar and header background.
- `#666666`, `#767676`, `#515151` — secondary and muted text.
- `#958e09` — WooCommerce listing price color (plugin default, olive).

### Support Teal

`#33746f` is a second brand color that does not live in the GeneratePress palette but is used deliberately throughout: the "Behöver du hjälp?" support block heading, the phone and email contact pills, mega-menu column headings, and link hover in several content blocks. It is the site's help-and-contact voice, distinct from the commerce pink.

It was missed in the first extraction pass — it appears 23 times in the front-page CSS and was wrongly filtered out as plugin noise. The account-page references made it unmissable, since the support block sits on every one of them.

`#00796b` also appears, as the mega-menu badge background. Same teal family, plugin-configured. Folded into the one support token rather than kept separately.

## Contrast Audit

Ratios computed against WCAG 2.1: 4.5:1 normal text, 3:1 large text (≥24px, or ≥19px bold) and non-text UI.

| Foreground | Background | Ratio | Normal text | Large text / UI |
| --- | --- | --- | --- | --- |
| `#323232` ink | `#ffffff` | 12.82 | pass | pass |
| `#323232` ink | `#f7f8f9` | 12.06 | pass | pass |
| `#323232` ink | `#f0f0f0` | 11.25 | pass | pass |
| `#323232` ink | `#f5e5ee` | 10.58 | pass | pass |
| `#ffffff` | `#323232` nav/footer | 12.82 | pass | pass |
| `#64254b` plum | `#ffffff` | 11.01 | pass | pass |
| `#64254b` plum | `#f5e5ee` | 9.08 | pass | pass |
| `#ffffff` | `#64254b` plum | 11.01 | pass | pass |
| **`#d63494` accent** | **`#ffffff`** | **4.40** | **fail** | pass |
| **`#ffffff`** | **`#d63494` accent** | **4.40** | **fail** | pass |
| `#d63494` accent | `#f0f0f0` | 3.86 | fail | pass |
| `#d63494` accent | `#f5e5ee` | 3.63 | fail | pass |
| `#d63494` accent | `#323232` nav | 2.92 | fail | fail |
| `#767676` muted | `#ffffff` | 4.54 | pass | pass |
| `#666666` muted | `#ffffff` | 5.74 | pass | pass |
| `#999999` | `#ffffff` | 2.85 | fail | fail |
| `#958e09` woo price | `#ffffff` | 3.41 | fail | pass |
| `#33746f` support teal | `#ffffff` | 5.43 | pass | pass |
| **`#33746f` support teal** | **`#f5e5ee` tint** | **4.48** | **fail** | pass |
| `#790000` required red | `#ffffff` | 11.58 | pass | pass |
| `#ffffff` | `#64254b` account tab bar | 11.01 | pass | pass |

### Findings

1. **The brand pink fails AA for normal text by a hair — 4.40 against the required 4.5.** This is the one real problem, and it is load-bearing: it is the primary button fill with white labels, the search submit, and the link hover color. Every primary CTA label on the old site is below AA.
2. **Pink on the dark navigation bar fails outright (2.92)** and cannot be fixed by nudging lightness. Pink must not be used for text or icons on `#323232`.
3. `#999999` and the WooCommerce `#958e09` price color both fail. Neither is a brand decision, so both are dropped.
4. **The support teal fails on the pink tint (4.48)** — by 0.02 — and passes everywhere else. Same shape of problem as the accent, and it gets the same treatment.
5. Everything else in the palette passes comfortably. The plum, the ink, and the surfaces need no change.

### Decisions

Per PROJECT-PLAN — preserve the visual direction, improve where WCAG requires — the fix is the smallest one that clears AA:

- **Keep `#d63494` as the brand accent** for non-text use only: fills behind large text, borders, decorative marks, and the logo. It passes the 3:1 non-text bar on every light surface. It never carries text.
- **Add `--accent-strong: #c02781`** as the token for accent-colored *text* at normal size, and as the fill under white button labels.
- **Button hover/active stays `#64254b`**, as on the old site. White on plum is 11.01.
- **Pink never carries text or icons on the dark bar.** Use white or `#f5e5ee` there.
- **Muted text floor is `#666666`** on white surfaces. `#767676` passes at 4.54 but has no margin, so it is not adopted.
- **Prices use ink**, not the WooCommerce olive.
- **Add `--support: #33736e`** for the help/contact voice, darkened one unit from `#33746f` so it clears 4.5:1 on the pink tint too. Same reasoning as the accent: unconditionally safe beats conditionally safe.
- **Add `--critical: #790000`** for required-field markers and validation errors, taken as-is from the shipped forms. It passes everywhere (11.58 on white).

`#c02781` was chosen so it clears 4.5:1 against *every* surface token, not just white. An earlier candidate (`#ca2988`, 5.02 on white) cleared white and `surface-raised` but failed on the pink tint (4.14), the sunken band (4.40), and the header grey (4.48) — exactly the panels the old site puts pink text on. A token that is only conditionally safe puts the burden on every future call site to remember which background it is on, so it was rejected in favor of one that is unconditionally safe:

| `#c02781` on | Ratio |
| --- | --- |
| `#ffffff` surface | 5.46 |
| `#f7f8f9` surface-raised | 5.13 |
| `#f2f2f2` surface-header | 4.87 |
| `#f0f0f0` surface-sunken | 4.79 |
| `#f5e5ee` brand-tint | 4.50 |

### Focus Ring

The focus ring is its own token, `--color-focus`, defaulting to `brand` — which clears the 3:1 non-text bar on every light surface (4.40 on white, 3.93 on the header grey).

It fails on the dark bands: `brand` against `#323232` is **2.92**. The top navigation and the footer are both ink on the Saved Pages, so a single global pink focus ring would be non-conformant across the whole header and footer. The `.on-ink` component class flips `--color-focus` to white (12.82 on ink) for anything inside those bands.

The 4.5 threshold could also be cleared by making every button label ≥19px bold and treating it as large text. Rejected: it constrains typography everywhere to protect one color, and it does nothing for accent-colored body links.

It also fails on its own accent fills. `focus` against `brand-strong` — the primary button fill — is **1.24:1**, which is worse than the dark-band case and for the same reason: a pink ring on a pink surface. `.on-ink` does not help here, because a primary button is not inside an ink band. **Any control filled with `brand`, `brand-strong`, or `brand-deep` must draw its focus ring in white** (5.46:1 on `brand-strong`), inset so it stays inside the fill. The search submit button is the first instance.

Where two controls are welded into one shape — the search input and its submit button form a single pill — **each half indicates focus inside itself**. The base rule's `outline-offset: 2px` is an *outer* ring, and on a half whose adjoining edge is square it draws a straight edge across its neighbour. Neither half may use it.

The white field's indicator is therefore **its own 1px border turning `focus`, and nothing else** — the pill keeps one hairline outline in every state. That is a product decision with a measured cost: grey-to-pink is a 1.31:1 step where 1.4.11 wants 3:1 for a state signalled by contrast alone. It is tracked as A11Y-09 in `WCAG-STATUS.md`, which lists the token swaps that would buy the step back without thickening anything.

Anything thicker has to be drawn *outside* that border, and the mechanism matters. An `outline` is positioned independently of the element it belongs to, so whenever a flexible width puts an edge on a fractional pixel the two snap apart; Firefox did exactly that here, leaving a 1px white sliver between the input's old inset ring and the submit button, so the ring read as a stray divider bar splitting the pill, while Chrome showed no gap at all. **An inset ring on a rounded control is a `box-shadow`, never an `outline`**: an inset shadow is painted with the element's own background, on the same snapped box, so it cannot drift, and it follows `border-radius` in every engine including Safari before 16.4, which drew outlines as plain rectangles. Where the ring must sit *inside* the edge rather than on it — the submit button's white ring, 4px in — the same reasoning makes it a pseudo-element border, since a shadow cannot be offset inward.

Suppressing the base rule to make room for these uses `outline-hidden`, not `outline-none`: it drops the visible outline but keeps a transparent one under `forced-colors`, where the UA repaints outlines and drops box-shadows entirely.

A wrapper-level `:has(:focus-visible)` ring around the whole pill was tried and rejected: it reads as one shape, but it cannot say which half holds focus, and it puts brand pink around a control that is half brand pink already. Per-half indicators also let the white field turn its own border `focus`, which an outer wrapper ring cannot do.

## Semantic Tokens

Proposed Tailwind theme tokens. Primitives above map to intent so components never reference raw hex.

| Token | Value | Use |
| --- | --- | --- |
| `brand` | `#d63494` | Non-text brand fills, borders, decorative. Never text |
| `brand-strong` | `#c02781` | Accent text, primary button fill under white labels |
| `focus` | `#d63494` | Focus ring on light surfaces; `.on-ink` overrides to white |
| `brand-deep` | `#64254b` | Links, button hover/active, emphasis |
| `brand-tint` | `#f5e5ee` | Soft surfaces, notice panels, active input border |
| `support` | `#33736e` | Help/contact block headings, contact pills |
| `critical` | `#790000` | Required-field markers, validation errors |
| `ink` | `#323232` | Body text, dark nav, footer |
| `ink-muted` | `#666666` | Secondary text, metadata |
| `surface` | `#ffffff` | Page background |
| `surface-raised` | `#f7f8f9` | Cards, panels, inputs |
| `surface-sunken` | `#f0f0f0` | Section bands |
| `surface-header` | `#f2f2f2` | Topbar |

Error state is defined above as `critical`. **Success and warning** still have no brand definition — the old site used WooCommerce plugin defaults (`#7ad03a`, `#ffba00`), both of which fail contrast badly and neither of which was chosen. They stay deferred to the first template that needs them.

## Typography

- Family: **Outfit**, `sans-serif` fallback. Single family across the site; no serif or secondary display face.
- Weights observed: 400 body and headings, 600 footer headings, 700 emphasis and sale prices.
- Heading scale (desktop, from shipped rules): h1 42px, h2 35px, h3 29px, h4 24px.
- Headings share `line-height: 1.2em`, `font-weight: 400`, `margin-bottom: 20px`, no text-transform.
- Body 16px. Small 14px. Footer body 15px, footer contact links 17px, footer headings 20px/600.
- One fluid heading exists on the old site: `clamp(28px, 4.6vw, 52px)`. Fluid heading sizing is the better default for the rebuild and should be applied to the h1/h2 scale rather than fixed px.

Note: heading weight 400 at 42px is a deliberate light look. It is preserved, but heading contrast must then hold at ink on white — accent-colored headings at 400 weight are large text and may use `brand`.

## Layout And Shape

- Content container: **1500px** max width (`--gb-container-width`, and the theme's `.grid-container` override). GeneratePress's stock 1200px is overridden and is not the site value.
- Breakpoints in use: **768px**, **1024px**, **1366px**. A handful of plugin rules use 767/769/1025 boundaries; the rebuild should normalize to Tailwind's `md` 768, `lg` 1024, and a custom `xl` at 1366.
- Border radius: `30px` pill for buttons and CTAs; `20px` on the search field's trailing edge; `4px`/`5px`/`8px` on smaller surfaces; `50%`/`100%` for circular. Adopt a three-step scale — pill (`9999px`), medium (`8px`), small (`4px`) — rather than carrying seven values.
- Button padding: `15px 20px` and `15px 25px`. Snapped to the 4px grid (below) these are `py-4 px-5` and `py-4 px-6`. No token — padding that belongs to one component is a component decision.
- Vertical rhythm: `20px` heading margin-bottom is the dominant spacing unit; the 4px-based Tailwind scale covers it.

## Spacing

Extracted the same way as the colors: from the spacing declarations the Saved Pages actually shipped, counted across the two pages carrying the full inlined `wpr-usedcss`. Only author-authored rules were counted — GenerateBlocks containers and grids, and the GeneratePress article/container rules. Plugin defaults were excluded.

| Value | Where it appears | Frequency |
| --- | --- | --- |
| `10px` | Small paddings, `row-gap` | High |
| `15px` | Content gutter `padding: 0 15px`, `gap: 15px`, button y-padding | High |
| `20px` | Heading `margin-bottom`, `column-gap`, small-screen container padding | High |
| `30px` | `.inside-article` at ≤768px, `padding: 0 30px`, section `margin-bottom` | High |
| `40px` | `.inside-article` on desktop, container side padding | High |
| `50px` | `column-gap`, section `margin-bottom` | Medium |
| `140px` / `210px` | Front-page hero top padding only (`210px`, `140px` at ≤767px) | 2 rules |

### Findings

1. **The old site runs on a 10px rhythm with a 15px half-step**, not on a 4px grid. `30px` and `50px` are the two values that have no equivalent on Tailwind's stock scale.
2. **Spacing is responsive, and it switches at 1024px, not at 768px.** `.inside-article` is `40px` desktop / `30px` at ≤768px, but the container side padding drops from `40px` to `20px`/`15px` under `@media (max-width:1024px)`. The 1024 boundary is the real one for layout spacing.
3. **The hero's `210px` top padding is a single-component value**, used in two rules on one page.

### Decisions

- **Snap the 10px rhythm onto Tailwind's 4px grid.** `30px → 32px`, `50px → 48px`; `10/15/20/40` are already on it or round cleanly. Worst-case drift is 2px, which is not perceptible, and it keeps `p-8` and `p-card` the same number. The alternative — carrying `30px` as a named token next to Tailwind's `p-8` at `32px` — was rejected: two values 2px apart that both look like "the card padding" is a call-site trap, and it buys nothing visible.
- **Rebasing `--spacing` to `0.125rem` was rejected.** It would make every 10px value exact, but every utility number would then double (`p-10` = 20px), diverging from every Tailwind reference a contributor would consult.
- **Name only the rhythms that repeat and that carry meaning.** Four tokens. Everything else uses the stock scale — a token per observed value would be a scale, not a system.
- **The three layout rhythms are fluid**, `clamp()`-interpolated from **360px to 1024px** and flat outside it — 1024px because that is where the shipped CSS actually switches (finding 2). This follows the fluid heading decision above: the call site writes `p-card` once and it is correct at every width, instead of every call site having to remember a `md:` variant that fails silently when forgotten.
- **`stack` is fixed at 20px.** It is the rhythm between elements inside a block and the h1–h4 `margin-bottom`; the old site never scaled it, and text rhythm does not need to.
- **No hero token.** One component, two rules — that is a component value, not a system one.

### Spacing Tokens

Defined under Tailwind's `--spacing-*` namespace, so each one generates the full utility family: `p-`, `px-`, `py-`, `m-`, `mb-`, `gap-`, `space-y-`, and so on.

| Token | Value | 360px | 1024px+ | Use |
| --- | --- | --- | --- | --- |
| `gutter` | `clamp(1.25rem, 0.572rem + 3.012vw, 2.5rem)` | 20px | 40px | Container side padding |
| `card` | `clamp(2rem, 1.729rem + 1.205vw, 2.5rem)` | 32px | 40px | Card, panel, and article padding |
| `section` | `clamp(2rem, 1.458rem + 2.41vw, 3rem)` | 32px | 48px | Vertical rhythm between page sections |
| `stack` | `1.25rem` | 20px | 20px | Rhythm between elements inside a block |

```html
<section class="mb-section">
  <div class="mx-auto max-w-(--container-site) px-gutter">
    <article class="p-card space-y-stack">…</article>
  </div>
</section>
```

Reach for the stock 4px scale (`p-2`, `gap-4`, `mt-6`) for anything these four do not name. A named token is a claim that the value means something; `10px` between an icon and its label does not.

## Open Questions

- Outfit needs a licensing and self-hosting decision. It is a Google Font; self-hosting with `font-display: swap` is assumed unless told otherwise.
- No status/state color palette exists. Deferred, see above.
- The old site has no dark mode. None is planned.

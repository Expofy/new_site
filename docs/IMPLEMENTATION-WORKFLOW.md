# Implementation Workflow

Use this workflow for every Saved Page and every new Template. The goal is to preserve the design direction while building accessible, reusable Nuxt components instead of copying exported markup blindly.

## 1. Collect References

- Receive screenshots, saved HTML, CSS, and assets where available.
- Identify desktop and mobile references separately.
- Note missing states such as hover, open drawer, validation errors, empty results, or checkout success.
- Record obvious accessibility or usability risks before implementation.

## 2. Decompose The Page

- Identify the page Template.
- Break the Saved Page into layouts, blocks, and components from docs/COMPONENT-INVENTORY.md.
- Reuse existing components where possible.
- Add a new component only when existing components cannot express the page without harming accessibility, usability, or maintainability.
- Mark which content is fake data and which behavior is local state.

## 3. Define Data Needs

- Map the page to fake data structures from docs/DATA-MODEL.md.
- Add or update typed fake data before building the page.
- Keep backend-owned concerns simulated, not permanent: slugs, filters, calculated logic, conditional logic, and final pricing.

## 4. Build

- Implement Nuxt page route and layout.
- Build or reuse Vue components.
- Style with Tailwind CSS and project design tokens.
- Use TypeScript props and typed data.
- Use Pinia for shared mutable state: cart, favorites, demo user, checkout, and fake orders.
- Keep components responsive from the start, not after desktop is finished.

## 5. Verify

- Test desktop layout against the Saved Page reference.
- Test mobile layout against the Saved Page reference.
- Check keyboard navigation and focus order.
- Review docs/ACCESSIBILITY-CHECKLIST.md.
- Check Swedish and English labels/content.
- Check loading, empty, error, selected, disabled, expanded, collapsed, and success states where relevant.
- Check cart, favorites, checkout, and order behavior when the page uses them.
- Check that text does not overlap, clip, or become unreadable.
- Check that drawers, modals, filter panels, and lightboxes manage focus correctly.

## 6. Document

- Update docs/COMPONENT-INVENTORY.md when a layout, block, or component changes.
- Update docs/DATA-MODEL.md when fake data structures change.
- Update CONTEXT.md when a domain term or relationship is clarified.
- Create an ADR only for decisions that are hard to reverse, surprising without context, and the result of a real trade-off.

## 7. Template Done Criteria

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

## Recommended Template Order

- Project shell and global layout
- Header, navigation, search, footer, mobile drawer
- Front page
- Category page with filters
- Product detail base layout
- Variation Product page
- Calculated Product page
- Simple Product page
- Cart and checkout
- Account pages
- Showroom listing and detail
- Blog/category of posts and article page
- Landing page

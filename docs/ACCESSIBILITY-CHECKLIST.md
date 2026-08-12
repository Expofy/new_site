# Accessibility Checklist

Use this checklist for every layout, reusable block, and page template before it is considered complete.

## Structure

- Semantic HTML is used for navigation, main content, sections, forms, buttons, lists, tables, and dialogs.
- Heading order is logical and does not skip levels for visual styling.
- Landmarks are present: header, nav, main, footer, and aside where appropriate.
- Breadcrumbs use accessible navigation markup.

## Keyboard And Focus

- All interactive elements are reachable by keyboard.
- Focus order matches the visual and task flow.
- Focus states are visible in desktop and mobile layouts.
- Drawers, modals, and lightboxes trap focus while open and restore focus on close.
- Escape closes dismissible overlays where expected.

## Forms

- Every input has a programmatic label.
- Required fields are communicated without relying on color alone.
- Help text is associated with its field.
- Validation errors are specific, actionable, and associated with their field.
- Error summaries are used for longer forms such as checkout when helpful.
- Number, select, file upload, checkbox, radio, swatch, and custom option controls are keyboard accessible.

## Visual Design

- Text and UI contrast meet WCAG expectations.
- Text remains readable when zoomed.
- Touch targets are comfortable on mobile.
- Text does not overlap, clip, or become unreadable at supported viewport sizes.
- State is not communicated by color alone.

## Media

- Product, showroom, article, and decorative images have appropriate alt text behavior.
- Galleries and lightboxes expose image position, captions, and close/previous/next controls accessibly.
- Uploaded file states are announced and visible.

## Commerce UX

- Price summaries are clear and update predictably.
- Default product values create a valid minimum-price configuration where possible.
- Invalid product form values show errors and tips.
- Cart and order line items show selected options, calculated values, uploads, quantity, and totals.
- Checkout steps are clear, recoverable, and validated.

## Responsive Behavior

- Desktop and mobile behavior is defined before implementation.
- Mobile navigation, filters, cart, checkout, product forms, and account pages are tested as first-class experiences.
- Drawers and sticky actions do not hide important content or controls.

## States

- Loading, empty, error, disabled, selected, expanded, collapsed, and success states are designed and implemented where relevant.
- Reduced-motion preferences are respected for nonessential animation.

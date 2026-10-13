import type { HeroSlide } from '~/types/hero'

/**
 * Fake hero slides, one per slide type, mirroring the live front page. Backend
 * owns these once the Slides post type is connected — see docs/PROJECT-PLAN.md.
 *
 * Only the lowest `order` in a group renders today; the rest are here so the
 * slider work has data to rotate through.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: 'front-video',
    group: 'front-page',
    order: 0,
    type: 'video',
    // The live site's own header video. It is 17 MB, so it stays a remote URL
    // rather than being committed — which is also what a Resource URL is: an
    // absolute link to a file this project does not host.
    resource: 'https://expofy.se/wp-content/uploads/2025/10/header_startsida_expofy_feeling_2.mp4',
    // Poster, shown before the video paints and whenever it is paused.
    image: '/hero/hero-print.jpg',
    imageAlt: { sv: '', en: '' },
    overlay: {
      headline: {
        sv: 'Expofy hjälper dig med ALLT du behöver för att synas',
        en: 'Expofy helps you with EVERYTHING you need to get noticed',
      },
      text: {
        sv: 'Projektledning · Grafisk design · Produktion · Montage',
        en: 'Project management · Graphic design · Production · Installation',
      },
      button: {
        label: { sv: 'Se alla produkter', en: 'See all products' },
        to: '/category',
      },
      alignX: 'center',
      alignY: 'middle',
      theme: 'light',
      dark: true,
    },
  },
  {
    id: 'front-image',
    group: 'front-page',
    order: 1,
    type: 'image',
    image: '/hero/hero-studio.jpg',
    imageAlt: { sv: '', en: '' },
    overlay: {
      headline: { sv: 'Från idé till färdig monter', en: 'From idea to finished booth' },
      text: {
        sv: 'Vi tar hand om original, tryck och montage – du tar hand om mötet.',
        en: 'We handle artwork, print and installation – you handle the meeting.',
      },
      button: {
        label: { sv: 'Kontakta oss', en: 'Contact us' },
        to: '/landing/kontakta-oss',
      },
      alignX: 'left',
      alignY: 'bottom',
      theme: 'light',
      dark: true,
    },
  },
  {
    id: 'front-html',
    group: 'front-page',
    order: 2,
    type: 'html',
    // The backdrop for the markup: a booth on the right, an empty sunlit wall
    // on the left for the text to sit on.
    image: '/hero/hero-booth.jpg',
    imageAlt: { sv: '', en: '' },
    // Authored in the admin's Custom HTML box. Rendered as-is — see the
    // security note in AppHeroSlide.vue. Plain elements only; `.hero-html` in
    // main.css gives them the house look.
    html: {
      sv: '<small>Vårt leveranslöfte</small><h2>Snabbleverans på <em>48&nbsp;timmar</em></h2><p>Beställ före 12.00 så lämnar din order tryckeriet inom två arbetsdagar.</p><ul><li>Fri frakt över 2&nbsp;000&nbsp;kr</li><li>Gratis korrektur</li><li>Svensk produktion</li></ul>',
      en: '<small>Our delivery promise</small><h2><em>48-hour</em> express delivery</h2><p>Order before noon and your job leaves the press within two working days.</p><ul><li>Free shipping over SEK&nbsp;2,000</li><li>Free proofs</li><li>Made in Sweden</li></ul>',
    },
    overlay: {
      alignX: 'left',
      alignY: 'middle',
      theme: 'dark',
      // On a phone the crop puts the booth behind the text; the scrim keeps
      // it readable there and is next to invisible on the wall.
      dark: true,
    },
  },
]

/** Slides of one Slider Group, in admin Order. */
export function slidesInGroup(group: string): HeroSlide[] {
  return heroSlides
    .filter(slide => slide.group === group)
    .sort((a, b) => a.order - b.order)
}

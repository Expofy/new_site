import type { Service } from '~/types/service'

/**
 * The six services of the front page's "Tjänster" block, in the order the
 * numbers on the cards run. Backend owns this list once the CMS is connected.
 *
 * There is no such block on the live site — it is new — but the services
 * themselves are not: all six are pages the old site already publishes, and
 * four of them are the ones the mega menu carries under "Behöver du hjälp?".
 * The block is a front-page entrance to pages that previously had none, so the
 * paths have to keep agreeing with the menu's; `test/services.test.ts` checks
 * the four that overlap.
 *
 * Array order is render order — a curated order, not a ranking. There is no
 * `order` field to disagree with it.
 *
 * `avancerad-filkontroll` and `snabbproduktion` live under `/tjanster/` on the
 * old site and are not in the mega menu. They get `/landing/` paths here like
 * their four siblings: they are the same kind of page, and the split was a
 * WordPress accident rather than a distinction worth carrying forward.
 */
export const services: Service[] = [
  {
    id: 'hjalp-original',
    eyebrow: { sv: 'Original', en: 'Artwork' },
    title: { sv: 'Hjälp med original', en: 'Help with artwork' },
    description: {
      sv: 'Vi hjälper dig med original, layout och tryckfärdiga filer.',
      en: 'We help you with artwork, layout and print-ready files.',
    },
    to: '/landing/hjalp-original',
    image: '/services/hjalp-original.svg',
  },
  {
    id: 'montage-montering',
    eyebrow: { sv: 'Produktion & installation', en: 'Production & installation' },
    title: { sv: 'Montage & montering', en: 'Assembly & installation' },
    description: {
      sv: 'Vi sköter montaget — snabbt, säkert och på plats.',
      en: 'We handle the installation — fast, safe and on site.',
    },
    to: '/landing/montage-montering',
    image: '/services/montage-montering.svg',
  },
  {
    id: 'projektledning-radgivning',
    eyebrow: { sv: 'Strategi & stöd', en: 'Strategy & support' },
    title: { sv: 'Projektledning & rådgivning', en: 'Project management & advice' },
    description: {
      sv: 'Från idé till leverans — vi planerar, samordnar och guidar dig.',
      en: 'From idea to delivery — we plan, coordinate and guide you.',
    },
    to: '/landing/projektledning-radgivning',
    image: '/services/projektledning-radgivning.svg',
  },
  {
    id: 'tryck-print',
    eyebrow: { sv: 'Tryck & produktion', en: 'Print & production' },
    title: { sv: 'Tryck & print', en: 'Print' },
    description: {
      sv: 'Kvalitetsmaterial, moderna trycktekniker och hållbar produktion.',
      en: 'Quality materials, modern printing techniques and durable production.',
    },
    to: '/landing/tryck-print',
    image: '/services/tryck-print.svg',
  },
  {
    id: 'avancerad-filkontroll',
    eyebrow: { sv: 'Original', en: 'Artwork' },
    title: { sv: 'Avancerad filkontroll', en: 'Advanced file check' },
    description: {
      sv: 'Vi granskar färger, utfall och upplösning innan något går i tryck.',
      en: 'We check colours, bleed and resolution before anything goes to print.',
    },
    to: '/landing/avancerad-filkontroll',
    image: '/services/avancerad-filkontroll.svg',
  },
  {
    id: 'snabbproduktion',
    eyebrow: { sv: 'Tryck & produktion', en: 'Print & production' },
    title: { sv: 'Snabbproduktion', en: 'Express production' },
    description: {
      sv: 'Bråttom? Vi tryck- och expressleverar när deadline är i morgon.',
      en: 'In a hurry? We print and express-ship when the deadline is tomorrow.',
    },
    to: '/landing/snabbproduktion',
    image: '/services/snabbproduktion.svg',
  }
   
]

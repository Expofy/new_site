import type { ShowroomTeaserCase } from '~/types/showroom'

/**
 * The three cards of the front page's "Våra senaste arbeten" block, in the
 * design's order. Backend owns this list once showroom cases are connected —
 * "latest" is then a date on the case, not a hand-kept array.
 *
 * Every `to` points at a case page that does not exist yet. The paths are the
 * ones those pages will have, so the cards need no change when they land.
 *
 * The customers, copy and photos are placeholders from the design mock-up, not
 * real Expofy work. Replace them with real cases before launch — a reference
 * names a customer, so it must be one. The photos are 380×190 crops and look
 * soft at full card width; the real ones must keep the 2:1 ratio, since the
 * card states one intrinsic size for every source.
 */
export const showroomTeaserCases: ShowroomTeaserCase[] = [
  {
    id: 'scandit-massmonter',
    title: { sv: 'Scandit – Mässmonter i världsklass', en: 'Scandit – A world-class exhibition stand' },
    description: {
      sv: 'En modern och öppen monter som stärker varumärket på internationella mässor.',
      en: 'A modern, open stand that strengthens the brand at international trade fairs.',
    },
    category: { sv: 'Mässmonter', en: 'Exhibition stand' },
    tags: [
      { sv: 'Design', en: 'Design' },
      { sv: 'Montage', en: 'Installation' },
    ],
    to: '/showroom/scandit-massmonter',
    image: '/showroom/scandit-massmonter.png',
  },
  {
    id: 'kappahl-butikskampanj',
    title: { sv: 'Kappahl – Butikskampanj', en: 'Kappahl – In-store campaign' },
    description: {
      sv: 'Helhetslösning med textiltryck, displayer och butikskommunikation i hela Sverige.',
      en: 'A complete solution with fabric print, displays and in-store communication across Sweden.',
    },
    category: { sv: 'Tryck', en: 'Print' },
    tags: [
      { sv: 'Displayer', en: 'Displays' },
      { sv: 'Projektledning', en: 'Project management' },
    ],
    to: '/showroom/kappahl-butikskampanj',
    image: '/showroom/kappahl-butikskampanj.png',
  },
  {
    id: 'craft-eventbranding',
    title: { sv: 'Craft – Eventbranding', en: 'Craft – Event branding' },
    description: {
      sv: 'Profilering av utomhusevent med tält, flaggor och displayer som syns på långt håll.',
      en: 'Branding for an outdoor event with tents, flags and displays that stand out from afar.',
    },
    category: { sv: 'Event', en: 'Event' },
    tags: [
      { sv: 'Tryck', en: 'Print' },
      { sv: 'Montage', en: 'Installation' },
    ],
    to: '/showroom/craft-eventbranding',
    image: '/showroom/craft-eventbranding.png',
  },
]

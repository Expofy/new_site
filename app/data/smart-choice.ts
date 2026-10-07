import type { SmartChoiceBlock } from '~/types/smart-choice'

/**
 * The front page's "Smart val" panels. Backend owns these once the CMS is
 * connected — the whole thing is editorial.
 *
 * Nothing iterates this list, the same as `promoBanners`: a page names the
 * panel it wants by id, because where a panel sits is part of what it is for.
 * That is also what makes two of them in one row a page decision rather than a
 * component one.
 */
export const smartChoiceBlocks: SmartChoiceBlock[] = [
  {
    id: 'byt-duk',
    badge: { sv: 'Smart val', en: 'Smart choice' },
    headline: { sv: 'Spara pengar över tid', en: 'Save money over time' },
    lead: {
      sv: 'Köp en gång – byt bara duk när säsong eller budskap ändras.',
      en: 'Buy once – change only the fabric when the season or the message changes.',
    },
    text: {
      sv: 'Med beachflaggor och dubbelsidiga ramar behåller du stommen och byter bara duk/tryck när du vill uppdatera säsong, kampanj eller miljö.',
      en: 'With beach flags and double-sided frames you keep the frame and change only the fabric or print when you want to update the season, the campaign or the setting.',
    },
    features: [
      { id: 'one-frame', icon: 'cycle', label: { sv: 'En stomme – flera budskap', en: 'One frame – many messages' } },
      { id: 'seasons', icon: 'calendar', label: { sv: 'Perfekt för säsonger & kampanjer', en: 'Made for seasons & campaigns' } },
      { id: 'cost', icon: 'tag', label: { sv: 'Lägre kostnad vid uppdatering', en: 'Lower cost when you update' } },
    ],
    annotation: { sv: 'Byt duk – samma stomme', en: 'Change the fabric – same frame' },
    /**
     * Season names, not slugs, so the files are named in English while the
     * labels are localised — a departure from `public/categories/`, whose
     * Swedish filenames mirror Swedish URL slugs. A season has no slug, and
     * `host.jpg` for "höst" would read as the English word in every import.
     */
    swatches: [
      { id: 'spring', label: { sv: 'Vår', en: 'Spring' }, image: '/smart-choice/spring.jpg' },
      { id: 'summer', label: { sv: 'Sommar', en: 'Summer' }, image: '/smart-choice/summer.jpg' },
      { id: 'autumn', label: { sv: 'Höst', en: 'Autumn' }, image: '/smart-choice/autumn.jpg' },
      { id: 'winter', label: { sv: 'Vinter', en: 'Winter' }, image: '/smart-choice/winter.jpg' },
    ],
    image: '/smart-choice/frame-and-flags.jpg',
    buttons: {
      primary: { label: { sv: 'Se produkterna', en: 'See the products' }, to: '/category/beachflaggor' },
      secondary: { label: { sv: 'Få hjälp att välja', en: 'Get help choosing' }, to: '/landing/kontakta-oss' },
    },
  },
]

/** One panel by id. `undefined` when a page names one that is not here. */
export function smartChoiceBlock(id: string): SmartChoiceBlock | undefined {
  return smartChoiceBlocks.find(block => block.id === id)
}

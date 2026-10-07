import type { PopularCategory } from '~/types/category'

/**
 * The ten tiles of the front page's "Populära kategorier" block, in the Saved
 * Page's own order. Backend owns this list once the CMS is connected — on the
 * live site it is a hand-built block, so "popular" is an editorial choice, not
 * a sales figure the frontend could compute.
 *
 * Array order is render order; there is no `order` field to disagree with it.
 *
 * Images are the Saved Page's own product renders, copied to
 * `public/categories/` and renamed after the category so the file says what it
 * belongs to. They are transparent PNGs meant to sit on the tile's light
 * gradient — not the square 150×150 crops in `public/nav/`, which are the
 * mega-menu's.
 */
export const popularCategories: PopularCategory[] = [
  {
    id: 'massvaggar',
    label: { sv: 'Mässväggar', en: 'Trade fair walls' },
    description: { sv: 'Skapa en stark närvaro på mässan.', en: 'Make a strong presence at the fair.' },
    to: '/category/massvaggar',
    image: '/categories/massvaggar.png',
  },
  {
    id: 'massbord',
    label: { sv: 'Mässbord', en: 'Trade fair tables' },
    description: { sv: 'Praktiska och snygga diskar.', en: 'Practical, good-looking counters.' },
    to: '/category/massbord-diskar',
    image: '/categories/massbord-diskar.png',
  },
  {
    id: 'rollup',
    label: { sv: 'Rollup', en: 'Roll-ups' },
    description: { sv: 'Klassikern som alltid levererar.', en: 'The classic that always delivers.' },
    to: '/category/rollup',
    image: '/categories/rollup.png',
  },
  {
    id: 'beachflaggor',
    label: { sv: 'Beachflaggor', en: 'Beach flags' },
    description: { sv: 'Syns på långt avstånd.', en: 'Seen from far away.' },
    to: '/category/beachflaggor',
    image: '/categories/beachflaggor.png',
  },
  {
    id: 'reklamtalt',
    label: { sv: 'Reklamtält', en: 'Promotional tents' },
    description: { sv: 'För event och utomhusaktiviteter.', en: 'For events and outdoor activities.' },
    to: '/category/reklamtalt',
    image: '/categories/reklamtalt.png',
  },
  {
    id: 'vepor',
    label: { sv: 'Vepor', en: 'Large-format banners' },
    description: { sv: 'Stora budskap som syns.', en: 'Big messages that get seen.' },
    to: '/category/vepor',
    image: '/categories/vepor.png',
  },
  {
    id: 'reklamflaggor',
    label: { sv: 'Reklamflaggor', en: 'Advertising flags' },
    description: { sv: 'Profilera ditt varumärke i alla miljöer.', en: 'Show your brand in any setting.' },
    to: '/category/reklamflaggor',
    image: '/categories/reklamflaggor.png',
  },
  {
    // The one tile that points below the top level: the live site links
    // Ljuslådor to a child of Displayer, and the mega menu only carries the
    // parent. The path test allows a descendant of a known category for this.
    id: 'ljuslador',
    label: { sv: 'Ljuslådor', en: 'Light boxes' },
    description: { sv: 'Maximal effekt dag som natt.', en: 'Maximum impact, day and night.' },
    to: '/category/displayer/ljuslador',
    image: '/categories/ljuslador.png',
  },
  {
    id: 'dekaler',
    label: { sv: 'Dekaler', en: 'Decals' },
    description: { sv: 'För väggar, fönster och fordon.', en: 'For walls, windows and vehicles.' },
    to: '/category/folie-dekaler',
    image: '/categories/folie-dekaler.png',
  },
  {
    id: 'mattor',
    label: { sv: 'Mattor', en: 'Mats' },
    description: { sv: 'Ett professionellt första intryck.', en: 'A professional first impression.' },
    to: '/category/mattor',
    image: '/categories/mattor.png',
  },
]

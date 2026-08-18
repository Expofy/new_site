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
    to: '/category/massvaggar',
    image: '/categories/massvaggar.png',
  },
  {
    id: 'massbord',
    label: { sv: 'Mässbord', en: 'Trade fair tables' },
    to: '/category/massbord-diskar',
    image: '/categories/massbord-diskar.png',
  },
  {
    id: 'rollup',
    label: { sv: 'Rollup', en: 'Roll-ups' },
    to: '/category/rollup',
    image: '/categories/rollup.png',
  },
  {
    id: 'beachflaggor',
    label: { sv: 'Beachflaggor', en: 'Beach flags' },
    to: '/category/beachflaggor',
    image: '/categories/beachflaggor.png',
  },
  {
    id: 'reklamtalt',
    label: { sv: 'Reklamtält', en: 'Promotional tents' },
    to: '/category/reklamtalt',
    image: '/categories/reklamtalt.png',
  },
  {
    id: 'vepor',
    label: { sv: 'Vepor', en: 'Large-format banners' },
    to: '/category/vepor',
    image: '/categories/vepor.png',
  },
  {
    id: 'reklamflaggor',
    label: { sv: 'Reklamflaggor', en: 'Advertising flags' },
    to: '/category/reklamflaggor',
    image: '/categories/reklamflaggor.png',
  },
  {
    // The one tile that points below the top level: the live site links
    // Ljuslådor to a child of Displayer, and the mega menu only carries the
    // parent. The path test allows a descendant of a known category for this.
    id: 'ljuslador',
    label: { sv: 'Ljuslådor', en: 'Light boxes' },
    to: '/category/displayer/ljuslador',
    image: '/categories/ljuslador.png',
  },
  {
    id: 'dekaler',
    label: { sv: 'Dekaler', en: 'Decals' },
    to: '/category/folie-dekaler',
    image: '/categories/folie-dekaler.png',
  },
  {
    id: 'mattor',
    label: { sv: 'Mattor', en: 'Mats' },
    to: '/category/mattor',
    image: '/categories/mattor.png',
  },
]

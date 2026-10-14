import type { FooterColumn, NavItem } from '~/types/navigation'

/**
 * Fake navigation data mirroring the Saved Pages. Slugs and localized paths are
 * backend-owned later (see docs/PROJECT-PLAN.md); these only simulate them.
 *
 * Mega-menu shape: a panel is a list of columns, and an item lives in whichever
 * column's `items` array it is written into — see `~/types/navigation`. Adding
 * or removing a column object is how the panel's column count is set. Tile
 * images are the Saved Pages' own 150x150 category thumbnails, in public/nav/.
 */
export const mainNav: NavItem[] = [
  {
    id: 'products',
    label: { sv: 'Produkter', en: 'Products' },
    to: '/category',
    panel: {
      variant: 'image',
      heading: { sv: 'Produkter', en: 'Products' },
      seeAll: { label: { sv: 'Se alla produkter', en: 'See all products' }, to: '/category' },
      columns: [
        {
          id: 'products-1',
          items: [
            { label: { sv: 'Banderoller', en: 'Banners' }, to: '/category/banderoller', image: '/nav/banderoller.png' },
            { label: { sv: 'Vepor', en: 'Large-format banners' }, to: '/category/vepor', image: '/nav/vepor.png' },
            { label: { sv: 'Mässväggar', en: 'Trade fair walls' }, to: '/category/massvaggar', image: '/nav/massvaggar.png' },
            { label: { sv: 'Ramar & tavlor', en: 'Frames & pictures' }, to: '/category/ramar-tavlor', image: '/nav/ramar-tavlor.png' },
          ],
        },
        {
          id: 'products-2',
          items: [
            { label: { sv: 'Affischer', en: 'Posters' }, to: '/category/affischer', image: '/nav/affischer.png' },
            { label: { sv: 'Rollup', en: 'Roll-ups' }, to: '/category/rollup', image: '/nav/rollup.png' },
            { label: { sv: 'Displayer', en: 'Displays' }, to: '/category/displayer', image: '/nav/displayer.png' },
            { label: { sv: 'Folie & Dekaler', en: 'Film & decals' }, to: '/category/folie-dekaler', image: '/nav/folie-dekaler.png' },
          ],
        },
        {
          id: 'products-3',
          items: [
            { label: { sv: 'Skyltar', en: 'Signs' }, to: '/category/skyltar', image: '/nav/skyltar.png' },
            { label: { sv: 'Trycksaksställ & hållare', en: 'Brochure stands & holders' }, to: '/category/trycksaksstall-hallare', image: '/nav/trycksaksstall-hallare.png' },
            { label: { sv: 'Mässbord & diskar', en: 'Trade fair tables & counters' }, to: '/category/massbord-diskar', image: '/nav/massbord-diskar.png' },
            { label: { sv: 'Fototapeter', en: 'Photo wallpaper' }, to: '/category/fototapeter', image: '/nav/fototapeter.png' },
          ],
        },
        {
          id: 'products-4',
          items: [
            { label: { sv: 'Mattor', en: 'Mats' }, to: '/category/mattor', image: '/nav/mattor.png' },
            { label: { sv: 'Stolar, puffar & möbler', en: 'Chairs, poufs & furniture' }, to: '/category/stolar-puffar-mobler', image: '/nav/stolar-puffar-mobler.png' },
            { label: { sv: 'Beachflaggor', en: 'Beach flags' }, to: '/category/beachflaggor', image: '/nav/beachflaggor.png' },
            { label: { sv: 'Reklamflaggor', en: 'Advertising flags' }, to: '/category/reklamflaggor', image: '/nav/reklamflaggor.png' },
          ],
        },
        {
          id: 'products-5',
          items: [
            { label: { sv: 'Reklamtält', en: 'Promotional tents' }, to: '/category/reklamtalt', image: '/nav/reklamtalt.png' },
            { label: { sv: 'Utomhusprodukter', en: 'Outdoor products' }, to: '/category/utomhusprodukter', image: '/nav/utomhusprodukter.png' },
            { label: { sv: 'Tjänster', en: 'Services' }, to: '/category/tjanster', image: '/nav/tjanster.jpg' },
          ],
        },
      ],
    },
  },
  {
    id: 'services',
    label: { sv: 'Tjänster', en: 'Services' },
    to: '/category/tjanster',
    panel: {
      variant: 'dropdown',
      heading: { sv: 'Tjänster', en: 'Services' },
      columns: [
        {
          id: 'services-all',
          items: [
            { label: { sv: 'Projektledning', en: 'Project management' }, to: '/landing/projektledning-radgivning' },
            { label: { sv: 'Montage & Montering', en: 'Assembly & installation' }, to: '/landing/montage-montering' },
            { label: { sv: 'Hjälp med original', en: 'Artwork help' }, to: '/landing/hjalp-original' },
            { label: { sv: 'Tryck & Print', en: 'Printing' }, to: '/landing/tryck-print' },
          ],
        },
      ],
    },
  },
  {
    // Solutions are by setting, not by product. The landing paths are
    // placeholders until the backend owns them.
    id: 'solutions',
    label: { sv: 'Lösningar', en: 'Solutions' },
    to: '/landing/losningar',
    panel: {
      variant: 'dropdown',
      heading: { sv: 'Lösningar', en: 'Solutions' },
      columns: [
        {
          id: 'solutions-all',
          items: [
            { label: { sv: 'Mässor', en: 'Trade fairs' }, to: '/landing/massor' },
            { label: { sv: 'Event & Fest', en: 'Events & parties' }, to: '/landing/event-fest' },
            { label: { sv: 'Butik & Retail', en: 'Shops & retail' }, to: '/landing/butik-retail' },
            { label: { sv: 'Kontor & Fastighet', en: 'Offices & property' }, to: '/landing/kontor-fastighet' },
            { label: { sv: 'Byggprojekt', en: 'Construction projects' }, to: '/landing/byggprojekt' },
            { label: { sv: 'Kampanj & Politik', en: 'Campaigns & politics' }, to: '/landing/kampanj-politik' },
            { label: { sv: 'Horeca', en: 'Hospitality' }, to: '/landing/horeca' },
          ],
        },
      ],
    },
  },
  {
    id: 'cases',
    label: { sv: 'Referenscase', en: 'Case studies' },
    to: '/showroom',
  },
  {
    id: 'knowledge',
    label: { sv: 'Kunskapsbank', en: 'Knowledge base' },
    to: '/blog',
  },
  {
    id: 'about',
    label: { sv: 'Om Expofy', en: 'About Expofy' },
    to: '/landing/om-oss',
  },
  {
    id: 'contact',
    label: { sv: 'Kontakt', en: 'Contact' },
    to: '/landing/kontakta-oss',
  },
]

export const footerColumns: FooterColumn[] = [
  {
    id: 'expofy',
    label: { sv: 'Expofy', en: 'Expofy' },
    links: [
      { label: { sv: 'Om oss', en: 'About us' }, to: '/landing/om-oss' },
      { label: { sv: 'Kontakta oss', en: 'Contact us' }, to: '/landing/kontakta-oss' },
      { label: { sv: 'Jobba hos oss', en: 'Work with us' }, to: '/landing/jobba-hos-oss' },
      { label: { sv: 'Policys', en: 'Policies' }, to: '/landing/policys' },
      { label: { sv: 'Köpvillkor', en: 'Terms of purchase' }, to: '/landing/kopvillkor' },
      { label: { sv: 'Cookies', en: 'Cookies' }, to: '/landing/cookies' },
    ],
  },
  {
    id: 'information',
    label: { sv: 'Information', en: 'Information' },
    links: [
      { label: { sv: 'Så handlar du', en: 'How to order' }, to: '/blog/sa-handlar-du' },
      { label: { sv: 'Så skapar du en tryckfil', en: 'Creating a print file' }, to: '/blog/tryckfil' },
      { label: { sv: 'Ladda upp filer', en: 'Uploading files' }, to: '/blog/ladda-upp-filer' },
    ],
  },
  {
    id: 'expomera',
    label: { sv: 'Expomera', en: 'Expomera' },
    links: [
      { label: { sv: 'Så säkrar du din design med utfall', en: 'Designing with bleed' }, to: '/blog/utfall' },
      { label: { sv: 'Grafisk ordlista', en: 'Graphics glossary' }, to: '/blog/ordlista' },
      { label: { sv: '7 tips för bästa monter', en: '7 tips for a better booth' }, to: '/blog/monter-tips' },
      { label: { sv: 'Planera mässan – checklista', en: 'Trade fair checklist' }, to: '/blog/checklista' },
    ],
  },
]

/** Contact details shown in the footer and the support block. */
export const contactDetails = {
  email: 'info@expofy.se',
  phone: '0771 – 75 35 00',
  phoneHref: 'tel:+46771753500',
  hours: { sv: 'Mån–Fre 08.30 – 17.00', en: 'Mon–Fri 08.30 – 17.00' },
}

/** Links in the footer's bottom bar. The routes are the ones the "Expofy"
 *  column already uses. There is no sitemap page, so the mockup's "Sitemap"
 *  link waits for one. */
export const legalLinks = [
  { label: { sv: 'Integritetspolicy', en: 'Privacy policy' }, to: '/landing/policys' },
  { label: { sv: 'Cookies', en: 'Cookies' }, to: '/landing/cookies' },
  { label: { sv: 'Köpvillkor', en: 'Terms of purchase' }, to: '/landing/kopvillkor' },
]

/** Social profiles, from the old site's links. It has no YouTube channel. */
export const socialLinks = [
  { id: 'instagram', name: 'Instagram', href: 'https://www.instagram.com/expofy/' },
  { id: 'linkedin', name: 'LinkedIn', href: 'https://www.linkedin.com/company/expofy-ab' },
  { id: 'facebook', name: 'Facebook', href: 'https://www.facebook.com/expofy/' },
] as const

/** "Vi stödjer" logos in the footer. Files come from the Showroom Saved Page. */
export const partners = [
  { id: 'faktum', name: 'Faktum', logo: '/partners/faktum.png', width: 700, height: 251 },
  { id: 'nattvandrarna', name: 'Nattvandrarna', logo: '/partners/nattvandrarna.png', width: 251, height: 201 },
]

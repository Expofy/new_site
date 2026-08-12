import type { FooterColumn, NavItem } from '~/types/navigation'

/**
 * Fake navigation data mirroring the Saved Pages. Slugs and localized paths are
 * backend-owned later (see docs/PROJECT-PLAN.md); these only simulate them.
 */
export const mainNav: NavItem[] = [
  {
    id: 'products',
    label: { sv: 'Produkter', en: 'Products' },
    to: '/category/vepor',
    groups: [
      {
        label: { sv: 'Vepor och banderoller', en: 'Banners' },
        links: [
          { label: { sv: 'Tygvepor', en: 'Fabric banners' }, to: '/category/tygvepor' },
          { label: { sv: 'Vepa i PVC', en: 'PVC banners' }, to: '/category/vepa-pvc' },
          { label: { sv: 'Staketvepor', en: 'Fence banners' }, to: '/category/staketvepor' },
          { label: { sv: 'Backdrop', en: 'Backdrops' }, to: '/category/backdrop' },
        ],
      },
      {
        label: { sv: 'Flaggor', en: 'Flags' },
        links: [
          { label: { sv: 'Beachflaggor', en: 'Beach flags' }, to: '/category/beachflaggor' },
          { label: { sv: 'Reklamflaggor', en: 'Advertising flags' }, to: '/category/reklamflaggor' },
        ],
      },
      {
        label: { sv: 'Mässa och event', en: 'Trade fair and event' },
        links: [
          { label: { sv: 'Mässväggar', en: 'Trade fair walls' }, to: '/category/massvaggar' },
          { label: { sv: 'Mässbord', en: 'Trade fair tables' }, to: '/category/massbord' },
          { label: { sv: 'Rollup', en: 'Roll-ups' }, to: '/category/rollup' },
          { label: { sv: 'Reklamtält', en: 'Promotional tents' }, to: '/category/reklamtalt' },
        ],
      },
      {
        label: { sv: 'Skyltar och dekor', en: 'Signs and decor' },
        links: [
          { label: { sv: 'Ljuslådor', en: 'Light boxes' }, to: '/category/ljusladar' },
          { label: { sv: 'Dekaler', en: 'Decals' }, to: '/category/dekaler' },
          { label: { sv: 'Skyltar', en: 'Signs' }, to: '/category/skyltar' },
          { label: { sv: 'Mattor', en: 'Mats' }, to: '/category/mattor' },
        ],
      },
    ],
  },
  {
    id: 'use-cases',
    label: { sv: 'Användningsområden', en: 'Use cases' },
    to: '/landing/anvandningsomraden',
    groups: [
      {
        label: { sv: 'Efter miljö', en: 'By environment' },
        links: [
          { label: { sv: 'Mässa', en: 'Trade fair' }, to: '/landing/massa' },
          { label: { sv: 'Butik', en: 'Retail' }, to: '/landing/butik' },
          { label: { sv: 'Kontor', en: 'Office' }, to: '/landing/kontor' },
          { label: { sv: 'Bygg', en: 'Construction' }, to: '/landing/bygg' },
        ],
      },
      {
        label: { sv: 'Efter tillfälle', en: 'By occasion' },
        links: [
          { label: { sv: 'Event', en: 'Event' }, to: '/landing/event' },
          { label: { sv: 'Restaurang', en: 'Restaurant' }, to: '/landing/restaurang' },
        ],
      },
    ],
  },
  {
    id: 'how-it-works',
    label: { sv: 'Hur funkar det?', en: 'How does it work?' },
    to: '/blog',
    groups: [
      {
        label: { sv: 'Guider', en: 'Guides' },
        links: [
          { label: { sv: 'Så handlar du', en: 'How to order' }, to: '/blog/sa-handlar-du' },
          { label: { sv: 'Så skapar du en tryckfil', en: 'Creating a print file' }, to: '/blog/tryckfil' },
          { label: { sv: 'Ladda upp filer', en: 'Uploading files' }, to: '/blog/ladda-upp-filer' },
        ],
      },
    ],
  },
  {
    id: 'inspiration',
    label: { sv: 'Inspiration', en: 'Inspiration' },
    to: '/showroom',
  },
  {
    id: 'contact',
    label: { sv: 'Kontakta oss', en: 'Contact us' },
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

/** "Vi stödjer" partner strip. Logos are not in the Saved Page exports. */
export const partners = [
  { id: 'faktum', name: 'Faktum' },
  { id: 'nattvandrarna', name: 'Nattvandrarna' },
]

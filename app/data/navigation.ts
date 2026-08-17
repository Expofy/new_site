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
    id: 'use-cases',
    label: { sv: 'Användningsområden', en: 'Use cases' },
    to: '/landing/anvandningsomraden',
    panel: {
      variant: 'list',
      heading: { sv: 'Användningsområden', en: 'Use cases' },
      columns: [
        {
          id: 'use-cases-event',
          heading: { label: { sv: 'Event & Mässa', en: 'Event & trade fair' }, to: '/landing/produkter-for-massa-event' },
          items: [
            { label: { sv: 'Vepor', en: 'Large-format banners' }, to: '/category/vepor' },
            { label: { sv: 'Mässväggar', en: 'Trade fair walls' }, to: '/category/massvaggar' },
            { label: { sv: 'Beachflaggor', en: 'Beach flags' }, to: '/category/beachflaggor' },
            { label: { sv: 'Reklamtält', en: 'Promotional tents' }, to: '/category/reklamtalt' },
            { label: { sv: 'Uppblåsbart', en: 'Inflatables' }, to: '/category/uppblasbart' },
            { label: { sv: 'Godis', en: 'Sweets' }, to: '/category/godis' },
          ],
        },
        {
          id: 'use-cases-retail',
          heading: { label: { sv: 'Butik & Kontor', en: 'Retail & office' }, to: '/landing/produkter-for-butik-kontor' },
          items: [
            { label: { sv: 'Skyltar', en: 'Signs' }, to: '/category/skyltar' },
            { label: { sv: 'Folie & Dekaler', en: 'Film & decals' }, to: '/category/folie-dekaler' },
            { label: { sv: 'Takdisplayer', en: 'Ceiling displays' }, to: '/category/takdisplayer' },
            { label: { sv: 'Ramar & tavlor', en: 'Frames & pictures' }, to: '/category/ramar-tavlor' },
            { label: { sv: 'Ljuslådor', en: 'Light boxes' }, to: '/category/ljuslador' },
            { label: { sv: 'Gatupratare & trottoarpratare', en: 'A-boards & pavement signs' }, to: '/category/gatupratare' },
          ],
        },
        {
          id: 'use-cases-construction',
          heading: { label: { sv: 'Bygg & Fastighet', en: 'Construction & property' }, to: '/landing/produkter-for-bygg-fastighet' },
          items: [
            { label: { sv: 'Banderoller', en: 'Banners' }, to: '/category/banderoller' },
            { label: { sv: 'Skyltar', en: 'Signs' }, to: '/category/skyltar' },
            { label: { sv: 'Folie & dekaler', en: 'Film & decals' }, to: '/category/folie-dekaler' },
            { label: { sv: 'Reklamflaggor', en: 'Advertising flags' }, to: '/category/reklamflaggor' },
            { label: { sv: 'Mattor', en: 'Mats' }, to: '/category/mattor' },
            { label: { sv: 'Mäklarskyltar', en: 'Estate agent signs' }, to: '/category/maklarskyltar' },
            { label: { sv: 'Skyddsprodukter', en: 'Protective products' }, to: '/category/skyddsprodukter' },
          ],
        },
        {
          // No `to`: the Saved Page leaves this heading unlinked, so it is a
          // grouping label only. The renderer prints it as plain text.
          id: 'use-cases-restaurant',
          heading: { label: { sv: 'Restaurang & Inredning', en: 'Restaurant & interiors' } },
          items: [
            { label: { sv: 'Folie & dekaler', en: 'Film & decals' }, to: '/category/folie-dekaler' },
            { label: { sv: 'Ramar & tavlor', en: 'Frames & pictures' }, to: '/category/ramar-tavlor' },
            { label: { sv: 'Mattor', en: 'Mats' }, to: '/category/mattor' },
            { label: { sv: 'Fototapeter', en: 'Photo wallpaper' }, to: '/category/fototapeter' },
            { label: { sv: 'Affischer', en: 'Posters' }, to: '/category/affischer' },
            { label: { sv: 'Parasoller', en: 'Parasols' }, to: '/category/parasoller' },
          ],
        },
      ],
    },
  },
  {
    id: 'how-it-works',
    label: { sv: 'Hur funkar det?', en: 'How does it work?' },
    to: '/blog',
    panel: {
      variant: 'list',
      heading: { sv: 'Hur funkar det?', en: 'How does it work?' },
      columns: [
        {
          id: 'how-it-works-ordering',
          heading: { label: { sv: 'Beställning', en: 'Ordering' } },
          items: [
            { label: { sv: 'Så handlar du', en: 'How to order' }, to: '/blog/sa-handlar-du' },
            { label: { sv: 'Så skapar du en tryckfil', en: 'Creating a print file' }, to: '/blog/tryckfil' },
            { label: { sv: 'Så funkar designverktyget', en: 'Using the design tool' }, to: '/blog/designverktyget' },
            { label: { sv: 'Ladda upp filer', en: 'Uploading files' }, to: '/blog/ladda-upp-filer' },
          ],
        },
        {
          id: 'how-it-works-techniques',
          heading: { label: { sv: 'Tekniker & Behandlingar', en: 'Techniques & finishing' } },
          items: [
            { label: { sv: 'Trycktekniker', en: 'Printing techniques' }, to: '/blog/trycktekniker' },
            { label: { sv: 'Efterbehandling', en: 'Finishing' }, to: '/blog/efterbehandling' },
            { label: { sv: 'Material för vepor och banderoller', en: 'Materials for banners' }, to: '/blog/material-vepor' },
          ],
        },
        {
          id: 'how-it-works-learn',
          heading: { label: { sv: 'Lär dig mer', en: 'Learn more' } },
          items: [
            { label: { sv: 'Tips & Trix', en: 'Tips & tricks' }, to: '/blog/tips-trix' },
            { label: { sv: 'Om våra produkter', en: 'About our products' }, to: '/blog/vad-ar' },
            { label: { sv: 'Kundcase för inspiration', en: 'Customer cases' }, to: '/showroom' },
          ],
        },
        {
          id: 'how-it-works-help',
          heading: { label: { sv: 'Behöver du hjälp?', en: 'Need help?' } },
          items: [
            { label: { sv: 'Tjänster', en: 'Services' }, to: '/category/tjanster' },
            { label: { sv: 'Hjälp med original', en: 'Artwork help' }, to: '/landing/hjalp-original' },
            { label: { sv: 'Montage och montering', en: 'Assembly & installation' }, to: '/landing/montage-montering' },
            { label: { sv: 'Projektledning & Rådgivning', en: 'Project management & advice' }, to: '/landing/projektledning-radgivning' },
            { label: { sv: 'Tryck och print', en: 'Printing' }, to: '/landing/tryck-print' },
            { label: { sv: 'Vanliga frågor', en: 'FAQ' }, to: '/landing/fragor-och-svar' },
            { label: { sv: 'Nyheter', en: 'News' }, to: '/blog/nyheter' },
            { label: { sv: 'Kontakta oss', en: 'Contact us' }, to: '/landing/kontakta-oss' },
          ],
        },
      ],
    },
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

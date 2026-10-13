import type { FaqEntry } from '~/types/faq'

/**
 * The five questions of the front page's "Vanliga frågor" block, in the
 * design's order. The help drawer lists the same entries, grouped by
 * `category`, so a question added here shows up in both. The design draws
 * them all closed, so it has questions but no answers.
 *
 * The answers are placeholders written for the template, not Expofy's own
 * wording. Two of them promise things — samples and volume pricing — that
 * nothing else on the site confirms. Have Expofy write or approve every answer
 * before launch.
 *
 * Every `link` goes to a page the "Tjänster" block already links, so a test
 * can catch one left behind by a renamed slug.
 */
export const faqEntries: FaqEntry[] = [
  {
    id: 'leveranstid',
    category: 'delivery',
    question: { sv: 'Hur lång är leveranstiden?', en: 'How long is the delivery time?' },
    answer: {
      sv: 'Det beror på produkt och upplaga – leveranstiden visas på varje produktsida. Har du ett datum att hålla, berätta det när du beställer så hittar vi en lösning.',
      en: 'It depends on the product and the quantity – the delivery time is shown on every product page. If you have a date to meet, tell us when you order and we will find a way.',
    },
    link: { label: { sv: 'Läs om snabbproduktion', en: 'Read about rush production' }, to: '/landing/snabbproduktion' },
  },
  {
    id: 'original',
    category: 'design',
    question: { sv: 'Kan ni hjälpa till med original?', en: 'Can you help with artwork?' },
    answer: {
      sv: 'Ja. Våra grafiker kan göra ditt befintliga material tryckfärdigt, eller ta fram ett nytt original utifrån din logotyp och ditt budskap.',
      en: 'Yes. Our designers can make your existing material print-ready, or create new artwork from your logo and your message.',
    },
    link: { label: { sv: 'Läs om hjälp med original', en: 'Read about artwork help' }, to: '/landing/hjalp-original' },
  },
  {
    id: 'montage',
    category: 'delivery',
    question: { sv: 'Erbjuder ni montage på plats?', en: 'Do you offer on-site installation?' },
    answer: {
      sv: 'Ja, vi monterar mässmontrar, skyltar och dekaler på plats – hos dig eller på mässan. Berätta var och när, så lämnar vi ett förslag.',
      en: 'Yes, we install exhibition stands, signs and decals on site – at your premises or at the fair. Tell us where and when, and we will send a proposal.',
    },
    link: { label: { sv: 'Läs om montage och montering', en: 'Read about installation' }, to: '/landing/montage-montering' },
  },
  {
    id: 'prover',
    category: 'order',
    question: { sv: 'Kan jag beställa prover?', en: 'Can I order samples?' },
    answer: {
      sv: 'Ja, de flesta material kan skickas som prov, så att du kan känna på kvaliteten och se färgerna innan du beställer. Kontakta oss och berätta vilka material du är intresserad av.',
      en: 'Yes, most materials can be sent as samples, so you can feel the quality and see the colours before you order. Contact us and tell us which materials you are interested in.',
    },
  },
  {
    id: 'specialpriser',
    category: 'order',
    question: { sv: 'Har ni specialpriser vid större beställningar?', en: 'Do you offer special prices on larger orders?' },
    answer: {
      sv: 'Ja. För större upplagor och återkommande beställningar tar vi gärna fram en offert med volympris.',
      en: 'Yes. For larger quantities and repeat orders we are happy to put together a quote with volume pricing.',
    },
  },
]

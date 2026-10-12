import type { CustomerLogo } from '~/types/customer'

/**
 * The twelve tiles of the front page's "Kunder vi arbetat med" block, six
 * across in two rows on desktop.
 *
 * The logos are the ones expofy.se shows under "Företag som väljer Expofy",
 * downloaded from its uploads. The design mock-up's grid also showed Sweco,
 * Panduro, Cervera, Synoptik and Elgiganten; those are not on the live site,
 * so they are not here — a customer list must name real customers. The live
 * site's thirteenth logo, bioMérieux, was left out to fill the grid evenly.
 *
 * Order follows the mock-up where it names the same company; the rest fill
 * the cells its invented names held.
 */
export const customerLogos: CustomerLogo[] = [
  { id: 'scania', name: 'Scania', logo: '/customers/scania.webp', width: 1280, height: 370 },
  { id: 'volvo', name: 'Volvo', logo: '/customers/volvo.png', width: 600, height: 47 },
  { id: 'ica-maxi', name: 'ICA Maxi', logo: '/customers/ica-maxi.png', width: 300, height: 125 },
  { id: 'saab', name: 'Saab', logo: '/customers/saab.webp', width: 500, height: 162 },
  { id: 'mazda', name: 'Mazda', logo: '/customers/mazda.webp', width: 330, height: 80 },
  { id: 'samsonite', name: 'Samsonite', logo: '/customers/samsonite.webp', width: 250, height: 40 },
  { id: 'hornbach', name: 'Hornbach', logo: '/customers/hornbach.webp', width: 330, height: 56 },
  { id: 'karolinska', name: 'Karolinska Universitetssjukhuset', logo: '/customers/karolinska.png', width: 360, height: 80 },
  { id: 'capio', name: 'Capio', logo: '/customers/capio.png', width: 1761, height: 474 },
  { id: 'goco', name: 'GoCo Health Innovation City', logo: '/customers/goco.png', width: 452, height: 166 },
  { id: 'velux', name: 'Velux', logo: '/customers/velux.webp', width: 330, height: 115 },
  { id: 'svenska-ishockeyforbundet', name: 'Svenska Ishockeyförbundet', logo: '/customers/svenska-ishockeyforbundet.png', width: 160, height: 160 },
]

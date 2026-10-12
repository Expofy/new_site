/**
 * One tile of the front page's "Kunder vi arbetat med" block: a customer's
 * logo. Not a link — the tile names a customer, it does not lead anywhere.
 */
export interface CustomerLogo {
  id: string
  /**
   * The company's own name, the same in every locale. It is the logo's `alt`:
   * the logo is the only thing on the tile, so it is the content, not
   * decoration.
   */
  name: string
  /** Logo file in `public/customers/`. */
  logo: string
  /**
   * The file's pixel size. Logos come in every shape, from a 12:1 wordmark to
   * a round emblem, so unlike the photo blocks there is no one ratio to state;
   * each tile states its own, and the box is reserved before the file loads.
   */
  width: number
  height: number
}

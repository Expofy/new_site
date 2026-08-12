import { defineStore } from 'pinia'

/**
 * Minimal cart state for the layout shell — only what the header summary reads.
 * The full line-item shape in docs/DATA-MODEL.md lands with the cart template.
 */
export interface CartLine {
  id: string
  quantity: number
  /** Supplied, not derived. See CartTotals. */
  lineTotalExclVat: number
}

/**
 * Totals are backend-owned. The frontend never computes them — it displays what
 * it is given (docs/PROJECT-PLAN.md, Backend Boundaries). Fake data supplies
 * these locally until the backend contract exists.
 */
export interface CartTotals {
  subtotalExclVat: number
  shipping: number
  vat: number
  total: number
}

const emptyTotals: CartTotals = {
  subtotalExclVat: 0,
  shipping: 0,
  vat: 0,
  total: 0,
}

export const useCartStore = defineStore('cart', () => {
  const lines = ref<CartLine[]>([])
  const totals = ref<CartTotals>({ ...emptyTotals })

  /** A count, not a price — safe to derive. */
  const itemCount = computed(() =>
    lines.value.reduce((sum, line) => sum + line.quantity, 0),
  )

  return { lines, totals, itemCount }
})

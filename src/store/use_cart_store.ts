import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

import type { BillingPeriodId, Localized, LocationId, VpsOsId } from "@/lib/catalog"
import { get_billing_period } from "@/lib/catalog"

export type CartItemKind = "hosting" | "vps" | "server" | "domain"

export interface CartItem {
  /** Stable identity for a configured line (kind + plan + options). */
  key: string
  kind: CartItemKind
  title: Localized
  subtitle?: Localized
  /** Spec chips shown under the title, already localized per side. */
  meta?: Localized[]
  location?: LocationId
  os?: VpsOsId
  period: BillingPeriodId
  /** Per-month price in Toman, before the period discount. */
  monthly_price: number
  quantity: number
}

/** Total for a single line, with the period discount applied. */
export function cart_item_total(item: CartItem): number {
  const period = get_billing_period(item.period)
  const gross = item.monthly_price * period.months
  const net = gross * (1 - period.discount_pct / 100)
  return Math.round(net) * item.quantity
}

interface CartState {
  items: CartItem[]
  is_hydrated: boolean
  add_item: (item: CartItem) => void
  remove_item: (key: string) => void
  set_quantity: (key: string, quantity: number) => void
  set_period: (key: string, period: BillingPeriodId) => void
  clear: () => void
  count: () => number
  subtotal: () => number
}

export const use_cart_store = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      is_hydrated: false,

      add_item: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.key === item.key)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === item.key
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i,
              ),
            }
          }
          return { items: [...state.items, item] }
        })
      },

      remove_item: (key) => {
        set((state) => ({ items: state.items.filter((i) => i.key !== key) }))
      },

      set_quantity: (key, quantity) => {
        const next = Math.max(1, Math.min(99, Math.round(quantity)))
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: next } : i,
          ),
        }))
      },

      set_period: (key, period) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, period } : i,
          ),
        }))
      },

      clear: () => set({ items: [] }),

      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, i) => sum + cart_item_total(i), 0),
    }),
    {
      name: "parscloud_cart",
      storage: createJSONStorage(() =>
        typeof window === "undefined"
          ? (undefined as unknown as Storage)
          : window.sessionStorage,
      ),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) state.is_hydrated = true
      },
    },
  ),
)

import type { ConfiguratorPayload } from "@/actions"

export interface VpsPriceBreakdown {
  base_cost: number
  cpu_cost: number
  ram_cost: number
  storage_cost: number
  os_cost: number
  monthly_price: number
}

const STORAGE_TYPE_RATES = {
  nvme: 12,
  ssd: 6,
} as const

const OS_RATES = {
  ubuntu: 0,
  windows: 14,
  arch_linux: 0,
} as const

export function compute_vps_price(
  payload: Pick<
    ConfiguratorPayload,
    "cpu_cores" | "ram_gb" | "storage_type" | "storage_size_gb" | "selected_os"
  >,
): VpsPriceBreakdown {
  const cpu_cores = Math.min(32, Math.max(1, payload.cpu_cores))
  const ram_gb = Math.min(128, Math.max(1, payload.ram_gb))
  const storage_size_gb = Math.min(2048, Math.max(20, payload.storage_size_gb))

  const base_cost = 9.99
  const cpu_cost = cpu_cores * 2.75
  const ram_cost = ram_gb * 0.85
  const storage_class_cost = STORAGE_TYPE_RATES[payload.storage_type]
  const storage_volume_cost = storage_size_gb * 0.06
  const storage_cost = storage_class_cost + storage_volume_cost
  const os_cost = OS_RATES[payload.selected_os]

  const monthly_price =
    Math.round((base_cost + cpu_cost + ram_cost + storage_cost + os_cost) * 100) /
    100

  return {
    base_cost,
    cpu_cost,
    ram_cost,
    storage_cost,
    os_cost,
    monthly_price,
  }
}

export function format_vps_price(
  amount: number,
  locale: "fa" | "en",
): string {
  if (locale === "fa") {
    return `${amount.toLocaleString("fa-IR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} دلار`
  }

  return `$${amount.toFixed(2)}`
}

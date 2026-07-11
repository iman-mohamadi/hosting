import type { ConfiguratorPayload } from "@/actions"

export interface VpsPriceBreakdown {
  base_cost: number
  cpu_cost: number
  ram_cost: number
  storage_cost: number
  os_cost: number
  addons_cost: number
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

export const ADDON_RATES = {
  dedicated_ip: 3,
  automated_backups: 8,
  ddos_protection: 10,
} as const

export const MAX_DEDICATED_IPS = 8

export interface ConfiguratorAddons {
  dedicated_ips: number
  automated_backups: boolean
  ddos_protection: boolean
}

export const DEFAULT_ADDONS: ConfiguratorAddons = {
  dedicated_ips: 0,
  automated_backups: false,
  ddos_protection: false,
}

function normalize_addons(addons?: ConfiguratorAddons): ConfiguratorAddons {
  if (!addons) {
    return { ...DEFAULT_ADDONS }
  }

  return {
    dedicated_ips: Math.min(
      MAX_DEDICATED_IPS,
      Math.max(0, Math.round(addons.dedicated_ips || 0)),
    ),
    automated_backups: Boolean(addons.automated_backups),
    ddos_protection: Boolean(addons.ddos_protection),
  }
}

export function compute_addons_cost(addons?: ConfiguratorAddons): number {
  const normalized = normalize_addons(addons)

  const ip_cost = normalized.dedicated_ips * ADDON_RATES.dedicated_ip
  const backup_cost = normalized.automated_backups
    ? ADDON_RATES.automated_backups
    : 0
  const ddos_cost = normalized.ddos_protection ? ADDON_RATES.ddos_protection : 0

  return ip_cost + backup_cost + ddos_cost
}

export function compute_vps_price(
  payload: Pick<
    ConfiguratorPayload,
    | "cpu_cores"
    | "ram_gb"
    | "storage_type"
    | "storage_size_gb"
    | "selected_os"
  > & { addons?: ConfiguratorAddons },
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
  const addons_cost = compute_addons_cost(payload.addons)

  const monthly_price =
    Math.round(
      (base_cost + cpu_cost + ram_cost + storage_cost + os_cost + addons_cost) *
        100,
    ) / 100

  return {
    base_cost,
    cpu_cost,
    ram_cost,
    storage_cost,
    os_cost,
    addons_cost,
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

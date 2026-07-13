import type { ConfiguratorPayload, SelectedOs, StorageType } from "@/actions"

export interface VpsPriceBreakdown {
  base_cost: number
  cpu_cost: number
  ram_cost: number
  storage_cost: number
  os_cost: number
  addons_cost: number
  monthly_price: number
}

/** Monthly rates in Iranian Toman. */
const STORAGE_TYPE_RATES = {
  nvme: 400_000,
  ssd: 200_000,
} as const

const STORAGE_PER_GB = {
  nvme: 1_600,
  ssd: 800,
} as const

const OS_RATES = {
  ubuntu: 0,
  windows: 450_000,
  arch_linux: 0,
} as const

export const ADDON_RATES = {
  dedicated_ip: 95_000,
  automated_backups: 280_000,
  ddos_protection: 340_000,
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

export type PlanPresetId = "starter" | "growth" | "scale"

export interface PlanPreset {
  plan_id: PlanPresetId
  cpu_cores: number
  ram_gb: number
  storage_type: StorageType
  storage_size_gb: number
  selected_os: SelectedOs
  bandwidth_tb: number
  addons: ConfiguratorAddons
}

/** Canonical tier presets — prices are derived from `compute_vps_price`. */
export const PLAN_PRESETS: Record<PlanPresetId, PlanPreset> = {
  starter: {
    plan_id: "starter",
    cpu_cores: 1,
    ram_gb: 2,
    storage_type: "nvme",
    storage_size_gb: 40,
    selected_os: "ubuntu",
    bandwidth_tb: 2,
    addons: { ...DEFAULT_ADDONS },
  },
  growth: {
    plan_id: "growth",
    cpu_cores: 4,
    ram_gb: 8,
    storage_type: "nvme",
    storage_size_gb: 160,
    selected_os: "ubuntu",
    bandwidth_tb: 5,
    addons: {
      dedicated_ips: 0,
      automated_backups: true,
      ddos_protection: true,
    },
  },
  scale: {
    plan_id: "scale",
    cpu_cores: 8,
    ram_gb: 32,
    storage_type: "nvme",
    storage_size_gb: 512,
    selected_os: "ubuntu",
    bandwidth_tb: 10,
    addons: {
      dedicated_ips: 1,
      automated_backups: true,
      ddos_protection: true,
    },
  },
}

export function resolve_plan_preset_id(
  plan_id: string | null | undefined,
): PlanPresetId | null {
  if (!plan_id) {
    return null
  }

  const normalized = plan_id.toLowerCase()
  if (normalized === "pro") {
    return "growth"
  }
  if (normalized === "enterprise") {
    return "scale"
  }
  if (
    normalized === "starter" ||
    normalized === "growth" ||
    normalized === "scale"
  ) {
    return normalized
  }

  return null
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

  const base_cost = 280_000
  const cpu_cost = cpu_cores * 82_000
  const ram_cost = ram_gb * 35_000
  const storage_class_cost = STORAGE_TYPE_RATES[payload.storage_type]
  const storage_volume_cost =
    storage_size_gb * STORAGE_PER_GB[payload.storage_type]
  const storage_cost = storage_class_cost + storage_volume_cost
  const os_cost = OS_RATES[payload.selected_os]
  const addons_cost = compute_addons_cost(payload.addons)

  const monthly_price = Math.round(
    base_cost + cpu_cost + ram_cost + storage_cost + os_cost + addons_cost,
  )

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

export function get_plan_monthly_price(plan_id: PlanPresetId): number {
  const preset = PLAN_PRESETS[plan_id]
  return compute_vps_price(preset).monthly_price
}

export function format_vps_price(amount: number, locale: "fa" | "en"): string {
  const formatted = amount.toLocaleString(locale === "fa" ? "fa-IR" : "en-US")

  if (locale === "fa") {
    return `${formatted} تومان`
  }

  return `${formatted} Toman`
}

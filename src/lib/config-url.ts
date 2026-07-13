import type { ConfiguratorPayload, SelectedOs, StorageType } from "@/actions"
import { DEFAULT_ADDONS } from "@/lib/vps-pricing"

export const VPS_CHECKOUT_STORAGE_KEY = "vps_checkout_config"

export function serialize_config_to_search_params(
  payload: ConfiguratorPayload,
  region?: string,
): URLSearchParams {
  const params = new URLSearchParams()
  params.set("cpu", String(payload.cpu_cores))
  params.set("ram", String(payload.ram_gb))
  params.set("storage", payload.storage_type)
  params.set("size", String(payload.storage_size_gb))
  params.set("os", payload.selected_os)
  params.set("ips", String(payload.addons.dedicated_ips))
  if (payload.addons.automated_backups) params.set("backups", "1")
  if (payload.addons.ddos_protection) params.set("ddos", "1")
  if (region) params.set("region", region)
  return params
}

export function parse_config_from_search_params(
  params: URLSearchParams,
): (Partial<ConfiguratorPayload> & { region?: string }) | null {
  const cpu = params.get("cpu")
  const ram = params.get("ram")
  const storage = params.get("storage") as StorageType | null
  const size = params.get("size")
  const os = params.get("os") as SelectedOs | null

  if (!cpu && !ram && !storage && !params.get("plan")) {
    return null
  }

  const result: Partial<ConfiguratorPayload> & { region?: string } = {
    addons: { ...DEFAULT_ADDONS },
  }

  if (cpu) result.cpu_cores = Math.min(32, Math.max(1, Number(cpu) || 1))
  if (ram) result.ram_gb = Math.min(128, Math.max(1, Number(ram) || 1))
  if (storage === "nvme" || storage === "ssd") result.storage_type = storage
  if (size) result.storage_size_gb = Math.min(2048, Math.max(20, Number(size) || 40))
  if (os === "ubuntu" || os === "windows" || os === "arch_linux") {
    result.selected_os = os
  }

  result.addons = {
    dedicated_ips: Math.min(8, Math.max(0, Number(params.get("ips") || 0))),
    automated_backups: params.get("backups") === "1",
    ddos_protection: params.get("ddos") === "1",
  }

  const region = params.get("region")
  if (region) result.region = region

  return result
}

export function write_checkout_config(payload: ConfiguratorPayload) {
  if (typeof window === "undefined") return
  sessionStorage.setItem(VPS_CHECKOUT_STORAGE_KEY, JSON.stringify(payload))
}

export function read_checkout_config(): ConfiguratorPayload | null {
  if (typeof window === "undefined") return null
  const raw = sessionStorage.getItem(VPS_CHECKOUT_STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ConfiguratorPayload
  } catch {
    return null
  }
}

export function clear_checkout_config() {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(VPS_CHECKOUT_STORAGE_KEY)
}

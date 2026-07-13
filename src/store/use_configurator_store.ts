import { create } from "zustand"

import type {
  ConfiguratorAddons,
  ConfiguratorPayload,
  SelectedOs,
  StorageType,
} from "@/actions"
import {
  compute_vps_price,
  DEFAULT_ADDONS,
  PLAN_PRESETS,
  resolve_plan_preset_id,
  type PlanPresetId,
} from "@/lib/vps-pricing"

export interface ConfiguratorState {
  cpu_cores: number
  ram_gb: number
  storage_type: StorageType
  storage_size_gb: number
  selected_os: SelectedOs
  addons: ConfiguratorAddons
  region: string
  monthly_price: number
  active_preset: PlanPresetId | null
  update_cpu: (cpu_cores: number) => void
  update_ram: (ram_gb: number) => void
  update_storage: (storage_type: StorageType, storage_size_gb?: number) => void
  update_storage_size: (storage_size_gb: number) => void
  update_os: (selected_os: SelectedOs) => void
  update_region: (region: string) => void
  set_dedicated_ips: (dedicated_ips: number) => void
  toggle_backups: () => void
  toggle_ddos: () => void
  hydrate_from_plan: (plan_id: string) => void
  hydrate_from_payload: (payload: Partial<ConfiguratorPayload> & { region?: string }) => void
  calculate_price: () => void
  get_payload: () => ConfiguratorPayload
}

const DEFAULT_STORAGE_SIZE: Record<StorageType, number> = {
  nvme: 80,
  ssd: 40,
}

function derive_monthly_price(state: {
  cpu_cores: number
  ram_gb: number
  storage_type: StorageType
  storage_size_gb: number
  selected_os: SelectedOs
  addons: ConfiguratorAddons
}): number {
  return compute_vps_price(state).monthly_price
}

const INITIAL_STATE = {
  cpu_cores: 2,
  ram_gb: 4,
  storage_type: "nvme" as StorageType,
  storage_size_gb: DEFAULT_STORAGE_SIZE.nvme,
  selected_os: "ubuntu" as SelectedOs,
  addons: { ...DEFAULT_ADDONS },
  region: "tehran",
  active_preset: null as PlanPresetId | null,
}

export const use_configurator_store = create<ConfiguratorState>((set, get) => ({
  ...INITIAL_STATE,
  monthly_price: derive_monthly_price(INITIAL_STATE),

  calculate_price: () => {
    const state = get()
    set({
      monthly_price: derive_monthly_price({
        cpu_cores: state.cpu_cores,
        ram_gb: state.ram_gb,
        storage_type: state.storage_type,
        storage_size_gb: state.storage_size_gb,
        selected_os: state.selected_os,
        addons: state.addons,
      }),
    })
  },

  update_cpu: (cpu_cores) => {
    set((state) => ({
      cpu_cores,
      active_preset: null,
      monthly_price: derive_monthly_price({ ...state, cpu_cores }),
    }))
  },

  update_ram: (ram_gb) => {
    set((state) => ({
      ram_gb,
      active_preset: null,
      monthly_price: derive_monthly_price({ ...state, ram_gb }),
    }))
  },

  update_storage: (storage_type, storage_size_gb) => {
    set((state) => {
      const next_storage_size_gb =
        storage_size_gb ?? DEFAULT_STORAGE_SIZE[storage_type]

      return {
        storage_type,
        storage_size_gb: next_storage_size_gb,
        active_preset: null,
        monthly_price: derive_monthly_price({
          ...state,
          storage_type,
          storage_size_gb: next_storage_size_gb,
        }),
      }
    })
  },

  update_storage_size: (storage_size_gb) => {
    set((state) => ({
      storage_size_gb,
      active_preset: null,
      monthly_price: derive_monthly_price({ ...state, storage_size_gb }),
    }))
  },

  update_os: (selected_os) => {
    set((state) => ({
      selected_os,
      active_preset: null,
      monthly_price: derive_monthly_price({ ...state, selected_os }),
    }))
  },

  update_region: (region) => {
    set({ region })
  },

  set_dedicated_ips: (dedicated_ips) => {
    set((state) => {
      const next_addons: ConfiguratorAddons = {
        ...state.addons,
        dedicated_ips: Math.min(8, Math.max(0, Math.round(dedicated_ips))),
      }

      return {
        addons: next_addons,
        active_preset: null,
        monthly_price: derive_monthly_price({ ...state, addons: next_addons }),
      }
    })
  },

  toggle_backups: () => {
    set((state) => {
      const next_addons: ConfiguratorAddons = {
        ...state.addons,
        automated_backups: !state.addons.automated_backups,
      }

      return {
        addons: next_addons,
        active_preset: null,
        monthly_price: derive_monthly_price({ ...state, addons: next_addons }),
      }
    })
  },

  toggle_ddos: () => {
    set((state) => {
      const next_addons: ConfiguratorAddons = {
        ...state.addons,
        ddos_protection: !state.addons.ddos_protection,
      }

      return {
        addons: next_addons,
        active_preset: null,
        monthly_price: derive_monthly_price({ ...state, addons: next_addons }),
      }
    })
  },

  hydrate_from_plan: (plan_id) => {
    const resolved = resolve_plan_preset_id(plan_id)
    if (!resolved) return
    const preset = PLAN_PRESETS[resolved]
    set({
      cpu_cores: preset.cpu_cores,
      ram_gb: preset.ram_gb,
      storage_type: preset.storage_type,
      storage_size_gb: preset.storage_size_gb,
      selected_os: preset.selected_os,
      addons: { ...preset.addons },
      active_preset: resolved,
      monthly_price: derive_monthly_price(preset),
    })
  },

  hydrate_from_payload: (payload) => {
    set((state) => {
      const next = {
        cpu_cores: payload.cpu_cores ?? state.cpu_cores,
        ram_gb: payload.ram_gb ?? state.ram_gb,
        storage_type: payload.storage_type ?? state.storage_type,
        storage_size_gb: payload.storage_size_gb ?? state.storage_size_gb,
        selected_os: payload.selected_os ?? state.selected_os,
        addons: payload.addons ? { ...payload.addons } : state.addons,
        region: payload.region ?? state.region,
      }
      return {
        ...next,
        active_preset: null,
        monthly_price: derive_monthly_price(next),
      }
    })
  },

  get_payload: () => {
    const state = get()

    return {
      cpu_cores: state.cpu_cores,
      ram_gb: state.ram_gb,
      storage_type: state.storage_type,
      storage_size_gb: state.storage_size_gb,
      selected_os: state.selected_os,
      addons: state.addons,
      monthly_price: state.monthly_price,
    }
  },
}))

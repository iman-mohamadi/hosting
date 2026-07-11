import { create } from "zustand"

import type {
  ConfiguratorAddons,
  ConfiguratorPayload,
  SelectedOs,
  StorageType,
} from "@/actions"
import { compute_vps_price, DEFAULT_ADDONS } from "@/lib/vps-pricing"

export interface ConfiguratorState {
  cpu_cores: number
  ram_gb: number
  storage_type: StorageType
  storage_size_gb: number
  selected_os: SelectedOs
  addons: ConfiguratorAddons
  monthly_price: number
  update_cpu: (cpu_cores: number) => void
  update_ram: (ram_gb: number) => void
  update_storage: (storage_type: StorageType, storage_size_gb?: number) => void
  update_os: (selected_os: SelectedOs) => void
  set_dedicated_ips: (dedicated_ips: number) => void
  toggle_backups: () => void
  toggle_ddos: () => void
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
  cpu_cores: 4,
  ram_gb: 16,
  storage_type: "nvme" as StorageType,
  storage_size_gb: DEFAULT_STORAGE_SIZE.nvme,
  selected_os: "ubuntu" as SelectedOs,
  addons: { ...DEFAULT_ADDONS },
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
      monthly_price: derive_monthly_price({ ...state, cpu_cores }),
    }))
  },

  update_ram: (ram_gb) => {
    set((state) => ({
      ram_gb,
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
        monthly_price: derive_monthly_price({
          ...state,
          storage_type,
          storage_size_gb: next_storage_size_gb,
        }),
      }
    })
  },

  update_os: (selected_os) => {
    set((state) => ({
      selected_os,
      monthly_price: derive_monthly_price({ ...state, selected_os }),
    }))
  },

  set_dedicated_ips: (dedicated_ips) => {
    set((state) => {
      const next_addons: ConfiguratorAddons = {
        ...state.addons,
        dedicated_ips: Math.min(8, Math.max(0, Math.round(dedicated_ips))),
      }

      return {
        addons: next_addons,
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
        monthly_price: derive_monthly_price({ ...state, addons: next_addons }),
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

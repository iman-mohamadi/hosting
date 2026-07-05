import { create } from "zustand"

import type { ConfiguratorPayload, SelectedOs, StorageType } from "@/actions"
import { compute_vps_price } from "@/lib/vps-pricing"

export interface ConfiguratorState {
  cpu_cores: number
  ram_gb: number
  storage_type: StorageType
  storage_size_gb: number
  selected_os: SelectedOs
  monthly_price: number
  update_cpu: (cpu_cores: number) => void
  update_ram: (ram_gb: number) => void
  update_storage: (storage_type: StorageType, storage_size_gb?: number) => void
  update_os: (selected_os: SelectedOs) => void
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
}): number {
  return compute_vps_price(state).monthly_price
}

export const use_configurator_store = create<ConfiguratorState>((set, get) => ({
  cpu_cores: 4,
  ram_gb: 16,
  storage_type: "nvme",
  storage_size_gb: DEFAULT_STORAGE_SIZE.nvme,
  selected_os: "ubuntu",
  monthly_price: derive_monthly_price({
    cpu_cores: 4,
    ram_gb: 16,
    storage_type: "nvme",
    storage_size_gb: DEFAULT_STORAGE_SIZE.nvme,
    selected_os: "ubuntu",
  }),

  calculate_price: () => {
    const state = get()
    set({
      monthly_price: derive_monthly_price({
        cpu_cores: state.cpu_cores,
        ram_gb: state.ram_gb,
        storage_type: state.storage_type,
        storage_size_gb: state.storage_size_gb,
        selected_os: state.selected_os,
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

  get_payload: () => {
    const state = get()

    return {
      cpu_cores: state.cpu_cores,
      ram_gb: state.ram_gb,
      storage_type: state.storage_type,
      storage_size_gb: state.storage_size_gb,
      selected_os: state.selected_os,
      monthly_price: state.monthly_price,
    }
  },
}))

import { create } from "zustand"

import type { AuthUser } from "@/types/auth"

interface AuthState {
  user: AuthUser | null
  is_hydrated: boolean
  set_user: (user: AuthUser | null) => void
  set_hydrated: (value: boolean) => void
  clear_session: () => void
}

export const use_auth_store = create<AuthState>((set) => ({
  user: null,
  is_hydrated: false,
  set_user: (user) => set({ user }),
  set_hydrated: (value) => set({ is_hydrated: value }),
  clear_session: () => set({ user: null }),
}))

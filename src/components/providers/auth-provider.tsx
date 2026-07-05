"use client"

import { useEffect } from "react"

import { get_current_user } from "@/actions"
import { use_auth_store } from "@/stores/auth-store"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const set_user = use_auth_store((state) => state.set_user)
  const set_hydrated = use_auth_store((state) => state.set_hydrated)

  useEffect(() => {
    let is_active = true

    async function hydrate_session() {
      try {
        const user = await get_current_user()
        if (is_active) {
          set_user(user)
        }
      } finally {
        if (is_active) {
          set_hydrated(true)
        }
      }
    }

    hydrate_session()

    return () => {
      is_active = false
    }
  }, [set_hydrated, set_user])

  return children
}

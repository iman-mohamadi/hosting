"use client"

import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle, WarningCircle, X } from "@phosphor-icons/react"
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"

import { cn } from "@/lib/utils"

type ToastVariant = "success" | "error"

interface Toast {
  id: string
  title: string
  message?: string
  variant: ToastVariant
}

interface ToastContextValue {
  show_toast: (toast: Omit<Toast, "id">) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function use_toast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("use_toast must be used within ToastProvider")
  }

  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, set_toasts] = useState<Toast[]>([])

  const dismiss_toast = useCallback((id: string) => {
    set_toasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const show_toast = useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = crypto.randomUUID()
      set_toasts((prev) => [...prev, { ...toast, id }])

      window.setTimeout(() => {
        dismiss_toast(id)
      }, 4500)
    },
    [dismiss_toast],
  )

  const value = useMemo(() => ({ show_toast }), [show_toast])

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-20 z-[100] flex flex-col items-center gap-3 px-4"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border p-4 backdrop-blur-md",
                toast.variant === "success"
                  ? "border-primary/30 bg-primary/10"
                  : "border-destructive/30 bg-destructive/10",
              )}
            >
              {toast.variant === "success" ? (
                <CheckCircle
                  weight="duotone"
                  className="size-5 shrink-0 text-primary"
                  aria-hidden
                />
              ) : (
                <WarningCircle
                  weight="duotone"
                  className="size-5 shrink-0 text-destructive"
                  aria-hidden
                />
              )}

              <div className="min-w-0 flex-1 space-y-1 ltr:text-left rtl:text-right">
                <p className="text-sm font-medium text-foreground">
                  {toast.title}
                </p>
                {toast.message && (
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {toast.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => dismiss_toast(toast.id)}
                className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Dismiss notification"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

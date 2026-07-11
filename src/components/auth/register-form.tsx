"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"

import { register_user } from "@/actions"
import { FloatingInput } from "@/components/ui/floating-input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/providers/toast-provider"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/config"
import { localizePathname } from "@/i18n/routing"
import { use_auth_store } from "@/stores/auth-store"
import type { AuthPageCopy } from "@/types/auth"

interface RegisterFormProps {
  copy: AuthPageCopy
  locale: Locale
}

export function RegisterForm({ copy, locale }: RegisterFormProps) {
  const router = useRouter()
  const { show_toast } = useToast()
  const set_user = use_auth_store((state) => state.set_user)

  const [full_name, set_full_name] = useState("")
  const [email_address, set_email_address] = useState("")
  const [account_password, set_account_password] = useState("")
  const [accepted_terms, set_accepted_terms] = useState(false)
  const [is_pending, start_transition] = useTransition()

  function handle_submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!accepted_terms) {
      show_toast({
        variant: "error",
        title: copy.terms_required,
      })
      return
    }

    start_transition(async () => {
      const result = await register_user({
        full_name,
        email_address,
        account_password,
        accepted_terms,
      })

      if (result.success && result.user) {
        set_user(result.user)
        show_toast({
          variant: "success",
          title: copy.register_success,
          message: result.user.full_name,
        })
        router.push(localizePathname("/dashboard", locale))
        router.refresh()
        return
      }

      show_toast({
        variant: "error",
        title: copy.validation_error,
        message: result.error_message ?? copy.email_taken,
      })
    })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handle_submit}
      className={cn("space-y-6", "ltr:text-left rtl:text-right")}
    >
      <FloatingInput
        id="full_name"
        label={copy.full_name_label}
        value={full_name}
        onChange={set_full_name}
        required
        disabled={is_pending}
        autoComplete="name"
      />

      <FloatingInput
        id="email_address"
        label={copy.email_label}
        type="email"
        value={email_address}
        onChange={set_email_address}
        required
        disabled={is_pending}
        autoComplete="email"
        dir="ltr"
      />

      <FloatingInput
        id="account_password"
        label={copy.password_label}
        type="password"
        value={account_password}
        onChange={set_account_password}
        required
        disabled={is_pending}
        autoComplete="new-password"
      />

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={accepted_terms}
          onChange={(event) => set_accepted_terms(event.target.checked)}
          disabled={is_pending}
          className="mt-1 size-4 rounded border-white/20 bg-transparent accent-[oklch(0.88_0.21_128)]"
        />
        <span>
          {copy.terms_accept_label.split(" ").length > 0 && (
            <>
              {locale === "fa" ? (
                <>
                  <Link
                    href={localizePathname("/terms", locale)}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    شرایط استفاده
                  </Link>
                  {" و "}
                  <Link
                    href={localizePathname("/privacy", locale)}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    حریم خصوصی
                  </Link>
                  {" را می‌پذیرم."}
                </>
              ) : (
                <>
                  I accept the{" "}
                  <Link
                    href={localizePathname("/terms", locale)}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href={localizePathname("/privacy", locale)}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </>
              )}
            </>
          )}
        </span>
      </label>

      <Button
        type="submit"
        variant="acid"
        size="pill"
        disabled={is_pending}
        className="w-full justify-center"
      >
        {is_pending ? copy.register_submitting : copy.register_submit}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {copy.has_account}{" "}
        <Link
          href={localizePathname("/login", locale)}
          className="text-foreground underline-offset-4 transition-opacity hover:underline hover:opacity-80"
        >
          {copy.login_link}
        </Link>
      </p>
    </motion.form>
  )
}

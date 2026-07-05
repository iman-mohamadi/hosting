import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-36 w-full resize-none rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm",
        "backdrop-blur-sm transition-all duration-300 outline-none",
        "placeholder:text-muted-foreground/60",
        "focus:border-primary/40 focus:ring-[3px] focus:ring-primary/15",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }

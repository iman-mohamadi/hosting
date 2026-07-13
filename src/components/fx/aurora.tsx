import { cn } from "@/lib/utils"

interface AuroraProps {
  className?: string
  /** Visual intensity of the colored blobs. */
  intensity?: "subtle" | "normal" | "vivid"
}

const OPACITY: Record<NonNullable<AuroraProps["intensity"]>, string> = {
  subtle: "opacity-40",
  normal: "opacity-70",
  vivid: "opacity-100",
}

/**
 * Ambient glossy backdrop — soft, blurred gradient blobs that drift.
 * Purely decorative; sits behind content with pointer-events off.
 */
export function Aurora({ className, intensity = "normal" }: AuroraProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        OPACITY[intensity],
        className,
      )}
    >
      <div className="absolute -top-1/3 left-[8%] size-[46vw] max-w-[620px] rounded-full bg-[radial-gradient(circle,var(--brand-indigo),transparent_62%)] blur-3xl animate-aurora" />
      <div className="absolute -top-[10%] right-[4%] size-[38vw] max-w-[520px] rounded-full bg-[radial-gradient(circle,var(--brand-pink),transparent_62%)] blur-3xl animate-aurora [animation-delay:-6s]" />
      <div className="absolute bottom-[-20%] left-[28%] size-[42vw] max-w-[560px] rounded-full bg-[radial-gradient(circle,var(--brand-violet),transparent_62%)] blur-3xl animate-aurora [animation-delay:-12s]" />
      <div className="absolute bottom-[-10%] right-[16%] size-[30vw] max-w-[420px] rounded-full bg-[radial-gradient(circle,var(--brand-cyan),transparent_64%)] blur-3xl animate-aurora [animation-delay:-3s]" />
    </div>
  )
}

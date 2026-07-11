export default function LocaleLoading() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl flex-col gap-6 px-6 py-24 lg:px-8">
      <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
      <div className="h-12 w-2/3 max-w-xl animate-pulse rounded-2xl bg-white/[0.06]" />
      <div className="h-4 w-full max-w-2xl animate-pulse rounded-full bg-white/[0.04]" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]"
          />
        ))}
      </div>
    </div>
  )
}

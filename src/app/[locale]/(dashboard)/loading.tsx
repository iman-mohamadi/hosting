export default function DashboardLoading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="space-y-3">
        <div className="h-8 w-48 rounded-xl bg-muted" />
        <div className="h-4 w-72 rounded-full bg-secondary" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 rounded-2xl border border-border bg-muted"
          />
        ))}
      </div>
      <div className="h-64 rounded-2xl border border-border bg-muted" />
    </div>
  )
}

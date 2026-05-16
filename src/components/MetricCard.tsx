import type { LucideIcon } from 'lucide-react'

type MetricCardProps = {
  icon: LucideIcon
  label: string
  value: string
  helper?: string
  tone?: 'blue' | 'cyan' | 'amber' | 'emerald' | 'rose'
}

const toneMap: Record<NonNullable<MetricCardProps['tone']>, string> = {
  blue: 'border-sky-100 bg-sky-50 text-sky-900',
  cyan: 'border-cyan-100 bg-cyan-50 text-cyan-900',
  amber: 'border-amber-100 bg-amber-50 text-amber-900',
  emerald: 'border-emerald-100 bg-emerald-50 text-emerald-900',
  rose: 'border-rose-100 bg-rose-50 text-rose-900',
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  tone = 'blue',
}: MetricCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${toneMap[tone]}`}>
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-white/80 p-3 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">{label}</p>
      </div>
      <p className="mt-4 text-lg font-semibold leading-7">{value}</p>
      {helper ? <p className="mt-2 text-sm leading-6 opacity-80">{helper}</p> : null}
    </div>
  )
}

export default MetricCard

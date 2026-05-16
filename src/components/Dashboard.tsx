import {
  Activity,
  BadgeDollarSign,
  CalendarRange,
  CircleGauge,
  Radar,
  Trophy,
} from 'lucide-react'
import type { DashboardMetrics } from '../types'
import { formatCurrency } from '../utils/format'
import SectionTitle from './SectionTitle'

type DashboardProps = {
  metrics: DashboardMetrics
  isExample: boolean
}

const cards = [
  {
    key: 'totalFunds',
    label: '本月总资金',
    icon: BadgeDollarSign,
    tone: 'from-sky-600/12 to-sky-100',
  },
  {
    key: 'dailySafeSpend',
    label: '今日建议可花',
    icon: Activity,
    tone: 'from-cyan-500/12 to-cyan-100',
  },
  {
    key: 'weeklySafeSpend',
    label: '本周安全消费额度',
    icon: CalendarRange,
    tone: 'from-blue-600/12 to-blue-100',
  },
  {
    key: 'dreamProgressPercent',
    label: '梦想袋进度',
    icon: Trophy,
    tone: 'from-amber-500/16 to-amber-100',
  },
  {
    key: 'growthLevelLabel',
    label: '当前理财成长等级',
    icon: CircleGauge,
    tone: 'from-emerald-500/14 to-emerald-100',
  },
  {
    key: 'riskStatus',
    label: '本月风险识别状态',
    icon: Radar,
    tone: 'from-rose-500/12 to-rose-100',
  },
] as const

function Dashboard({ metrics, isExample }: DashboardProps) {
  return (
    <section className="rounded-2xl border border-sky-100 bg-white/82 p-6 shadow-[0_24px_90px_-48px_rgba(15,23,42,0.45)] backdrop-blur">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <SectionTitle
          eyebrow="校园财富驾驶舱"
          title="生活费到账后的总览视角"
          description="这些指标会根据四袋钱分配结果实时更新。"
        />
        {isExample ? (
          <span className="w-fit rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">
            示例状态
          </span>
        ) : (
          <span className="w-fit rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
            已更新
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon
          const value = (() => {
            switch (card.key) {
              case 'totalFunds':
                return formatCurrency(metrics.totalFunds)
              case 'dailySafeSpend':
                return formatCurrency(metrics.dailySafeSpend)
              case 'weeklySafeSpend':
                return formatCurrency(metrics.weeklySafeSpend)
              case 'dreamProgressPercent':
                return `${metrics.dreamProgressPercent}%`
              case 'growthLevelLabel':
                return metrics.growthLevelLabel
              case 'riskStatus':
                return metrics.riskStatus
            }
          })()

          return (
            <div
              key={card.key}
              className={`rounded-xl border border-slate-100 bg-gradient-to-br ${card.tone} p-5`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-600">{card.label}</p>
                  <p className="mt-3 text-2xl font-semibold tracking-normal text-slate-950">
                    {value}
                  </p>
                </div>
                <div className="rounded-lg bg-white/85 p-3 shadow-sm">
                  <Icon className="h-5 w-5 text-slate-800" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Dashboard

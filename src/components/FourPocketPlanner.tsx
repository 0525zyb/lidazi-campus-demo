import {
  BookOpen,
  Coffee,
  Home,
  PiggyBank,
  Sparkles,
  Target,
} from 'lucide-react'
import { useState } from 'react'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import type { FourPocketInput, FourPocketResult } from '../types'
import { formatCurrency, formatPercent } from '../utils/format'
import { calculateFourPockets } from '../utils/financeRules'
import AIAssistant from './AIAssistant'
import SectionTitle from './SectionTitle'

type FourPocketPlannerProps = {
  initialInput: FourPocketInput
  onComplete: (result: FourPocketResult) => void
}

const specialEvents = [
  '无特殊事件',
  '考证报名',
  '毕业旅行',
  '购物节',
  '社团聚餐',
  '科研/学习资料',
]

const habits = [
  '外卖奶茶较多',
  '社交聚餐较多',
  '数码购物较多',
  '学习投入较多',
  '比较节制',
]

const pocketInfo = [
  {
    key: 'survivalPocket',
    label: '生存袋',
    icon: Home,
    tone: 'bg-sky-50 text-sky-900',
    description: '保证基础生活，不被目标储蓄挤压。',
  },
  {
    key: 'growthPocket',
    label: '成长袋',
    icon: BookOpen,
    tone: 'bg-blue-50 text-blue-900',
    description: '用于考证、学习资料和自我提升。',
  },
  {
    key: 'happinessPocket',
    label: '快乐袋',
    icon: Coffee,
    tone: 'bg-cyan-50 text-cyan-900',
    description: '不是禁止消费，而是给快乐支出设边界。',
  },
  {
    key: 'dreamPocket',
    label: '梦想袋',
    icon: PiggyBank,
    tone: 'bg-amber-50 text-amber-900',
    description: '用于买电脑、旅行、应急金等目标。',
  },
] as const

function getPreviewPressure(input: FourPocketInput) {
  const result = calculateFourPockets(input)
  if (result.pressureLevel === '低') {
    return '较轻'
  }

  if (result.pressureLevel === '高') {
    return '偏高'
  }

  return '中等'
}

function FourPocketPlanner({ initialInput, onComplete }: FourPocketPlannerProps) {
  const [input, setInput] = useState<FourPocketInput>(initialInput)
  const [result, setResult] = useState<FourPocketResult | null>(
    calculateFourPockets(initialInput),
  )

  const updateField = <K extends keyof FourPocketInput>(key: K, value: FourPocketInput[K]) => {
    setInput((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleGenerate = () => {
    const nextResult = calculateFourPockets(input)
    setResult(nextResult)
    onComplete(nextResult)
  }

  const fillExample = () => {
    setInput(initialInput)
    const nextResult = calculateFourPockets(initialInput)
    setResult(nextResult)
    onComplete(nextResult)
  }

  return (
    <section
      id="four-pocket"
      className="scroll-mt-32 rounded-[28px] border border-sky-100 bg-white/88 p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur"
    >
      <SectionTitle
        eyebrow="核心能力一"
        title="校园四袋钱智能分配"
        description="让每一笔生活费都有任务。它不是普通消费分类，而是把每月到账的钱拆成生存袋、成长袋、快乐袋和梦想袋。"
      />

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-2xl border border-slate-100 bg-slate-50/90 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-950">填写本月资金信息</h3>
            <button
              type="button"
              onClick={fillExample}
              className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-100"
            >
              填入校园示例
            </button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">生活费</span>
              <input
                type="number"
                value={input.livingAllowance}
                onChange={(event) => updateField('livingAllowance', Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">兼职收入</span>
              <input
                type="number"
                value={input.partTimeIncome}
                onChange={(event) => updateField('partTimeIncome', Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">奖学金或其他收入</span>
              <input
                type="number"
                value={input.otherIncome}
                onChange={(event) => updateField('otherIncome', Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">固定必要支出</span>
              <input
                type="number"
                value={input.fixedExpense}
                onChange={(event) => updateField('fixedExpense', Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">目标名称</span>
              <input
                type="text"
                value={input.goalName}
                onChange={(event) => updateField('goalName', event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">目标金额</span>
              <input
                type="number"
                value={input.goalAmount}
                onChange={(event) => updateField('goalAmount', Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">目标期限（月）</span>
              <input
                type="number"
                value={input.goalMonths}
                onChange={(event) => updateField('goalMonths', Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">本月特殊事件</span>
              <select
                value={input.specialEvent}
                onChange={(event) => updateField('specialEvent', event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              >
                {specialEvents.map((eventOption) => (
                  <option key={eventOption} value={eventOption}>
                    {eventOption}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-sm font-medium text-slate-700">消费习惯偏好</span>
            <select
              value={input.habit}
              onChange={(event) => updateField('habit', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
            >
              {habits.map((habitOption) => (
                <option key={habitOption} value={habitOption}>
                  {habitOption}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={handleGenerate}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
          >
            <Sparkles className="h-4 w-4" />
            生成四袋钱方案
          </button>

          <div className="mt-4 rounded-2xl border border-sky-100 bg-white p-4">
            <div className="flex items-start gap-3">
              <AIAssistant size="mini" />
              <div>
                <p className="text-sm font-semibold text-slate-950">本月 AI 预判</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  你这个月的主要压力不是生活费不够，而是“{input.goalName || '目标'}”和“{input.habit}”在争同一笔钱。建议先把梦想袋锁定，再把快乐袋控制在每周安全额度内。
                </p>
                <div className="mt-3 grid gap-2 text-sm text-slate-700">
                  <p>
                    <span className="font-medium text-slate-900">本月消费标签：</span>
                    {input.habit}
                  </p>
                  <p>
                    <span className="font-medium text-slate-900">目标压力：</span>
                    {getPreviewPressure(input)}
                  </p>
                  <p>
                    <span className="font-medium text-slate-900">建议动作：</span>
                    先锁定梦想袋，再给快乐袋设边界
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-600">本月总资金</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">
                  {formatCurrency(result?.totalIncome ?? 0)}
                </p>
              </div>
              <div className="h-44 w-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={result?.pocketShare ?? []}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={45}
                      outerRadius={76}
                      paddingAngle={4}
                    >
                      {(result?.pocketShare ?? []).map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) =>
                        formatCurrency(typeof value === 'number' ? value : Number(value ?? 0))
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {pocketInfo.map((item) => {
                const Icon = item.icon
                const value = result?.[item.key] ?? 0
                return (
                  <div key={item.key} className={`rounded-xl p-4 ${item.tone}`}>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </div>
                    <p className="mt-2 text-lg font-semibold">{formatCurrency(value)}</p>
                    <p className="mt-2 text-sm leading-6 opacity-80">{item.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">今日建议可花</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">
                {formatCurrency(result?.dailySafeSpend ?? 0)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">本周安全消费额度</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">
                {formatCurrency(result?.weeklySafeSpend ?? 0)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">梦想目标完成进度</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">
                {formatPercent(result?.dreamProgress ?? 0)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-[linear-gradient(135deg,_rgba(15,76,147,0.08),_rgba(255,255,255,1))] p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600">计划压力</p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  {result?.pressureLevel ?? '中'}
                </p>
              </div>
              <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm">
                让每一笔生活费都有任务
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700">{result?.aiMessage}</p>
            <div className="mt-4 space-y-3">
              {(result?.suggestions ?? []).map((suggestion) => (
                <div
                  key={suggestion}
                  className="rounded-xl border border-white bg-white/80 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {suggestion}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <Target className="h-4 w-4" />
              关键不是少花钱，而是让每个钱袋都有边界。
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FourPocketPlanner

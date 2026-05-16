import { ArrowRight, CircleGauge, Rocket, Sparkles } from 'lucide-react'
import { useState } from 'react'
import type { GoalSandboxInput, GoalSandboxResult } from '../types'
import { formatCurrency } from '../utils/format'
import { calculateGoalSandbox } from '../utils/financeRules'
import SectionTitle from './SectionTitle'

type GoalSandboxProps = {
  initialInput: GoalSandboxInput
  onComplete: (result: GoalSandboxResult) => void
}

const toleranceOptions: GoalSandboxInput['tolerance'][] = [
  '低约束',
  '中等约束',
  '高约束',
]

const planTone = {
  轻松版: 'border-emerald-100 bg-emerald-50',
  标准版: 'border-sky-100 bg-sky-50',
  冲刺版: 'border-amber-100 bg-amber-50',
}

function GoalSandbox({ initialInput, onComplete }: GoalSandboxProps) {
  const [input, setInput] = useState<GoalSandboxInput>(initialInput)
  const [result, setResult] = useState<GoalSandboxResult | null>(
    calculateGoalSandbox(initialInput),
  )

  const updateField = <K extends keyof GoalSandboxInput>(
    key: K,
    value: GoalSandboxInput[K],
  ) => {
    setInput((current) => ({
      ...current,
      [key]: value,
    }))
  }

  const handleGenerate = () => {
    const nextResult = calculateGoalSandbox(input)
    setResult(nextResult)
    onComplete(nextResult)
  }

  const fillExample = () => {
    setInput(initialInput)
    const nextResult = calculateGoalSandbox(initialInput)
    setResult(nextResult)
    onComplete(nextResult)
  }

  const plans = result
    ? [
        ['轻松版', result.easyPlan] as const,
        ['标准版', result.standardPlan] as const,
        ['冲刺版', result.sprintPlan] as const,
      ]
    : []

  return (
    <section
      id="goal-sandbox"
      className="scroll-mt-32 rounded-[28px] border border-sky-100 bg-white/88 p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur"
    >
      <SectionTitle
        eyebrow="核心能力二"
        title="目标攒钱沙盘"
        description="让攒钱计划从算得出变成做得到。理搭子会同时展示计划压力、执行路径和不调整的后果。"
      />

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="self-start rounded-2xl border border-slate-100 bg-slate-50/90 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-950">输入目标参数</h3>
            <button
              type="button"
              onClick={fillExample}
              className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-100"
            >
              填入买电脑示例
            </button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
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
                value={input.months}
                onChange={(event) => updateField('months', Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">每月收入</span>
              <input
                type="number"
                value={input.monthlyIncome}
                onChange={(event) => updateField('monthlyIncome', Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">固定支出</span>
              <input
                type="number"
                value={input.fixedExpense}
                onChange={(event) => updateField('fixedExpense', Number(event.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">当前快乐消费</span>
              <input
                type="number"
                value={input.currentHappinessSpend}
                onChange={(event) =>
                  updateField('currentHappinessSpend', Number(event.target.value))
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
              />
            </label>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-sm font-medium text-slate-700">可接受约束程度</span>
            <select
              value={input.tolerance}
              onChange={(event) =>
                updateField('tolerance', event.target.value as GoalSandboxInput['tolerance'])
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-sky-500"
            >
              {toleranceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
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
            生成目标沙盘
          </button>

          <div className="mt-4 rounded-2xl border border-sky-100 bg-white/88 p-4">
            <p className="text-sm font-semibold text-slate-900">沙盘说明</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              理搭子不会只计算目标金额，还会展示执行压力、失败后果和调整路径。
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">每月应攒金额</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">
                {formatCurrency(result?.requiredMonthlySaving ?? 0)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">当前可攒金额</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">
                {formatCurrency(result?.currentPossibleSaving ?? 0)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">每月缺口</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">
                {formatCurrency(result?.gap ?? 0)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-600">计划压力与成功率</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                    压力系数 {result?.pressureRatio.toFixed(2) ?? '0.00'}
                  </span>
                  <span className="rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800">
                    压力等级 {result?.pressureLevel ?? '中'}
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  成功率
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">
                  {result?.successRate ?? 0}%
                </p>
              </div>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,_#0f4c93,_#38bdf8)]"
                style={{ width: `${result?.successRate ?? 0}%` }}
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700">{result?.aiMessage}</p>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {plans.map(([planName, plan]) => {
              const isStandardPlan = plan.recommended

              return (
              <div
                key={planName}
                className={`rounded-xl border p-5 ${planTone[planName]} ${
                  isStandardPlan
                    ? 'border-sky-300 shadow-[0_18px_45px_-28px_rgba(14,116,144,0.8)] ring-1 ring-sky-100'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{planName}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-950">
                      {formatCurrency(plan.amount)}
                    </p>
                  </div>
                  {planName === '轻松版' ? (
                    <CircleGauge className="h-5 w-5 text-emerald-700" />
                  ) : planName === '标准版' ? (
                    <ArrowRight className="h-5 w-5 text-sky-700" />
                  ) : (
                    <Rocket className="h-5 w-5 text-amber-700" />
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-700">{plan.description}</p>
                {isStandardPlan ? (
                  <div className="mt-3 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-sky-900">
                    推荐：兼顾目标推进和生活体验。
                  </div>
                ) : null}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="rounded-full bg-white/75 px-3 py-1 font-semibold text-slate-700">
                    压力 {plan.pressure}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 font-semibold ${
                      plan.recommended
                        ? 'bg-slate-950 text-white'
                        : 'bg-white/80 text-slate-700'
                    }`}
                  >
                    {plan.recommended ? '推荐' : '备选'}
                  </span>
                </div>
              </div>
              )
            })}
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-950">如果不调整，会发生什么？</p>
              <p className="mt-3 text-sm leading-7 text-amber-950/90">
                {result?.noAdjustmentText}
              </p>
            </div>
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
              <p className="text-sm font-semibold text-sky-950">差额可以从哪里补？</p>
              <div className="mt-3 space-y-2">
                {(result?.supplementAdvice ?? []).map((advice) => (
                  <p key={advice} className="text-sm leading-6 text-sky-950/90">
                    {advice}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-[linear-gradient(135deg,_rgba(15,76,147,0.08),_rgba(255,255,255,1))] p-5">
            <p className="text-sm font-medium text-slate-600">失败一次后的重规划建议</p>
            <div className="mt-4 space-y-3">
              {(result?.adjustmentAdvice ?? []).map((advice) => (
                <div
                  key={advice}
                  className="rounded-xl border border-white bg-white/85 px-4 py-3 text-sm leading-6 text-slate-700"
                >
                  {advice}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GoalSandbox

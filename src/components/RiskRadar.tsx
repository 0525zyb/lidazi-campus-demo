import { AlertTriangle, ShieldAlert, Sparkles, TriangleAlert } from 'lucide-react'
import { useState } from 'react'
import type { RiskResult } from '../types'
import { formatCurrency } from '../utils/format'
import { detectRisk } from '../utils/riskRules'
import AIAssistant from './AIAssistant'
import SectionTitle from './SectionTitle'

type RiskRadarProps = {
  initialQuery: string
  onComplete: (result: RiskResult) => void
}

const riskSamples = {
  risk: '我想借 3000 元炒币，室友说一个月能翻倍，可以试试吗？',
  scam: '有人说做刷单兼职要先交 500 元保证金，之后每天能返现 100 元，靠谱吗？',
  fakePromise: '学长推荐一个保本高息项目，说内部渠道年化 18%，适合学生入门吗？',
}

const riskToneMap: Record<RiskResult['level'], string> = {
  低风险: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  中风险: 'border-amber-200 bg-amber-50 text-amber-900',
  高风险: 'border-rose-200 bg-rose-50 text-rose-900',
  极高风险: 'border-red-200 bg-red-50 text-red-900',
}

function RiskRadar({ initialQuery, onComplete }: RiskRadarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [result, setResult] = useState<RiskResult | null>(detectRisk(initialQuery))

  const handleDetect = () => {
    const nextResult = detectRisk(query)
    setResult(nextResult)
    onComplete(nextResult)
  }

  const applySample = (sample: string) => {
    setQuery(sample)
    const nextResult = detectRisk(sample)
    setResult(nextResult)
    onComplete(nextResult)
  }

  return (
    <section
      id="risk-radar"
      className="scroll-mt-32 rounded-[28px] border border-sky-100 bg-white/88 p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur"
    >
      <SectionTitle
        eyebrow="核心能力三"
        title="风险雷达 + 财务后果沙盘"
        description="让大学生在冲动投资前看见后果。理搭子会识别高风险表达，并把可能亏损换算成生活费压力。"
      />

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="self-start rounded-2xl border border-slate-100 bg-slate-50/90 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-950">输入你的理财或消费疑问</h3>
          </div>
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            rows={5}
            className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-900 outline-none transition focus:border-sky-500"
          />

          <button
            type="button"
            onClick={handleDetect}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
          >
            开始风险雷达检测
          </button>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applySample(riskSamples.risk)}
              className="rounded-full border border-rose-100 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-900 transition hover:bg-rose-100"
            >
              借钱炒币示例
            </button>
            <button
              type="button"
              onClick={() => applySample(riskSamples.scam)}
              className="rounded-full border border-amber-100 bg-amber-50 px-3.5 py-2 text-xs font-semibold text-amber-900 transition hover:bg-amber-100"
            >
              刷单兼职示例
            </button>
            <button
              type="button"
              onClick={() => applySample(riskSamples.fakePromise)}
              className="rounded-full border border-sky-100 bg-sky-50 px-3.5 py-2 text-xs font-semibold text-sky-900 transition hover:bg-sky-100"
            >
              保本高息示例
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-rose-100 bg-white/88 p-4">
            <p className="text-sm font-semibold text-slate-900">风险识别说明</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              系统会识别借贷投资、刷单垫付、保本高息等高风险表达，并换算成生活费压力。
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className={`rounded-2xl border p-5 ${riskToneMap[result?.level ?? '中风险']}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium opacity-80">风险等级</p>
                <p className="mt-2 text-3xl font-semibold">{result?.level ?? '中风险'}</p>
              </div>
              <div className="rounded-xl bg-white/80 p-3 shadow-sm">
                {result?.level === '极高风险' ? (
                  <ShieldAlert className="h-6 w-6" />
                ) : result?.level === '高风险' ? (
                  <TriangleAlert className="h-6 w-6" />
                ) : (
                  <AlertTriangle className="h-6 w-6" />
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {(result?.matchedKeywords ?? []).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-current/20 bg-white/80 px-3 py-1 text-xs font-semibold"
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-white/65 bg-white/80 p-4">
              <p className="text-sm font-semibold">风险类型：{result?.riskType}</p>
              <div className="mt-3 space-y-2">
                {(result?.reasons ?? []).map((reason) => (
                  <p key={reason} className="text-sm leading-6 opacity-90">
                    {reason}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {result?.estimatedLoss ? (
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">借款金额</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  {formatCurrency(result.estimatedLoss.principal)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">亏损 30%</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  损失 {formatCurrency(result.estimatedLoss.loss30)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">亏损 50%</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  损失 {formatCurrency(result.estimatedLoss.loss50)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-sm text-slate-600">生活费压力</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">
                  约 {result.estimatedLoss.livingDaysPressure} 天
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 xl:grid-cols-3">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-900">最好情况</p>
              <p className="mt-3 text-sm leading-6 text-emerald-900/90">
                {result?.consequenceScenarios.best}
              </p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-5">
              <p className="text-sm font-semibold text-amber-900">普通情况</p>
              <p className="mt-3 text-sm leading-6 text-amber-900/90">
                {result?.consequenceScenarios.normal}
              </p>
            </div>
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-5">
              <p className="text-sm font-semibold text-rose-900">最差情况</p>
              <p className="mt-3 text-sm leading-6 text-rose-900/90">
                {result?.consequenceScenarios.worst}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-100 bg-[linear-gradient(135deg,_rgba(15,76,147,0.08),_rgba(255,255,255,1))] p-5">
        <div className="flex items-start gap-3">
          <AIAssistant size="mini" />
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Sparkles className="h-4 w-4 text-sky-700" />
              AI 搭子建议
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-700">{result?.aiMessage}</p>
          </div>
        </div>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {(result?.alternatives ?? []).map((alternative) => (
            <div
              key={alternative}
              className="rounded-xl border border-white bg-white/85 px-4 py-3 text-sm leading-6 text-slate-700"
            >
              {alternative}
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          {result?.complianceTip}
        </div>
      </div>
    </section>
  )
}

export default RiskRadar

import { BadgeCheck, Flag, ShieldCheck, Target } from 'lucide-react'
import type {
  CompletedTasks,
  FourPocketResult,
  GoalSandboxResult,
  RiskResult,
} from '../types'
import { formatCurrency } from '../utils/format'
import AIAssistant from './AIAssistant'
import SectionTitle from './SectionTitle'

type GrowthCenterProps = {
  completedTasks: CompletedTasks
  growthLevel: {
    current: string
    next: string
    badge: string
  }
  fourPocketResult: FourPocketResult | null
  goalSandboxResult: GoalSandboxResult | null
  riskResult: RiskResult | null
}

function GrowthCenter({
  completedTasks,
  growthLevel,
  fourPocketResult,
  goalSandboxResult,
  riskResult,
}: GrowthCenterProps) {
  const tasks = [
    {
      key: 'fourPocketDone',
      label: completedTasks.fourPocketDone
        ? '已完成入账分配任务'
        : '入账分配任务',
      done: completedTasks.fourPocketDone,
      detail: completedTasks.fourPocketDone
        ? `已生成四袋钱方案，本周快乐袋建议控制在 ${formatCurrency(
            fourPocketResult?.weeklySafeSpend ?? 0,
          )} 以内。`
        : '完成一次四袋钱分配后，本月生活费会先有边界再开花。',
    },
    {
      key: 'goalSandboxDone',
      label: completedTasks.goalSandboxDone
        ? '已完成目标规划任务'
        : '目标规划任务',
      done: completedTasks.goalSandboxDone,
      detail: completedTasks.goalSandboxDone
        ? `已生成目标沙盘，下一步建议执行标准版计划：每月 ${formatCurrency(
            goalSandboxResult?.standardPlan.amount ?? 0,
          )}。`
        : '完成一次目标攒钱沙盘后，梦想袋将开始运行。',
    },
    {
      key: 'riskRadarDone',
      label: completedTasks.riskRadarDone
        ? '已完成风险识别任务'
        : '风险识别任务',
      done: completedTasks.riskRadarDone,
      detail: completedTasks.riskRadarDone
        ? `已完成一次风险雷达检测，当前识别结果为 ${riskResult?.level ?? '中风险'}。`
        : '完成一次风险雷达检测后，会形成先看后果再决策的习惯。',
    },
  ]

  const completedCount = tasks.filter((task) => task.done).length
  const allDone = completedCount === 3

  return (
    <section className="rounded-[28px] border border-sky-100 bg-white/88 p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur">
      <SectionTitle
        eyebrow="成长中心"
        title="持续陪伴的校园理财成长体系"
        description="默认从 L2 预算入门者起步，随着三项核心任务完成，成长等级和行动建议会动态变化。"
      />

      <div className="mt-6 grid items-start gap-5 xl:grid-cols-[0.82fr_1.18fr]">
        <div className="self-start rounded-2xl border border-slate-100 bg-[linear-gradient(135deg,_rgba(15,76,147,0.08),_rgba(255,255,255,1))] p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-slate-950 p-3 text-white">
              <BadgeCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">当前等级</p>
              <p className="text-2xl font-semibold text-slate-950">{growthLevel.current}</p>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-white bg-white/85 p-4">
            <p className="text-sm font-medium text-slate-600">下一等级</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{growthLevel.next}</p>
          </div>
          <div className="mt-4 rounded-xl border border-white bg-white/85 p-4">
            <p className="text-sm font-medium text-slate-600">成长徽章</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{growthLevel.badge}</p>
          </div>
          <div className="mt-4 rounded-xl border border-white bg-white/85 p-4">
            <p className="text-sm font-medium text-slate-600">本月完成任务</p>
            <p className="mt-1 text-lg font-semibold text-slate-950">{completedCount} / 3</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,_#0f4c93,_#38bdf8)]"
                style={{ width: `${(completedCount / 3) * 100}%` }}
              />
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-sky-100 bg-white/85 p-4">
            <p className="text-sm font-semibold text-slate-900">成长规则</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              完成四袋钱、目标沙盘和风险雷达三项任务后，进入月度复盘。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.key}
              className="rounded-2xl border border-slate-100 bg-slate-50/90 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-xl p-3 ${
                      task.done ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {task.key === 'fourPocketDone' ? (
                      <Target className="h-5 w-5" />
                    ) : task.key === 'goalSandboxDone' ? (
                      <Flag className="h-5 w-5" />
                    ) : (
                      <ShieldCheck className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-slate-950">{task.label}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{task.detail}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    task.done
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-white text-slate-600'
                  }`}
                >
                  {task.done ? '已完成' : '待完成'}
                </span>
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-slate-100 bg-white p-5">
            <div className="flex items-start gap-3">
              <AIAssistant size="mini" />
              <div>
                <p className="text-sm font-medium text-slate-600">下周行动建议</p>
                {allDone ? (
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    你已完成本月三项核心理财任务，已经具备从预算入门者向目标储蓄者升级的基础。
                  </p>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    先完成还未点亮的任务，再进入月度复盘。理搭子会把预算、目标和风险识别串成一个连续习惯。
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                四袋钱完成后，下周观察快乐袋是否守住周上限。
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                目标沙盘完成后，优先执行标准版计划。
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                风险雷达触发高风险时，先暂停动作，把资金留在生活边界之内。
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GrowthCenter

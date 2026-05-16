import {
  BanknoteArrowDown,
  BookMarked,
  CircleAlert,
  Compass,
  Flag,
  ShieldCheck,
  Target,
  WalletCards,
} from 'lucide-react'
import { useState } from 'react'
import AgentFlow from './components/AgentFlow'
import ComplianceFooter from './components/ComplianceFooter'
import Dashboard from './components/Dashboard'
import FourPocketPlanner from './components/FourPocketPlanner'
import GoalSandbox from './components/GoalSandbox'
import GrowthCenter from './components/GrowthCenter'
import Hero from './components/Hero'
import MetricCard from './components/MetricCard'
import RiskRadar from './components/RiskRadar'
import SectionTitle from './components/SectionTitle'
import TopNav from './components/TopNav'
import type {
  CompletedTasks,
  DashboardMetrics,
  FourPocketInput,
  FourPocketResult,
  GoalSandboxInput,
  GoalSandboxResult,
  RiskResult,
} from './types'

const defaultFourPocketInput: FourPocketInput = {
  livingAllowance: 2000,
  partTimeIncome: 600,
  otherIncome: 0,
  fixedExpense: 1000,
  goalName: '买电脑',
  goalAmount: 3000,
  goalMonths: 4,
  specialEvent: '考证报名',
  habit: '外卖奶茶较多',
}

const defaultGoalSandboxInput: GoalSandboxInput = {
  goalName: '买电脑',
  goalAmount: 3000,
  months: 4,
  monthlyIncome: 2200,
  fixedExpense: 1200,
  currentHappinessSpend: 600,
  tolerance: '中等约束',
}

const defaultRiskQuery = '我想借 3000 元炒币，室友说一个月能翻倍，可以试试吗？'

const defaultDashboardMetrics: DashboardMetrics = {
  totalFunds: 2600,
  dailySafeSpend: 58,
  weeklySafeSpend: 410,
  dreamProgressPercent: 20,
  growthLevelLabel: 'L2 预算入门者',
  riskStatus: '已开启',
}

const defaultCompletedTasks: CompletedTasks = {
  fourPocketDone: false,
  goalSandboxDone: false,
  riskRadarDone: false,
}

function getGrowthLevel(completedTasks: CompletedTasks) {
  const hasPlanning = completedTasks.fourPocketDone && completedTasks.goalSandboxDone
  const hasRiskSense = completedTasks.riskRadarDone

  if (hasPlanning && hasRiskSense) {
    return {
      current: 'L4 风险识别者',
      next: 'L5 稳健规划者',
      badge: '风险守门徽章',
    }
  }

  if (hasPlanning) {
    return {
      current: 'L3 目标储蓄者',
      next: 'L4 风险识别者',
      badge: '梦想袋启动徽章',
    }
  }

  return {
    current: 'L2 预算入门者',
    next: 'L3 目标储蓄者',
    badge: '预算起步徽章',
  }
}

const companionSteps = [
  {
    icon: WalletCards,
    title: '生活费到账',
    description: '先看本月资金、固定支出和目标。',
  },
  {
    icon: BanknoteArrowDown,
    title: '四袋钱分配',
    description: '先给每一笔钱安排任务。',
  },
  {
    icon: Target,
    title: '目标攒钱沙盘',
    description: '把攒钱计划从算得出变成做得到。',
  },
  {
    icon: ShieldCheck,
    title: '风险雷达守门',
    description: '冲动投资前先看见后果。',
  },
  {
    icon: Flag,
    title: '月度成长复盘',
    description: '形成预算、储蓄和风险识别习惯。',
  },
]

function App() {
  const [completedTasks, setCompletedTasks] =
    useState<CompletedTasks>(defaultCompletedTasks)
  const [dashboardMetrics, setDashboardMetrics] =
    useState<DashboardMetrics>(defaultDashboardMetrics)
  const [fourPocketResult, setFourPocketResult] = useState<FourPocketResult | null>(null)
  const [goalSandboxResult, setGoalSandboxResult] =
    useState<GoalSandboxResult | null>(null)
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null)

  const growthLevel = getGrowthLevel(completedTasks)
  const dashboardWithGrowth = {
    ...dashboardMetrics,
    growthLevelLabel: growthLevel.current,
  }

  const handleFourPocketComplete = (result: FourPocketResult) => {
    setFourPocketResult(result)
    setCompletedTasks((current) => ({
      ...current,
      fourPocketDone: true,
    }))
    setDashboardMetrics((current) => ({
      ...current,
      totalFunds: result.totalIncome,
      dailySafeSpend: result.dailySafeSpend,
      weeklySafeSpend: result.weeklySafeSpend,
      dreamProgressPercent: Math.min(Math.round(result.dreamProgress * 100), 100),
    }))
  }

  const handleGoalSandboxComplete = (result: GoalSandboxResult) => {
    setGoalSandboxResult(result)
    setCompletedTasks((current) => ({
      ...current,
      goalSandboxDone: true,
    }))
  }

  const handleRiskRadarComplete = (result: RiskResult) => {
    setRiskResult(result)
    setCompletedTasks((current) => ({
      ...current,
      riskRadarDone: true,
    }))
    setDashboardMetrics((current) => ({
      ...current,
      riskStatus: result.level,
    }))
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_18%_8%,_rgba(33,168,216,0.18),_transparent_28%),radial-gradient(circle_at_88%_18%,_rgba(15,76,129,0.12),_transparent_26%),linear-gradient(180deg,_#EEF6FF_0%,_#F8FBFF_38%,_#EEF4FA_100%)] text-slate-900">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-6 px-4 py-5 lg:px-8">
        <TopNav />
        <Hero weeklySafeSpend={dashboardMetrics.weeklySafeSpend} />

        <div id="overview" className="scroll-mt-32">
          <Dashboard
          metrics={dashboardWithGrowth}
          isExample={!completedTasks.fourPocketDone}
          />
        </div>

        <section id="agent-flow" className="grid scroll-mt-32 items-start gap-6 xl:grid-cols-[1.45fr_0.95fr]">
          <AgentFlow />
          <div className="rounded-2xl border border-sky-100 bg-white/80 p-6 shadow-[0_24px_90px_-48px_rgba(15,23,42,0.45)] backdrop-blur">
            <SectionTitle
              eyebrow="产品定位"
              title="不是记账软件，而是校园资金操作系统"
              description="理搭子 Campus 会在生活费到账时，先帮助用户分配任务、识别目标压力，再为高风险场景拉起守门机制。"
            />
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <MetricCard
                icon={BanknoteArrowDown}
                label="关键表达"
                value="让每一笔生活费都有任务"
                tone="blue"
              />
              <MetricCard
                icon={Compass}
                label="行动主张"
                value="先建立习惯，再进入理财"
                tone="cyan"
              />
              <MetricCard
                icon={CircleAlert}
                label="风险观"
                value="先懂风险，再做决策"
                tone="amber"
              />
              <MetricCard
                icon={ShieldCheck}
                label="银行角色"
                value="财富成长伙伴，不是单一销售入口"
                tone="emerald"
              />
            </div>
          </div>
        </section>

        <FourPocketPlanner
          initialInput={defaultFourPocketInput}
          onComplete={handleFourPocketComplete}
        />

        <GoalSandbox
          initialInput={defaultGoalSandboxInput}
          onComplete={handleGoalSandboxComplete}
        />

        <RiskRadar initialQuery={defaultRiskQuery} onComplete={handleRiskRadarComplete} />

        <section id="growth-loop" className="grid scroll-mt-32 items-start gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <GrowthCenter
            completedTasks={completedTasks}
            growthLevel={growthLevel}
            fourPocketResult={fourPocketResult}
            goalSandboxResult={goalSandboxResult}
            riskResult={riskResult}
          />

          <div className="space-y-6">
            <section className="rounded-[24px] border border-sky-100 bg-white/88 p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.45)] backdrop-blur">
              <SectionTitle
                eyebrow="银行价值"
                title="教育 + 陪伴 + 长期经营"
                description="银行不是只卖产品，也可以成为年轻人的财富成长伙伴。"
              />
              <div className="relative mt-6 space-y-4">
                {[
                  ['校园期', '建立理财启蒙、风险认知与信任入口。'],
                  ['实习期', '承接工资卡、零钱管理与阶段储蓄计划。'],
                  ['初入职场期', '延续低风险理财教育、定投启蒙和保险基础认知。'],
                  ['成长期', '形成长期财富管理关系，而不是一次性触达。'],
                ].map(([title, description], index) => (
                  <div key={title} className="grid grid-cols-[36px_1fr] gap-3">
                    <div className="flex flex-col items-center">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B3A75] text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      {index < 3 ? <div className="h-full w-px bg-sky-100" /> : null}
                    </div>
                    <div className="rounded-2xl border border-slate-100 bg-slate-50/90 p-4">
                      <p className="text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-sky-100 bg-[linear-gradient(135deg,_rgba(14,58,114,0.98),_rgba(9,36,75,0.96))] p-6 text-white shadow-[0_24px_90px_-48px_rgba(15,23,42,0.7)]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
                  陪伴系统
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-normal text-white md:text-[1.9rem]">
                  理搭子陪伴闭环
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-sky-100 md:text-[15px]">
                  不是一次性计算工具，而是陪大学生完成入账分配、目标储蓄、风险识别和成长复盘的长期陪伴系统。
                </p>
              </div>
              <div className="relative mt-6 space-y-3">
                {companionSteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <div
                      key={step.title}
                      className="grid grid-cols-[44px_1fr] gap-3 rounded-2xl border border-white/10 bg-white/8 p-3.5 backdrop-blur"
                    >
                      <div className="relative flex flex-col items-center">
                        <div className="z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/12">
                          <Icon className="h-4 w-4" />
                        </div>
                        {index < companionSteps.length - 1 ? (
                          <div className="mt-1 h-full min-h-6 w-px bg-white/16" />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-sky-100">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <p className="text-sm font-semibold text-white">{step.title}</p>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-5 text-sky-100">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <MetricCard
            icon={WalletCards}
            label="资金入口"
            value="生活费到账先分袋"
            helper="先安排任务，再决定怎么花。"
            tone="blue"
          />
          <MetricCard
            icon={CircleAlert}
            label="风险教育"
            value="让大学生在冲动投资前看见后果"
            helper="把风险提醒从一句警告升级成后果沙盘。"
            tone="rose"
          />
          <MetricCard
            icon={BookMarked}
            label="长期成长"
            value="先建立习惯，再进入理财"
            helper="从预算、储蓄和风险识别开始建立财富能力。"
            tone="emerald"
          />
        </section>

        <ComplianceFooter />
      </div>
    </div>
  )
}

export default App

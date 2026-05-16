import {
  BotMessageSquare,
  BrainCircuit,
  ChartNoAxesColumn,
  CircleCheckBig,
  ScanSearch,
  Shield,
  Sparkles,
} from 'lucide-react'
import SectionTitle from './SectionTitle'

const agentCards = [
  {
    icon: ScanSearch,
    title: '意图识别 Agent',
    description: '判断用户当前是在问消费、攒钱、风险还是理财知识。',
  },
  {
    icon: BrainCircuit,
    title: '校园画像 Agent',
    description: '识别年级、资金来源、消费习惯、目标压力与风险偏好，形成校园理财画像。',
  },
  {
    icon: ChartNoAxesColumn,
    title: '四袋钱分配 Agent',
    description: '把每月资金拆成生存袋、成长袋、快乐袋和梦想袋。',
  },
  {
    icon: Sparkles,
    title: '目标沙盘 Agent',
    description: '生成轻松版、标准版、冲刺版计划，并解释执行压力。',
  },
  {
    icon: BotMessageSquare,
    title: '风险雷达 Agent',
    description: '识别炒币、校园贷、刷单、保本高息等风险诱导。',
  },
  {
    icon: Shield,
    title: '合规守门 Agent',
    description: '避免收益承诺、投资诱导和不合规推荐。',
  },
  {
    icon: CircleCheckBig,
    title: '复盘陪伴 Agent',
    description: '输出周报、月报、成长等级和下一步任务。',
  },
]

function AgentFlow() {
  return (
    <section className="rounded-2xl border border-sky-100 bg-white/82 p-6 shadow-[0_24px_90px_-48px_rgba(15,23,42,0.45)] backdrop-blur">
      <SectionTitle
        eyebrow="多 Agent 架构"
        title="多角色协作的校园财富引擎"
        description="从意图识别到合规守门，理搭子把每一次资金问题拆成可理解、可行动、可复盘的陪伴流程。"
      />

      <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/90 p-4 text-sm text-slate-700">
        用户输入 → 意图识别 Agent → 校园画像 Agent → 四袋钱分配 / 目标沙盘 / 风险雷达 →
        合规守门 Agent → 复盘陪伴 Agent → 输出建议与成长任务
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {agentCards.map((agent, index) => {
          const Icon = agent.icon
          return (
            <div
              key={agent.title}
              className={`rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-5 ${
                index === agentCards.length - 1 ? 'md:col-span-2 2xl:col-span-2' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-sky-50 p-3 text-sky-800">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-slate-950">{agent.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{agent.description}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AgentFlow

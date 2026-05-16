import { BadgeCheck, Bot, Sparkles } from 'lucide-react'
import { formatCurrency } from '../utils/format'
import AIAssistant from './AIAssistant'

type HeroProps = {
  weeklySafeSpend: number
}

function Hero({ weeklySafeSpend }: HeroProps) {
  return (
    <section
      id="top"
      className="overflow-hidden rounded-[28px] border border-sky-100 bg-[linear-gradient(135deg,_#0B3A75_0%,_#0F4C81_52%,_#21A8D8_130%)] px-6 py-8 text-white shadow-[0_30px_120px_-58px_rgba(8,47,95,0.95)] lg:px-9"
    >
      <div className="grid items-center gap-8 xl:grid-cols-[1.16fr_0.84fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.2em] text-sky-100">
            <Sparkles className="h-4 w-4" />
            面向大学生的校园财富成长 Agent
          </div>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal md:text-6xl">
            理搭子 Campus
          </h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-sky-50/95">
            帮大学生完成入账分配、目标储蓄、风险识别和成长复盘。
          </p>
          <p className="mt-4 max-w-3xl text-base leading-7 text-sky-100/90">
            不是等钱花完后再提醒超支，而是在生活费到账时就给每一笔钱安排任务。
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {['校园四袋钱', '攒钱沙盘', '风险雷达', '成长复盘'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-sky-50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur">
          <div className="grid items-center gap-5 lg:grid-cols-[174px_minmax(0,1fr)]">
            <div className="flex justify-center rounded-[22px] bg-slate-950/8 px-2 py-3">
              <AIAssistant />
            </div>
            <div className="min-w-0 rounded-[24px] bg-slate-950/14 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-white/12 p-3">
                    <Bot className="h-6 w-6 text-sky-50" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">AI 搭子在线</p>
                    <p className="text-xs text-sky-100/75">校园财富陪伴中</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/18 px-3 py-1 text-xs font-semibold text-emerald-100">
                  已开启
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-white/12 bg-white/8 p-4">
                <p className="text-sm leading-7 text-sky-50/95">
                  “这个月的钱到账后，我们先给每一笔钱安排任务，再决定怎么花。”
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/8 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-sky-50">
                  <BadgeCheck className="h-4 w-4" />
                  本月行动建议
                </div>
                <div className="mt-3 space-y-2 text-sm leading-6 text-sky-100/88">
                  <p>1. 先锁定梦想袋，再分配快乐袋。</p>
                  <p>2. 本周快乐消费不超过 {formatCurrency(weeklySafeSpend)}。</p>
                  <p>3. 高收益、炒币、刷单先过风险雷达。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero

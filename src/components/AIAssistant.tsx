import { BarChart3, ShieldCheck, Target } from 'lucide-react'

type AIAssistantProps = {
  size?: 'hero' | 'mini'
}

function AIAssistant({ size = 'hero' }: AIAssistantProps) {
  if (size === 'mini') {
    return (
      <div className="relative h-10 w-10 shrink-0">
        <div className="absolute inset-0 rounded-full bg-cyan-300/25 blur-md" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-sky-100 bg-white shadow-sm">
          <div className="h-6 w-6 rounded-full border border-sky-200 bg-gradient-to-b from-white to-sky-50">
            <div className="mx-auto mt-2 flex w-3.5 justify-between">
              <span className="h-1 w-1 rounded-full bg-sky-700" />
              <span className="h-1 w-1 rounded-full bg-sky-700" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative mx-auto h-48 w-full max-w-[174px]">
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/18 bg-cyan-300/8 shadow-[0_0_44px_rgba(33,168,216,0.18)]" />
      <div className="assistant-float absolute left-1/2 top-8 z-10 w-[6.5rem] -translate-x-1/2">
        <div className="mx-auto h-20 w-24 rounded-[26px] border border-white/70 bg-gradient-to-b from-white to-sky-100 shadow-[0_18px_40px_rgba(4,30,66,0.2)]">
          <div className="mx-auto mt-4 h-7 w-16 rounded-2xl bg-[#0B3A75] shadow-inner">
            <div className="flex h-full items-center justify-center gap-5">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-2 h-20 w-20 rounded-[24px] border border-white/70 bg-gradient-to-b from-slate-50 to-sky-100 shadow-[0_18px_40px_rgba(4,30,66,0.18)]">
          <div className="mx-auto mt-3 flex h-9 w-12 items-center justify-center rounded-xl border border-sky-100 bg-white/85">
            <BarChart3 className="h-5 w-5 text-[#0F4C81]" />
          </div>
          <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-cyan-300/80" />
        </div>
      </div>

      <div className="absolute left-1 top-12 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[10px] font-semibold text-sky-50 backdrop-blur">
        预算
      </div>
      <div className="absolute right-0 top-20 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[10px] font-semibold text-sky-50 backdrop-blur">
        目标
      </div>
      <div className="absolute bottom-7 left-4 rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[10px] font-semibold text-sky-50 backdrop-blur">
        风险
      </div>
      <div className="absolute bottom-7 right-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-cyan-100 backdrop-blur">
        <ShieldCheck className="h-4 w-4" />
      </div>
      <div className="absolute right-10 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-cyan-100 backdrop-blur">
        <Target className="h-3.5 w-3.5" />
      </div>
    </div>
  )
}

export default AIAssistant

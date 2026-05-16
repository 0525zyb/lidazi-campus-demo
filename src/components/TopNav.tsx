const navItems = [
  { label: '总览', href: '#overview' },
  { label: 'Agent 架构', href: '#agent-flow' },
  { label: '四袋钱', href: '#four-pocket' },
  { label: '目标沙盘', href: '#goal-sandbox' },
  { label: '风险雷达', href: '#risk-radar' },
  { label: '成长闭环', href: '#growth-loop' },
]

function TopNav() {
  return (
    <nav className="rounded-[22px] border border-white/70 bg-white/82 px-4 py-2.5 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.28)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <a href="#top" className="text-sm font-semibold text-[#0B3A75]">
          理搭子 Campus
        </a>
        <div className="flex flex-wrap gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-sky-50 hover:text-[#0B3A75]"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default TopNav

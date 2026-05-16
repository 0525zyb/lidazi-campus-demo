function ComplianceFooter() {
  return (
    <footer className="rounded-2xl border border-slate-200 bg-slate-950 px-6 py-6 text-slate-100 shadow-[0_24px_90px_-48px_rgba(15,23,42,0.7)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
            合规提示
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            理搭子 Campus 仅用于校园理财教育和规划辅助，不构成具体投资建议，不承诺收益，不保证本金，
            不替代银行正式风险测评和专业服务。涉及具体金融产品购买、投资风险等级确认或资产配置建议时，
            应跳转至银行官方风险测评与专业服务流程。
          </p>
        </div>
        <div className="grid gap-2 text-sm text-slate-300">
          <p>不承诺收益</p>
          <p>不保证本金</p>
          <p>不直接替用户做投资决策</p>
          <p>不诱导高风险投资或借贷投资</p>
        </div>
      </div>
    </footer>
  )
}

export default ComplianceFooter

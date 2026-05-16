export type FourPocketInput = {
  livingAllowance: number
  partTimeIncome: number
  otherIncome: number
  fixedExpense: number
  goalName: string
  goalAmount: number
  goalMonths: number
  specialEvent: string
  habit: string
}

export type FourPocketResult = {
  totalIncome: number
  survivalPocket: number
  growthPocket: number
  happinessPocket: number
  dreamPocket: number
  dailySafeSpend: number
  weeklySafeSpend: number
  dreamProgress: number
  pocketShare: Array<{
    name: string
    value: number
    color: string
  }>
  pressureLevel: '低' | '中' | '高'
  suggestions: string[]
  aiMessage: string
}

export type GoalSandboxInput = {
  goalName: string
  goalAmount: number
  months: number
  monthlyIncome: number
  fixedExpense: number
  currentHappinessSpend: number
  tolerance: '低约束' | '中等约束' | '高约束'
}

export type GoalSandboxPlan = {
  amount: number
  description: string
  pressure: '低' | '中' | '高'
  recommended: boolean
}

export type GoalSandboxResult = {
  requiredMonthlySaving: number
  currentPossibleSaving: number
  gap: number
  pressureRatio: number
  successRate: number
  pressureLevel: '低' | '中' | '偏高' | '过高'
  easyPlan: GoalSandboxPlan
  standardPlan: GoalSandboxPlan
  sprintPlan: GoalSandboxPlan
  noAdjustmentText: string
  supplementAdvice: string[]
  adjustmentAdvice: string[]
  aiMessage: string
}

export type RiskResult = {
  level: '低风险' | '中风险' | '高风险' | '极高风险'
  matchedKeywords: string[]
  riskType: string
  reasons: string[]
  consequenceScenarios: {
    best: string
    normal: string
    worst: string
  }
  estimatedLoss?: {
    principal: number
    loss30: number
    loss50: number
    livingDaysPressure: number
  }
  alternatives: string[]
  complianceTip: string
  aiMessage: string
}

export type CompletedTasks = {
  fourPocketDone: boolean
  goalSandboxDone: boolean
  riskRadarDone: boolean
}

export type DashboardMetrics = {
  totalFunds: number
  dailySafeSpend: number
  weeklySafeSpend: number
  dreamProgressPercent: number
  growthLevelLabel: string
  riskStatus: string
}

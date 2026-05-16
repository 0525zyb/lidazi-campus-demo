import type {
  FourPocketInput,
  FourPocketResult,
  GoalSandboxInput,
  GoalSandboxResult,
} from '../types'
import { clamp } from './format'

const pocketColors = ['#0f4c93', '#2563eb', '#38bdf8', '#f59e0b']

function roundMoney(value: number) {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0
}

function getHabitAdvice(habit: string) {
  if (habit.includes('外卖') || habit.includes('奶茶')) {
    return '快乐袋的边界可以优先从外卖、奶茶和临时加餐开始设上限，不需要一下子把生活压得很紧。'
  }

  if (habit.includes('社交')) {
    return '聚餐和社交不是不能有，建议把高频社交支出提前写进快乐袋，避免月底透支。'
  }

  if (habit.includes('数码')) {
    return '数码消费波动大，先把梦想袋跑起来，再决定是否把快乐消费让位给一次性大件。'
  }

  if (habit.includes('学习')) {
    return '你已经有较强的成长投入意识，可以让成长袋优先保障长期回报更高的开支。'
  }

  return '你的消费节奏比较稳，适合把目标储蓄做成固定动作，让梦想袋持续积累。'
}

function getEventBonus(specialEvent: string) {
  if (specialEvent === '考证报名') {
    return 260
  }

  if (specialEvent === '科研/学习资料') {
    return 180
  }

  if (specialEvent === '毕业旅行') {
    return 80
  }

  return 0
}

export function calculateFourPockets(input: FourPocketInput): FourPocketResult {
  const totalIncome = roundMoney(
    input.livingAllowance + input.partTimeIncome + input.otherIncome,
  )

  const survivalPocket = roundMoney(Math.min(input.fixedExpense, totalIncome * 0.6))
  const growthPocket = roundMoney(
    Math.min(totalIncome * 0.1 + getEventBonus(input.specialEvent), totalIncome * 0.28),
  )
  const monthlyGoalSaving =
    input.goalMonths > 0 ? input.goalAmount / input.goalMonths : input.goalAmount
  const remainingAfterBase = Math.max(totalIncome - survivalPocket - growthPocket, 0)
  const dreamPocket = roundMoney(
    Math.min(monthlyGoalSaving, remainingAfterBase * 0.45),
  )
  const happinessPocket = roundMoney(
    Math.max(totalIncome - survivalPocket - growthPocket - dreamPocket, 0),
  )

  const dailySafeSpend = roundMoney(happinessPocket / 30)
  const weeklySafeSpend = roundMoney(happinessPocket / 4)
  const dreamProgress =
    input.goalAmount > 0 ? clamp(dreamPocket / input.goalAmount, 0, 1) : 0

  const happinessRatio = totalIncome > 0 ? happinessPocket / totalIncome : 0
  const dreamRatio = totalIncome > 0 ? dreamPocket / totalIncome : 0

  let pressureLevel: FourPocketResult['pressureLevel'] = '中'
  if (happinessRatio < 0.1 || dreamPocket < monthlyGoalSaving * 0.7) {
    pressureLevel = '高'
  } else if (happinessRatio > 0.18 && dreamRatio >= 0.18) {
    pressureLevel = '低'
  }

  const suggestions = [
    `生活费到账后，先把 ${roundMoney(dreamPocket)} 元送进梦想袋，再决定快乐支出的上限，会比月底补救轻松得多。`,
    getHabitAdvice(input.habit),
  ]

  if (happinessRatio < 0.1) {
    suggestions.push('快乐袋低于总资金的 10%，说明本月计划偏紧，建议把目标拆成基础版和冲刺版双轨运行。')
  }

  if (happinessRatio > 0.25) {
    suggestions.push('快乐袋超过总资金的 25%，说明当下可花空间较宽松，但仍建议设周上限，避免月底忽然吃紧。')
  }

  if (input.specialEvent === '考证报名' || input.specialEvent === '科研/学习资料') {
    suggestions.push('成长袋已为学习型支出加码，能体现先投资自己、再考虑即时消费的优先级。')
  }

  const aiMessage =
    happinessRatio < 0.1
      ? `你这个月不是完全不能享受，而是快乐袋和 ${input.goalName || '目标储蓄'} 在抢同一笔钱。建议先保住每月 ${roundMoney(dreamPocket)} 元的梦想袋，再把快乐消费压到每周 ${roundMoney(weeklySafeSpend)} 元以内。`
      : `你这个月的四袋钱已经跑起来了。不是不能喝奶茶，而是别让快乐袋挤占梦想袋；把快乐消费控制在每周 ${roundMoney(weeklySafeSpend)} 元左右，会更容易同时守住生活体验和 ${input.goalName || '目标储蓄'}。`

  return {
    totalIncome: roundMoney(totalIncome),
    survivalPocket,
    growthPocket,
    happinessPocket,
    dreamPocket,
    dailySafeSpend,
    weeklySafeSpend,
    dreamProgress,
    pocketShare: [
      { name: '生存袋', value: survivalPocket, color: pocketColors[0] },
      { name: '成长袋', value: growthPocket, color: pocketColors[1] },
      { name: '快乐袋', value: happinessPocket, color: pocketColors[2] },
      { name: '梦想袋', value: dreamPocket, color: pocketColors[3] },
    ],
    pressureLevel,
    suggestions,
    aiMessage,
  }
}

function getSuccessRate(pressureRatio: number) {
  if (pressureRatio <= 0.5) {
    return 85
  }

  if (pressureRatio <= 0.8) {
    return 65
  }

  if (pressureRatio <= 1) {
    return 45
  }

  return 25
}

function getPressureLevel(pressureRatio: number): GoalSandboxResult['pressureLevel'] {
  if (pressureRatio <= 0.5) {
    return '低'
  }

  if (pressureRatio <= 0.8) {
    return '中'
  }

  if (pressureRatio <= 1) {
    return '偏高'
  }

  return '过高'
}

export function calculateGoalSandbox(input: GoalSandboxInput): GoalSandboxResult {
  const months = Math.max(roundMoney(input.months), 1)
  const goalAmount = roundMoney(input.goalAmount)
  const monthlyIncome = roundMoney(input.monthlyIncome)
  const fixedExpense = roundMoney(input.fixedExpense)
  const currentHappinessSpend = roundMoney(input.currentHappinessSpend)
  const requiredMonthlySaving = roundMoney(goalAmount / months)
  const currentPossibleSaving = roundMoney(
    Math.max(monthlyIncome - fixedExpense - currentHappinessSpend, 0),
  )
  const gap = roundMoney(Math.max(requiredMonthlySaving - currentPossibleSaving, 0))
  const pressureRatio = requiredMonthlySaving / Math.max(currentPossibleSaving, 1)
  const successRate = getSuccessRate(pressureRatio)
  const pressureLevel = getPressureLevel(pressureRatio)

  const easyAmount = roundMoney(
    Math.min(currentPossibleSaving, requiredMonthlySaving * 0.6),
  )
  const standardAmount = roundMoney(
    Math.min(
      requiredMonthlySaving,
      currentPossibleSaving + input.currentHappinessSpend * 0.25,
    ),
  )
  const sprintAmount = requiredMonthlySaving

  const naturalTotal = roundMoney(currentPossibleSaving * months)
  const remainingGap = roundMoney(Math.max(goalAmount - naturalTotal, 0))
  const monthlyRelease = 60 + 80 + 150
  const noAdjustmentText =
    remainingGap > 0
      ? `当前自然结余约 ${currentPossibleSaving} 元/月，目标要求 ${requiredMonthlySaving} 元/月，每月缺口 ${gap} 元。如果不调整，${months} 个月大约只能攒 ${naturalTotal} 元，距离${input.goalName || '目标'}还差 ${remainingGap} 元。`
      : `当前自然结余约 ${currentPossibleSaving} 元/月，已经覆盖目标要求的 ${requiredMonthlySaving} 元/月。接下来最重要的是把储蓄动作固定下来，避免临时挪用。`

  const supplementAdvice = [
    '每周少 2 次奶茶，释放约 60 元。',
    '每周少 1 次外卖，释放约 80 元。',
    '减少一次冲动购物，释放约 150 元。',
    `以上调整每月预计可释放约 ${monthlyRelease} 元，剩余差额可通过减少一次社交聚餐、延长期限或增加一次小额兼职补齐。`,
    '优先压缩快乐袋，不压缩生存袋和成长袋。',
  ]

  const adjustmentAdvice = []

  if (gap > 0) {
    adjustmentAdvice.push(
      `每月还差 ${gap} 元，建议优先从外卖、奶茶、冲动购物或聚餐里压缩快乐消费，而不是直接压生存袋。`,
    )
    adjustmentAdvice.push('如果当月少存了 200 元，可以把期限延长 1 个月，或者拆成基础目标和冲刺目标。')
  } else {
    adjustmentAdvice.push('按你当前结余能力，目标具备可执行性，关键是把储蓄动作固定下来。')
  }

  if (input.tolerance === '低约束') {
    adjustmentAdvice.push('你更适合低摩擦启动，先让轻松版稳定跑起来，再逐步切到标准版。')
  }

  if (input.tolerance === '高约束') {
    adjustmentAdvice.push('你愿意为了目标短期收紧快乐消费，但仍建议保留少量弹性预算，避免后期反弹。')
  }

  const aiMessage =
    gap > 0
      ? `你想 ${months} 个月攒出${input.goalName}，每月需要攒 ${requiredMonthlySaving} 元；按当前情况，自然结余只有 ${currentPossibleSaving} 元，直接冲刺容易有挫败感。更推荐标准版 ${standardAmount} 元加小额冲刺的组合，让计划更容易坚持。`
      : `你的目标并不离谱，关键不是算不算得出，而是能不能持续做。把每月 ${requiredMonthlySaving} 元变成固定动作，比靠意志力临时决定更稳。`

  return {
    requiredMonthlySaving,
    currentPossibleSaving,
    gap,
    pressureRatio,
    successRate,
    pressureLevel,
    easyPlan: {
      amount: easyAmount,
      description: '压力最小，适合先把储蓄习惯跑起来，但可能需要延期完成目标。',
      pressure: '低',
      recommended: input.tolerance === '低约束',
    },
    standardPlan: {
      amount: standardAmount,
      description: '适度减少快乐消费，兼顾目标推进和可执行性，是默认推荐路径。',
      pressure: '中',
      recommended: input.tolerance === '中等约束' || gap > 0,
    },
    sprintPlan: {
      amount: sprintAmount,
      description: '尽量按期完成，但需要更强的自控和更紧的快乐袋边界。',
      pressure: '高',
      recommended: input.tolerance === '高约束' && gap === 0,
    },
    noAdjustmentText,
    supplementAdvice,
    adjustmentAdvice,
    aiMessage,
  }
}

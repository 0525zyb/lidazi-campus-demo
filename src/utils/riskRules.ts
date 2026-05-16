import type { RiskResult } from '../types'

const riskKeywords = [
  '炒币',
  '虚拟币',
  '借钱',
  '借钱投资',
  '校园贷',
  '网贷',
  '高收益',
  '保本高息',
  '刷单',
  '兼职垫付',
  '垫付',
  '保证金',
  '内部渠道',
  '一个月翻倍',
  '翻倍',
  '稳赚不赔',
  '跟单',
  '杠杆',
  '期货',
  '套现',
  '信用卡分期',
  '贷款投资',
]

function extractPrincipal(query: string) {
  const amountMatch = query.match(/(\d+(?:\.\d+)?)\s*元?/)
  if (!amountMatch) {
    return undefined
  }

  const amount = Number(amountMatch[1])
  return Number.isFinite(amount) && amount > 0 ? amount : undefined
}

function hasAny(query: string, keywords: string[]) {
  return keywords.some((keyword) => query.includes(keyword))
}

export function detectRisk(query: string): RiskResult {
  const normalizedQuery = query.replace(/\s+/g, '')
  const matchedKeywords = riskKeywords.filter((keyword) =>
    normalizedQuery.includes(keyword),
  )

  const includesBorrow = hasAny(normalizedQuery, [
    '借',
    '借钱',
    '贷款',
    '网贷',
    '校园贷',
    '贷款投资',
  ])
  const includesSpeculative = hasAny(normalizedQuery, [
    '炒币',
    '投资',
    '虚拟币',
    '翻倍',
    '高收益',
    '杠杆',
    '期货',
  ])
  const includesScam = hasAny(normalizedQuery, ['刷单', '保证金', '垫付', '兼职垫付'])
  const includesFalsePromise = hasAny(normalizedQuery, [
    '稳赚不赔',
    '保本高息',
    '内部渠道',
    '翻倍',
    '高收益',
  ])

  let level: RiskResult['level'] = '低风险'
  let riskType = '理性判断提醒'
  const reasons: string[] = []

  if (includesBorrow && includesSpeculative) {
    level = '极高风险'
    riskType = '借贷投资风险 + 高波动资产风险 + 非理性收益预期'
    reasons.push(
      '该问题同时包含借钱、炒币、翻倍等高风险信号，属于典型的借贷投资风险。对大学生而言，用借来的钱参与高波动投资，一旦亏损会直接挤压生活费并形成债务压力。',
    )
  }

  if (includesScam) {
    level = '极高风险'
    riskType = level === '极高风险' && riskType !== '理性判断提醒'
      ? `${riskType} + 疑似诈骗风险`
      : '疑似诈骗风险'
    reasons.push('涉及保证金、垫付或刷单返现，是校园诈骗中的高频危险信号。')
  }

  if (includesFalsePromise && level !== '极高风险') {
    level = '高风险'
    riskType = '虚假宣传风险'
    reasons.push('保本高息、内部渠道、翻倍等表达带有不合理收益承诺，需要停止转账和借贷动作。')
  }

  if (matchedKeywords.length >= 2 && level === '低风险') {
    level = '高风险'
    riskType = '多重风险信号'
    reasons.push('单次问题中同时命中多个风险词，说明诱导特征已经比较明显。')
  } else if (matchedKeywords.length === 1 && level === '低风险') {
    level = '中风险'
    riskType = '风险信号待核实'
    reasons.push('虽然只命中一个风险词，但当前决策仍需要核实信息来源和失败后果。')
  }

  if (reasons.length === 0) {
    reasons.push('没有明显高危词，但任何理财或消费决策都应先确认资金来源、风险边界和失败后果。')
  }

  const principal = extractPrincipal(normalizedQuery)
  const assumedMonthlyAllowance = 2000
  const estimatedLoss = principal
    ? {
        principal,
        loss30: Math.round(principal * 0.3),
        loss50: Math.round(principal * 0.5),
        livingDaysPressure: Math.floor((principal * 0.5) / (assumedMonthlyAllowance / 30)),
      }
    : undefined

  const consequenceScenarios =
    level === '低风险'
      ? {
          best: '信息来源可靠、风险透明，你会更清楚自己在做什么，而不是被情绪推动。',
          normal: '如果理解不充分，仍可能因为误判成本、期限或流动性而影响日常安排。',
          worst: '在没看清规则前贸然参与，可能造成不必要损失，挤压学习和生活节奏。',
        }
      : {
          best: '可能短期赚到钱，但容易形成侥幸心理并继续加码。',
          normal: '可能出现 20%～50% 亏损，生活费被明显挤压。',
          worst: '本金亏损、负债压力、影响学习生活，甚至可能涉及诈骗或违规借贷。',
        }

  const alternatives =
    level === '低风险'
      ? [
          '先做预算评估和风险测评，再决定是否继续了解。',
          '优先完成应急金、储蓄计划和基础理财知识学习。',
          '涉及具体金融产品时，以银行官方页面和专业人员说明为准。',
        ]
      : [
          '先建立 1 到 3 个月生活费的应急金，再考虑任何带波动的决策。',
          '先用模拟账户或知识学习代替真实投入，别拿生活费和借款做试错资金。',
          '如果信息来自同学、群聊或所谓内部渠道，先核实来源，不要先转账或先借钱。',
        ]

  const complianceTip =
    '本次分析仅用于风险教育和规划辅助，不构成具体投资建议，不承诺收益，不鼓励借贷投资。'

  const aiMessage =
    level === '低风险'
      ? '这类问题暂时没有明显高危信号，但仍建议先把预算、期限和失败后果看清楚，再做下一步判断。'
      : '这不是能不能赚的问题，而是你是否承担得起失败后果。对大学生来说，用借来的钱参与高波动投资，本质上是在用未来生活费承担不确定风险。更稳妥的做法是先建立 1～3 个月生活费的应急金，再用模拟账户或知识学习替代真实投入。'

  return {
    level,
    matchedKeywords,
    riskType,
    reasons,
    consequenceScenarios,
    estimatedLoss,
    alternatives,
    complianceTip,
    aiMessage,
  }
}

# 理搭子 Campus

面向大学生的校园财富成长 Agent Web Demo。

这不是传统记账软件，也不是金融产品销售页，而是一套适合比赛演示的横屏校园财富驾驶舱。当前版本已落地 3 个核心能力：

- 校园四袋钱智能分配
- 目标攒钱沙盘
- 风险雷达 + 财务后果沙盘

同时包含：

- 多 Agent 架构展示
- 成长中心
- 银行价值区
- 合规提示区

## 本地运行

```bash
npm install
npm run dev
```

开发服务器启动后，按终端提示打开本地地址即可体验。

## 构建

```bash
npm run build
```

构建完成后，产物会输出到 `dist/` 目录。

## 本地预览构建结果

```bash
npm run preview
```

## 部署到 Vercel

1. 把项目推送到 GitHub 仓库。
2. 登录 Vercel 并导入该仓库。
3. Framework Preset 选择 `Vite`。
4. Build Command 使用：

```bash
npm run build
```

5. Output Directory 使用：

```bash
dist
```

6. 点击部署，完成后获得线上链接。

## 部署到 Netlify

1. 把项目推送到 GitHub 仓库。
2. 登录 Netlify 并选择 `Add new site`。
3. 导入对应仓库。
4. Build command：

```bash
npm run build
```

5. Publish directory：

```bash
dist
```

6. 点击部署，完成后获得线上链接。

## 部署到 GitHub Pages

推荐使用静态部署流程：

1. 将项目推送到 GitHub 仓库。
2. 在仓库中创建 Pages 部署流程，或使用 Actions 将 `dist/` 发布到 `gh-pages` 分支。
3. 由于项目已在 `vite.config.ts` 中设置 `base: './'`，可以更顺滑地适配静态路径。
4. 发布完成后，获取 GitHub Pages 链接。

如果你要自己手动部署，可以先执行：

```bash
npm run build
```

然后把 `dist/` 内容部署到 Pages 对应分支。

## 如何生成可体验二维码

部署完成后，复制访问链接，通过任意二维码生成工具生成二维码，即可作为“可体验二维码”放入 PPT 和提交材料。

建议做法：

1. 先部署到 Vercel 或 Netlify。
2. 复制线上链接。
3. 使用任意二维码工具生成二维码图片。
4. 将二维码与页面截图一起放入比赛 PPT。

## 页面结构

项目主要页面结构如下：

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
    Hero.tsx
    Dashboard.tsx
    AgentFlow.tsx
    FourPocketPlanner.tsx
    GoalSandbox.tsx
    RiskRadar.tsx
    GrowthCenter.tsx
    ComplianceFooter.tsx
    MetricCard.tsx
    SectionTitle.tsx
  utils/
    financeRules.ts
    riskRules.ts
    format.ts
  types/
    index.ts
```

## 三个核心功能在哪里

1. `校园四袋钱智能分配`
   在 `src/components/FourPocketPlanner.tsx`

2. `目标攒钱沙盘`
   在 `src/components/GoalSandbox.tsx`

3. `风险雷达 + 财务后果沙盘`
   在 `src/components/RiskRadar.tsx`

规则引擎分别位于：

- `src/utils/financeRules.ts`
- `src/utils/riskRules.ts`

## 合规说明

本 Demo 只做理财教育、规划辅助和风险提醒，不承诺收益，不保证本金，不直接推荐具体基金、保险、股票、虚拟币等产品，不替代银行正式风险测评和专业服务。

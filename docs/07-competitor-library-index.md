# 竞品库索引

更新日期：2026-07-02

## 1. 竞品库目的

竞品库不是资料仓库，而是社媒增长决策工具。每次记录竞品动态时，都要回答：

1. 它在讲什么任务？
2. 它在争夺什么人群？
3. 它用了什么 GTM 和社媒打法？
4. Kimi 应该学习、避开、还是反击？

## 2. 优先观察对象

| 竞品/参照对象 | 观察重点 | Kimi 应对角度 |
|---|---|---|
| Claude / Claude Work / Claude Cowork | AI Fluency、行业工作流、企业协作 | 学习教育型内容和行业化表达 |
| ChatGPT / OpenAI Codex | 从通用助手到工作代理、面向非代码用户的扩展 | 强调复杂任务交付和中文场景 |
| Trae Work | 开发和工作流整合 | 对比非开发场景的完成度 |
| Qoder Work | agentic coding / 工作流能力 | 观察“交付结果”叙事 |
| WorkBuddy | 职场协作、办公任务 | 对比职场效率场景 |
| 国内 AI 办公/搜索产品 | 中文办公、搜索、文档处理 | 防守高频中文任务 |

## 3. 观察维度

| 维度 | 记录内容 | 决策用途 |
|---|---|---|
| 功能 | 新能力、能力边界、典型演示 | 判断是否需要产品回应 |
| GTM | 发布节奏、目标人群、活动机制 | 借鉴发布打法 |
| 社媒内容 | 标题、栏目、达人、评论区 | 生成 Kimi 内容选题 |
| 转化路径 | 落地页、模板、试用入口 | 优化 Kimi 承接 |
| 用户反馈 | 高频赞美、吐槽、困惑 | 找机会点和防守点 |
| 资产沉淀 | 教程、课程、案例库 | 建 Kimi 模板库 |

## 4. 竞品内容拆解格式

每条重要动态按以下结构记录到 `templates/competitor-tracker.csv`：

| 字段 | 说明 |
|---|---|
| date | 发现日期 |
| competitor | 竞品名称 |
| channel | 渠道 |
| url | 链接 |
| topic | 主题 |
| audience | 目标人群 |
| task | 对应任务 |
| format | 内容形式 |
| hook | 标题/钩子 |
| proof | 证据：数据、案例、截图、评论 |
| gtm_signal | GTM 信号 |
| kimi_response | Kimi 应对 |
| owner | 负责人 |
| status | todo / watching / responded / archived |

## 5. Kimi 应对策略

| 竞品动作 | 判断 | Kimi 响应 |
|---|---|---|
| 对方发布强功能 | 能力相关 | 做“同任务 Kimi 工作流” |
| 对方教育某行业 | 人群相关 | 做中文行业场景版本 |
| 对方达人内容爆 | 渠道相关 | 找同圈层达人测试 |
| 对方用户吐槽明显 | 机会点 | 做“如何避免这个问题”的教程 |
| 对方活动带来话题 | 节点相关 | 做借势内容或模板包 |

## 6. 每周更新机制

| 时间 | 动作 |
|---|---|
| 周二 | 竞品研究补充本周新动态 |
| 周三 | 内容负责人从竞品库挑 3 个可转化选题 |
| 周五 | 周复盘讨论是否需要 Kimi 响应 |
| 月末 | 归档低价值记录，保留高价值案例 |

## 7. 竞品库目录建议

后续如果需要扩展，可以在 `docs/competitors/` 下建立单独文件：

| 文件 | 内容 |
|---|---|
| `claude.md` | Claude/Anthropic 的功能、GTM、社媒内容 |
| `codex.md` | Codex/OpenAI 工作流与非开发者场景 |
| `trae-work.md` | Trae Work 场景和开发者增长打法 |
| `qoder-work.md` | Qoder Work 场景和 agent 叙事 |
| `workbuddy.md` | WorkBuddy 职场协作场景 |

当前最小可运行版本先用 `templates/competitor-tracker.csv` 统一维护。已经沉淀的深拆见：

| 文件 | 用途 |
|---|---|
| `docs/08-claude-anthropic-reading-notes.md` | Claude/Anthropic 用户教育体系 |
| `docs/09-competitor-deep-dive.md` | 重点竞品功能、GTM、社媒表达 |
| `docs/10-social-channel-title-swipe.md` | 社媒栏目模式和标题库 |

## 8. 本轮结论

1. Claude 值得学的是“教育体系”，不是单条内容形式。
2. Codex 值得学的是“从目标到交付物”的结果叙事，尤其是面向非代码人群的工作案例。
3. Qoder Work 值得学的是 before/after 和 case study，把节省时间说清楚。
4. WorkBuddy 值得学的是角色包和流程包，但 Kimi 不应直接卷 100+ 专家，而应先让用户完成 7 个高价值任务。
5. Kimi 的反击点是中文复杂资料、真实工作流、多输出交付物、可复制模板和达人实证。

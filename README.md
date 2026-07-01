# Kimi 社媒增长运营交付体系

更新日期：2026-07-02

本目录是一套可直接运营的 Kimi 社媒增长工作台。它把社媒增长拆成完整闭环：整体增长策略、平台规划、栏目、选题/脚本、达人投放、GTM、增长漏斗、功能使用率、复盘机制、文档资产。

## 使用方式

1. 每月第一周：阅读 `docs/01-growth-masterplan.md` 和 `docs/02-goals-budget-metrics.md`，确认当月主战场、预算、北极星指标。
2. 每周一：用 `templates/weekly-review-template.md` 复盘上周，用 `templates/content-calendar.csv` 排本周内容。
3. 每周二到周四：按 `docs/03-content-pillars.md` 生产内容，按 `templates/content-brief-template.md` 写单条内容 brief。
4. 每周三和周五：按 `docs/04-creator-campaign-playbook.md` 筛达人、发 brief、回收报价与脚本。
5. 每次产品发布、功能更新或节点活动前：跑一遍 `docs/05-gtm-checklist.md`。
6. 每周五：更新 `templates/competitor-tracker.csv`，把重要变化沉淀到 `docs/07-competitor-library-index.md`。
7. 每次做新功能 GTM 前：先读 `docs/20-anthropic-site-content-system.md`、`docs/21-claude-site-content-system.md`、`docs/22-priority-sections-deep-read.md`，把功能放进 Research / Product / Solutions / Resources 四层资产里。
8. 每次做人群、投放和达人规划前：先读 `docs/23-kimi-audience-segmentation-v2.md` 和 `templates/audience-segment-matrix-v2.csv`，按 P0/P1/P2 和任务价值来定预算。

## 文件地图

| 文件 | 用途 | 主要使用者 |
|---|---|---|
| `docs/01-growth-masterplan.md` | 社媒增长总纲，定义定位、人群、打法、节奏 | 负责人、内容、投放、产品市场 |
| `docs/02-goals-budget-metrics.md` | 目标、预算、指标口径和看板机制 | 负责人、数据、投放 |
| `docs/03-content-pillars.md` | 内容栏目、选题池、内容结构和发布节奏 | 内容、设计、视频剪辑 |
| `docs/04-creator-campaign-playbook.md` | 达人投放策略、筛选标准、brief 和验收 | 达人运营、投放 |
| `docs/05-gtm-checklist.md` | 发布前、中、后检查清单 | PMM、社媒、产品 |
| `docs/06-weekly-review-operating-rhythm.md` | 周复盘会议机制和决策规则 | 增长团队 |
| `docs/07-competitor-library-index.md` | 竞品库索引、观察维度、更新规则 | 竞品研究、内容策略 |
| `docs/08-claude-anthropic-reading-notes.md` | Claude/Anthropic 官网与文档阅读后的用户教育策略 | 增长负责人、PMM、内容 |
| `docs/09-competitor-deep-dive.md` | Codex、Claude Cowork、Trae Work、Qoder Work、WorkBuddy 深拆 | 竞品研究、PMM、内容 |
| `docs/10-social-channel-title-swipe.md` | 竞品栏目模式和 Kimi 可用标题库 | 内容、达人运营 |
| `docs/11-claude-full-corpus-reading.md` | 本地 Claude/Anthropic 全量文本读取记录和策略判断 | 增长负责人、PMM |
| `docs/12-kimi-platform-content-strategy.md` | 小红书、抖音、B 站、知乎、公众号、即刻/微博、社群的栏目策略 | 内容负责人、渠道负责人 |
| `docs/13-kimi-topic-bank-80.md` | 首批 80 个可排期选题 | 内容团队、达人运营 |
| `docs/14-first-batch-content-scripts.md` | 首批 24 条可直接拍摄/改写的脚本 | 内容、达人、剪辑 |
| `docs/15-growth-system-architecture.md` | 整体增长体系和文档体系总纲 | 增长负责人、团队负责人 |
| `docs/16-growth-funnel-and-feature-usage.md` | 增长漏斗、功能使用率、复盘指标 | 增长、数据、PMM |
| `docs/17-claude-content-system-playbook.md` | Claude/Anthropic 内容系统方法论和 Kimi 转译 | 增长负责人、内容策略 |
| `docs/18-competitor-gtm-social-deep-dive.md` | Claude、Codex、Trae、Qoder、WorkBuddy 功能/GTM/社媒深拆 | 竞品研究、PMM |
| `docs/19-platform-column-script-ops-manual.md` | 平台栏目、站点资产映射、第 2 月选题和脚本骨架 | 内容负责人、渠道运营 |
| `docs/20-anthropic-site-content-system.md` | Anthropic 公司站全站阅读和内容资产分工 | 增长负责人、品牌/PR |
| `docs/21-claude-site-content-system.md` | Claude 产品站全站阅读和转化资产拆解 | PMM、内容、产品 |
| `docs/22-priority-sections-deep-read.md` | Anthropic Research 与 Claude Products/Solutions/Resources 精读 | 增长负责人、内容策略 |
| `docs/23-kimi-audience-segmentation-v2.md` | Kimi 高付费受众 V2 分层和投放判断 | 增长负责人、投放、达人运营 |
| `templates/content-brief-template.md` | 单条内容 brief 模板 | 内容负责人 |
| `templates/creator-brief-template.md` | 达人合作 brief 模板 | 达人运营 |
| `templates/weekly-review-template.md` | 周复盘填报模板 | 增长负责人 |
| `templates/content-calendar.csv` | 内容排期表 | 内容团队 |
| `templates/creator-roster.csv` | 达人池和投放进度表 | 达人运营 |
| `templates/competitor-tracker.csv` | 竞品动态追踪表 | 竞品研究 |
| `templates/experiment-log.csv` | 增长实验记录表 | 增长负责人 |
| `templates/month-1-content-calendar.csv` | 首月 40 条跨平台排期 | 内容负责人、渠道运营 |
| `templates/growth-funnel-dashboard.csv` | 增长漏斗数据表 | 数据、增长负责人 |
| `templates/feature-usage-tracker.csv` | 功能使用率追踪表 | PMM、产品、数据 |
| `templates/weekly-funnel-review-template.md` | 周复盘模板 | 增长负责人 |
| `templates/month-2-content-calendar.csv` | 第 2 月 56 条内容排期，含站点资产承接 | 内容负责人 |
| `templates/platform-column-scorecard.csv` | 平台栏目评分表，追踪栏目、人群、功能、资产、漏斗 | 增长负责人、渠道运营 |
| `templates/audience-segment-matrix-v2.csv` | P0/P1/P2 受众矩阵，含任务、付费触发、平台和指标 | 投放、达人运营、内容策略 |

## 北极星指标

社媒带来的 7 日内高价值任务完成用户数。

高价值任务指用户在 Kimi 中完成了一个可感知结果的复杂任务，例如：深度研究、长文生成、文件理解、方案拆解、学习规划、求职材料、商业分析、代码/产品工作流辅助。

## 核心运营链路

目标 -> 人群任务 -> 场景卡 -> 内容脚本 -> 达人 brief -> 模板库 -> 数据复盘

这套体系的重点不是“发更多内容”，而是让 Kimi 在社媒上被理解为一个复杂工作交付系统：能把用户的模糊问题变成可用结果，并能在真实行业、真实任务、真实材料里稳定工作。

## 研究证据

已把 Anthropic 公司站、Claude 产品站、Claude/Anthropic 文档与学习页下载到本地并生成阅读地图。重点证据包括 `sources/index/anthropic-site-reading-map.csv`、`sources/index/claude-site-reading-map.csv`、`sources/index/full-corpus-reading-map.csv`。原始 HTML 和 Claude 产品站全量 text 语料保存在本地，不作为 GitHub 交付主体；策略文档、阅读地图、脚本和模板是可交付资产。

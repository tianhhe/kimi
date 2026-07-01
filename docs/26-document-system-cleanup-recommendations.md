# Kimi 社媒增长文档体系整理建议

更新日期：2026-07-02

本文只做整理建议，不要求删除现有文件。目标是降低使用成本：让运营同学知道先打开哪个文件、哪些是证据、哪些是执行、哪些只是模板或数据表。

## 1. 当前体系最需要整理的 5 个点

1. `01-growth-masterplan.md` 和 `15-growth-system-architecture.md` 都承担“总纲”职能，入口容易分散。建议保留两个文件，但明确分工：01 是月度增长策略总纲，15 是文档和系统架构说明。
2. Claude/Anthropic 与竞品研究文件很多，且 `08`、`11`、`17`、`20`、`21`、`22` 都会讲内容系统和用户教育。建议统一归为“研究证据层”，日常运营不要从这里开始，只在 GTM、栏目升级、竞品复盘时打开。
3. 内容执行链条分布在 `03`、`10`、`12`、`13`、`14`、`19`，目前都是有价值资产，但使用顺序不够明显。建议固定为：栏目原则 -> 平台策略 -> 选题池 -> 脚本 -> 第二月运营手册。
4. 周复盘模板存在两个相近入口：`weekly-review-template.md` 和 `weekly-funnel-review-template.md`。建议前者做常规经营复盘，后者只做漏斗/功能 GTM 专项复盘，避免重复填报。
5. 数据表已经很多，但指标和模板容易散。建议所有执行表都回到三张主表：`growth-funnel-dashboard.csv` 看转化，`feature-usage-tracker.csv` 看功能，`experiment-log.csv` 看实验结论；其他表作为输入来源。

## 2. 建议的四层结构

### A. 总纲层

保留原则：只放月度方向、目标、预算、人群、漏斗和体系结构，不放具体脚本细节。

| 文件 | 建议定位 | 是否保留 |
|---|---|---|
| `docs/01-growth-masterplan.md` | 月度增长策略总纲 | 保留，作为月度规划主入口 |
| `docs/02-goals-budget-metrics.md` | 目标、预算、指标口径 | 保留，作为月度目标和预算入口 |
| `docs/15-growth-system-architecture.md` | 文档体系与增长系统架构 | 保留，作为新人理解全局的体系说明 |
| `docs/16-growth-funnel-and-feature-usage.md` | 漏斗、功能使用率、复盘指标 | 保留，作为数据复盘主入口 |
| `docs/23-kimi-audience-segmentation-v2.md` | 高付费受众分层 | 保留，作为人群、投放、达人决策入口 |

整理建议：在 `01` 顶部加一句“具体文档结构看 `00-operating-index.md`，体系结构看 `15`”，避免 01 和 15 互相抢入口。当前任务不改 01，只先在首页中完成分流。

### B. 研究证据层

保留原则：研究文件不合并进执行文件，避免执行文档变成大论文；但每个研究文件都要有明确使用场景。

| 文件 | 主要重叠 | 建议 |
|---|---|---|
| `docs/08-claude-anthropic-reading-notes.md` | 与 `17`、`20`、`21` 都涉及 Claude/Anthropic 用户教育 | 保留为早期阅读结论和策略摘要 |
| `docs/11-claude-full-corpus-reading.md` | 与 `20`、`21`、`22` 都来自全站/语料阅读 | 保留为证据索引，不作为日常入口 |
| `docs/17-claude-content-system-playbook.md` | 与 `20`、`21`、`22` 都讲内容系统 | 保留为方法论主文档；20/21/22 作为证据附属 |
| `docs/18-competitor-gtm-social-deep-dive.md` | 与 `09` 都讲竞品深拆 | 保留为 GTM/社媒层深拆；09 作为较基础横向竞品库 |
| `docs/20-anthropic-site-content-system.md` | 与 `17` 的方法论重叠 | 保留为公司站证据 |
| `docs/21-claude-site-content-system.md` | 与 `17` 的方法论重叠 | 保留为产品站证据 |
| `docs/22-priority-sections-deep-read.md` | 与 `20`、`21` 局部重叠 | 保留为重点栏目精读 |

整理建议：未来如果要合并，不建议直接删文件，而是建立一个 `research-evidence-index` 类入口，把 `08/11/17/20/21/22` 按“摘要、全量语料、方法论、公司站、产品站、重点栏目”排序。

### C. 运营执行层

保留原则：执行文件要能回答“这周做什么、谁做、产出在哪里、怎么验收”。

| 文件 | 当前作用 | 建议 |
|---|---|---|
| `docs/03-content-pillars.md` | 内容栏目与选题体系 | 保留为内容原则和栏目矩阵 |
| `docs/04-creator-campaign-playbook.md` | 达人投放与共创 | 保留为达人主入口 |
| `docs/05-gtm-checklist.md` | GTM 检查清单 | 保留为功能发布主入口 |
| `docs/06-weekly-review-operating-rhythm.md` | 周复盘机制 | 保留为复盘会议规则 |
| `docs/10-social-channel-title-swipe.md` | 标题和栏目表达 | 保留为内容生产辅助库 |
| `docs/12-kimi-platform-content-strategy.md` | 分平台内容策略 | 保留为渠道打法入口 |
| `docs/13-kimi-topic-bank-80.md` | 80 个选题 | 保留为选题池 |
| `docs/14-first-batch-content-scripts.md` | 24 条脚本 | 保留为脚本启动包 |
| `docs/19-platform-column-script-ops-manual.md` | 平台、栏目、站点资产、第二月内容 | 保留，但标注为第二月/进阶运营手册 |

整理建议：`19` 很大且覆盖平台、栏目、脚本、站点资产，容易和 `03/12/13/14` 重叠。建议定位为“第二月运营手册”，不要作为首月日常入口。

### D. 模板与数据表层

保留原则：模板文件只承担填写、跟踪、复盘，不承载大量策略解释。

| 文件 | 建议定位 | 重叠处理 |
|---|---|---|
| `templates/content-calendar.csv` | 常规周排期 | 保留，作为每周排期主表 |
| `templates/month-1-content-calendar.csv` | 首月启动排期 | 保留，作为启动包 |
| `templates/month-2-content-calendar.csv` | 第二月进阶排期 | 保留，承接站点资产和模板库 |
| `templates/content-brief-template.md` | 单条内容 brief | 保留 |
| `templates/creator-roster.csv` | 达人池和投放进度 | 保留 |
| `templates/creator-brief-template.md` | 达人 brief | 保留 |
| `templates/audience-segment-matrix-v2.csv` | 受众矩阵 | 保留，和 `docs/23` 配套 |
| `templates/competitor-tracker.csv` | 竞品动态追踪 | 保留，和 `docs/07/09/18` 配套 |
| `templates/platform-column-scorecard.csv` | 栏目评分 | 保留，周复盘使用 |
| `templates/growth-funnel-dashboard.csv` | 增长漏斗 | 保留，复盘主数据表 |
| `templates/feature-usage-tracker.csv` | 功能使用率 | 保留，GTM 后主数据表 |
| `templates/experiment-log.csv` | 实验记录 | 保留，沉淀假设和结论 |
| `templates/weekly-review-template.md` | 常规周复盘 | 保留为主复盘模板 |
| `templates/weekly-funnel-review-template.md` | 漏斗专项复盘 | 保留，但只用于转化异常或功能 GTM |

整理建议：后续模板命名可以统一为“动作对象 + 用途”，例如 `weekly-review-template`、`weekly-funnel-review-template` 继续保留，但在首页中明确使用差异。

## 3. 命名和编号问题

1. `01` 与 `15` 都像总纲。建议通过首页和文件顶部说明分工，而不是合并。
2. `08`、`11`、`17`、`20`、`21`、`22` 编号分散，但都属于 Claude/Anthropic 研究证据。建议未来在文件名或首页标签中统一标为“研究证据”。
3. `09` 和 `18` 都是竞品深拆。建议 `09` 定位为基础竞品库，`18` 定位为功能-GTM-社媒深挖。
4. `13`、`14`、`19` 都包含可执行内容资产。建议 `13` 是选题池，`14` 是首批脚本，`19` 是第二月平台栏目运营手册。
5. templates 里有首月、第二月、常规周排期三类表。建议首页中固定使用顺序：启动时用 month-1，第二月用 month-2，稳定运营用 content-calendar。

## 4. 建议合并或保留原则

### 不建议现在合并的文件

| 文件组 | 原因 |
|---|---|
| `01` + `15` | 一个偏业务增长总纲，一个偏系统架构。合并后会太长，反而不利于月度运营。 |
| `09` + `18` | 一个是竞品横向基础库，一个是功能-GTM-社媒深挖。使用场景不同。 |
| `13` + `14` | 选题池和脚本库要分开。选题用于排期，脚本用于生产。 |
| `weekly-review-template` + `weekly-funnel-review-template` | 常规复盘和漏斗专项复盘的会议目的不同。 |

### 未来可以弱合并的方向

弱合并不是删除文件，而是在首页或索引中合并入口。

| 文件组 | 建议入口 |
|---|---|
| `08/11/17/20/21/22` | 统一进入“Claude/Anthropic 研究证据与内容系统” |
| `03/10/12/13/14/19` | 统一进入“内容生产流水线” |
| `04/23/audience-segment-matrix-v2/creator-roster` | 统一进入“高价值人群与达人投放” |
| `16/growth-funnel-dashboard/feature-usage-tracker/experiment-log` | 统一进入“数据复盘与实验” |

## 5. 推荐使用路径

### 周运营路径

`06` -> `weekly-review-template` -> `03` -> `12` -> `content-calendar` -> `content-brief-template` -> `growth-funnel-dashboard` -> `platform-column-scorecard`

说明：先复盘，再排期，再生产，再看数据，不要直接从选题池开始。

### 月规划路径

`01` -> `02` -> `23` -> `audience-segment-matrix-v2` -> `month-1-content-calendar` 或 `month-2-content-calendar` -> `experiment-log`

说明：先定目标和人群，再定内容和实验。

### 新功能 GTM 路径

`05` -> `20/21/22` -> `10` -> `12` -> `content-brief-template` -> `feature-usage-tracker` -> `weekly-funnel-review-template`

说明：新功能不是只发 announcement，而是要同时补齐用户教育、场景内容、转化承接和功能使用率追踪。

### 达人投放路径

`23` -> `audience-segment-matrix-v2` -> `04` -> `creator-roster` -> `creator-brief-template` -> `growth-funnel-dashboard`

说明：达人不是单纯扩曝光，而是要证明某一类高价值任务能被 Kimi 完成。

### 竞品复盘路径

`07` -> `competitor-tracker` -> `09` 或 `18` -> `10` -> `content-calendar`

说明：竞品观察最终要变成 Kimi 的回应内容、栏目调整或 GTM 风险提醒。

## 6. 后续维护规则

1. 新增策略文档前，先判断能否写入现有 `01/02/15/16/23`。
2. 新增研究文档前，先判断它是摘要、证据、方法论还是竞品深挖。
3. 新增内容资产前，先判断它是选题、脚本、标题，还是平台栏目手册。
4. 新增模板前，先判断它会不会和已有 CSV/MD 模板重复字段。
5. 每次大版本整理后，只更新 `docs/00-operating-index.md` 作为唯一首页，避免 README 和多个总纲互相分流。

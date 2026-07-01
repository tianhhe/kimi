# Claude / Anthropic 用户教育拆解

更新日期：2026-07-02

## 1. 本文用途

这不是语料审计，而是把已下载并阅读的 Anthropic / Claude 官网、学习页、产品页、文档页转成 Kimi 社媒增长可用的策略资产。

本地证据在 `sources/`：

| 目录/文件 | 用途 |
|---|---|
| `sources/index/crawl-report.md` | 官方页面抓取概况 |
| `sources/index/official-pages.json` | 官方 URL 与本地文件映射 |
| `sources/text/` | 抽取后的正文文本 |
| `sources/raw/` | 原始 HTML |

重点阅读页包括 Claude for Work、Claude for You、Anthropic Academy、AI Fluency Index、Claude Cowork、Claude Code、Claude for Small Business、Claude docs 的 agents/tools/use-case guides。

## 2. Claude 的内容系统不是功能说明书

Claude 的官网教育体系有 5 层：

| 层级 | Claude 做法 | 对 Kimi 的启发 |
|---|---|---|
| 新手入口 | Claude 101、Claude for You、Claude for Work | 做 `Kimi Work 101` 和 `Kimi Agent 101`，让用户知道第一件真实任务怎么交给 Kimi |
| 能力心智 | AI Fluency、Artifacts、Projects、Skills、Research、integrations | 做 `Agent Fluency`，把会不会用 AI 从 prompt 技巧升级成任务委派能力 |
| 角色场景 | sales、marketing、engineering、education、small business 等 | 做 `某某岗位怎么用 Kimi`，不要只做通用效率教程 |
| 任务模板 | use-case guides、course、workflow、prompt examples | 每个内容栏目都要沉淀为可复制模板和案例页 |
| 信任机制 | safety、policy、enterprise、data handling、admin docs | Kimi Work 面向高付费人群时，要在内容里讲清权限、资料、边界、校验 |

## 3. Claude 的核心方法：把“会用 AI”产品化

Claude 的 AI Fluency 思路可以抽象成 4 个用户能力：

| 能力 | 用户要学会什么 | Kimi 内容表达 |
|---|---|---|
| Delegation 委派 | 把目标、材料、限制交给 AI | “把一堆资料交给 Kimi，它先帮你拆任务” |
| Description 描述 | 把需求讲清楚，给足上下文 | “不要只问一句，给 Kimi 角色、材料、输出格式” |
| Discernment 判断 | 会检查、追问、改写结果 | “Kimi 输出后怎么做二次校验” |
| Diligence 迭代 | 把 AI 纳入真实工作流程 | “从第一次回答到可交付文档的 5 步” |

Kimi 不应该只教育 prompt，而应该教育“任务委派”。这会更适合 Kimi Agent 和 Kimi Work，因为用户买单的不是聊天，而是完成复杂工作。

## 4. Claude Cowork / Code 的叙事重点

Claude Cowork 和 Claude Code 的共同叙事是：用户给目标，AI 进入工作环境，拆计划，执行，校验，交付。

这套叙事对 Kimi Agent / Kimi Work 的转译：

| Claude 叙事 | Kimi 可用表达 |
|---|---|
| Work alongside Claude | “让 Kimi 和你一起完成一份真实交付物” |
| Plan and execute | “Kimi 先拆解任务，再调用工具完成结果” |
| Context-aware workspace | “把文件、网页、表格、目标放到同一个任务里” |
| From idea to artifact | “从一句需求到文档、表格、PPT、网页、报告” |
| Human oversight | “你负责判断方向，Kimi 负责推进过程” |

## 5. Claude for Small Business 的打法

Claude 面向小企业的内容不是泛泛讲效率，而是把“业务流程”包装成可购买的工作包。

Kimi 可照这个思路做 6 个小团队高付费包：

| 工作包 | 目标人群 | 可展示任务 |
|---|---|---|
| 市场调研包 | 创业者、市场、咨询 | 从竞品链接到市场洞察报告 |
| 销售资料包 | 销售、BD、ToB 团队 | 从客户资料到拜访提纲和跟进邮件 |
| 内容运营包 | 新媒体、品牌、创作者 | 从账号定位到 30 天选题和脚本 |
| 招聘求职包 | HR、求职服务、个人用户 | 从 JD 和简历到候选人评估/面试准备 |
| 学习研究包 | 学生、研究员、知识博主 | 从论文资料到综述、提纲、问答 |
| 管理复盘包 | 管理者、运营、项目经理 | 从会议/数据/材料到周报和行动清单 |

## 6. 对 Kimi 官方账号的内容栏目建议

| 栏目 | 参考 Claude 内容逻辑 | Kimi 栏目定义 |
|---|---|---|
| Kimi Work 101 | Claude 101 | 新用户第一周必须完成的 7 个任务 |
| Agent Fluency | AI Fluency | 教用户如何委派、描述、判断、迭代 |
| 某某行业怎么用 Kimi | Claude for work/use cases | 岗位、行业、任务三层拆解 |
| Kimi Task Loop | Claude Code/Cowork | 目标 -> 计划 -> 执行 -> 校验 -> 交付 |
| Kimi 模板库 | Academy/course/templates | 每条内容附一个可复制模板 |
| Kimi Work in Action | product demo/case | 屏幕录制展示真实输入和输出 |
| 小团队 AI 工作包 | small business | 按业务流程打包场景和教程 |

## 7. Kimi 不应照抄的地方

1. 不要把教育内容做得太像英文文档。中文社媒需要更强结果展示和更低学习门槛。
2. 不要只讲抽象理念。AI Fluency 要落到“怎么给 Kimi 一个任务”。
3. 不要只做功能公告。每个功能都必须包装成用户任务和结果。
4. 不要把高付费人群理解为企业客户。学生、求职者、创作者、咨询/运营/市场小团队，只要任务痛感强，也可能高付费。

## 8. Kimi 的一句话策略

用 Claude 的教育体系做骨架，用中文社媒的强场景和强结果做表达，把 Kimi Agent / Kimi Work 从“AI 工具”讲成“复杂工作交付系统”。

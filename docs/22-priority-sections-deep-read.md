# Anthropic Research 与 Claude 重点栏目精读

更新日期：2026-07-02

## 1. 结论

用户指出的几个导航区是对的，应该作为重点精读层：

1. `anthropic.com/research`：公司级可信度、思想领导、使用洞察、AI 能力教育。
2. `claude.com/product`：把功能包装成工作对象和转化入口。
3. `claude.com/solutions`：按 use case、公司规模、部门、行业拆受众。
4. `claude.com/resources`：把教育内容、客户案例、教程、use cases、插件、连接器做成长期资产。

Kimi 要学的不是页面样式，而是内容分工：Research 提供可信论据，Product 提供功能心智，Solutions 提供受众入口，Resources 提供用户教育和 SEO，Connectors/Plugins/Customers 提供长尾场景与社会证明。

## 2. 已读取范围

| 来源 | 读取范围 | 本地证据 |
|---|---:|---|
| Anthropic Research | 122 个 research 页面 | `sources/index/anthropic-site-reading-map.csv` |
| Claude Product / Features | 7 个 product canonical 页，5 个 feature canonical 页，多语言共 45 页 | `sources/index/claude-site-reading-map.csv` |
| Claude Solutions | 16 个 canonical solution 页，多语言共 80 页 | `sources/index/claude-site-reading-map.csv` |
| Claude Resources/Learn | 258 个 canonical resources/learn 页，多语言共 491 页 | `sources/index/claude-site-reading-map.csv` |
| Claude Connectors / Plugins / Customers | 402 个 connectors、294 个 plugins、252 个 customers canonical 页 | `sources/index/claude-site-reading-map.csv` |

## 3. Anthropic Research 怎么看

Anthropic Research 的价值不是“展示技术先进”，而是持续回答三个问题：

| 研究层 | 典型内容 | 作用 | Kimi 可复制动作 |
|---|---|---|---|
| AI 使用洞察 | Economic Index、Clio、81,000 人调查、AI Fluency Index、个人指导、disempowerment patterns | 证明用户真实在怎样用 AI，哪些人群/任务正在迁移 | 做 `Kimi 中文知识工作指数`、`Kimi Agent 使用报告`、`中国职场 AI 工作流地图` |
| Agent 方法论 | Building Effective AI Agents、Trustworthy agents、Claude Code expertise、agents in biology | 把 agent 从“神奇功能”变成可判断、可执行、可校验的方法 | 做 `Kimi Agent Task Loop`、`哪些任务适合 Agent`、`多 agent 分工模板` |
| 安全与信任 | Agentic Misalignment、cyber、biosecurity、alignment、constitutional classifiers | 解决企业/高付费用户对权限、误操作、事实错误、数据安全的顾虑 | 做 `Kimi 安心用`、`高风险任务人审清单`、`Agent 权限与校验指南` |
| 模型可解释与能力边界 | Interpretability、model behavior、sleeper agents、diff tool | 建立“我们知道模型边界”的专业可信度 | 做 `Kimi 输出为什么要验收`、`Kimi 不适合什么任务` |
| 公共叙事与政策 | AI leadership、economic policy、institute agenda | 把 AI 产品放进社会、教育、经济、组织变革语境 | 做 `AI 工作方式变化观察`、`中文组织如何安全引入 Agent` |

对社媒增长的启发：Research 可以变成内容母矿。每一篇研究不直接卖功能，而是拆成“认知长文 -> 观点短帖 -> 方法论视频 -> Kimi 场景模板 -> 用户实验任务”。Kimi 如果只有功能案例，会显得像工具；如果有自己的研究/洞察线，会更像一个可信工作系统。

## 4. Claude Product 怎么看

Claude Product 导航不是按模型参数组织，而是按“用户把什么工作交给 Claude”组织：

| Claude 产品/功能 | 它包装的用户任务 | Kimi 对应包装 |
|---|---|---|
| Claude overview | thinking partner，复杂问题、写作、学习、代码、分析 | `Kimi 是复杂工作交付系统` |
| Claude Cowork | 从 chat 到 finished work，描述结果和节奏，Claude 自己行动，用户审批 | `Kimi Work：从资料夹到交付物` |
| Claude Code / Enterprise | 读代码库、改文件、跑命令、提交，企业可管理 | `Kimi Agent：从任务到可验证步骤`，但非代码内容要强调文档/研究/运营交付 |
| Claude Design | 原型、deck、one-pager，从想法到设计草稿 | `Kimi 做汇报、活动页、方案和可视化` |
| Claude Science | 科研数据、数据库、pipeline、provenance | `Kimi for 研究/论文/实验资料整理` |
| Claude Security | scan to fix，安全团队从发现到修复 | `Kimi for 风险检查/安全复盘/合规材料` |
| Skills / Chrome / Microsoft 365 | 把 Claude 放进浏览器、办公套件、可复用技能 | `Kimi 模板库/工作流包/办公场景插件化表达` |

最值得 Kimi 学的是 Cowork 的表达：不是“我能调用工具”，而是“你描述结果和节奏，我完成繁琐步骤，你保留控制权”。Kimi Work 和 Kimi Agent 的主叙事也应该围绕 outcome、cadence、files、approval、finished deliverable。

## 5. Claude Solutions 怎么看

Claude Solutions 的结构比“岗位列表”更完整。它至少用了四条切分线：

| 维度 | Claude 示例 | 对 Kimi 的启发 |
|---|---|---|
| Use cases | AI agents、Coding、Code modernization | 先讲“任务类型”，例如研究、写报告、做表格、做 PPT、清理资料、搭建工作流 |
| Company size | Startups、Enterprise | 分开讲小团队老板和企业团队负责人，前者要快，后者要安全、权限、可管理 |
| Departments | Legal、Security | 对高风险部门独立包装，强调校验、人审、权限和合规 |
| Industries | Customer support、Education、Financial services、Government、Healthcare、Life sciences、Nonprofits | 高付费行业必须有独立落地页、模板包和案例，而不是放进通用办公效率里 |

Kimi 受众拆分要跟上这套结构。不能只写“产品/运营/市场”，还要拆出公司规模、部门、行业、任务成熟度、购买角色和付费触发点。

## 6. Claude Resources 怎么看

Claude Resources 是整个内容系统的承接层，截图里的菜单其实是一套增长资产库：

| Resources 项 | 真实功能 | Kimi 应建资产 |
|---|---|---|
| Blog | 发布、观点、产品教育、SEO | `Kimi 工作方式博客`、功能发布拆解、用户案例复盘 |
| Claude partner network / Service partners | 渠道和服务生态 | 达人、代理商、培训师、行业顾问合作库 |
| Community / Events | 社群和现场教育 | Kimi 工作流改造营、直播门诊、线下工作坊 |
| Connectors / Plugins | 长尾工具场景和 SEO | Kimi 模板库/工具连接页/工作流包 |
| Courses / Tutorials | 系统学习路径 | Kimi Work 101、Agent Fluency、岗位训练营 |
| Customer stories / Powered by Claude | 社会证明和采购信任 | Kimi 客户案例、用户交付物案例、团队采用案例 |
| Engineering at Anthropic | 技术可信度 | Kimi 工程/产品幕后、Agent 设计原则 |
| Inside Claude Code / Cowork / Enterprise | 产品深度教育 | Inside Kimi Agent / Work / Team |
| Use cases | 任务灵感库 | Kimi 任务库，按角色、行业、功能、输入材料过滤 |

Resources 的核心不是“资料中心”，而是把用户从不同入口引到下一步：看博客产生认知，看 use cases 找任务，看 tutorials 上手，看 courses 系统学习，看 connectors/plugins 把工具接进来，看 customer stories 建信任，看 pricing/contact sales 转化。

## 7. Kimi 应该重构的内容资产地图

| 资产层 | Kimi 资产 | 对应社媒栏目 | 数据指标 |
|---|---|---|---|
| Research | Kimi 中文知识工作指数、Agent 使用报告、高价值任务报告 | `AI 工作方式观察`、`Kimi 使用洞察` | 收藏、引用、媒体/达人二创、企业线索 |
| Product | Kimi Work、Kimi Agent、Kimi 模板库、Kimi 团队版 | `一分钟交给 Kimi`、`从资料夹到交付物` | 功能点击、首用、功能激活率 |
| Solutions | Kimi for 产品/运营/销售/研究/小团队/金融/教育/法律/内容团队 | `某某岗位怎么用 Kimi`、`高付费场景卡` | 分人群注册、模板领取、高价值任务完成 |
| Resources | Kimi Work 101、Agent Fluency、教程、use cases、案例库 | `Kimi 课代表`、`任务卡模板库` | 课程完成、D7 复用、模板复用 |
| Connectors / Plugins | Kimi 工作流包、工具组合页、行业模板包 | `一个模板跑完一件事` | 模板保存、重复使用、团队分享 |
| Customers | 用户工作流改造、团队采用故事、达人同题挑战 | `用户交付物改造`、`案例榜` | UGC 授权、案例点击、付费咨询 |

## 8. 直接行动

1. 官网/文档侧新增四个主目录：`Research/洞察`、`Solutions/场景`、`Resources/学习`、`Templates/模板`。
2. 社媒排期必须映射到这四类资产，不能只有平台和标题。
3. 每个高付费人群至少配一个 solution landing page、10 个 use cases、3 个 tutorial、1 个模板包、1 个案例故事。
4. 每个新功能 GTM 必须先完成：产品页一句话、3 个 solution 场景、5 个 use case、2 条教程、1 个达人 brief、1 张漏斗指标表。
5. 每月产出一份轻研究报告，把社媒评论、用户作业、模板使用数据、功能激活数据整理成 Kimi 自己的 insight。


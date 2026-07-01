# Claude / Anthropic 官方语料可迁移到 Kimi 社媒增长的新增洞察

> 目的：不是审计语料覆盖率，而是把读完 Claude / Anthropic 官方内容后的“内容建设模式”转成 Kimi 可执行的社媒增长思路。

## 本次读取的本地证据

### 索引

- `sources/index/full-corpus-reading-map.csv`
- `sources/index/anthropic-site-reading-map.csv`
- `sources/index/claude-site-reading-map.csv`

### 代表性正文

- Products / Features：`claude_com__product-overview__a1d4c8c663b3.txt`、`claude_com__product-cowork__fcdbd38b82d6.txt`、`claude_com__product-claude-code-enterprise__152fba8f3f51.txt`、`claude_com__skills__3377cfa2c47a.txt`、`claude_com__claude-for-microsoft-365__df68510bed24.txt`、`claude_com__claude-for-chrome__51cc1cabaf5d.txt`
- Solutions：`claude_com__solutions-agents__47a6f280cb9f.txt`、`claude_com__solutions-small-business__d06fb3eb0192.txt`、`claude_com__solutions-financial-services__d0841a7cdea6.txt`、`claude_com__solutions-customer-support__62c8f87cabe0.txt`、`claude_com__solutions-legal__235bd6c4aa3b.txt`、`claude_com__solutions-education__16c564ede1de.txt`
- Resources / Tutorials / Use cases：`claude_com__resources-use-cases__084c6f2dd776.txt`、`claude_com__resources-use-cases-category-marketing__b2edd763d4b6.txt`、`claude_com__resources-use-cases-category-cowork__8e60bd3b7271.txt`、`claude_com__resources-tutorials-using-claude-cowork-for-marketing-ops-review__2495e273d021.txt`、`claude_com__resources-tutorials-using-claude-cowork-for-sales-account-research__98d705f47622.txt`、`claude_com__resources-tutorials-using-the-google-docs-integration__ebe40ec5943f.txt`、`claude_com__resources-tutorials-using-the-github-integration__49ba77674eb6.txt`、`claude_com__resources-tutorials-what-are-skills__44643cd8a18e.txt`
- Courses / Academy：`www_anthropic_com__learn__b1f1f173f6ab.txt`、`www_anthropic_com__learn-claude-for-work__1bc925cb5a1c.txt`、`www_anthropic_com__learn-build-with-claude__8bfc097ccd85.txt`、`www_anthropic_com__learn-claude-for-you__5c01379dccff.txt`、`anthropic_skilljar_com__home__fa53afcc388e.txt`
- Research：`www_anthropic_com__research-AI-fluency-index__9bbe59235b89.txt`、`www_anthropic_com__research-how-ai-is-transforming-work-at-anthropic__b5cdeb42a9c9.txt`、`www_anthropic_com__research-claude-code-expertise__6bbeb682cdf9.txt`、`www_anthropic_com__research-economic-index-june-2026-report__503801173bf9.txt`、`www_anthropic_com__research-measuring-agent-autonomy__5bba6deb12c5.txt`
- Connectors / Plugins / Skills / MCP：`platform_claude_com__docs-en-agents-and-tools-agent-skills-overview__c5a3d221b0cb.txt`、`platform_claude_com__docs-en-agents-and-tools-agent-skills-best-practices__4601878d325d.txt`、`platform_claude_com__docs-en-agents-and-tools-agent-skills-enterprise__3006a806f911.txt`、`platform_claude_com__docs-en-agents-and-tools-mcp-connector__fa4249e8888c.txt`、`platform_claude_com__docs-en-agents-and-tools-remote-mcp-servers__4a15f8843ac0.txt`、`platform_claude_com__docs-en-agents-and-tools-tool-use-build-a-tool-using-agent__15851ca5ac7e.txt`、`claude_com__platform-marketplace__b6198bca5748.txt`
- Platform use-case guides：`platform_claude_com__docs-en-about-claude-use-case-guides-overview__a0fe0c249e34.txt`、`platform_claude_com__docs-en-about-claude-use-case-guides-customer-support-chat__61097b3d049a.txt`、`platform_claude_com__docs-en-about-claude-use-case-guides-content-moderation__815b60b81693.txt`、`platform_claude_com__docs-en-about-claude-use-case-guides-legal-summarization__2149f146782e.txt`、`platform_claude_com__docs-en-about-claude-use-case-guides-ticket-routing__ca11ad93810c.txt`
- Customer stories：`claude_com__customers__980b0e9266b9.txt`、`claude_com__customers-airtree__05f5e49b748a.txt`、`claude_com__customers-canva__4a7cf4b675b7.txt`、`claude_com__customers-hubspot-qa__a0c857c98dfe.txt`、`claude_com__blog-how-brex-improves-code-quality-and-productivity-with-claude-code__e1b429de5d46.txt`

## 14 条 Claude / Anthropic 内容建设模式

### 1. 从“功能导航”升级为“任务宇宙”

证据：Claude 官网产品页的全局导航不是只列 Claude、Claude Code、Cowork，而是同时放入 Products、Features、Solutions、Resources、Courses、Tutorials、Use cases、Customer stories、Connectors、Plugins。产品总览页还把 Write、Learn、Code、Research、Analyze、Create 等任务入口直接做成可尝试提示词。

运营含义：用户不是因为一个模型名而转化，而是因为“我眼前这个任务有入口、有教程、有案例、有下一步”。社媒内容也应把单条发布挂到完整路径，而不是让用户看完就走。

Kimi 怎么做：建立“Kimi 任务地图”，每个社媒选题都标注对应的任务入口，例如论文阅读、周报生成、会议纪要、行业研究、竞品分析、长文写作、表格整理、PPT 大纲。每条短内容最后引导到一个可复用的“任务卡”或“工作流模板”。

### 2. 产品页用“可复制提示词”降低第一次尝试成本

证据：Claude 产品总览页大量出现“Help me organize my Downloads folder”“Design a comprehensive study guide”等完整提示词，并附带附件、工作目录、预期产物示例。Cowork 页也用“Pull my metrics... every Friday”“Draft a Q1 product update report”等任务化 prompt 展示能力。

运营含义：最强的产品内容不是“我们能做什么”，而是“你可以直接这样问”。这会降低用户从围观到试用的心理成本。

Kimi 怎么做：社媒每周固定发布“Kimi 一句话开工 prompt”，不要只写技巧，要写完整上下文、输入材料、约束和产物格式。每个 prompt 对应一个场景：学生、运营、销售、产品经理、研究员、创业者。

### 3. 把新产品定义成“交付形态”，不是聊天形态

证据：Claude Cowork 反复强调 hand off task、completed work、polished deliverable、scheduled tasks、organize files、build spreadsheets、prepare reports，并把“Claude does the work / you review and decide”写成核心循环。

运营含义：当内容开始强调“交付物”，用户会把产品从问答工具升级为工作系统。社媒增长也应卖“完成一次复杂工作”的结果，而不是卖“回答更聪明”。

Kimi 怎么做：把 Kimi 的主叙事从“会聊天/会搜索/长上下文”转成“复杂工作交付”：输入一堆资料，产出报告、PPT、表格、复盘、方案、邮件、清单。短视频或图文要展示“原始混乱材料 -> Kimi 工作过程 -> 可交付文件”。

### 4. Solutions 不是行业介绍，而是行业决策页

证据：Claude solutions 覆盖 AI agents、Customer support、Education、Financial services、Legal、Small Business 等。教育页明确拆成 students、educators、administrators；AI agents 页连接 prompt 改进、API、客户故事和资源；customer support use-case guide 则从“是否适合使用 Claude”开始，再到理想交互、部署、评估。

运营含义：行业内容的作用不是泛泛地说“AI 能帮你”，而是帮用户判断自己是否适合、该从哪类任务开始、用什么标准验收。

Kimi 怎么做：做“Kimi for X”系列时，每个行业页/栏目都必须包括：适用任务、不适用任务、输入材料清单、首个低风险试点、验收指标、失败排查。社媒端用短内容拆成“一个行业的一条真实任务”。

### 5. Resources / Use cases 做成可筛选的“灵感库”

证据：Claude use cases 页面提供 Category、Features、Product 等筛选维度，覆盖 Cowork、Marketing、Finance、Legal、Research、Sales 等，并把每个 use case 写成“具体动作 + 使用产品 + 输入材料 + 回收产物”。

运营含义：资源库不是文章归档，而是让用户按身份、任务、功能找到下一次使用理由。它也能给社媒团队提供长期选题池。

Kimi 怎么做：建立“Kimi 用例灵感库”，筛选维度至少包括人群、任务、输入材料、输出格式、使用功能、耗时、适合平台。社媒内容从库里抽取，不再临时想选题。

### 6. 教程从“怎么用功能”变成“怎么完成工作流”

证据：Claude Cowork marketing ops 教程聚焦“run a weekly review that preps itself”，sales 教程聚焦“research any account before the first call”，Google Docs / GitHub integration 教程则不是单纯说明连接，而是说明连接后能增强什么工作流程。

运营含义：用户不需要孤立的按钮教程，需要“我周五复盘/我见客户前/我整理文档时怎么做”。工作流教程更适合被收藏、转发和复用。

Kimi 怎么做：Kimi 教程标题要尽量写成“用 Kimi 完成某个周期性工作”，如“每周一自动整理行业动态”“投简历前 20 分钟做公司研究”“把 10 篇论文变成汇报材料”。每篇教程提供输入清单、分步 prompt、产物模板和检查点。

### 7. Research 被产品化成“观点、方法、指标、课程”

证据：AI Fluency Index 不只发布研究结论，还给出 iteration/refinement、question polished outputs、setting collaboration terms 等用户可实践建议。Economic Index 系列把真实使用数据转成 AI 如何影响工作节奏、产出和技能的连续叙事。Agent autonomy 报告把监督、可观测性、打断机制变成产品设计建议。

运营含义：研究内容的增长价值在于制造长期可信的“解释框架”。它能支撑观点型社媒、课程、用户教育和企业销售材料。

Kimi 怎么做：做“Kimi 工作方式指数”或“Kimi 长上下文使用报告”，从匿名化、聚合化的数据中提炼：用户常用任务、迭代次数、材料类型、最终产物、失败原因、验证行为。每份报告拆成 20 条社媒观点和 5 个教程。

### 8. AI Fluency 是用户教育的主线，而不是附属栏目

证据：Anthropic Learn 页、AI Fluency 课程、Skilljar 课程列表都把 AI Fluency 做成基础课程，并按 students、educators、nonprofits、small businesses、builders 等人群拆分。AI Fluency Index 也把“会不会迭代、会不会质疑、会不会设置合作方式”变成可观测行为。

运营含义：AI 产品增长的一个关键不是教用户“功能”，而是教用户“如何成为更好的 AI 合作者”。这会扩大内容的受众，不限于已经知道产品的人。

Kimi 怎么做：推出“Kimi AI 工作力”系列，分成新手、学生、职场、创作者、研究者、创业者。每期不只讲功能，而是讲一种行为：补充上下文、设定格式、要求反驳、验证来源、二次迭代、把结果交给同事审阅。

### 9. Skills / Plugins 把“组织知识”包装成可传播资产

证据：Agent Skills 文档把 Skills 定义为可复用、文件系统式的资源，包含 instructions、scripts、templates、references，并强调 on-demand loading、domain-specific expertise、compose capabilities。Cowork 页把 plugins 描述为把团队工具、知识和工作流打包进一个安装包。

运营含义：内容不只是文章，也可以是可安装、可复用、可共享的“能力资产”。当用户能下载模板/技能/工作流，内容就从传播物变成生产力基础设施。

Kimi 怎么做：做“Kimi 工作包”栏目：每个工作包包含提示词、文件模板、检查清单、示例输入、示例输出。面向中文用户优先做“周报工作包”“小红书选题工作包”“论文速读工作包”“客户拜访准备工作包”“竞品分析工作包”。

### 10. Connectors / Marketplace 内容把生态变成“场景证明”

证据：Claude Marketplace 按 Code、Data、Financial Services、Legal 等 use cases 过滤，并强调企业可用 Anthropic commitment 采购 Claude-powered partner solutions。Google Docs、GitHub integration 教程把连接器作为具体任务增强器，而不是孤立集成说明。

运营含义：连接器/插件的传播重点不是“支持了某平台”，而是“连接后多完成了哪类工作”。生态内容还可以借合作伙伴背书扩大信任。

Kimi 怎么做：如果 Kimi 有浏览器、文档、网盘、飞书、微信、钉钉、Notion 等连接能力，社媒不要发“支持连接 X”，而要发“连接 X 后 10 分钟完成 Y”。每个合作方都对应一个真实工作流 demo 和一个客户/创作者示例。

### 11. Customer stories 以“产品、行业、规模、结果”做可检索资产

证据：Claude customer stories 页面按 Product、Size、Industry 等筛选；案例标题直接写出业务结果，如 Brex 改善代码质量与生产率、HubSpot reclaimed time for creativity、Cox B2B funnel 7x return、Notion workspace for teams and agents。

运营含义：客户故事不是品牌宣传稿，而是销售和社媒的证据库。标题必须包含可记忆的结果、角色和场景。

Kimi 怎么做：建立“Kimi 用户故事库”，每条故事标准字段：用户角色、原始任务、输入材料、Kimi 工作流、节省时间、产物质量、可复制 prompt、下一步 CTA。社媒标题用“某类人用 Kimi 把 X 做成 Y”。

### 12. 企业级内容把“控制权”当作增长卖点

证据：Claude Code Enterprise 和 Cowork 页面都强调 admin controls、role-based permissions、SSO、SCIM、OpenTelemetry、usage analytics、approval states、access restrictions、data retention。Agent autonomy 报告也强调产品应设计可观察和可干预机制。

运营含义：对组织用户来说，增长内容不能只讲效率，还要讲可控、可观测、可治理。信任是企业转化链路中的内容资产。

Kimi 怎么做：做“Kimi 企业可控 AI”内容线，面向管理员、团队负责人、法务和安全：权限、数据边界、日志、人工确认、知识库隔离、引用溯源、错误复盘。社媒可做成“团队引入 AI 前必须问的 10 个问题”。

### 13. 平台文档把“生产级采用路径”写成教程

证据：ticket routing guide 从定义 intent categories、success criteria、choose model、build prompt、deploy prompt、evaluate prompt、build evaluation function、run evaluation 到 integrate workflow。它不是只给 API 调用，而是给完整上线路径。

运营含义：高意向用户需要“从想法到上线”的路线图。内容越接近生产级，越能吸引专业用户和团队内部传播。

Kimi 怎么做：为高价值场景写“从 0 到可用”的长教程：例如“从 0 搭一个部门知识问答助手”“从 0 搭一个投研资料周报流”“从 0 搭一个客服反馈归因表”。每篇都包括评估指标、样例数据、失败模式和改进策略。

### 14. 课程体系把新手、进阶、组织推广连接起来

证据：Anthropic Academy 同时有 Claude 101、Claude Code 101、Claude Platform 101、Introduction to Cowork、AI Fluency、MCP、agent skills、subagents、small business、nonprofits、builders 等课程，并提供证书和学习进度。

运营含义：课程是长期获客和用户激活资产。它让一次内容触达变成多次学习、完成、认证和组织内扩散。

Kimi 怎么做：推出“Kimi 101 -> Kimi 场景课 -> Kimi 工作流认证”三级内容。社媒负责引流到微课，微课产出作业，作业再回流成用户故事和模板库。

## Kimi 可迁移的 30 个栏目 / 选题

1. Kimi 101：第一次把一个真实任务交给 Kimi
2. Kimi AI 工作力：如何补上下文、追问、反驳、验证
3. Kimi 一句话开工 prompt：每天一个可复制任务
4. Kimi for 学生：论文、课程、考试、实习申请
5. Kimi for 职场新人：周报、会议纪要、调研、邮件
6. Kimi for 产品经理：需求池、竞品分析、PRD 初稿、用户反馈归因
7. Kimi for 运营：活动复盘、内容日历、数据解读、达人 brief
8. Kimi for 销售：客户研究、拜访准备、跟进邮件、方案摘要
9. Kimi for 创作者：选题库、脚本、标题、跨平台改写
10. Kimi for 研究者：文献综述、实验记录、研究假设、引用核查
11. Kimi for 小团队：从混乱文件到一份可执行计划
12. Kimi for 管理者：会议决策、项目复盘、团队知识库
13. Kimi 长上下文挑战：一次读完 20 份材料能产出什么
14. Kimi 工作包：周报包、竞品包、论文包、销售包、复盘包
15. Kimi 模板拆解：一个好结果背后的输入材料和提示词
16. Kimi 用户故事：某类用户如何把 3 小时压到 20 分钟
17. Kimi 失败复盘：为什么这次结果不好，如何改 prompt
18. Kimi 验证课：如何要求引用、来源、反例和不确定性
19. Kimi 输出物诊所：改一份报告、PPT、简历、邮件
20. Kimi 资料夹整理：从网盘/本地材料到知识地图
21. Kimi 行业任务地图：金融、教育、法律、医疗、咨询、媒体
22. Kimi 每周研究简报：AI 如何改变中文用户工作方式
23. Kimi 工作方式指数：用户最常用任务、迭代次数、产物类型
24. Kimi 连接器想象力：连接一个工具后能完成什么
25. Kimi 组织 AI 安全清单：团队引入前要确认什么
26. Kimi 多轮协作案例：从第一版到最终版的完整迭代
27. Kimi 与人类专家：哪些环节交给 Kimi，哪些必须人工判断
28. Kimi 资料到交付：混乱素材变成报告/PPT/表格全过程
29. Kimi 场景微课：7 天掌握一个工作流
30. Kimi 社区作业展：用户用同一个模板做出的不同成果

## Kimi 应追踪的 10 个内容资产指标

1. 任务资产覆盖率：每个核心人群是否至少有 10 个可复用任务卡。
2. 社媒到任务卡点击率：短内容是否能把用户带到更完整的教程/模板。
3. Prompt 复制/收藏率：用户是否愿意把内容保存为下次工作入口。
4. 模板下载/使用率：内容是否从阅读转成实际生产力资产。
5. 首次任务完成率：从内容进入 Kimi 后，用户是否完成一个高价值任务。
6. 7 日内高价值任务复用人数：内容是否带来持续工作行为。
7. 迭代深度：用户是否在同一任务中追问、修订、补材料，而不是一次性离开。
8. 产物分享率：用户是否愿意分享 Kimi 生成的报告、清单、PPT、表格或教程。
9. 行业/角色内容转化率：不同人群栏目带来的注册、试用、留存、付费差异。
10. 证据资产复用率：研究报告、用户故事、教程、模板被社媒反复引用的次数。

## 最关键的 5 条新增洞察

1. Kimi 社媒增长要从“讲模型能力”转成“讲复杂工作交付”，用输入材料和最终产物建立用户想象。
2. Claude 的强项是把 Products、Solutions、Resources、Research、Customer stories、Courses 连成闭环；Kimi 需要把每条社媒内容挂回一个可继续学习和使用的资产。
3. AI Fluency 是比 prompt 技巧更大的教育叙事；Kimi 可以用“AI 工作力”承接新手教育、专业用户成长和组织推广。
4. Connectors / Plugins / Skills 的内容价值不是技术说明，而是把“工具、知识、模板、流程”打包成可复用工作资产。
5. 研究报告和用户故事应成为长期选题引擎：报告提供观点和指标，用户故事提供证据和角色代入，教程负责把兴趣转成试用。

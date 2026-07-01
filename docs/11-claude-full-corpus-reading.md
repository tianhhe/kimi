# Claude 全量语料阅读记录

更新日期：2026-07-02

## 1. 全量读取结果

本脚本已逐份读取本地保存的官方文本，不做抽样。

| 项目 | 数量 |
|---|---:|
| 已读取官方文本文件 | 737 |
| 已读取正文字符数 | 9,225,765 |
| 阅读映射 CSV | `sources/index/full-corpus-reading-map.csv` |
| 阅读映射 JSON | `sources/index/full-corpus-reading-map.json` |

## 2. 分类后的内容结构

| 类别 | 文件数 | 对 Kimi 的意义 |
|---|---:|---|
| 01-user-education | 11 | 学习 Claude 101、AI Fluency、Academy 的用户教育骨架 |
| 02-product-positioning | 199 | 学习 Cowork、Code 等产品如何讲任务协作 |
| 04-use-case-guides | 232 | 学习行业/岗位/任务包装方式 |
| 05-agent-tools-docs | 15 | 学习 agent、tools、skills、MCP 如何教育高阶用户 |
| 07-research-engineering | 104 | 学习研究内容如何建立可信度和话语权 |
| 08-trust-safety-policy | 19 | 学习安全、合规、隐私如何支持高付费转化 |
| 09-company-other | 157 | 补充公司、招聘、政策和其他页面 |

## 3. Anthropic Academy 课程线索

| 课程 | 说明 |
|---|---|
| Claude 101 | Learn how to use Claude for everyday work tasks, understand core features, and explore resources for more advanced learning on other topics. |
| Claude Code 101 | Learn how to use Claude Code effectively in your daily development workflow. |
| Claude Platform 101 | This course teaches developers to build on the Claude Developer Platform from the ground up, whether you've made a few API calls or have only used Claude through a chat window. |
| Introduction to Claude Cowork | Learn to work alongside Claude on your real files and projects. This hands-on course covers the Cowork task loop, plugins and skills, file and research workflows, and how to steer multi-step work responsibly — so you're productive in your first week. |
| Claude Code in Action | Integrate Claude Code into your development workflow |
| AI Fluency: Framework & Foundations | Learn to collaborate with AI systems effectively, efficiently, ethically, and safely |
| Building with the Claude API | This comprehensive course covers the full spectrum of working with Anthropic models using the Claude API |
| Introduction to Model Context Protocol | Learn to build Model Context Protocol servers and clients from scratch using Python. Master MCP's three core primitives—tools, resources, and prompts—to connect Claude with external services |
| AI Fluency for educators | This course empowers faculty, instructional designers, and educational leaders to apply AI Fluency into their own teaching practice and institutional strategy. |
| AI Fluency for students | This course empowers students to develop AI Fluency skills that enhance learning, career planning, and academic success through responsible AI collaboration. |
| Model Context Protocol: Advanced Topics | Discover advanced Model Context Protocol implementation patterns including sampling, notifications, file system access, and transport mechanisms for production MCP server development. |
| Claude with Amazon Bedrock | As part of an accreditation program created for AWS, Anthropic launched a first-of-its-kind training for AWS employees. Here's the full course so you can follow along. |
| Claude with Google Cloud's Vertex AI | This comprehensive course covers the full spectrum of working with Anthropic models through Google Cloud's Vertex AI. |
| Teaching AI Fluency | This course empowers academic faculty, instructional designers, and others to teach and assess AI Fluency in instructor-led settings. |
| AI Fluency for nonprofits | This course empowers nonprofit professionals to develop AI fluency in order to increase organizational impact and efficiency while staying true to their mission and values. |
| Introduction to agent skills | Learn how to build, configure, and share Skills in Claude Code — reusable markdown instructions that Claude automatically applies to the right tasks at the right time. This course takes you from creating your first Skill to distributing them across teams and troubleshooting common issues. |
| Introduction to subagents | Learn how to use and create sub-agents in Claude Code to manage context, delegate tasks, and build specialized workflows that keep your main conversation clean and focused. |
| AI Capabilities and Limitations | An introductory course about how AI works |
| AI Fluency for Small Businesses | This course empowers small businesses to develop AI fluency in order to increase organizational impact and efficiency while staying true to their mission and values. |
| AI Fluency for Builders | This course empowers builders to develop AI fluency — increasing impact and efficiency while staying true to what it means to own the full arc from problem to shipped solution. |

## 4. 读完后的关键判断

1. Claude 的内容系统不是“功能目录”，而是一套从新手到专家的学习路径：Claude 101 -> AI Fluency -> role/use cases -> Cowork/Code -> API/docs -> trust/safety。
2. Claude 把用户教育产品化：课程、路径、概念框架、行业案例和文档互相连接，所以用户会感觉自己是在学习一种工作能力。
3. Claude Cowork 的核心不是“更多功能”，而是 Cowork task loop：在真实文件和项目里，用户给目标，Claude 规划、执行、交付，人类负责 steering 和 review。
4. Claude 的行业内容并不先讲模型参数，而是先回答“某类人如何把一天中的任务交给 Claude”。
5. 高付费转化需要信任内容支撑：权限、文件、数据、边界、管理员、团队协作，不应只靠案例种草。

## 5. 对 Kimi 的直接翻译

| Claude 体系 | Kimi 应建设 |
|---|---|
| Claude 101 | Kimi Work 101：新用户第一周必须完成的 7 个真实任务 |
| AI Fluency | Agent Fluency：教用户委派、描述、判断、迭代 |
| Claude for Work | Kimi for Work：按岗位和团队流程做栏目 |
| Introduction to Claude Cowork | Kimi Work Task Loop：目标 -> 计划 -> 执行 -> 校验 -> 交付 |
| Use cases | 某某行业怎么用 Kimi：产品、运营、市场、咨询、学习、求职、内容 |
| Skills / MCP / agent docs | Kimi Agent 进阶课：多 agent、工具、文件、网页、自动化 |
| Trust / admin / compliance | Kimi Work 安心用：文件权限、隐私、校验、企业协作 |

## 6. 下一步落地

全量读取不是最终交付，最终要落到平台级栏目和周运营节奏。对应策略见 `docs/12-kimi-platform-content-strategy.md`。

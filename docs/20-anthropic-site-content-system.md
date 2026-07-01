# Anthropic 全站内容读取与策略转译

更新日期：2026-07-02

## 1. 读取范围

本轮以 `https://www.anthropic.com/sitemap.xml` 为全站入口，逐页读取 `www.anthropic.com` sitemap 中可访问页面，并把跳转到 Claude 官方域名的页面纳入同一内容系统理解。

| 项目 | 数量 |
|---|---:|
| sitemap URL | 481 |
| 已读取页面 | 480 |
| 读取失败 | 1 |
| 阅读地图 | `sources/index/anthropic-site-reading-map.csv` |
| 失败记录 | `sources/index/anthropic-site-reading-failures.json` |

## 2. 全站内容层级

| 类别 | 页面数 | 对 Kimi 的启发 |
|---|---:|---|
| 00-home | 1 | 首页负责一句话世界观和产品入口，不承担完整教育 |
| 01-learn-academy | 4 | Learn/Academy 把用户教育做成路径和课程 |
| 02-product | 4 | 产品页把能力包装成任务、对象和交付物 |
| 04-customers-partners | 41 | 客户和伙伴用于证明真实组织采用 |
| 05-news-launches | 223 | News 把发布变成问题、方案、伙伴、信任和行动 |
| 06-research | 122 | Research 建立思想领导力和可信度 |
| 07-engineering | 25 | Engineering 展示内部实践和专家心智 |
| 08-policy-commitments | 7 | Policy/Commitments 支撑安全和公共利益叙事 |
| 09-trust-legal-security | 19 | Trust/Legal/Security 降低企业和高付费用户顾虑 |
| 10-company-community | 7 | Company/Community 用使命、人才和生态塑造品牌 |
| 11-other | 27 | 补充页和边缘页面 |

## 3. Anthropic 的内容系统本质

Anthropic 不是把网站做成产品说明书，而是做成一套“AI 使用能力教育 + 产品工作流 + 可信机构叙事”的组合。

1. Learn/Academy 负责把新用户从“会聊天”带到“会协作”。
2. Product 负责把抽象能力变成具体工作对象，例如 Cowork 讲 outcome、local files、applications、finished deliverable。
3. Solutions/use cases 负责把能力放进行业和岗位语境。
4. News/launches 不是只发功能，而是讲问题背景、用户痛点、合作伙伴、工作流、信任机制和行动入口。
5. Research/Policy/Trust 提供长期可信度，让企业和高付费用户敢把重要工作交给 Claude。

## 4. Kimi 应复制的不是页面形式，而是内容分工

| Anthropic 内容层 | Kimi 对应建设 |
|---|---|
| Learn / Academy | Kimi 学院：Kimi Work 101、Agent Fluency、岗位工作流课 |
| Product | Kimi Work / Agent / Agent Swarm 的任务页：从目标到交付物 |
| Solutions | Kimi for 产品/运营/市场/研究生/求职/内容/小团队 |
| News | 功能发布必须配 3 个真实任务、3 条短视频脚本、1 个模板包 |
| Research | Kimi 使用洞察：中文知识工作、长材料、AI agent 使用报告 |
| Trust | Kimi 安心用：资料权限、结果校验、人工判断、企业边界 |
| Community | Kimi 用户工作流改造营、达人共创、案例征集 |

## 5. 对 Kimi 增长运营的核心要求

1. 官方账号要承担“教育用户怎么把复杂任务交给 Kimi”的责任，而不是只做功能广播。
2. 每个功能 GTM 都要有 Learn 内容、社媒演示、模板资产、达人案例、数据复盘五件套。
3. 每个高付费人群都要有自己的入口页/内容合集/模板包。
4. 每条内容都要在漏斗中有位置：认知、首用、功能激活、高价值任务、复用/付费。
5. 竞品监控不能只看功能，要看他们如何把功能包装成用户教育和任务成果。

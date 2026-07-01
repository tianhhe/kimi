# Claude 产品站全站内容阅读与 Kimi 转译

更新日期：2026-07-02

## 1. 读取范围

本轮把 Claude 产品站从 Anthropic 公司站里拆出来，单独读取 `https://claude.com/sitemap.xml`。这不是同一个内容系统：Anthropic.com 更像公司级信任、研究、政策、Academy 和发布中心；Claude.com 更像产品转化、功能页、行业页、连接器/插件/客户案例/课程/销售线索中心。

| 项目 | 数量 |
|---|---:|
| sitemap URL | 3413 |
| 已读取页面 | 3413 |
| 去重 canonical 页面 | 1641 |
| 读取失败 | 0 |
| 阅读地图 | `sources/index/claude-site-reading-map.csv` |
| 失败记录 | `sources/index/claude-site-reading-failures.json` |

## 2. 语言与本地化分布

| 语言 | 页面数 | 说明 |
|---|---:|---|
| de | 408 | 德语本地化内容 |
| en | 1625 | 英语主站/默认语言内容 |
| fr | 401 | 法语本地化内容 |
| it | 128 | 意大利语本地化内容 |
| ja | 413 | 日语本地化内容 |
| ko | 438 | 韩语本地化内容 |

Claude 产品站不是只做英文发布，而是把产品页、行业页、客户页、资源页、连接器/插件页做了多语言扩散。对 Kimi 的启发是：如果要面向国内外增长，内容资产要先模块化，后本地化；不要每个平台、每个语种重新发明一套叙事。

## 3. Claude.com 的内容层级

| 类别 | 页面数 | 对 Kimi 的启发 |
|---|---:|---|
| 00-home | 6 | 产品站第一屏，主叙事是从聊天进入真实工作与 Cowork |
| 01-product | 25 | 产品心智页：Overview、Claude Code、Cowork、Tag、Design、Science、Security 等 |
| 02-features | 20 | 可直接激活的新功能页：Chrome、Microsoft 365、Skills、memory、fast mode |
| 03-solutions | 80 | 行业/角色场景页，承接高付费意愿人群的搜索和销售线索 |
| 04-pricing-sales | 54 | 价格、销售咨询、表单，负责从兴趣到商机 |
| 05-platform-ecosystem | 37 | API、平台、生态、合规，承接开发者和企业技术评估 |
| 06-connectors | 686 | 连接器长尾页，把每个常用工具变成一个可搜索的使用入口 |
| 07-plugins | 362 | 插件长尾页，把生态能力拆成大量具体场景资产 |
| 08-customers | 963 | 客户案例和社会证明，降低组织采用风险 |
| 09-resources-learn | 491 | 课程、教程、use cases、资源页，负责系统教育 |
| 10-blog | 446 | 发布、产品教育、案例、观点和 SEO 内容 |
| 11-code-with-claude | 156 | 会议/活动内容，沉淀开发者和 power user 社群资产 |
| 12-partners-programs | 43 | 伙伴与项目，扩大分发和可信背书 |
| 13-community-support | 23 | 社区、下载、订阅、辅助入口 |
| 14-locale-other | 12 | 多语言补充页，说明产品站内容已经被本地化扩散 |
| 15-other | 9 | 边缘页面和活动页 |

## 4. Claude 产品站的 GTM 结构

Claude.com 的主线不是“介绍 Claude 很强”，而是把不同转化路径拆成可导航、可搜索、可复用的入口：

1. **产品心智入口**：首页和 Product 页负责一句话定位。当前主叙事围绕从聊天到构建、从 chat 到 Cowork，强调用户可以把真实工作交给 Claude。
2. **功能激活入口**：Claude Code、Cowork、Chrome、Microsoft 365、Skills、memory 等页面把新功能包装成明确工作流，而不是只列能力点。
3. **行业/角色入口**：Solutions 页覆盖教育、代码、客服、金融、政府、医疗、法律、生命科学、非营利、小企业、安全等高价值人群，让用户从“我这个行业能不能用”进入。
4. **生态入口**：connectors 和 plugins 形成大量长尾页面，把 Google Drive、Slack、HubSpot、Canva、GitHub 等具体工具变成 Claude 的使用场景和 SEO 入口。
5. **学习入口**：resources/courses/tutorials/use cases 承接用户教育，负责把兴趣转成可执行动作。
6. **证明入口**：customers、partners、powered by Claude 负责组织级信任与社会证明。
7. **转化入口**：pricing、contact sales、download、form 把不同意图用户导向试用、下载或销售线索。

## 5. Anthropic.com 与 Claude.com 的分工

| 站点 | 角色 | 内容类型 | Kimi 可复制动作 |
|---|---|---|---|
| Anthropic.com | 公司级可信机构与思想领导 | Research、Policy、News、Trust、Academy、Company | 建立 Kimi/公司级“可信 AI 工作方式”叙事：安全、长文档、中文知识工作、研究洞察、用户教育 |
| Claude.com | 产品转化与使用教育 | Product、Feature、Solutions、Connectors、Plugins、Customers、Courses、Pricing | 建立 Kimi Agent / Kimi Work 的产品站资产：任务页、行业页、模板库、连接器页、案例页、课程页、价格/线索页 |

这意味着 Kimi 的社媒增长不能只做内容号，而要服务一个“站点资产 + 社媒栏目 + 模板/课程 + 功能激活 + 数据复盘”的闭环。

## 6. Kimi 应该复制的产品站资产

| Claude.com 资产 | Kimi 对应资产 | 社媒怎么导流 |
|---|---|---|
| Product overview | `Kimi Work / Kimi Agent 是什么` | 所有破圈内容落到一个标准解释页 |
| Cowork / Code | `Kimi Agent Task Loop`、`Kimi Work 多文件工作流` | 用短视频展示“给目标 -> 读资料 -> 出计划 -> 交付物” |
| Solutions | `Kimi for 产品/运营/市场/研究/HR/小团队` | 每个平台按人群开固定栏目 |
| Connectors / Plugins | `Kimi 模板库 / 工作流包 / 工具连接能力页` | 每个模板做一条图文/短视频/达人同题 |
| Resources / Courses | `Kimi Work 101`、`Agent Fluency`、`岗位训练营` | B 站和公众号承接系统学习，小红书/抖音做切片 |
| Customers | `Kimi 工作流改造案例库` | 达人和真实用户共创，官方复盘成案例 |
| Pricing / Contact sales | `团队版试用 / 高价值任务包领取` | 高意图内容必须有线索表单或群转化 |

## 7. 对 Kimi 社媒栏目体系的直接要求

1. **每个栏目必须有落地资产**：选题不能只追曝光，必须对应一个官网页、模板、课程、案例或功能入口。
2. **每个功能 GTM 必须有三层内容**：短视频演示、图文任务卡、长文/课程/模板包。
3. **每个高付费人群必须有独立入口**：按 `docs/23-kimi-audience-segmentation-v2.md` 拆分 P0/P1/P2，优先服务小团队老板、产品/PMM/增长、销售/CS、咨询/投研、财务/法务/HR、受监管行业和团队推广者。
4. **每个内容动作必须有数据回路**：曝光、收藏、点击、模板领取、首个高价值任务、功能激活、D7 复用、付费/销售线索。
5. **每周都要把社媒问题沉淀为产品站资产**：评论区问题、达人脚本、用户作业、失败案例，都进入 FAQ、模板库、案例库和课程迭代。

## 8. 下一步文档承接

本文件负责 Claude 产品站的阅读与转译。它应当与 `docs/20-anthropic-site-content-system.md` 配套使用：前者回答“Claude 如何把产品卖出去并教会用户用”，后者回答“Anthropic 如何建立长期可信度和机构叙事”。Kimi 的完整增长体系要同时复制这两条线，而不是把官网、社媒、课程、达人和数据复盘拆散。

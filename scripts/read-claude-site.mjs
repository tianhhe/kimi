import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

const root = process.cwd();
const out = path.join(root, "sources");
const rawDir = path.join(out, "raw");
const textDir = path.join(out, "text");
const indexDir = path.join(out, "index");
const docsDir = path.join(root, "docs");

const localePrefixes = new Set(["ja", "de", "fr", "ko", "it"]);
const concurrency = Number.parseInt(process.env.CLAUDE_SITE_CONCURRENCY || "8", 10);
const limit = Number.parseInt(process.env.CLAUDE_SITE_LIMIT || "0", 10);

function hash(input) {
  return createHash("sha1").update(input).digest("hex").slice(0, 12);
}

function slugFor(url) {
  const u = new URL(url);
  const pathname = u.pathname.replace(/^\/+|\/+$/g, "") || "home";
  return `${u.hostname.replace(/\./g, "_")}__${pathname.replace(/[^a-zA-Z0-9]+/g, "-").slice(0, 140)}__${hash(url)}`;
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)));
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => decodeEntities(m[1].trim()));
}

function extractTitle(html) {
  const og = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  if (og) return decodeEntities(og[1]).trim();
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return title ? decodeEntities(title[1]).trim() : "";
}

function htmlToText(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return decodeEntities(
    body
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|section|article|main|header|footer|li|h1|h2|h3|h4|tr)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+\n/g, "\n")
      .replace(/\n\s+/g, "\n")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
  ).trim();
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 Codex strategy research crawler",
      accept: "text/html,application/xhtml+xml,application/xml,text/plain;q=0.9,*/*;q=0.8",
    },
    redirect: "follow",
  });
  return {
    ok: res.ok,
    status: res.status,
    finalUrl: res.url,
    contentType: res.headers.get("content-type") || "",
    text: await res.text(),
  };
}

async function fileExists(p) {
  try {
    await fsp.access(p);
    return true;
  } catch {
    return false;
  }
}

function localeInfo(url) {
  const u = new URL(url);
  const parts = u.pathname.split("/").filter(Boolean);
  const locale = localePrefixes.has(parts[0]) ? parts[0] : "";
  if (!locale) return { locale: "", canonicalPath: u.pathname || "/", canonicalUrl: url };
  const canonicalParts = parts.slice(1);
  const canonicalPath = canonicalParts.length ? `/${canonicalParts.join("/")}` : "/";
  const canonical = new URL(url);
  canonical.pathname = canonicalPath;
  return { locale, canonicalPath, canonicalUrl: canonical.toString().replace(/\/$/, canonical.pathname === "/" ? "/" : "") };
}

async function savePage(originalUrl, finalUrl, html, sourceGroup, locale, canonicalUrl) {
  const fileBase = slugFor(finalUrl || originalUrl);
  const rawPath = path.join(rawDir, `${fileBase}.html`);
  const textPath = path.join(textDir, `${fileBase}.txt`);
  const title = extractTitle(html);
  const bodyText = htmlToText(html);
  await fsp.writeFile(rawPath, html, "utf8");
  await fsp.writeFile(
    textPath,
    [
      `URL: ${finalUrl || originalUrl}`,
      `SOURCE_GROUP: ${sourceGroup}`,
      `TITLE: ${title}`,
      `ORIGINAL_URL: ${originalUrl}`,
      `LOCALE: ${locale}`,
      `CANONICAL_URL: ${canonicalUrl}`,
      "",
      bodyText,
      "",
    ].join("\n"),
    "utf8"
  );
  return { rawPath, textPath, title, textChars: bodyText.length };
}

function classify(url, locale, title, text) {
  const info = localeInfo(url);
  const p = info.canonicalPath.toLowerCase();
  const joined = `${p} ${title} ${text.slice(0, 3000)}`.toLowerCase();
  if (p === "/" || p === "") return "00-home";
  if (p.startsWith("/product")) return "01-product";
  if (p === "/claude-for-chrome" || p === "/claude-for-slack" || p === "/claude-for-microsoft-365" || p === "/skills" || p === "/fast-mode" || p === "/import-memory") return "02-features";
  if (p.startsWith("/solutions")) return "03-solutions";
  if (p === "/pricing" || p.startsWith("/contact-sales") || p.startsWith("/form") || p.includes("marketplace-contact-sales")) return "04-pricing-sales";
  if (p.startsWith("/connectors")) return "06-connectors";
  if (p.startsWith("/plugins")) return "07-plugins";
  if (p.startsWith("/customers") || joined.includes("customer story")) return "08-customers";
  if (p.startsWith("/resources") || p.includes("tutorial") || p.includes("use-case")) return "09-resources-learn";
  if (p.startsWith("/blog") || p.startsWith("/blog-category") || p.startsWith("/blog-usecases") || p.startsWith("/blog-product")) return "10-blog";
  if (p.startsWith("/code-with-claude")) return "11-code-with-claude";
  if (p.startsWith("/partners") || p.startsWith("/programs") || p.includes("marketplace-partners")) return "12-partners-programs";
  if (p.startsWith("/community") || p.startsWith("/newsletter") || p.startsWith("/unsubscribe") || p.startsWith("/download")) return "13-community-support";
  if (p.startsWith("/platform") || p === "/ecosystem" || p.includes("regional-compliance")) return "05-platform-ecosystem";
  if (locale) return "14-locale-other";
  return "15-other";
}

function extractHeadings(text) {
  return text
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean)
    .filter((line) => line.length >= 4 && line.length <= 120)
    .slice(0, 16)
    .join(" | ");
}

function signals(text) {
  const lower = text.toLowerCase();
  const pairs = [
    ["product", "claude|cowork|code|skills|chrome|microsoft 365|mobile|desktop"],
    ["role-industry", "education|coding|customer support|financial services|government|healthcare|legal|life sciences|small business|security|nonprofits"],
    ["conversion", "pricing|contact sales|download|start|try|book a demo"],
    ["marketplace", "connector|plugin|integration|marketplace|google drive|slack|hubspot|canva|notion|github"],
    ["education", "course|tutorial|guide|resources|learn|use case|lesson"],
    ["proof", "customer|case study|partner|powered by claude"],
    ["developer", "api|platform|docs|mcp|sdk|build"],
    ["trust", "security|privacy|compliance|regional|trust"],
  ];
  return pairs.filter(([, words]) => words.split("|").some((w) => lower.includes(w))).map(([name]) => name).join("|");
}

function csvEscape(value) {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function stripMeta(text) {
  return text.replace(/^URL:.*\nSOURCE_GROUP:.*\nTITLE:.*\nORIGINAL_URL:.*\nLOCALE:.*\nCANONICAL_URL:.*\n\n/s, "");
}

async function readOrFetch(url) {
  const info = localeInfo(url);
  const guessedBase = slugFor(url);
  let textPath = path.join(textDir, `${guessedBase}.txt`);
  let rawPath = path.join(rawDir, `${guessedBase}.html`);
  let status = "local";
  let contentType = "";
  let finalUrl = url;

  if (!(await fileExists(textPath))) {
    const res = await fetchText(url);
    finalUrl = res.finalUrl;
    contentType = res.contentType;
    status = `fetched:${res.status}`;
    if (!res.ok || !res.contentType.includes("text/html")) {
      return { failure: { url, finalUrl, status: res.status, contentType: res.contentType } };
    }
    const saved = await savePage(url, finalUrl, res.text, "claude-com-sitemap", info.locale, info.canonicalUrl);
    textPath = saved.textPath;
    rawPath = saved.rawPath;
  }

  const fullText = fs.readFileSync(textPath, "utf8");
  const title = fullText.match(/^TITLE: (.*)$/m)?.[1] || "";
  finalUrl = fullText.match(/^URL: (.*)$/m)?.[1] || finalUrl;
  const body = stripMeta(fullText);
  return {
    row: {
      category: classify(url, info.locale, title, body),
      locale: info.locale || "en",
      isLocaleVersion: Boolean(info.locale),
      canonicalUrl: info.canonicalUrl,
      sitemapUrl: url,
      finalUrl,
      title,
      status,
      contentType,
      textChars: body.length,
      signals: signals(body),
      headings: extractHeadings(body),
      localText: path.relative(root, textPath),
      localRaw: path.relative(root, rawPath),
    },
  };
}

async function processAll(urls) {
  const rows = [];
  const failures = [];
  let cursor = 0;
  async function worker() {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      try {
        const result = await readOrFetch(url);
        if (result.failure) failures.push(result.failure);
        if (result.row) rows.push(result.row);
      } catch (error) {
        failures.push({ url, error: String(error?.message || error) });
      }
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, concurrency) }, () => worker()));
  return { rows, failures };
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    const key = keyFn(row);
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function tableRows(counts, meanings) {
  return Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, count]) => `| ${category} | ${count} | ${meanings[category] || ""} |`)
    .join("\n");
}

async function writeOutputs(allUrls, rows, failures) {
  rows.sort((a, b) => a.category.localeCompare(b.category) || a.canonicalUrl.localeCompare(b.canonicalUrl) || a.locale.localeCompare(b.locale));
  const counts = countBy(rows, (row) => row.category);
  const localeCounts = countBy(rows, (row) => row.locale);
  const canonicalCount = new Set(rows.map((row) => row.canonicalUrl)).size;

  const csvRows = [
    ["category", "locale", "title", "sitemapUrl", "canonicalUrl", "finalUrl", "textChars", "signals", "headings", "localText"].map(csvEscape).join(","),
    ...rows.map((row) => [row.category, row.locale, row.title, row.sitemapUrl, row.canonicalUrl, row.finalUrl, row.textChars, row.signals, row.headings, row.localText].map(csvEscape).join(",")),
  ];
  await fsp.writeFile(path.join(indexDir, "claude-site-reading-map.csv"), csvRows.join("\n"), "utf8");
  await fsp.writeFile(path.join(indexDir, "claude-site-reading-map.json"), JSON.stringify(rows, null, 2), "utf8");
  await fsp.writeFile(path.join(indexDir, "claude-site-reading-failures.json"), JSON.stringify(failures, null, 2), "utf8");

  const categoryMeanings = {
    "00-home": "产品站第一屏，主叙事是从聊天进入真实工作与 Cowork",
    "01-product": "产品心智页：Overview、Claude Code、Cowork、Tag、Design、Science、Security 等",
    "02-features": "可直接激活的新功能页：Chrome、Microsoft 365、Skills、memory、fast mode",
    "03-solutions": "行业/角色场景页，承接高付费意愿人群的搜索和销售线索",
    "04-pricing-sales": "价格、销售咨询、表单，负责从兴趣到商机",
    "05-platform-ecosystem": "API、平台、生态、合规，承接开发者和企业技术评估",
    "06-connectors": "连接器长尾页，把每个常用工具变成一个可搜索的使用入口",
    "07-plugins": "插件长尾页，把生态能力拆成大量具体场景资产",
    "08-customers": "客户案例和社会证明，降低组织采用风险",
    "09-resources-learn": "课程、教程、use cases、资源页，负责系统教育",
    "10-blog": "发布、产品教育、案例、观点和 SEO 内容",
    "11-code-with-claude": "会议/活动内容，沉淀开发者和 power user 社群资产",
    "12-partners-programs": "伙伴与项目，扩大分发和可信背书",
    "13-community-support": "社区、下载、订阅、辅助入口",
    "14-locale-other": "多语言补充页，说明产品站内容已经被本地化扩散",
    "15-other": "边缘页面和活动页",
  };

  const localeMeaning = {
    en: "英语主站/默认语言内容",
    ja: "日语本地化内容",
    de: "德语本地化内容",
    fr: "法语本地化内容",
    ko: "韩语本地化内容",
    it: "意大利语本地化内容",
  };

  const report = `# Claude 产品站全站内容阅读与 Kimi 转译

更新日期：2026-07-02

## 1. 读取范围

本轮把 Claude 产品站从 Anthropic 公司站里拆出来，单独读取 \`https://claude.com/sitemap.xml\`。这不是同一个内容系统：Anthropic.com 更像公司级信任、研究、政策、Academy 和发布中心；Claude.com 更像产品转化、功能页、行业页、连接器/插件/客户案例/课程/销售线索中心。

| 项目 | 数量 |
|---|---:|
| sitemap URL | ${allUrls.length} |
| 已读取页面 | ${rows.length} |
| 去重 canonical 页面 | ${canonicalCount} |
| 读取失败 | ${failures.length} |
| 阅读地图 | \`sources/index/claude-site-reading-map.csv\` |
| 失败记录 | \`sources/index/claude-site-reading-failures.json\` |

## 2. 语言与本地化分布

| 语言 | 页面数 | 说明 |
|---|---:|---|
${tableRows(localeCounts, localeMeaning)}

Claude 产品站不是只做英文发布，而是把产品页、行业页、客户页、资源页、连接器/插件页做了多语言扩散。对 Kimi 的启发是：如果要面向国内外增长，内容资产要先模块化，后本地化；不要每个平台、每个语种重新发明一套叙事。

## 3. Claude.com 的内容层级

| 类别 | 页面数 | 对 Kimi 的启发 |
|---|---:|---|
${tableRows(counts, categoryMeanings)}

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
| Product overview | \`Kimi Work / Kimi Agent 是什么\` | 所有破圈内容落到一个标准解释页 |
| Cowork / Code | \`Kimi Agent Task Loop\`、\`Kimi Work 多文件工作流\` | 用短视频展示“给目标 -> 读资料 -> 出计划 -> 交付物” |
| Solutions | \`Kimi for 产品/运营/市场/研究/HR/小团队\` | 每个平台按人群开固定栏目 |
| Connectors / Plugins | \`Kimi 模板库 / 工作流包 / 工具连接能力页\` | 每个模板做一条图文/短视频/达人同题 |
| Resources / Courses | \`Kimi Work 101\`、\`Agent Fluency\`、\`岗位训练营\` | B 站和公众号承接系统学习，小红书/抖音做切片 |
| Customers | \`Kimi 工作流改造案例库\` | 达人和真实用户共创，官方复盘成案例 |
| Pricing / Contact sales | \`团队版试用 / 高价值任务包领取\` | 高意图内容必须有线索表单或群转化 |

## 7. 对 Kimi 社媒栏目体系的直接要求

1. **每个栏目必须有落地资产**：选题不能只追曝光，必须对应一个官网页、模板、课程、案例或功能入口。
2. **每个功能 GTM 必须有三层内容**：短视频演示、图文任务卡、长文/课程/模板包。
3. **每个高付费人群必须有独立入口**：产品经理、运营、市场、咨询/投研、小团队老板、HR/求职、研究生/知识工作者。
4. **每个内容动作必须有数据回路**：曝光、收藏、点击、模板领取、首个高价值任务、功能激活、D7 复用、付费/销售线索。
5. **每周都要把社媒问题沉淀为产品站资产**：评论区问题、达人脚本、用户作业、失败案例，都进入 FAQ、模板库、案例库和课程迭代。

## 8. 下一步文档承接

本文件负责 Claude 产品站的阅读与转译。它应当与 \`docs/20-anthropic-site-content-system.md\` 配套使用：前者回答“Claude 如何把产品卖出去并教会用户用”，后者回答“Anthropic 如何建立长期可信度和机构叙事”。Kimi 的完整增长体系要同时复制这两条线，而不是把官网、社媒、课程、达人和数据复盘拆散。
`;

  await fsp.writeFile(path.join(docsDir, "21-claude-site-content-system.md"), report, "utf8");
}

async function main() {
  await fsp.mkdir(rawDir, { recursive: true });
  await fsp.mkdir(textDir, { recursive: true });
  await fsp.mkdir(indexDir, { recursive: true });

  const sitemap = await fetchText("https://claude.com/sitemap.xml");
  if (!sitemap.ok) throw new Error(`sitemap failed: ${sitemap.status}`);
  let urls = sitemapUrls(sitemap.text).filter((url) => new URL(url).hostname === "claude.com");
  if (limit > 0) urls = urls.slice(0, limit);

  const { rows, failures } = await processAll(urls);
  await writeOutputs(urls, rows, failures);
  console.log(JSON.stringify({
    sitemapUrls: urls.length,
    pagesRead: rows.length,
    failures: failures.length,
    outputs: [
      "sources/index/claude-site-reading-map.csv",
      "sources/index/claude-site-reading-map.json",
      "docs/21-claude-site-content-system.md",
    ],
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

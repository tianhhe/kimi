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

function hash(input) {
  return createHash("sha1").update(input).digest("hex").slice(0, 12);
}

function slugFor(url) {
  const u = new URL(url);
  const pathname = u.pathname.replace(/^\/+|\/+$/g, "") || "home";
  return `${u.hostname.replace(/\./g, "_")}__${pathname.replace(/[^a-zA-Z0-9]+/g, "-").slice(0, 120)}__${hash(url)}`;
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

async function savePage(originalUrl, finalUrl, html, sourceGroup) {
  const fileBase = slugFor(finalUrl || originalUrl);
  const rawPath = path.join(rawDir, `${fileBase}.html`);
  const textPath = path.join(textDir, `${fileBase}.txt`);
  const title = extractTitle(html);
  const bodyText = htmlToText(html);
  await fsp.writeFile(rawPath, html, "utf8");
  await fsp.writeFile(textPath, `URL: ${finalUrl || originalUrl}\nSOURCE_GROUP: ${sourceGroup}\nTITLE: ${title}\nORIGINAL_URL: ${originalUrl}\n\n${bodyText}\n`, "utf8");
  return { rawPath, textPath, title, textChars: bodyText.length };
}

function classify(url, title, text) {
  const u = new URL(url);
  const pathName = u.pathname.toLowerCase();
  const joined = `${pathName} ${title} ${text.slice(0, 3000)}`.toLowerCase();
  if (pathName === "/" || pathName === "") return "00-home";
  if (pathName.startsWith("/learn")) return "01-learn-academy";
  if (pathName.startsWith("/product")) return "02-product";
  if (pathName.startsWith("/solutions")) return "03-solutions";
  if (pathName.startsWith("/customers") || joined.includes("customer stories")) return "04-customers-partners";
  if (pathName.startsWith("/news")) return "05-news-launches";
  if (pathName.startsWith("/research")) return "06-research";
  if (pathName.startsWith("/engineering")) return "07-engineering";
  if (pathName.startsWith("/policy") || pathName.includes("responsible-scaling") || pathName.includes("transparency") || pathName.includes("commitments")) return "08-policy-commitments";
  if (pathName.startsWith("/legal") || pathName.includes("terms") || pathName.includes("privacy") || pathName.includes("security") || pathName.includes("responsible-disclosure")) return "09-trust-legal-security";
  if (pathName.startsWith("/claude-corps") || pathName.startsWith("/about") || pathName.startsWith("/careers") || pathName.startsWith("/company")) return "10-company-community";
  return "11-other";
}

function extractHeadings(text) {
  return text
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean)
    .filter((line) => line.length >= 4 && line.length <= 100)
    .slice(0, 18)
    .join(" | ");
}

function signals(text) {
  const lower = text.toLowerCase();
  const pairs = [
    ["course", "course|academy|lesson|learn"],
    ["role-use-case", "sales|marketing|engineering|human resources|product management|education|legal|finance|healthcare|small business"],
    ["task-loop", "goal|plan|execute|deliverable|workflow|approve|review"],
    ["connectors", "connector|integration|google workspace|microsoft 365|hubspot|quickbooks|canva|paypal"],
    ["trust", "security|privacy|permission|compliance|trust center|policy"],
    ["agent", "agent|agentic|skills|tools|mcp|cowork"],
    ["research", "research|index|report|economic|safety|alignment"],
  ];
  return pairs.filter(([, words]) => words.split("|").some((w) => lower.includes(w))).map(([name]) => name).join("|");
}

function csvEscape(value) {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

async function main() {
  await fsp.mkdir(rawDir, { recursive: true });
  await fsp.mkdir(textDir, { recursive: true });
  await fsp.mkdir(indexDir, { recursive: true });

  const sitemap = await fetchText("https://www.anthropic.com/sitemap.xml");
  if (!sitemap.ok) throw new Error(`sitemap failed: ${sitemap.status}`);
  const urls = sitemapUrls(sitemap.text).filter((url) => new URL(url).hostname === "www.anthropic.com");

  const rows = [];
  const failures = [];
  for (const url of urls) {
    let finalUrl = url;
    let guessedTextPath = path.join(textDir, `${slugFor(url)}.txt`);
    let textPath = guessedTextPath;
    let rawPath = path.join(rawDir, `${slugFor(url)}.html`);
    let title = "";
    let fullText = "";
    let status = "local";
    let contentType = "";

    if (!(await fileExists(textPath))) {
      try {
        const res = await fetchText(url);
        finalUrl = res.finalUrl;
        contentType = res.contentType;
        status = `fetched:${res.status}`;
        if (!res.ok || !res.contentType.includes("text/html")) {
          failures.push({ url, finalUrl, status: res.status, contentType: res.contentType });
          continue;
        }
        const saved = await savePage(url, finalUrl, res.text, "anthropic-site-sitemap-refresh");
        textPath = saved.textPath;
        rawPath = saved.rawPath;
      } catch (error) {
        failures.push({ url, error: String(error?.message || error) });
        continue;
      }
    }

    fullText = fs.readFileSync(textPath, "utf8");
    title = fullText.match(/^TITLE: (.*)$/m)?.[1] || "";
    finalUrl = fullText.match(/^URL: (.*)$/m)?.[1] || finalUrl;
    const body = fullText.replace(/^URL:.*\nSOURCE_GROUP:.*\nTITLE:.*(?:\nORIGINAL_URL:.*)?\n\n/s, "");
    rows.push({
      category: classify(url, title, body),
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
    });
  }

  rows.sort((a, b) => a.category.localeCompare(b.category) || a.sitemapUrl.localeCompare(b.sitemapUrl));
  const counts = {};
  for (const row of rows) counts[row.category] = (counts[row.category] || 0) + 1;

  const csvRows = [
    ["category", "title", "sitemapUrl", "finalUrl", "textChars", "signals", "headings", "localText"].map(csvEscape).join(","),
    ...rows.map((row) => [row.category, row.title, row.sitemapUrl, row.finalUrl, row.textChars, row.signals, row.headings, row.localText].map(csvEscape).join(",")),
  ];
  await fsp.writeFile(path.join(indexDir, "anthropic-site-reading-map.csv"), csvRows.join("\n"), "utf8");
  await fsp.writeFile(path.join(indexDir, "anthropic-site-reading-map.json"), JSON.stringify(rows, null, 2), "utf8");
  await fsp.writeFile(path.join(indexDir, "anthropic-site-reading-failures.json"), JSON.stringify(failures, null, 2), "utf8");

  const report = `# Anthropic 全站内容读取与策略转译

更新日期：2026-07-02

## 1. 读取范围

本轮以 \`https://www.anthropic.com/sitemap.xml\` 为全站入口，逐页读取 \`www.anthropic.com\` sitemap 中可访问页面，并把跳转到 Claude 官方域名的页面纳入同一内容系统理解。

| 项目 | 数量 |
|---|---:|
| sitemap URL | ${urls.length} |
| 已读取页面 | ${rows.length} |
| 读取失败 | ${failures.length} |
| 阅读地图 | \`sources/index/anthropic-site-reading-map.csv\` |
| 失败记录 | \`sources/index/anthropic-site-reading-failures.json\` |

## 2. 全站内容层级

| 类别 | 页面数 | 对 Kimi 的启发 |
|---|---:|---|
${Object.entries(counts).sort(([a], [b]) => a.localeCompare(b)).map(([category, count]) => {
  const meaning = {
    "00-home": "首页负责一句话世界观和产品入口，不承担完整教育",
    "01-learn-academy": "Learn/Academy 把用户教育做成路径和课程",
    "02-product": "产品页把能力包装成任务、对象和交付物",
    "03-solutions": "Solutions 按行业/角色承接高价值人群",
    "04-customers-partners": "客户和伙伴用于证明真实组织采用",
    "05-news-launches": "News 把发布变成问题、方案、伙伴、信任和行动",
    "06-research": "Research 建立思想领导力和可信度",
    "07-engineering": "Engineering 展示内部实践和专家心智",
    "08-policy-commitments": "Policy/Commitments 支撑安全和公共利益叙事",
    "09-trust-legal-security": "Trust/Legal/Security 降低企业和高付费用户顾虑",
    "10-company-community": "Company/Community 用使命、人才和生态塑造品牌",
    "11-other": "补充页和边缘页面",
  }[category] || "";
  return `| ${category} | ${count} | ${meaning} |`;
}).join("\n")}

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
`;
  await fsp.writeFile(path.join(docsDir, "20-anthropic-site-content-system.md"), report, "utf8");

  console.log(JSON.stringify({ sitemapUrls: urls.length, pagesRead: rows.length, failures: failures.length, counts, outputs: ["sources/index/anthropic-site-reading-map.csv", "sources/index/anthropic-site-reading-map.json", "docs/20-anthropic-site-content-system.md"] }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

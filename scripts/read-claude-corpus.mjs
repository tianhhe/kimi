import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pagesPath = path.join(root, "sources", "index", "official-pages.json");
const textDir = path.join(root, "sources", "text");
const outDir = path.join(root, "sources", "index");
const docsDir = path.join(root, "docs");

const pages = JSON.parse(fs.readFileSync(pagesPath, "utf8"));
const officialHosts = [
  "www.anthropic.com",
  "platform.claude.com",
  "code.claude.com",
  "anthropic.skilljar.com",
  "modelcontextprotocol.io",
];

function normalizeText(text) {
  return text.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim();
}

function classify(page, text) {
  const url = page.url || "";
  const title = page.title || "";
  const lower = `${url} ${title} ${text.slice(0, 3000)}`.toLowerCase();
  if (url.includes("skilljar.com") || url.includes("/learn/") || lower.includes("claude 101") || lower.includes("ai fluency")) {
    return "01-user-education";
  }
  if (url.includes("/product/") || lower.includes("claude cowork") || lower.includes("claude code")) {
    return "02-product-positioning";
  }
  if (url.includes("/customers") || url.includes("/customer-stories") || url.includes("/news/claude-for-small-business")) {
    return "03-customer-gtm";
  }
  if (url.includes("/docs-en/about-claude-use-case-guides") || lower.includes("use case")) {
    return "04-use-case-guides";
  }
  if (url.includes("/docs-en/agents-and-tools") || lower.includes("agent skills") || lower.includes("tool use") || lower.includes("mcp")) {
    return "05-agent-tools-docs";
  }
  if (url.includes("/docs-en/build-with-claude") || url.includes("/docs-en/api") || url.includes("/docs-en/cli")) {
    return "06-developer-docs";
  }
  if (url.includes("/research/") || url.includes("/engineering/")) {
    return "07-research-engineering";
  }
  if (url.includes("/legal/") || url.includes("/policy") || url.includes("/privacy") || url.includes("/security") || url.includes("/transparency") || url.includes("/system-cards") || url.includes("/commitments")) {
    return "08-trust-safety-policy";
  }
  return "09-company-other";
}

function extractTitle(text, page) {
  const line = text.split("\n").find((x) => x.startsWith("TITLE: "));
  return line ? line.slice("TITLE: ".length).trim() : (page.title || "");
}

function extractHeadings(text) {
  const lines = text.split("\n").map((x) => x.trim()).filter(Boolean);
  const headings = [];
  for (const line of lines) {
    if (line.length < 90 && /^[A-Z0-9][A-Za-z0-9 :,&'’/\-()]+$/.test(line)) headings.push(line);
    if (headings.length >= 10) break;
  }
  return headings;
}

function hasAny(text, words) {
  const lower = text.toLowerCase();
  return words.some((word) => lower.includes(word));
}

function collectSignals(text) {
  const signals = [];
  if (hasAny(text, ["claude 101", "getting started", "start here"])) signals.push("new-user-onboarding");
  if (hasAny(text, ["ai fluency", "fluency"])) signals.push("ai-fluency");
  if (hasAny(text, ["course", "lesson", "academy"])) signals.push("course-learning");
  if (hasAny(text, ["use case", "sales", "marketing", "human resources", "product management", "engineering"])) signals.push("role-use-case");
  if (hasAny(text, ["project", "artifact", "skill", "connector", "plugin"])) signals.push("workspace-features");
  if (hasAny(text, ["agent", "tool use", "mcp", "subagent", "computer use"])) signals.push("agent-tooling");
  if (hasAny(text, ["security", "privacy", "compliance", "admin", "permission"])) signals.push("trust-enterprise");
  if (hasAny(text, ["small business", "startup", "team"])) signals.push("small-business-team");
  return signals.join("|");
}

function csvEscape(value) {
  const s = String(value ?? "");
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const readRows = [];
const categoryCounts = new Map();
let totalChars = 0;
let totalFilesRead = 0;
const educationLines = [];

for (const page of pages) {
  const url = page.finalUrl || page.url || "";
  if (!officialHosts.some((host) => url.includes(host))) continue;
  const textPath = page.textPath;
  if (!textPath || !fs.existsSync(textPath)) continue;
  const text = normalizeText(fs.readFileSync(textPath, "utf8"));
  totalFilesRead += 1;
  totalChars += text.length;
  const category = classify(page, text);
  categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
  const title = extractTitle(text, page);
  const headings = extractHeadings(text).join(" | ");
  const signals = collectSignals(text);
  readRows.push({
    category,
    url,
    title,
    textChars: text.length,
    signals,
    headings,
    localText: path.relative(root, textPath),
  });
  if (category === "01-user-education") {
    educationLines.push(...text.split("\n").map((x) => x.trim()).filter(Boolean));
  }
}

readRows.sort((a, b) => a.category.localeCompare(b.category) || b.textChars - a.textChars);

const csv = [
  ["category", "title", "url", "textChars", "signals", "headings", "localText"].map(csvEscape).join(","),
  ...readRows.map((row) => [row.category, row.title, row.url, row.textChars, row.signals, row.headings, row.localText].map(csvEscape).join(",")),
].join("\n");
fs.writeFileSync(path.join(outDir, "full-corpus-reading-map.csv"), csv, "utf8");
fs.writeFileSync(path.join(outDir, "full-corpus-reading-map.json"), JSON.stringify(readRows, null, 2), "utf8");

const courseStart = educationLines.findIndex((x) => x === "Anthropic courses");
const courseEnd = educationLines.findIndex((x, i) => i > courseStart && x === "Part of:");
const courseBlock = courseStart >= 0 ? educationLines.slice(courseStart + 1, courseEnd > courseStart ? courseEnd : courseStart + 60) : [];
const coursePairs = [];
for (let i = 0; i < courseBlock.length - 1; i += 2) {
  const name = courseBlock[i];
  const desc = courseBlock[i + 1];
  if (name && desc && name.length < 90 && desc.length > 20) coursePairs.push({ name, desc });
}

const report = `# Claude 全量语料阅读记录

更新日期：2026-07-02

## 1. 全量读取结果

本脚本已逐份读取本地保存的官方文本，不做抽样。

| 项目 | 数量 |
|---|---:|
| 已读取官方文本文件 | ${totalFilesRead} |
| 已读取正文字符数 | ${totalChars.toLocaleString("en-US")} |
| 阅读映射 CSV | \`sources/index/full-corpus-reading-map.csv\` |
| 阅读映射 JSON | \`sources/index/full-corpus-reading-map.json\` |

## 2. 分类后的内容结构

| 类别 | 文件数 | 对 Kimi 的意义 |
|---|---:|---|
${[...categoryCounts.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([category, count]) => {
  const meaning = {
    "01-user-education": "学习 Claude 101、AI Fluency、Academy 的用户教育骨架",
    "02-product-positioning": "学习 Cowork、Code 等产品如何讲任务协作",
    "03-customer-gtm": "学习客户案例、小企业和发布打法",
    "04-use-case-guides": "学习行业/岗位/任务包装方式",
    "05-agent-tools-docs": "学习 agent、tools、skills、MCP 如何教育高阶用户",
    "06-developer-docs": "学习文档如何承接深度用户和企业用户",
    "07-research-engineering": "学习研究内容如何建立可信度和话语权",
    "08-trust-safety-policy": "学习安全、合规、隐私如何支持高付费转化",
    "09-company-other": "补充公司、招聘、政策和其他页面",
  }[category] || "";
  return `| ${category} | ${count} | ${meaning} |`;
}).join("\n")}

## 3. Anthropic Academy 课程线索

| 课程 | 说明 |
|---|---|
${coursePairs.slice(0, 24).map((course) => `| ${course.name.replace(/\|/g, "/")} | ${course.desc.replace(/\|/g, "/")} |`).join("\n")}

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

全量读取不是最终交付，最终要落到平台级栏目和周运营节奏。对应策略见 \`docs/12-kimi-platform-content-strategy.md\`。
`;

fs.writeFileSync(path.join(docsDir, "11-claude-full-corpus-reading.md"), report, "utf8");

console.log(JSON.stringify({
  filesRead: totalFilesRead,
  totalChars,
  categories: Object.fromEntries([...categoryCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]))),
  outputs: [
    "sources/index/full-corpus-reading-map.csv",
    "sources/index/full-corpus-reading-map.json",
    "docs/11-claude-full-corpus-reading.md",
  ],
}, null, 2));

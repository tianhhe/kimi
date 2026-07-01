import { appendFile, access, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "sources");
const RAW = path.join(OUT, "raw");
const TEXT = path.join(OUT, "text");
const INDEX = path.join(OUT, "index");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

function extractLinks(html, baseUrl) {
  const links = new Set();
  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    const href = decodeEntities(match[1]).trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const u = new URL(href, baseUrl);
      u.hash = "";
      if (u.protocol === "https:") links.add(u.toString().replace(/\/$/, ""));
    } catch {}
  }
  return [...links];
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 Codex research crawler (official-source audit)",
      accept: "text/html,application/xhtml+xml,application/xml,text/plain;q=0.9,*/*;q=0.8",
    },
    redirect: "follow",
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, finalUrl: res.url, contentType: res.headers.get("content-type") || "", text };
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((m) => decodeEntities(m[1].trim()));
}

async function savePage(url, html, finalUrl, sourceGroup) {
  const fileBase = slugFor(finalUrl || url);
  const rawPath = path.join(RAW, `${fileBase}.html`);
  const textPath = path.join(TEXT, `${fileBase}.txt`);
  const title = extractTitle(html);
  const text = htmlToText(html);
  await writeFile(rawPath, html, "utf8");
  await writeFile(textPath, `URL: ${finalUrl || url}\nSOURCE_GROUP: ${sourceGroup}\nTITLE: ${title}\n\n${text}\n`, "utf8");
  return { url, finalUrl: finalUrl || url, sourceGroup, title, rawPath, textPath, textChars: text.length, wordishCount: text.split(/\s+/).filter(Boolean).length };
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function recordPage(page) {
  await appendFile(path.join(INDEX, "official-pages.jsonl"), `${JSON.stringify(page)}\n`, "utf8");
}

function sameOfficialScope(u) {
  const host = new URL(u).hostname;
  return host === "www.anthropic.com" || host === "docs.anthropic.com" || host === "platform.claude.com";
}

function docsScope(u) {
  const url = new URL(u);
  if (!(url.hostname === "docs.anthropic.com" || url.hostname === "platform.claude.com")) return false;
  return url.pathname.startsWith("/en/") || url.pathname.startsWith("/docs/en/");
}

async function crawlDocs(seeds, maxPages = 260) {
  const queue = [...seeds];
  const seen = new Set();
  const pages = [];
  const failures = [];
  while (queue.length && pages.length < maxPages) {
    const url = queue.shift();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    try {
      const guessedBase = slugFor(url);
      const guessedRaw = path.join(RAW, `${guessedBase}.html`);
      const guessedText = path.join(TEXT, `${guessedBase}.txt`);
      if (await fileExists(guessedRaw) && await fileExists(guessedText)) {
        continue;
      }
      const r = await fetchText(url);
      if (!r.ok || !r.contentType.includes("text/html")) {
        failures.push({ url, status: r.status, contentType: r.contentType });
        continue;
      }
      const saved = await savePage(url, r.text, r.finalUrl, "claude-platform-docs");
      pages.push(saved);
      await recordPage(saved);
      for (const link of extractLinks(r.text, r.finalUrl)) {
        if (docsScope(link) && !seen.has(link) && !queue.includes(link)) queue.push(link);
      }
      await sleep(50);
    } catch (error) {
      failures.push({ url, error: String(error?.message || error) });
    }
  }
  return { pages, failures, seenCount: seen.size, remainingQueue: queue.length };
}

async function crawlAnthropicSitemap() {
  const sitemap = await fetchText("https://www.anthropic.com/sitemap.xml");
  const urls = sitemapUrls(sitemap.text).filter((u) => {
    const host = new URL(u).hostname;
    return host === "www.anthropic.com";
  });
  const pages = [];
  const failures = [];
  await writeFile(path.join(INDEX, "anthropic-sitemap-urls.txt"), `${urls.join("\n")}\n`, "utf8");
  let cursor = 0;
  async function processOne(url) {
    try {
      const guessedBase = slugFor(url);
      const guessedRaw = path.join(RAW, `${guessedBase}.html`);
      const guessedText = path.join(TEXT, `${guessedBase}.txt`);
      if (await fileExists(guessedRaw) && await fileExists(guessedText)) {
        return;
      }
      const r = await fetchText(url);
      if (r.ok && r.contentType.includes("text/html") && sameOfficialScope(r.finalUrl)) {
        const saved = await savePage(url, r.text, r.finalUrl, "anthropic-com-sitemap");
        pages.push(saved);
        await recordPage(saved);
      } else {
        failures.push({ url, status: r.status, contentType: r.contentType, finalUrl: r.finalUrl });
      }
      await sleep(30);
    } catch (error) {
      failures.push({ url, error: String(error?.message || error) });
    }
  }
  async function worker() {
    while (cursor < urls.length) {
      const url = urls[cursor++];
      await processOne(url);
    }
  }
  await Promise.all(Array.from({ length: 6 }, () => worker()));
  return { pages, failures, sitemapUrlCount: urls.length };
}

async function main() {
  await mkdir(RAW, { recursive: true });
  await mkdir(TEXT, { recursive: true });
  await mkdir(INDEX, { recursive: true });

  const docsSeeds = [
    "https://docs.anthropic.com/en/api/overview",
    "https://docs.anthropic.com/en/docs/overview",
    "https://docs.anthropic.com/en/docs/resources/courses",
    "https://docs.anthropic.com/en/docs/claude-code/overview",
    "https://docs.anthropic.com/en/docs/agents-and-tools/overview",
    "https://docs.anthropic.com/en/docs/build-with-claude/overview",
    "https://docs.anthropic.com/en/docs/learn-about-claude/overview",
  ];

  const docs = await crawlDocs(docsSeeds);
  const anthropic = await crawlAnthropicSitemap();
  const allPages = [...anthropic.pages, ...docs.pages];
  const allFailures = [...anthropic.failures, ...docs.failures];

  await writeFile(path.join(INDEX, "official-pages.json"), JSON.stringify(allPages, null, 2), "utf8");
  await writeFile(path.join(INDEX, "official-failures.json"), JSON.stringify(allFailures, null, 2), "utf8");
  await writeFile(
    path.join(INDEX, "crawl-report.md"),
    [
      "# Official Source Crawl Report",
      "",
      `Generated: ${new Date().toISOString()}`,
      `Anthropic sitemap URLs discovered: ${anthropic.sitemapUrlCount}`,
      `Anthropic pages saved: ${anthropic.pages.length}`,
      `Claude docs pages saved: ${docs.pages.length}`,
      `Docs seen: ${docs.seenCount}`,
      `Docs remaining queue when capped: ${docs.remainingQueue}`,
      `Failures: ${allFailures.length}`,
      "",
      "## Notes",
      "- `claude.ai/sitemap.xml` is Cloudflare-gated from this environment, so the accessible official Claude learning/docs material was captured via `www.anthropic.com` and `docs.anthropic.com` / `platform.claude.com`.",
      "- Raw HTML is in `sources/raw`; extracted text is in `sources/text`; URL metadata is in `sources/index/official-pages.json`.",
    ].join("\n"),
    "utf8"
  );

  console.log(JSON.stringify({
    anthropicPages: anthropic.pages.length,
    docsPages: docs.pages.length,
    failures: allFailures.length,
    output: OUT,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

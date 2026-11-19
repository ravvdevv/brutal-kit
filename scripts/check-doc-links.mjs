import { access, readFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sources = [
  "index.html",
  "docs.html",
  "README.md",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "llms.txt",
  "llms-full.txt",
  "docs/architecture.md",
  "docs/recipes.md",
];

const errors = [];
const htmlIds = new Map();

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

for (const source of sources) {
  const absolute = join(root, source);
  if (!(await exists(absolute))) {
    errors.push(`Missing documentation source: ${source}`);
    continue;
  }

  const content = await readFile(absolute, "utf8");
  if (source.endsWith(".html")) {
    htmlIds.set(source, new Set([...content.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1])));
  }
}

function resolveTarget(source, rawTarget) {
  if (!rawTarget || rawTarget.startsWith("#") || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(rawTarget)) return;
  const decoded = decodeURIComponent(rawTarget);
  const [pathname, hash = ""] = decoded.split("#", 2);
  const cleanPath = pathname.split("?")[0];
  let relative = cleanPath ? resolve(root, dirname(source), cleanPath) : resolve(root, source);

  if (cleanPath.endsWith("/")) relative = join(relative, "index.html");
  if (!extname(relative) && !cleanPath) relative = resolve(root, source);

  return { relative, hash };
}

for (const source of sources) {
  const absolute = join(root, source);
  if (!(await exists(absolute))) continue;
  let content = await readFile(absolute, "utf8");

  if (source.endsWith(".md") || source.endsWith(".txt")) {
    content = content.replace(/```[\s\S]*?```/g, "");
  }

  const targets = [];
  if (source.endsWith(".html")) {
    for (const match of content.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) targets.push(match[1]);
  }
  if (source.endsWith(".md") || source.endsWith(".txt")) {
    for (const match of content.matchAll(/\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) targets.push(match[1]);
  }

  for (const target of targets) {
    const resolved = resolveTarget(source, target);
    if (!resolved) continue;
    const { relative, hash } = resolved;
    if (!(await exists(relative))) {
      errors.push(`${source}: broken local link or asset: ${target}`);
      continue;
    }

    if (hash && relative.endsWith(".html")) {
      const targetName = relative.slice(root.length + 1).replaceAll("\\", "/");
      const ids = htmlIds.get(targetName);
      if (ids && !ids.has(hash)) errors.push(`${source}: missing anchor #${hash} in ${targetName}`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated local links and assets across ${sources.length} documentation files.`);
}

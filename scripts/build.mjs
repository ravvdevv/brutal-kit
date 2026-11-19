import { mkdir, readFile, writeFile } from "node:fs/promises";

const sourcePath = new URL("../src/brutal.css", import.meta.url);
const outputDir = new URL("../dist/", import.meta.url);
const css = await readFile(sourcePath, "utf8");

if (!css.trim()) throw new Error("CSS source is empty.");
if (!css.includes(".bk-button")) throw new Error("Core component stylesheet is missing.");

const minified = css
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\s+/g, " ")
  .replace(/\s*([{}:;,])\s*/g, "$1")
  .trim();

await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(new URL("brutal.css", outputDir), css),
  writeFile(new URL("brutal.min.css", outputDir), minified + "\n")
]);

console.log("Built BrutalKit CSS (development + minified).");

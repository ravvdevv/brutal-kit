import { mkdir, readFile, writeFile } from "node:fs/promises";
await mkdir("dist", { recursive: true });
const css = await readFile("src/brutal.css", "utf8");
const minified = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim();
await writeFile("dist/brutal.css", css);
await writeFile("dist/brutal.min.css", minified + "\n");
console.log("Built dist/brutal.css and dist/brutal.min.css");

import { mkdir, readFile, writeFile } from "node:fs/promises";

export function minifyCss(input) {
  let output = "";
  let quote = "";
  let escaped = false;
  let pendingSpace = false;

  for (let i = 0; i < input.length; i += 1) {
    const char = input[i];
    const next = input[i + 1];

    if (quote) {
      output += char;
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }

    if (char === "'" || char === '"') {
      if (pendingSpace && output && /[\\w%.)#-]/.test(output.at(-1))) output += " ";
      pendingSpace = false;
      quote = char;
      output += char;
      continue;
    }

    if (char === "/" && next === "*") {
      const end = input.indexOf("*/", i + 2);
      if (end === -1) throw new Error("Unterminated CSS comment.");
      i = end + 1;
      pendingSpace = true;
      continue;
    }

    if (/\\s/.test(char)) {
      pendingSpace = true;
      continue;
    }

    const punctuation = "{}:;,>+~";
    if (pendingSpace && output && !punctuation.includes(char) && !punctuation.includes(output.at(-1))) {
      output += " ";
    }
    pendingSpace = false;
    output += char;
  }

  if (quote) throw new Error("Unterminated CSS string.");
  return output.trim();
}

const sourcePath = new URL("../src/brutal.css", import.meta.url);
const outputDir = new URL("../dist/", import.meta.url);
const css = await readFile(sourcePath, "utf8");

if (!css.trim()) throw new Error("CSS source is empty.");
if (!css.includes(".bk-button")) throw new Error("Core component stylesheet is missing.");

const minified = minifyCss(css);
await mkdir(outputDir, { recursive: true });
await Promise.all([
  writeFile(new URL("brutal.css", outputDir), css),
  writeFile(new URL("brutal.min.css", outputDir), minified + "\\n")
]);

console.log("Built BrutalKit CSS (development + minified).");

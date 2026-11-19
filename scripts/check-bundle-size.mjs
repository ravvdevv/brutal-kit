import { stat } from "node:fs/promises";

const budgets = [
  { file: "../dist/brutal.min.css", label: "Minified CSS", maxBytes: 9 * 1024 },
  { file: "../dist/brutal.css", label: "Readable CSS", maxBytes: 12 * 1024 },
  { file: "../src/brutal.js", label: "Optional JavaScript", maxBytes: 5 * 1024 }
];

let failed = false;
for (const budget of budgets) {
  const { size } = await stat(new URL(budget.file, import.meta.url));
  console.log(`${size <= budget.maxBytes ? "OK" : "OVER BUDGET"}: ${budget.label} ${size} / ${budget.maxBytes} bytes`);
  if (size > budget.maxBytes) failed = true;
}
if (failed) process.exitCode = 1;

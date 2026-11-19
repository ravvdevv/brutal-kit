import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../src/brutal.css", import.meta.url), "utf8");

test("exports the documented core component classes", () => {
  for (const selector of [".bk-button", ".bk-card", ".bk-badge", ".bk-input", ".bk-textarea", ".bk-select", ".bk-alert", ".bk-checkbox", ".bk-switch", ".bk-grid"]) {
    assert.ok(css.includes(selector), `Missing selector: ${selector}`);
  }
});

test("includes visible keyboard focus styles", () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /outline:\s*3px solid/);
});

test("supports reduced-motion preferences", () => {
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test("provides invalid and disabled form states", () => {
  assert.match(css, /aria-invalid="true"/);
  assert.match(css, /:disabled/);
});

test("defines design tokens instead of hard-coding component surfaces", () => {
  assert.match(css, /--bk-surface:/);
  assert.match(css, /--bk-border:/);
  assert.match(css, /--bk-shadow:/);
});


test("build outputs are generated and non-empty", async () => {
  const { stat } = await import("node:fs/promises");
  for (const file of ["../dist/brutal.css", "../dist/brutal.min.css"]) {
    const info = await stat(new URL(file, import.meta.url));
    assert.ok(info.size > 0, `Build output is empty: ${file}`);
  }
});

const behavior = await readFile(new URL("../src/brutal.js", import.meta.url), "utf8");

test("interactive tabs support arrow keys and Home/End navigation", () => {
  assert.match(behavior, /ArrowRight/);
  assert.match(behavior, /ArrowLeft/);
  assert.match(behavior, /event\.key === "Home"/);
  assert.match(behavior, /event\.key === "End"/);
  assert.match(behavior, /aria-selected/);
});

test("dialogs use native modal APIs and restore focus", () => {
  assert.match(behavior, /showModal\(\)/);
  assert.match(behavior, /\.close\(\)/);
  assert.match(behavior, /const trigger = returnFocus\.get\(dialog\)/);
  assert.match(behavior, /trigger\.focus\(\)/);
});

test("interactive styles include keyboard-visible and hidden states", () => {
  assert.match(css, /\.bk-tab\[aria-selected="true"\]/);
  assert.match(css, /\.bk-dialog::backdrop/);
  assert.match(css, /\.bk-tab:focus-visible/);
});


test('CSS minification preserves spaces inside strings', async () => {
  const { minifyCss } = await import('../scripts/minify-css.mjs');
  const result = minifyCss('.x { content: "two  words"; } /* comment */');
  assert.match(result, /content:"two  words"/);
  assert.doesNotMatch(result, /comment/);
});

test("CSS minification rejects malformed strings and comments", async () => {
  const { minifyCss } = await import("../scripts/minify-css.mjs");
  assert.throws(() => minifyCss('.x { content: "broken; }'), /Unterminated CSS string/);
  assert.throws(() => minifyCss(".x { color: red; /* broken"), /Unterminated CSS comment/);
});

test("the stylesheet does not override the browser's global hidden attribute", () => {
  assert.doesNotMatch(css, /(^|\n)\s*\[hidden\]/);
});

test("tab behavior skips disabled tabs and handles empty tablists safely", () => {
  assert.match(behavior, /enabledIndexes/);
  assert.match(behavior, /tab\.disabled/);
  assert.match(behavior, /if \(tabs\.length === 0\) return/);
});

test("tab behavior resolves panels by ID and supports vertical orientation", () => {
  assert.match(behavior, /getElementById\(id\)/);
  assert.match(behavior, /aria-orientation.*vertical/);
  assert.match(css, /\.bk-tabs\[aria-orientation="vertical"\]/);
});

test("the component stylesheet does not apply a global box-sizing reset", () => {
  assert.doesNotMatch(css, /\*\s*,\s*\*::before\s*,\s*\*::after\s*\{\s*box-sizing/);
});

test("CSS minification preserves required math-operator whitespace", async () => {
  const { minifyCss } = await import("../scripts/minify-css.mjs");
  const result = minifyCss(".x { width: calc(100% - 2rem); height: calc(10px + 2px); }");
  assert.match(result, /calc\(100% - 2rem\)/);
  assert.match(result, /calc\(10px \+ 2px\)/);
});

test("reduced-motion rules do not affect unrelated application elements", () => {
  assert.match(css, /\.bk-button, \.bk-tab/);
  assert.doesNotMatch(css, /color-scheme:\s*light/);
  assert.doesNotMatch(css, /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\*/);
});

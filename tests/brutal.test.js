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

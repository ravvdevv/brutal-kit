import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile(new URL("../components.json", import.meta.url), "utf8"));
const css = await readFile(new URL("../src/brutal.css", import.meta.url), "utf8");
const js = await readFile(new URL("../src/brutal.js", import.meta.url), "utf8");

if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.components)) {
  throw new Error("Unsupported or malformed component manifest.");
}

const ids = new Set();
const classes = new Set();

for (const component of manifest.components) {
  if (!component.id || ids.has(component.id)) throw new Error(`Missing or duplicate component id: ${component.id ?? "(empty)"}`);
  ids.add(component.id);
  if (!Array.isArray(component.classes) || component.classes.length === 0) throw new Error(`Component ${component.id} must declare CSS classes.`);

  for (const className of component.classes) {
    if (!className.startsWith("bk-")) throw new Error(`Invalid class namespace: ${className}`);
    if (!css.includes(`.${className}`)) throw new Error(`Manifest class missing from src/brutal.css: .${className}`);
    if (classes.has(className)) throw new Error(`Class declared more than once: .${className}`);
    classes.add(className);
  }

  if (component.requiresJavaScript && !js.includes(`export function ${component.entryPoint}`)) throw new Error(`Missing JavaScript entry point: ${component.id}`);
  for (const attribute of component.dataAttributes ?? []) {
    if (!js.includes(attribute) && !css.includes(attribute)) throw new Error(`Manifest data attribute missing from implementation: ${attribute}`);
  }
}

console.log(`Validated ${manifest.components.length} components and ${classes.size} public classes.`);

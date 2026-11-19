# BrutalKit

**Neo-Brutalism without the design compromises.**

BrutalKit is a CDN-first, dependency-free CSS component toolkit for bold interfaces with clear hierarchy, strong contrast, tactile interactions, and accessible focus states.

## Quick start

### CDN

After publishing a tagged release, pin the stylesheet to that version:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ravvdevv/brutal-kit@v0.1.0/dist/brutal.min.css">
<button class="bk-button bk-button--primary">Ship it ↗</button>
```

### Local development

Requires Node.js 22+ and Bun for the Vite demo:

```bash
bun install
bun run dev
bun run build
bun run test
```

## Components

| Component | Classes |
| --- | --- |
| Buttons | `.bk-button`, `--primary`, `--secondary`, `--blue`, `--danger`, `--sm`, `--lg`, `--block` |
| Cards | `.bk-card`, `.bk-card--flat`, `.bk-card__icon`, `.bk-card__title` |
| Badges | `.bk-badge`, `--blue`, `--success`, `--danger` |
| Forms | `.bk-field`, `.bk-label`, `.bk-input`, `.bk-textarea`, `.bk-select`, `.bk-check` |
| Feedback | `.bk-alert`, `--success`, `--warning`, `--danger` |
| Layout | `.bk-stack`, `.bk-row`, `.bk-grid`, `.bk-divider` |

Modifier classes are appended to their component, for example `bk-button bk-button--primary`.

## Interactive components

When working from a local clone, load the optional behavior module when you need tabs or dialogs:

```js
import "./src/brutal.js";
```

### Tabs

Use the WAI-ARIA tabs pattern. Each tab needs an `aria-controls` reference to its panel, and each panel needs an `aria-labelledby` reference to its tab.

```html
<div class="bk-tabs" data-bk-tabs role="tablist" aria-label="Account settings">
  <button class="bk-tab" id="profile-tab" role="tab" aria-selected="true" aria-controls="profile-panel">Profile</button>
  <button class="bk-tab" id="security-tab" role="tab" aria-selected="false" aria-controls="security-panel" tabindex="-1">Security</button>
</div>
<section class="bk-tabpanel" id="profile-panel" role="tabpanel" aria-labelledby="profile-tab">Profile settings</section>
<section class="bk-tabpanel" id="security-panel" role="tabpanel" aria-labelledby="security-tab" hidden>Security settings</section>
```

Tabs support arrow-key navigation, Home, and End. Horizontal tablists use left/right arrows; vertical tablists use up/down arrows.

### Dialogs

Use the native `dialog` element for built-in modal semantics, Escape-to-close behavior, and browser-managed focus handling.

```html
<button class="bk-button bk-button--primary" data-bk-dialog-open="confirm-dialog">Open dialog</button>
<dialog class="bk-dialog" id="confirm-dialog" data-bk-dialog aria-labelledby="confirm-title">
  <h2 class="bk-dialog__title" id="confirm-title">Confirm action</h2>
  <p class="bk-dialog__body">This action cannot be undone.</p>
  <button class="bk-button" data-bk-dialog-close>Cancel</button>
</dialog>
```

The interaction module returns focus to the opening trigger when the dialog closes. Always provide a visible close or cancel action.

### Accordion and tooltip

Use native disclosure semantics for accordions:

```html
<details class="bk-accordion">
  <summary class="bk-accordion__summary">What is included?</summary>
  <div class="bk-accordion__content">A small set of composable primitives.</div>
</details>
```

Tooltips can be styled with `.bk-tooltip` and a `data-bk-tooltip` attribute. Keep essential information in the page content too; tooltips are supplementary.

## Design tokens

Override the CSS custom properties to theme the toolkit:

```css
:root {
  --bk-bg: #f7f4ec;
  --bk-surface: #fffefa;
  --bk-ink: #171717;
  --bk-yellow: #ffd84d;
  --bk-blue: #a9d9ff;
  --bk-border-width: 2px;
  --bk-shadow: 5px 5px 0 var(--bk-ink);
  --bk-radius: 4px;
}
```

## Accessibility

BrutalKit includes visible keyboard focus indicators, reduced-motion handling, disabled and invalid form states, and semantic-friendly primitives. The project aims for WCAG 2.2 AA, but this is not a claim of automatic conformance.

Use semantic HTML, associate every form control with a label, provide accessible names for icon-only controls, and add appropriate descriptions and ARIA semantics where needed. Color must not be the only way information is conveyed.

## Principles

1. Strong hierarchy, not decoration for its own sake.
2. Visible keyboard focus and semantic HTML.
3. Reduced-motion support.
4. Small, composable primitives with predictable class names.
5. Version-pinned CDN URLs for production stability.
6. CSS primitives have no runtime dependency. Optional interactions are provided by a small vanilla JavaScript module.

## Development

- `bun run build` generates the tracked CDN stylesheets in `dist/`.
- `bun run test` runs the Node.js test suite.
- GitHub Actions runs the build and tests on pushes and pull requests to `main`.

## License

MIT. See [LICENSE](./LICENSE).

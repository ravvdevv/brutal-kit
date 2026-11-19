# BrutalKit

**A lightweight, accessible Neo-Brutalist CSS component library.**

BrutalKit is a dependency-free CSS toolkit for building bold web interfaces without taking over your application's styles. It provides reusable buttons, cards, badges, form controls, alerts, layout utilities, and optional vanilla JavaScript interactions.

- **CSS-first:** use the stylesheet without a framework or runtime dependency.
- **CDN-friendly:** serve the prebuilt stylesheet directly from jsDelivr.
- **Composable:** predictable `bk-` class names and customizable CSS variables.
- **Accessible by design:** visible focus states, reduced-motion support, semantic markup patterns, and keyboard support for tabs and dialogs.
- **Small surface area:** no global reset and no global element styling.

[Read the documentation](./docs.html) · [Explore the source](https://github.com/ravvdevv/brutal-kit) · [Report an issue](https://github.com/ravvdevv/brutal-kit/issues) · [MIT License](./LICENSE)

## Quick start

### Use the CDN

For evaluation and prototypes, add the stylesheet to your page:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/ravvdevv/brutal-kit@main/dist/brutal.min.css"
/>

<button class="bk-button bk-button--primary" type="button">
  Get started
</button>
```

**Release note:** the repository does not currently have a published version tag. The `@main` URL follows the latest default-branch commit and may change. Do not treat it as an immutable production dependency. Once a release tag is published, pin the CDN URL to that exact tag, for example `@vX.Y.Z`.

### Use the stylesheet locally

Copy `dist/brutal.css` or `dist/brutal.min.css` into your project and reference it from your HTML:

```html
<link rel="stylesheet" href="/assets/brutal.min.css" />
```

The CSS works with plain HTML and can be used alongside React, Vue, Svelte, or other application frameworks. It does not require a framework-specific wrapper.

## Components

BrutalKit provides a focused set of Neo-Brutalist UI primitives. Compose them with semantic HTML instead of adopting a rigid component architecture.

| Component | Classes |
| --- | --- |
| Buttons | `.bk-button`, `.bk-button--primary`, `.bk-button--secondary`, `.bk-button--blue`, `.bk-button--danger`, `.bk-button--sm`, `.bk-button--lg`, `.bk-button--block` |
| Cards | `.bk-card`, `.bk-card--flat`, `.bk-card__icon`, `.bk-card__title`, `.bk-card__description` |
| Badges | `.bk-badge`, `.bk-badge--blue`, `.bk-badge--success`, `.bk-badge--danger` |
| Form controls | `.bk-label`, `.bk-field`, `.bk-field__hint`, `.bk-field__error`, `.bk-input`, `.bk-textarea`, `.bk-select`, `.bk-check`, `.bk-checkbox`, `.bk-switch` |
| Feedback | `.bk-alert`, `.bk-alert--success`, `.bk-alert--warning`, `.bk-alert--danger` |
| Layout | `.bk-stack`, `.bk-row`, `.bk-grid`, `.bk-divider`, `.bk-link` |
| Interactive UI | `.bk-tabs`, `.bk-tab`, `.bk-tabpanel`, `.bk-accordion`, `.bk-dialog`, `.bk-tooltip` |
| Accessibility | `.bk-visually-hidden` |

Modifiers are added to the base component class. For example:

```html
<button class="bk-button bk-button--primary">Save changes</button>
<button class="bk-button bk-button--danger">Delete</button>
```

## Optional JavaScript interactions

The stylesheet is independent of JavaScript. Tabs and dialogs use a small vanilla JavaScript module from the repository:

```js
import "https://cdn.jsdelivr.net/gh/ravvdevv/brutal-kit@main/src/brutal.js";
```

For local development, import the module from your project instead:

```js
import "./src/brutal.js";
```

The module initializes elements in the document automatically. If you are mounting UI into a separate root after page load, call the exported initializer:

```js
import { initBrutalKit } from "./src/brutal.js";

initBrutalKit(document.querySelector("#app"));
```

The module currently provides tabs and dialog behavior. It does not add a framework, component runtime, or dependency to the CSS.

### Tabs

Use the WAI-ARIA tabs pattern. Each tab references its panel with `aria-controls`; each panel references its tab with `aria-labelledby`.

```html
<div
  class="bk-tabs"
  data-bk-tabs
  role="tablist"
  aria-label="Account settings"
>
  <button
    class="bk-tab"
    id="profile-tab"
    type="button"
    role="tab"
    aria-selected="true"
    aria-controls="profile-panel"
  >
    Profile
  </button>
  <button
    class="bk-tab"
    id="security-tab"
    type="button"
    role="tab"
    aria-selected="false"
    aria-controls="security-panel"
    tabindex="-1"
  >
    Security
  </button>
</div>

<section
  class="bk-tabpanel"
  id="profile-panel"
  role="tabpanel"
  aria-labelledby="profile-tab"
>
  Profile settings
</section>
<section
  class="bk-tabpanel"
  id="security-panel"
  role="tabpanel"
  aria-labelledby="security-tab"
  hidden
>
  Security settings
</section>
```

Horizontal tablists support left/right arrow navigation. Vertical tablists support up/down arrow navigation when `aria-orientation="vertical"` is set. Home and End move to the first and last enabled tabs. Disabled tabs are skipped, and nested tablists are initialized independently.

### Dialogs

Use the native HTML `dialog` element:

```html
<button
  class="bk-button bk-button--primary"
  type="button"
  data-bk-dialog-open="confirm-dialog"
>
  Open dialog
</button>

<dialog
  class="bk-dialog"
  id="confirm-dialog"
  data-bk-dialog
  aria-labelledby="confirm-title"
>
  <h2 class="bk-dialog__title" id="confirm-title">Confirm action</h2>
  <p class="bk-dialog__body">This action cannot be undone.</p>
  <button class="bk-button" type="button" data-bk-dialog-close>
    Cancel
  </button>
</dialog>
```

The browser provides modal behavior and Escape-to-close support. BrutalKit returns focus to the opening trigger after the dialog closes. Always include a clear close or cancel action.

### Accordion and tooltip

Accordions use native disclosure elements:

```html
<details class="bk-accordion">
  <summary class="bk-accordion__summary">What is included?</summary>
  <div class="bk-accordion__content">
    A small set of composable interface primitives.
  </div>
</details>
```

Tooltips are supplementary. Keep essential information available in the page content:

```html
<button
  class="bk-button bk-tooltip"
  type="button"
  data-bk-tooltip="Opens account settings"
>
  Settings
</button>
```

## Customize the design tokens

BrutalKit exposes CSS custom properties for color, borders, shadows, radii, typography, and spacing. Override them in your own stylesheet:

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

Layout utilities also expose component-specific gap variables:

```css
.page-actions {
  --bk-row-gap: 1rem;
}

.dashboard-grid {
  --bk-grid-gap: 1.25rem;
}
```

## Accessibility

BrutalKit includes visible keyboard focus indicators, reduced-motion handling, disabled and invalid form states, and semantic-friendly interaction patterns.

Use `.bk-visually-hidden` for content that should remain available to assistive technology. It becomes visible when focused or active, making it suitable for skip links:

```html
<a class="bk-visually-hidden" href="#main-content">Skip to content</a>
```

The toolkit does not apply a global box-sizing reset or global element styles. Your application stays in control of its base styles.

BrutalKit aims to support accessible interfaces, but using the toolkit does not automatically make an application WCAG-conformant. Use semantic HTML, associate form controls with labels, provide accessible names for icon-only controls, manage focus appropriately, and never rely on color alone to communicate meaning.

## Development

### Requirements

- Node.js 22 or newer
- Bun

### Run locally

```bash
bun install
bun run dev
```

### Build and test

```bash
bun run build
bun run test
```

The build script generates the tracked CSS files in `dist/`. The test suite runs with Node's built-in test runner. GitHub Actions runs the build and tests on pushes and pull requests targeting `main`.

## Project structure

```text
brutal-kit/
├── src/
│   ├── brutal.css       # Source component styles and design tokens
│   ├── brutal.js        # Optional tabs and dialog behavior
│   ├── demo.css         # Demo-site styles
│   └── main.js          # Demo-site interactions
├── dist/
│   ├── brutal.css       # CDN-ready stylesheet
│   └── brutal.min.css   # Minified stylesheet
├── scripts/             # Build and minification scripts
├── tests/               # Automated regression tests
└── index.html            # Component demo
```

## Contributing

Bug reports, focused improvements, and documentation fixes are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening an issue or pull request.

## License

BrutalKit is released under the [MIT License](./LICENSE).

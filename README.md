# BrutalKit

**Neo-Brutalism without the design compromises.**

BrutalKit is a CDN-first, dependency-free CSS component toolkit for bold interfaces with clear hierarchy, strong contrast, tactile interactions, and accessible focus states.

## Quick start

After publishing a tagged release, use a pinned CDN version:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ravvdevv/brutal-kit@v0.1.0/dist/brutal.min.css">
<button class="bk-button bk-button--primary">Ship it ↗</button>
```

For local development:

```bash
bun install
bun run dev
bun run build
bun run test
bun run test
```

## Included primitives

- Buttons: `.bk-button`, `.bk-button--primary`, `.bk-button--secondary`
- Cards: `.bk-card`, `.bk-card__icon`
- Badges: `.bk-badge`
- Forms: `.bk-label`, `.bk-input`
- Design tokens: `--bk-*` CSS custom properties

## Principles

1. Strong hierarchy, not decoration for its own sake.
2. Visible keyboard focus and semantic HTML.
3. Reduced-motion support.
4. Small, composable primitives with predictable class names.
5. Version-pinned CDN URLs for production stability.

## Roadmap

- [ ] Alerts, toggles, tabs, dialogs, and tables
- [ ] Theme presets and token documentation
- [ ] Automated accessibility checks
- [ ] React adapters
- [ ] Versioned CDN builds

## License

MIT. See [LICENSE](./LICENSE).

## Accessibility

BrutalKit includes visible keyboard focus indicators, reduced-motion handling, disabled and invalid form states, and semantic HTML examples. The project targets WCAG 2.2 AA, but this is not a claim of automatic conformance. Consumers should provide accessible names, labels, descriptions, and correct ARIA semantics in their markup.

## Component classes

- Buttons: `.bk-button`, `--primary`, `--secondary`, `--blue`, `--danger`, `--sm`, `--lg`, `--block`
- Surfaces: `.bk-card`, `.bk-card--flat`, `.bk-badge`
- Forms: `.bk-field`, `.bk-label`, `.bk-input`, `.bk-textarea`, `.bk-select`, `.bk-check`
- Feedback: `.bk-alert`, `.bk-alert--success`, `.bk-alert--warning`, `.bk-alert--danger`
- Layout: `.bk-stack`, `.bk-row`, `.bk-grid`, `.bk-divider`

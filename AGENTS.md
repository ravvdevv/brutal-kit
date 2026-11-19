# Agent instructions for BrutalKit

These instructions apply to the entire repository.

## Start here

Before changing code, read:
1. `README.md`
2. `llms.txt` and, for API/integration work, `llms-full.txt`
3. `components.json` and relevant sections of `docs.html`
4. `docs/architecture.md` and `docs/recipes.md` when changing architecture or adding components
5. The source files and tests you intend to change

Verify class names, attributes, tokens, and behavior in source. Do not invent APIs from memory.

## Product contract

- BrutalKit is a CSS-first, dependency-free, framework-agnostic Neo-Brutalist library.
- CSS usage must not require JavaScript.
- Optional JavaScript currently enhances tabs and native dialogs only.
- Keep the `bk-` class namespace and `--bk-` token namespace.
- Do not introduce a framework runtime, global reset, broad element selectors, or global style side effects.
- Do not claim an npm package is published. Verify publication before documenting package-manager installation.
- The jsDelivr `@main` URL is mutable, not an immutable production version.

## Design quality bar

- Prioritize hierarchy, typography, spacing, alignment, contrast, and interaction clarity.
- Use existing tokens before adding new ones.
- Keep Neo-Brutalist borders and hard shadows intentional and consistent.
- Avoid gratuitous gradients, glassmorphism, neon, excessive rounding, decorative animation, noisy layouts, and generic AI-generated patterns.
- Every visual element must communicate hierarchy, state, or affordance.
- Design mobile layouts deliberately; do not merely shrink desktop layouts.

## Engineering rules

- Keep changes scoped and modular. Avoid monolithic files and unrelated rewrites.
- Prefer native HTML semantics and browser capabilities.
- Maintain keyboard support, visible focus, reduced-motion support, and accessible names.
- Inputs need labels; associate errors programmatically where appropriate.
- Do not rely on color alone for status.
- Do not add dependencies without a concrete need and explanation.
- Never create fake interactions or controls that do nothing.
- Treat user content and external data as untrusted.
- Do not commit secrets, credentials, or environment-specific values.

## Architecture and metadata

- `src/brutal.css` is the source of truth for library styles and tokens.
- `src/brutal.js` is optional progressive enhancement, not a required runtime.
- `components.json` is the machine-readable public API inventory. Keep it synchronized with CSS selectors and JS behavior.
- `schemas/components.schema.json` defines the manifest shape.
- `docs/architecture.md` defines runtime boundaries and performance policy.
- `docs/recipes.md` contains copyable semantic implementation patterns.
- When adding/changing a component, update metadata, docs, examples, and regression tests.
- Keep CSS-only components independent of JavaScript.

## Source and generated files

- Edit `src/brutal.css` for component styles and tokens.
- Edit `src/brutal.js` for optional interactions.
- `dist/brutal.css` and `dist/brutal.min.css` are generated.
- After CSS changes, run `bun run build`; include generated output.
- Never hand-edit `dist/` as the primary change.
- Demo-site files (`index.html`, `src/demo.css`, `src/main.js`) are separate from the library API.
- Documentation must describe behavior that actually exists.

## Required verification

For library changes, run:

```bash
bun run build
bun run test
bun run check:manifest
bun run check:size
git diff --check
```

Or run the combined gate: `bun run check`.

Inspect the full diff. Report files changed, commands actually run, test results, and checks not performed. Never claim a build, test, deployment, accessibility audit, or browser check passed unless you ran it.

## Git workflow

- Use Conventional Commits.
- Keep commits focused and descriptive.
- Do not force-push or rewrite shared history.
- Do not create a pull request unless requested.
- Do not push changes without user approval in an interactive coding session.

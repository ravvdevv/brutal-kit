# Agent instructions for BrutalKit

These instructions apply to the entire repository.

## Start here

Before changing code, read:
1. `README.md`
2. `llms.txt` and, when the task involves integration or API details, `llms-full.txt`
3. The relevant sections of `docs.html`
4. The source files and tests you intend to change

Do not assume the API from memory. Verify class names, attributes, tokens, and behavior in the current source.

## Product contract

- BrutalKit is a CSS-first, dependency-free, framework-agnostic Neo-Brutalist component library.
- CSS usage must not require JavaScript.
- Optional JavaScript is currently limited to tabs and native dialog behavior.
- Keep the `bk-` class namespace and `--bk-` token namespace.
- Do not introduce a framework runtime, global reset, broad element selectors, or global style side effects.
- Do not claim an npm package is published. Verify publication before documenting package-manager installation.
- The jsDelivr `@main` URL is mutable. Do not present it as an immutable production version.

## Design quality bar

- Prioritize hierarchy, typography, spacing, alignment, contrast, and interaction clarity.
- Use existing design tokens before adding new ones.
- Keep Neo-Brutalist borders and hard shadows intentional and consistent.
- Avoid gratuitous gradients, glassmorphism, neon, excessive rounding, decorative animation, noisy layouts, and generic AI-generated patterns.
- Every visual element must communicate hierarchy, state, or affordance.
- Design mobile layouts deliberately; do not merely shrink desktop layouts.

## Engineering rules

- Keep changes scoped and modular. Avoid monolithic files and unrelated rewrites.
- Prefer native HTML semantics and browser capabilities.
- Maintain keyboard support, visible focus, reduced-motion support, and accessible names.
- Inputs must have labels; errors must be programmatically associated where appropriate.
- Do not rely on color alone for status.
- Do not add dependencies without a concrete need and an explanation.
- Never create fake interactions or controls that do nothing.
- Treat user content and external data as untrusted.
- Do not introduce secrets, credentials, or environment-specific values into the repository.

## Source and generated files

- Edit `src/brutal.css` for component styles and tokens.
- Edit `src/brutal.js` for optional component interactions.
- `dist/brutal.css` and `dist/brutal.min.css` are generated artifacts.
- After changing library CSS, run `bun run build` and include the resulting `dist/` changes.
- Do not manually patch generated CSS as a substitute for changing source.
- Demo-site files (`index.html`, `src/demo.css`, `src/main.js`) are separate from the library API.
- Documentation files must describe behavior that actually exists.

## Required verification

For library changes, run:

```bash
bun run build
bun run test
git diff --check
```

For docs-only changes, at minimum run the test suite and validate links/paths affected by the change. For interactive changes, add or update regression tests where practical.

Inspect the final diff. Report:
- what changed;
- commands actually run;
- test results;
- known limitations or checks not performed.

Never claim a build, test, deployment, accessibility audit, or browser check passed unless you ran it and saw the result.

## Git workflow

- Use Conventional Commits (for example, `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `style:`).
- Keep commits focused and descriptive.
- Do not force-push or rewrite shared history.
- Do not create a pull request unless explicitly requested.
- Do not push changes without the user's approval when working in an interactive coding session.

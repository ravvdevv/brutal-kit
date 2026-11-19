# Copilot instructions

Read the repository-wide `/AGENTS.md` before making changes. It defines the product contract, design principles, source/generated-file workflow, accessibility expectations, and required verification.

For API and integration questions, also read `/llms.txt` and `/llms-full.txt`. Verify all class names and behavior in `src/brutal.css`, `src/brutal.js`, and `docs.html`; do not invent APIs.

Keep BrutalKit CSS-first, framework-agnostic, dependency-free, and scoped to the `bk-` namespace. Edit source files, regenerate `dist/` with `bun run build`, run `bun run test`, and inspect the final diff. Follow the accessibility and anti-slop design quality bar in `AGENTS.md`.

# Contributing to BrutalKit

Thanks for considering a contribution.

## Before you start

- Search existing issues and pull requests before opening a duplicate.
- For substantial changes, open an issue first to discuss the problem and proposed approach.
- Keep pull requests focused. One clear improvement is easier to review than a grab bag of unrelated edits.

## Development setup

Requirements:

- Node.js 22 or newer
- Bun

Clone the repository and install the development dependencies:

```bash
bun install
bun run dev
```

## Quality checks

Run the build and test suite before submitting changes:

```bash
bun run build
bun run test
```

The build regenerates the tracked files in `dist/`. Include those generated changes whenever you modify the source stylesheet.

## Contribution guidelines

- Use Conventional Commits, such as `feat:`, `fix:`, `docs:`, and `chore:`.
- Keep components small, composable, and framework-independent.
- Avoid global resets and selectors that unexpectedly affect host applications.
- Prefer semantic HTML and accessible interaction patterns.
- Support keyboard interaction and visible focus where applicable.
- Respect `prefers-reduced-motion`.
- Document public classes, modifiers, and CSS custom properties.
- Add regression tests for behavior and build-tool changes.
- Do not add runtime dependencies without a clear technical reason.

## Pull requests

Include:

1. The problem being solved and why the change is needed.
2. A concise summary of the implementation.
3. Relevant screenshots or a short recording for visual changes.
4. Confirmation that the build and tests pass.

Be respectful, specific, and open to technical feedback.

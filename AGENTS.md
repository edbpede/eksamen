# AGENTS.md

This file provides guidance to AI coding agents when working with code in this
repository.

Zero-build static site archiving Danish FP9/FP10 exam material. `docs/` is the
published web root (`docs/CNAME` → eksamen.edbpede.net). There is no
`package.json`, lockfile, or bundler — first-party code is hand-written ES
modules and plain CSS loaded directly by the browser. Do not introduce a Node
toolchain; both CI workflow headers document the decision.

## Commands

Run from the repository root.

```bash
# Serve locally. `--directory docs` is required (see Gotchas).
python3 -m http.server 4321 --bind 127.0.0.1 --directory docs

# Full quality gate, identical to .github/workflows/code-quality.yml.
SKIP=no-commit-to-branch prek run --all-files --hook-stage manual

# One hook only.
prek run gitleaks --all-files

# Install the prek.toml hooks locally — not installed by default.
prek install
```

There is no unit-test suite. The only automated behavioural check is
`.github/workflows/smoke.yml`, which serves `docs/` and asserts the two
first-party pages return real HTML. The single-case equivalent, against the
server above:

```bash
curl -fsS -m 10 http://127.0.0.1:4321/optagelsesprover.html | grep -i '<html'
```

## Ownership

| Path | Owner | Rule |
| --- | --- | --- |
| `docs/index.html`, `docs/optagelsesprover.html`, `docs/css/`, `docs/js/`, `docs/fonts/`, `docs/img/` | First-party | Edit freely. |
| `docs/proever/shared/` | First-party | Shared start gate + exam-page stylesheet. Extend here instead of copying per exam. |
| `docs/proever/**/index.html` with `class="doc-page"` | First-party | Hand-written link page for PDF-only exams. |
| Everything else under `docs/proever/` | Ministry-owned, vendored | Copy verbatim; never reformat, rename, or tidy. |

`prek.toml` excludes `^docs/proever/` from the whitespace, EOF, and line-ending
fixers, so the first-party wrappers living under that prefix are never
auto-tidied — match the surrounding formatting by hand.

## Data flow

Both landing pages ship an empty `<main class="subject-grid">` and let a module
fill it.

- `docs/js/landing.js` renders one card per entry of the `subjects` array in
  `docs/js/examList.js`, populated from `docs/proever/exam-index.json` via
  `examScanner.js`.
- `docs/js/optagelsesprover.js` is a standalone parallel implementation for the
  encrypted list; it shares no code with `landing.js`.
- Every exam link points at `docs/proever/shared/exam-start.html?exam=<path>`,
  which redirects to `"../" + path`. Every `path` in both indexes is therefore
  relative to `docs/proever/`, not to `docs/`.

## Adding an exam

1. Create `docs/proever/<SUBJECT_DIR>/YYYY-MM-DD_<Descriptor>/`. Danish letters
   are transliterated (`ae`, `oe`, `aa`); folder names are
   `Title_Case_With_Underscores`, files inside are lowercase-hyphenated.
2. PDF-only exam: add an `index.html` wrapper, copying
   `docs/proever/FP9_dansk/2024-12-02_Laesning_Retskrivning/index.html` —
   root-absolute links for shared assets (`/css/shared.css`,
   `/proever/shared/exam-page.css`), relative links for the exam's own files.
   Interactive Ministry HTML exam: no wrapper, point `path` straight at the
   vendored `index.html`.
3. Register it in `docs/proever/exam-index.json` under the subject key. Creating
   the folder alone renders nothing — that index is hand-maintained, never
   scanned from disk.
4. Update the hardcoded `Opdateret <date>` in `docs/index.html`.

New subject: append it to `subjects` in `docs/js/examList.js`. `landing.js`
iterates that array, not the JSON keys — a subject present only in
`exam-index.json` renders nowhere, and one present only in `subjects` renders an
"Ingen prøver endnu" card.

Optagelsesprøver are the exception. That list exists *only* inside
`docs/proever/optagelsesprover.enc.json` (AES-GCM over a PBKDF2-SHA256 key,
250 000 iterations, derived from a code; entry shape `{name, date, path}` — see
`decryptIndex`). No generator script exists in this repository, so adding one
means re-encrypting the whole array: ask the maintainer for the tool rather than
reconstructing the parameters. Also bump the hardcoded `6 prøver` count in the
`cross-link__meta` span of `docs/index.html`.

## Conventions

- Every first-party `.js` opens with the LibreJS line
  `// @license magnet:?xt=urn:btih:0b31508aeb0634b347b8270c7bee4d411b5d4109&dn=agpl-3.0.txt AGPL-3.0`
  and closes with `// @license-end`. Preserve both; add both to new scripts.
- Build DOM with `createElement`; no `innerHTML` anywhere in `docs/js/`.
- Design tokens (`--accent`, `--ink`, `--sp-*`, `--font-*`, `--max-w`) are
  declared only in `docs/css/shared.css`, which `landing.css` `@import`s. Add
  tokens there instead of re-declaring colours or spacing.
- User-facing strings are Danish. Comment in the language of the file you are in
  — newer modules Danish, older ones English.
- Conventional Commits, enforced at the `commit-msg` stage.

## Gotchas

- **First-party pages assume a domain-root deploy.** `/css/shared.css`,
  `/favicon.svg`, and the `href="/"` back-links are root-absolute; serving the
  repository root, or deploying to a subpath, silently breaks every exam
  wrapper. Always serve with `--directory docs`.
- **`check-added-large-files --maxkb=500` rejects most new exam assets.** 91
  tracked files already exceed it, up to a 27 MB `.mp4`; the hook inspects only
  newly added files, so it fires on every import. Raise `--maxkb` in `prek.toml`
  deliberately, or skip that hook for the import commit — never re-encode or
  shrink Ministry files to fit.
- **`no-commit-to-branch --branch main` blocks local commits on `main`.** Work
  on a branch and open a PR; CI sets `SKIP=no-commit-to-branch` for itself.

## Reference

- `README.md` — exam-naming intent and subject-folder layout. Read before an
  import, but three claims are stale: it documents an `FP9_engelsk/` folder that
  does not exist, prescribes `YYYY-MM-DD_Med_Hjaelpemidler` for matematik where
  the tree uses `2025-12-01_Matematik/med-hjaelpemidler/`, and asks for relative
  paths everywhere where wrappers use root-absolute ones for shared assets. The
  tree and the wrappers win.
- `prek.toml` — the hook set. Read before changing a hook, adding a large file,
  or committing on `main`.
- `.github/workflows/smoke.yml` — read before changing either landing page or
  the served directory layout.
- `.github/workflows/code-quality.yml` — read before proposing a formatter or a
  Node toolchain.
- `docs/proever/LICENSE` — Ministry content terms. Read before touching anything
  under `docs/proever/`.

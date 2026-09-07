# Development CI

Every PR and default-branch push runs the existing `prek` quality hooks and static
HTML smoke checks through `ci.yml`. The original workflows remain callable and
manually runnable, so their useful checks are preserved without duplicate PR runs.
The shared `ci / required` gate requires both lanes to succeed and blocks missing,
failed, cancelled, or unexpectedly skipped prerequisites.

Local quality checks remain:

```sh
SKIP=no-commit-to-branch prek run --all-files --hook-stage manual
```

CI pins prek 0.5.2. Hooks may fix local files; CI treats any required fixer changes
as a failure. Vendored Ministry exam material keeps its existing hook exclusions
and remains unmodified. The smoke check serves `docs/` on localhost and asserts
that both landing pages return real HTML. It does not test client-side rendering
or decrypt the exam index. No Node toolchain, bundler, or placeholder test suite
is added to this static site.

Renovate inherits the shared versioned presets, including non-major grouping,
TOML hook revision tracking, and checks-gated PR automerge. Major updates and
pre-1.0 minor upgrades follow the shared dashboard/manual policy. Default-branch
protection requires `ci / required`, an up-to-date branch, and no bypass; enable
automerge only after this gate has passed. Actions use full version tags.

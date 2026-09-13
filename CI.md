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

Renovate uses the v1.1.0 default and automerge presets. All update types, including
majors and shared-policy versions, are eligible without dashboard approval after
all four current-head checks in `.github/merge-policy.json` pass. Genuine author
sign-offs are preserved, and full CI is dispatched for the exact merged commit.
Other changes retain review of the exact head/base, full diff, authors/DCO,
every expected job and relevant artifacts before ghmerge. No branch protections
or repository rulesets are configured. Actions use full version tags.

Pages continues to publish the static `main:/docs` tree at `eksamen.edb.fi`.
Current Renovate extraction manages only workflow, hook and shared-preset versions,
all outside `docs/`; those updates do not change the served tree and need no
redeployment. Therefore checked merging has no deployment follow-up here. Ordinary
maintainer content pushes retain native Pages publication. If served dependencies
or a build are introduced, include their publication in the checked-merge policy
at that time. No Node toolchain or Biome installation is introduced.

# P2 clean-start validation

- Date: 2026-09-14
- Result: **PASS for repository setup and checks**

A disposable copy was created without `.git`, `node_modules`, `miniprogram_npm`, `.firecrawl`, or a local `.env`. The following documented workflow was then exercised:

1. `npm ci` — PASS; 1,541 packages installed from the lock file. Husky correctly skipped hook installation because the disposable copy had no Git metadata.
2. `npm run verify:p2` — PASS; tests, syntax, maintained-scope lint, Mini Program npm packaging, production dependency audit, and secret scan all passed.
3. `docker compose --env-file .env.example -f deploy/docker/compose.yaml config --quiet` — PASS.

The Secret scanner initially failed in a Git-less copy. It was corrected to use a filesystem fallback that excludes dependency/build directories and does not read ignored local environment files. The complete clean-start workflow passed after that fix.

The disposable directory was removed after its absolute path was verified to be within the dedicated P2 validation prefix. This check proves README installation reproducibility; it does not substitute for the still-failing Docker runtime/container validation.

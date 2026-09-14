# P3 boundary and security evidence

Date: 2026-09-14

## Preserved boundaries

- `scripts/check-p3-architecture.js` compares `pages`, `model/catalog`, and `services/catalog` with the P3 branch merge base on personal `origin/main`.
- P3 adds no product tables or product APIs.
- The existing 30-product/90-offer Mock Catalog remains an early Mini Program technical validation and is not imported by the backend or admin UI.
- Local `project.config.json` remains a private, unstaged working-tree modification and is not inspected or overwritten.

## Credential controls

- No default administrator password is committed.
- The seed administrator is disabled until explicit process-level activation.
- Database, Redis, JWT, Actuator, and bootstrap credentials are environment-only.
- Production placeholders have no credential fallback.
- The repository Secret scanner covers Java, JavaScript, TypeScript, Vue, XML, SQL, properties, PowerShell, YAML, Markdown, `.env.example`, and the two tracked public admin environment files. Local `.env*` files and private Mini Program configuration remain excluded from reading.

## Final checks

- P3 structure tests: 4/4 PASS.
- Architecture boundary check: PASS against base `64f0f92caf5a`.
- Secret scan: PASS across 1,204 repository text files after generated Maven output was excluded from the candidate set.
- Admin production dependency audit: one retained high-severity transitive `nanoid <3.3.18` finding. It is recorded rather than hidden or upgraded outside the approved scope.
- Hosted P3 CI: not run because this branch has not been committed or pushed; no remote result is claimed.

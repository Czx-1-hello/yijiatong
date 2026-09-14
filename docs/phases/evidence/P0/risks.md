# P0 Known Defects and Risks

| ID | Severity | Finding | P0 disposition |
|---|---|---|---|
| P0-BLOCK-01 | Resolved for P0 | Five screenshot artifacts now cover all four main tabs and Goods Detail | P0 screenshot/major-page criterion satisfied; deeper runtime coverage remains below |
| P0-HIGH-01 | High | All services depend on local mocks; disabling mocks returns the incompatible placeholder `real api` | Recorded; backend work belongs to later phases |
| P0-HIGH-02 | High | `npm run check` depends on Unix `grep`; on Windows it logs failure but exits 0, creating a false-green check | Recorded; no script change in P0 |
| P0-HIGH-03 | High | `npm test` is a failing placeholder, so no automated regression suite exists | Recorded; no test infrastructure added in P0 |
| P0-HIGH-04 | High | Full npm audit reports 10 development-tool vulnerabilities, including 5 high-severity findings | Production audit is clean; defer controlled upgrades because P0 forbids them |
| P0-MED-01 | Medium | Root `package.json` declares ISC while repository `LICENSE` is MIT | Resolve before third-party notice and distribution approval |
| P0-MED-02 | Medium | `package-lock.json` is locally generated but ignored upstream | Reproducibility decision required before environment standardization |
| P0-MED-03 | Medium | Search mock ignores query/filter/page parameters and reports inconsistent `totalCount` | Treat as fixture limitation; do not infer real search behavior |
| P0-MED-04 | Medium | Local `project.config.json` differs from upstream through a developer AppID | Preserve as user state; avoid committing private/local configuration without review |
| P0-MED-05 | Medium | Windows `core.autocrlf=true` creates extensive LF/CRLF lint warnings; the configured `lint` script uses `--fix` and could rewrite many files | Use read-only lint until a deliberate line-ending policy is approved |
| P0-MED-06 | Medium | Existing cart, checkout, payment, address, order, invoice, delivery, and after-sales UX contradicts the first-version aggregation boundary | Retain as baseline only; approved strategy removes or repurposes entry points later |
| P0-MED-07 | Medium | Current config still requests address/location-related capabilities that may not belong in the future product | Reassess during compliance/product phases; no P0 config change |
| P0-LOW-01 | Low | Mock responses include realistic-looking personal data and nondeterministic request metadata | Replace with clearly synthetic deterministic fixtures in later test work |
| P0-LOW-02 | Low | Images depend on external Tencent CDN assets and Mini Program domain policy | Include network/domain behavior in future runtime verification |
| P0-LOW-03 | Low | Repository-local `AGENTS.md` and `MEMORY.md` are absent; workspace-level files exist one directory above | Planned P2 governance output; not created in P0 |
| P0-MED-08 | Medium | Order runtime, Developer Tools console output/version, secondary navigation, and loading/empty/failure states are not evidenced | Retained as unverified baseline depth; not a P0 blocker because representative main pages run and Order is planned for first-version removal |

No risk was mitigated by changing business code, dependencies, configuration, or architecture during P0.

# P2 evidence index

- `environment-validation.md`: **PASS** — pinned MySQL and Redis services passed startup, health, version, connection, host-port, and post-restart checks.
- `ci-validation.md`: **PASS locally / NOT VERIFIED remotely** — local CI-equivalent checks passed with inherited red baselines recorded; no hosted GitHub Actions run exists yet.
- `baseline-preservation.md`: **PASS** — application boundary and Mock Catalog hashes preserved.
- `clean-start-validation.md`: **PASS** — README installation and checks reproduced without preinstalled dependencies.

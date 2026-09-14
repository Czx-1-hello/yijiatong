# Project memory

## Stable decisions

- The upstream baseline is Tencent `tdesign-miniprogram-starter-retail` at commit `4280f410121c75775c4b1fd15c3849031f830cd7`.
- P0 is PASS. P1-A is PASS; P1-B is `DEFERRED / EXTERNAL BLOCKER`; P1 overall is incomplete.
- ADR-0001 permits Mock-first work through P5 while retaining the hard authorization and physical-device gate before P6.
- The existing deterministic Mock Catalog contains 30 unified products and 90 platform offers behind `services/catalog/productCatalog.js`. It is early validation only and must not be treated as production persistence or as P4/P5 completion.
- During P2 the runnable Mini Program remains at the repository root. `apps/miniprogram/` is a pointer, not a duplicate or moved application.
- The local P2 Docker environment uses MySQL 8.4.9 and Redis 8.6.3. Credentials belong in ignored `.env` files; only placeholders belong in `.env.example`.

## Known risks retained

- The upstream full-repository lint baseline is not clean. P2 gates maintained/new scope and reports the full legacy result separately.
- Development dependencies contain known audit findings. Production dependency audit is blocking; the full audit remains visible and non-blocking until a separately approved dependency-remediation phase.
- The current Mini Program has no TypeScript compiler. `npm run typecheck` explicitly reports TypeScript as not applicable and performs syntax validation for JavaScript instead.
- WeChat Developer Tools compilation and runtime remain separate from the headless npm dependency build. P0 contains the user-provided Developer Tools evidence.
- Redis 8 licensing and the eventual deployment model still require formal approval before production adoption.

## Environment notes

- Docker Desktop uses the WSL2 Linux backend and stores its WSL data under `E:\AI\DockerData` on the current development machine.
- Host port `3306` is occupied by an unrelated local MySQL service. P2 Docker validation used the supported local override `MYSQL_PORT=3307`; use the ignored `.env` file for that machine-specific setting.
- Never store Docker, database, platform, or WeChat secret values in this file.

## P2 status

- On 2026-09-14, the repository structure, safe environment template, Compose definition, README clean-start flow, and local CI checks were completed.
- The Docker runtime gate is complete: MySQL 8.4.9 and Redis 8.6.3 started healthy, passed connection/version checks, and remained healthy after one restart.
- P2 is **PASS**. GitHub Actions run `34804604715` completed successfully for commit `fd8aa10dc54fc9be53404224692371798683350d`; all blocking steps passed and inherited red baselines remained visible as non-blocking reports.
- P2 closure does not start P3. Begin P3 only after an explicit user instruction.

# P3 Backend and Admin Foundation Implementation Plan

> Scope: execute project plan v1.1 phase P3 only. The Mini Program and Mock Catalog are immutable baselines for this phase.

## Acceptance criteria

- The implementation stays on `feat/p3-backend-admin-foundation`, created from the accepted personal `main` baseline.
- RuoYi-Vue-Plus backend and Plus-UI admin sources are pinned to their official v6.0.0 releases with license and provenance records.
- Only authentication, RBAC, menu/permission, audit/logging, system management, and health foundations are retained; product-domain work is absent.
- Configuration uses environment-variable boundaries and production configuration fails closed when required secrets are missing.
- The backend builds and starts on JDK 21, connects to the existing MySQL 8.4.9 and Redis 8.6.3 services, and exposes a healthy actuator endpoint.
- The admin application installs, lints/type-checks, builds, and starts on the locked Node/pnpm toolchain.
- A bootstrap administrator is opt-in, obtains credentials only from process environment, and can authenticate through the real login endpoint.
- RBAC/menu access and login/operation audit records are verified against the running system.
- Automated architecture checks prove that `pages/` and `model/catalog/` were not changed from the P2 baseline.
- Secret scanning passes without reading or exposing local secret files.

## Execution tasks

1. Record upstream repositories, tags, commits, licenses, retained modules, and omitted modules.
2. Add P3 architecture and boundary checks to the existing Node test harness.
3. Finalize environment-driven backend/admin configuration and secure bootstrap behavior.
4. Validate the P3 foundation SQL in a P3-only database; do not introduce product tables.
5. Build and test the backend with Temurin JDK 21 and the admin with the pinned pnpm version.
6. Start the backend and admin against the existing P2 MySQL/Redis services; verify health, login, RBAC/menu, and audit behavior.
7. Run dependency, license, and secret checks; capture commands and results under `docs/phases/evidence/P3/`.
8. Update `docs/phases/P3.md`, project technical documentation, README startup guidance, and project memory.
9. Stop on the P3 branch without committing, pushing, merging, or beginning P4.

## Risks and controls

- **Upstream size:** retain the official source and remove only modules explicitly outside P3; document every deliberate delta.
- **Local credentials:** use process-scoped values during validation and never echo them, write them to `.env`, or persist them in evidence.
- **Private Mini Program configuration:** never stage, inspect, overwrite, or report the private `project.config.json` change.
- **Runtime mutation:** initialize only the dedicated P3 administration schema; do not create product tables or modify Docker volumes/images.
- **Toolchain drift:** pin project-supported versions and record the exact locally validated patch versions separately.

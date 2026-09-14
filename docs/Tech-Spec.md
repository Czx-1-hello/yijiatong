# Technical specification

## Target architecture

```text
WeChat Mini Program
  -> owned API
  -> Spring Boot modular monolith
  -> MySQL
  -> UnifiedProductOffer
  -> Platform Adapter
  -> approved Taobao/Tmall, JD, and Pinduoduo APIs
```

Redis is a rebuildable cache, not a source of truth. Platform credentials remain server-side and outside the repository.

## P2 repository layout

- The existing Mini Program remains runnable at the repository root.
- `apps/miniprogram/` points to the root application; `apps/admin/` is reserved for P3.
- Existing root `services/` remains the Mini Program service boundary; `services/backend/` is reserved for P3.
- `deploy/docker/compose.yaml` supplies development-only MySQL and Redis.
- `docs/api/` is reserved for the formal P5 OpenAPI contract.
- Contract, integration, end-to-end, and formal fixture suites have explicit directories but no premature business implementation.

## Environment and security

- Node.js 24 is the CI runtime; npm and the committed lockfile provide repeatable JavaScript dependencies.
- Docker services bind only to `127.0.0.1` and require environment-supplied passwords.
- `.env.example` contains development placeholders only. `.env` and private WeChat configuration remain ignored.
- CI blocks on tests, JavaScript syntax, maintained-scope lint, Mini Program npm packaging, production dependency audit, Compose validation, and a repository secret scan.
- Full upstream lint and all-development-dependency audit are visible non-blocking reports because their P0 baselines are already red.

## Build boundary

`npm run build:miniprogram` performs the headless npm packaging step through the official `miniprogram-ci` package. It does not claim to replace WeChat Developer Tools compilation, preview, upload, or physical-device validation.

# Repository instructions

## Scope and phase gates

- Follow `outputs/多平台服装聚合比价导购微信小程序项目计划.md` and the current `docs/phases/Pn.md` record.
- Work on one approved phase only. Do not enter the next phase before the current acceptance gate is complete.
- Preserve the Tencent TDesign Retail Mini Program at the repository root until a later ADR explicitly approves a move.
- P1-B remains deferred and externally blocked. P2-P5 may use clearly labelled Mock data; P6 requires real platform authorization and physical-device evidence.

## Architecture boundaries

- Mini Program pages consume product data through service boundaries. Pages must not import Mock fixtures, generators, or models directly.
- Products and platform offers remain separate and platform-neutral at page-facing boundaries.
- The existing Mock Catalog is early technical validation, not a production database and not P4/P5 completion evidence.
- Do not implement Spring Boot, RuoYi business modules, formal database schemas, or formal OpenAPI business operations before their planned phases.

## Commands

```powershell
npm ci
npm test
npm run typecheck
npm run lint:ci
npm run build:miniprogram
npm run dependency:check
npm run secret:scan
npm run verify:p2
docker compose --env-file .env -f deploy/docker/compose.yaml up -d --wait
```

Full legacy checks are reporting gates, not green baselines:

```powershell
npm run lint:baseline
npm run dependency:report
```

## Security and change discipline

- Never read, print, commit, or document secret values. Use `.env`; commit only `.env.example` with non-production placeholders.
- Do not commit `project.private.config.json` or local developer identifiers.
- Preserve user changes and avoid reset, clean, force operations, and broad formatting.
- Use English for code, filenames, comments, commit messages, and technical documentation. Chinese product copy is allowed only when explicitly approved.

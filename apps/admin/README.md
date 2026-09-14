# Yijiatong administration UI

This directory contains the Plus-UI v6.0.0-Vue administration foundation used with the P3 RuoYi backend. It retains login, RBAC-driven routes, menus, audit views, and system management. AI, demo, and workflow views are intentionally excluded.

## Install and verify

```powershell
corepack pnpm install --frozen-lockfile
corepack pnpm run lint
.\node_modules\.bin\vue-tsc.cmd --noEmit
corepack pnpm run build:prod
```

## Start

```powershell
corepack pnpm run dev -- --host 127.0.0.1 --port 5173
```

Development requests under `/dev-api` proxy to `http://localhost:8080`. No password or token is stored in the UI configuration. The local administrator is activated only through backend process environment variables.

See `UPSTREAM.md`, `../../docs/adr/0003-ruoyi-foundation-integration.md`, and `../../docs/phases/P3.md` for provenance, scope, and evidence.

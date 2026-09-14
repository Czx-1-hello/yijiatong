# Yijiatong administration backend

This directory contains the bounded RuoYi-Vue-Plus v6.0.0 backend foundation introduced in P3. It provides authentication, RBAC, menus, system management, audit logs, and health checks. Product-domain tables, product CRUD, platform adapters, and public Mini Program APIs are intentionally absent.

## Requirements

- Eclipse Temurin JDK 21
- MySQL 8.4.9 and Redis 8.6.3 from `deploy/docker/compose.yaml`
- Process environment variables documented in the repository `.env.example`

## Build and test

```powershell
.\mvnw.cmd clean package '-Dmaven.test.skip=false' '-DskipTests=false'
```

## Initialize a new local database

Run `script/sql/p3_foundation.sql` once against the empty database created by Docker Compose. The script contains only RuoYi system, authorization, menu, audit, and configuration tables. It contains no product-domain table and no active default administrator.

The bootstrap administrator is disabled in SQL. To activate it for a local process, set `ADMIN_BOOTSTRAP_ENABLED=true` together with a 1-30 character `ADMIN_USERNAME` and a 12-30 character `ADMIN_PASSWORD` in the process environment. Never commit those values.

## Start

```powershell
java -jar .\ruoyi-admin\target\ruoyi-admin.jar
```

The default development endpoint is `http://127.0.0.1:8080`. Actuator endpoints require the environment-provided Basic Auth account. Production configuration has no credential defaults and fails during startup when required variables are absent.

See `UPSTREAM.md`, `../../docs/adr/0003-ruoyi-foundation-integration.md`, and `../../docs/phases/P3.md` for provenance, scope, and evidence.

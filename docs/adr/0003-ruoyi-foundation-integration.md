# ADR-0003: Integrate RuoYi-Vue-Plus as a bounded P3 foundation

- Status: Accepted
- Date: 2026-09-14
- Decision scope: P3 only

## Context

The repository must add an administration backend without destabilizing the Tencent TDesign Retail Mini Program baseline. Reimplementing authentication, RBAC, menus, permissions, audit logs, and system management would add avoidable security and maintenance risk.

## Decision

Vendor the official RuoYi-Vue-Plus v6.0.0 backend and matching Plus-UI v6.0.0-Vue admin client into `services/backend/` and `apps/admin/`.

Use a modular-monolith boundary and retain only the P3 administration foundation. Omit AI, demo, generator, job, workflow, and extension applications. Configuration is environment-driven; no credential is committed. A seed administrator remains disabled unless an explicit process-level bootstrap switch and valid process-level credentials are supplied.

The existing Mini Program stays at the repository root. Its pages, UI, service boundary, and Mock Catalog are not moved or coupled to RuoYi in P3.

## Consequences

- Mature upstream login, Sa-Token authorization, RBAC, menu permission, audit, and system-management code is reused.
- Upstream source and license obligations are traceable through `UPSTREAM.md` and preserved license files.
- Local RuoYi deltas must remain small and documented to make future upstream review possible.
- Formal product schemas, product APIs, `UnifiedProductOffer`, and platform adapters remain P4 or later work.
- Future backend API work must respect ADR-0001: pages consume the owned API/service boundary and never a Mock implementation directly.

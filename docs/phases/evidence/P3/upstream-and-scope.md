# P3 upstream and scope evidence

Date: 2026-09-14

## Provenance

- Backend: official `dromara/RuoYi-Vue-Plus` tag `v6.0.0`, peeled commit `7180b529776834fee912113b23f0bd7a387a8222`, Apache-2.0.
- Admin: official `JavaLionLi/plus-ui` tag `v6.0.0-Vue`, commit `aa3f114bf4f6a49086e43aafd00f146b0b517d19`, MIT.
- Original license files are preserved in both imported roots. Detailed upstream URLs and local-delta boundaries are recorded in each `UPSTREAM.md`.

## Retained scope

- Backend: boot application, API models, necessary common infrastructure, and system administration module.
- Admin: authentication, system management, monitoring, menus, permissions, and audit views.

## Omitted scope

- Backend extension applications and AI, demo, generator, scheduler, and workflow modules.
- Admin AI, demo, workflow, and workflow-only process components.
- All product-domain schema, CRUD, API, Adapter, and platform integration work.

The bounded integration decision is recorded in `docs/adr/0003-ruoyi-foundation-integration.md`.

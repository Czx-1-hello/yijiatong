# Preserve the root Mini Program layout during P2

The plan's target monorepo shape places the Mini Program under `apps/miniprogram/`, but the imported Tencent starter is already configured and manually validated at the repository root. P2 keeps that runnable upstream layout in place and uses `apps/miniprogram/` as a pointer, because moving hundreds of upstream files would create a high-risk, low-value diff before any backend or admin application exists.

Status: accepted. A later phase may supersede this decision after import paths, WeChat Developer Tools configuration, CI, and rollback are explicitly tested. Until then, root `pages/`, `components/`, `model/`, and `services/` remain the Mini Program, while `apps/admin/` and `services/backend/` are placeholders for P3.

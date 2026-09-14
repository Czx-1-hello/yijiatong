# Product requirements

## Product

The project is a WeChat Mini Program for clothing discovery, multi-platform price comparison, favorites, and compliant purchase referral. It evolves from the Tencent TDesign Retail starter while preserving a runnable baseline during staged delivery.

## First-version user value

- Search and browse women's clothing, men's clothing, children's clothing, shoes, and accessories.
- Compare platform-neutral offers with clear source, observed time, price, and promotion conditions.
- Save products and history without creating a cross-platform cart, payment, order, logistics, or after-sales system.
- Return users to an approved source-platform destination for purchase.

## Current phase boundary

P2 establishes repository, environment, documentation, and CI foundations only. It adds no formal backend, database schema, public business API, platform Adapter, or Mini Program UI behavior.

Real platform API access is deferred under ADR-0001. Mock data remains visibly non-production and replaceable behind service/API boundaries.

## Product acceptance source

Detailed product scope, phase gates, compliance constraints, and P0-P14 acceptance criteria remain in `outputs/多平台服装聚合比价导购微信小程序项目计划.md` version 1.1.

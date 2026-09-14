# P0 Manual Runtime Validation Evidence

## Evidence source

- Provider: czx
- Received: 2026-09-13
- Classification: user human verification
- Baseline: current workspace at `E:\AI\WeChatMiniProgram\tdesign-miniprogram-starter-retail`

## Statements received

Earlier P0 instruction:

- npm build succeeded.
- WeChat Developer Tools compilation succeeded.
- The store home page ran successfully.

P0 follow-up instruction:

- The current baseline was manually run in WeChat Developer Tools.

## Screenshot evidence received

Five screenshots were received, visually inspected, copied unchanged, and indexed under `screenshots/`:

| Screen | Evidence | Visible baseline result |
|---|---|---|
| Home | `screenshots/home.png` | Header/search, banner, tabs, product grid, prices, and bottom navigation render |
| Category | `screenshots/category.png` | Category sidebar, apparel grid, images, labels, and bottom navigation render |
| Cart | `screenshots/cart.png` | Store group, selected products, quantities, prices, total, checkout control, and bottom navigation render |
| User Center | `screenshots/user-center.png` | Profile, order shortcuts, address/coupon/points/help entries, version label, and bottom navigation render |
| Goods Detail | `screenshots/goods-detail.png` | Product carousel, price, tags, title, selection row, rating summary, and purchase controls render |

No screenshot shows a blocking blank page, missing compiled TDesign component, missing primary image, or layout collapse in the captured viewport.

## Evidence not received

No explicit result was supplied for:

- Order list/detail
- Cross-page navigation
- Loading, empty, or error states
- Developer Tools console errors
- Developer Tools version and build settings

## Classification boundary

This file records user-provided human verification plus Codex visual inspection of the supplied static screenshots. It is not automated Developer Tools verification and does not claim that Codex controlled the run. Static source and dependency checks remain documented separately in `build-runtime.md`.

## Acceptance effect

The five screenshots cover all four main-tab pages and the primary Goods Detail flow. Combined with the user's npm-build and compilation result, they satisfy the P0 runnable-baseline criterion. Order is planned for first-version removal and its treatment is already documented; its runtime remains unverified but does not block P0. P0 is therefore **PASS**, with remaining risks retained.

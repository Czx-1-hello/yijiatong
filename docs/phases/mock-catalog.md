# Replaceable Mock Apparel Catalog

- Status: early technical validation implemented; P4 and P5 not started
- Decision date: 2026-09-13
- Scope: deterministic Mock data layer and platform-neutral catalog services only
- UI impact: none

## Strategy

> 真实平台 API 接入暂缓，当前开发阶段使用可替换的 Mock 商品数据，不改变未来 Platform Adapter 架构。

The catalog is test data. Every product title starts with `【Mock】`, every entity declares `dataSource: "MOCK"` and `isMock: true`, and every offer has `promotionTarget: null`. The fixtures do not contain a real purchase link, platform credential, token, private key, or live platform response.

This implementation is retained as an early technical validation asset. It is not a production database, a formal domain-model approval, an OpenAPI contract, or a Mock Adapter, and it does not satisfy any P4 or P5 acceptance item. P4 must review compatibility against the formally approved `UnifiedProductOffer` model. If a field or semantic conflict is found, this Mock must adapt to the formal model rather than changing the formal model to preserve the prototype.

## Generated data

The fixed seed `tdesign-apparel-mock-v1` generates the same catalog on every run:

| Entity | Count | Coverage |
|---|---:|---|
| Unified products | 30 | 6 each for women, men, kids, shoes, and accessories |
| Platform offers | 90 | One Taobao/Tmall, one JD, and one Pinduoduo offer for every product |

Small fixtures define category vocabulary, synthetic brands, product styles, colors, base prices, platform labels, and reusable TDesign demo image URLs. The generator derives identifiers, prices, coupon values, stores, sales metrics, stock states, and timestamps from those fixtures and a fixed seed instead of storing repeated offer objects by hand.

## Entity boundaries

`UnifiedProduct` and `UnifiedProductOffer` are stored as separate arrays and joined only through `unifiedProductId`.

`UnifiedProduct` contains:

- `productId`, `unifiedProductId`, `title`, and normalized `brand`
- normalized `category` and `categoryPath`
- `images` and generic `attributes`
- `dataSource`, `isMock`, and `schemaVersion`

`UnifiedProductOffer` contains only platform-neutral offer fields:

- `offerId`, `unifiedProductId`, `platform`, `sourceProductId`, and optional `sourceSkuId`
- normalized display snapshots: `title`, `brand`, `categoryPath`, and `images`
- integer-minor-unit money: `listPriceMinor`, `salePriceMinor`, coupon details, and `estimatedFinalPriceMinor`
- `shop`, `salesMetric`, `stockStatus`, `availability`, `updatedAt`, `fetchedAt`, and `expiresAt`
- `dataSource`, `isMock`, `schemaVersion`, and a deliberately null `promotionTarget`

No Taobao-, JD-, or Pinduoduo-specific response field is exposed to page code.

## Service boundary

Pages and future consumers must use `services/catalog/productCatalog.js`:

- `fetchProductCatalog(params)` returns paginated products without embedded offers and supports category and keyword filters.
- `fetchProductOffers(unifiedProductId, params)` returns the generic offers for one product and optionally filters by the normalized platform enum.
- `fetchProductComparison(unifiedProductId)` returns one product and its offers as separate properties for a comparison view.

The current call path is:

```text
consumer
  -> services/catalog/productCatalog.js
  -> config.useMock
  -> services/_utils/delay.js
  -> model/catalog/generator.js
  -> model/catalog/fixtures.js
```

No existing page was changed to consume this catalog in this slice. A regression test scans `pages/**/*.js` and fails if a page imports `model/`, fixtures, or the Mock generator directly.

The proposed Home UI slice was paused before implementation. No page currently consumes this catalog, and no UI acceptance evidence is implied by this technical validation.

## Future replacement boundary

When the Spring Boot API is available, replace the Mock branch inside `services/catalog/productCatalog.js` with the HTTP transport and response mapping. Keep the three exported service functions and their platform-neutral response shapes stable. `model/catalog/` then remains available only for local development and automated tests.

The later backend may populate the same contract from MySQL and approved Platform Adapters. Pages must not need platform SDK objects, platform-specific response fields, or direct fixture imports. Formal OpenAPI and backend implementation remain later-phase work and are not introduced here.

## Verification

`node --test tests/mock-catalog.test.js` checks:

- deterministic output for the fixed seed;
- exactly 30 products and 90 offers;
- six products in each required category and three platform offers per product;
- required identifiers, display fields, integer prices, coupon price, shop, sales, stock, timestamps, and Mock markers;
- product/offer separation and neutral service responses;
- absence of direct Mock/model imports from page JavaScript.

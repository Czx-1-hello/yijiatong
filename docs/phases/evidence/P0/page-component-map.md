# P0 Page and Component Map

## Application entry points

`app.js` registers the update manager. `app.json` defines a custom tab bar and four main-package entries: Home, Category, Cart, and User Center.

## Registered page routes

| Package | Routes | Current feature |
|---|---|---|
| Main (4) | `pages/home/home`; `pages/category/index`; `pages/cart/index`; `pages/usercenter/index` | Home feed, category browser, local cart, user center |
| User (4) | `pages/user/person-info/index`; `pages/user/address/list/index`; `pages/user/address/edit/index`; `pages/user/name-edit/index` | Profile and delivery-address management |
| Goods (6) | `pages/goods/list/index`; `pages/goods/details/index`; `pages/goods/search/index`; `pages/goods/result/index`; `pages/goods/comments/index`; `pages/goods/comments/create/index` | Product browse, search, filters, details, and comments |
| Order (11) | `pages/order/order-confirm/index`; `pages/order/receipt/index`; `pages/order/pay-result/index`; `pages/order/order-list/index`; `pages/order/order-detail/index`; `pages/order/apply-service/index`; `pages/order/after-service-list/index`; `pages/order/after-service-detail/index`; `pages/order/fill-tracking-no/index`; `pages/order/delivery-detail/index`; `pages/order/invoice/index` | Checkout, mock payment result, orders, delivery, invoice, and after-sales |
| Coupon (3) | `pages/coupon/coupon-list/index`; `pages/coupon/coupon-detail/index`; `pages/coupon/coupon-activity-goods/index` | Coupon list, detail, and eligible products |
| Promotion (1) | `pages/promotion/promotion-detail/index` | Timed promotion and product list |

All 29 routes have `.js`, `.json`, `.wxml`, and `.wxss` files. No registered route file is missing.

## Core page behavior

| Area | Page behavior and service boundary |
|---|---|
| Home | `pages/home/home.js` calls `fetchHome()` and paginated `fetchGoodsList()`, then routes to search, category, promotion, and product detail |
| Category | `pages/category/index.js` calls `getCategoryList()` and routes to product lists |
| Goods | List/result pages manage filter and load-more state; details loads product, activity, and comment data; comments and comment-creation screens are present |
| Cart | `pages/cart/index.js` loads grouped cart data, persists selected goods to local storage, and routes to order confirmation |
| Order | Order list/detail, confirmation, mock payment result, delivery, invoice, and after-sales flows are present |
| User center | Loads mock profile/count/order/support data and links to address, coupon, order, after-sales, and profile pages |

## Component inventory

Top-level reusable groups under `components/`:

- `filter`
- `filter-popup`
- `goods-card`
- `goods-list`
- `load-more`
- `loading-content`
- `price`
- `promotion`
- `swipeout`
- `webp-image`

Measured inventory:

- 41 files under `components/`
- 45 custom component definitions across shared, page-local, and custom tab-bar locations
- 37 distinct TDesign component modules referenced
- 307 component declarations checked
- 205 TDesign declarations resolved against `miniprogram_npm/tdesign-miniprogram/`
- 102 local declarations resolved against project source paths
- 0 unresolved component declarations

The installed `tdesign-miniprogram@1.9.5` package declares `miniprogram_dist` as its Mini Program entry. The built `miniprogram_npm/tdesign-miniprogram/` output is therefore the correct runtime resolution target, not the package root.

## Approved migration treatment

- Retain and adapt Home.
- Retain and prioritize Goods search/list/details.
- Replace Cart semantics with a comparison or favorites list; no unified checkout.
- Remove Order entry points in the first version.
- Retain and simplify User Center.
- Reuse Coupon only for authorized offers with explicit conditions.
- Remove Address and after-sales entry points from the first version.
- Reuse shared components and styles before adding new components.


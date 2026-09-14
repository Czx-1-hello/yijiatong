# P0 Mock Data Flow Evidence

## Global switch and transport behavior

`config/index.js` sets `config.useMock` to `true`. Every domain service checks that flag. The mock branch imports a local model, waits through `services/_utils/delay.js` (200 ms by default), and resolves model data. The non-mock branch does not call a backend; it resolves the literal string `real api`.

No active `wx.request`, `fetch`, or Axios transport was found in application source. A `wx.requestPayment` example exists only as commented code in `pages/order/order-confirm/pay.js`.

## Actual flow by feature

| Page/feature | Service | Model source | Result behavior |
|---|---|---|---|
| Home shell | `services/home/home.js::fetchHome` | `model/swiper.js` plus service-local tab data | Swiper, tabs, and Tencent COS activity image |
| Home products | `services/good/fetchGoods.js::fetchGoodsList` | `model/goods.js` -> `model/good.js` | Maps product fixtures to card fields |
| Category | `services/good/fetchCategoryList.js::getCategoryList` | `model/category.js` | Fixed apparel/beauty category hierarchy |
| Product list | `services/good/fetchGoodsList.js::fetchGoodsList` | `model/search.js` -> `model/goods.js` -> `model/good.js` | Fixed result set transformed for list cards |
| Search result | `services/good/fetchSearchResult.js::getSearchResult` | `model/search.js` -> goods/good | Fixed result metadata and product fixtures |
| Product detail | `services/good/fetchGood.js::fetchGood` | `model/good.js::genGood` | Selects one fixture from the local product array |
| Product activities | `services/activity/*` | `model/activity.js`, `model/activities.js` | Generated promotion/activity fixtures |
| Product comments | `services/comments/*`, `services/good/comments/*` | `model/comments.js`, `model/detailsComments.js`, `model/comments/queryDetail.js` | Fixed comment counts, lists, and detail |
| Cart | `services/cart/cart.js::fetchCartGroupData` | `model/cart.js` | Single-store cart groups and generated response metadata |
| Order | `services/order/*` | `model/order/*` | Confirmation, order list/detail, after-sales, and submission fixtures |
| Coupon | `services/coupon/index.js` | `model/coupon.js` plus `model/address.js` | Coupon list/detail and store/address fixtures |
| Promotion | `services/promotion/detail.js` | `model/promotion.js` -> goods/good | Promotion banner, countdown, and products |
| User center | `services/usercenter/*` | `model/usercenter.js`, `model/address.js` | Profile, counters, order shortcuts, support, and address fixtures |

## Data provenance

- Product content is stored in a large `allGoods` array in `model/good.js` and references Tencent-hosted image assets through `cdnBase`.
- `model/goods.js` creates lists by repeatedly calling `genGood()`.
- Category, user, address, comments, coupon, order, and promotion data are fixed local objects or arrays.
- `utils/mock.js` adds random request IDs and private-range client IP values to selected cart/order responses.
- No platform source ID, platform attribution, observation timestamp, expiry timestamp, or real promotion target is present.

## Confirmed mock defects and limitations

1. `model/search.js::getSearchResult()` ignores all documented query, paging, price, sort, and keyword parameters.
2. It reports `totalCount: 1` while requesting a default ten-item product list, so response metadata is internally inconsistent.
3. Setting `config.useMock` to `false` returns `real api`, which is incompatible with page expectations and will break the flows.
4. Fixed user/address/phone values look realistic even though they are test data; future test fixtures must be clearly labeled and kept out of production.
5. Random request metadata makes some fixture output nondeterministic.
6. The delay helper simulates latency only; it does not exercise timeout, partial failure, malformed response, or retry behavior.
7. External image availability depends on Tencent CDN reachability and Mini Program domain policy.

## P0 conclusion

The real baseline is `page -> service -> model -> local mock fixture`. It is not `service -> backend API`, and it does not contain any working marketplace adapter. Replacement with the planned backend/API/adapter flow belongs to later phases and was not started in P0.


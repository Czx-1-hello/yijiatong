# P1-A Platform Capability Matrix

Status values are `已确认`, `待账号验证`, `待真机验证`, and `未验证`. `已确认` means only that the capability is present in official public material; it does not mean this project's account has access.

## Cross-platform matrix

| Area | Taobao/Tmall | JD | Pinduoduo |
|---|---|---|---|
| Official system | 淘宝开放平台 + 淘宝联盟/淘宝客 | 京东联盟 + JOS | 多多进宝 + 拼多多开放平台 |
| Product search | `taobao.tbk.dg.material.optional.upgrade` | `jd.union.open.goods.query` | `pdd.ddk.goods.search` |
| Product detail | `taobao.tbk.item.info.upgrade.get`; `taobao.tbk.item.details.upgrade.get` | `jd.union.open.goods.promotiongoodsinfo.query` | `pdd.ddk.goods.detail` |
| Category | TOP category APIs exist; affiliate mapping is pending | `jd.union.open.category.goods.get` | `pdd.goods.cats.get` referenced by search API |
| Coupon/price | Promotion price path, estimated final price, coupon APIs | Search returns goods and coupon information; detail includes price | Search returns coupon indicators/fields; full current price schema pending |
| Promotion target | `taobao.tbk.dg.general.link.convert`; coupon conversion | `jd.union.open.promotion.common.get` | `pdd.ddk.goods.promotion.url.generate` |
| Credentials/IDs | AppKey, server-side signing secret, `site_id`, `adzone_id`; possibly `relation_id` and approved scene | Union/JOS AppKey and server-side signing secret; promotion site/position/PID; optional subunion permission | Open Platform Client ID and server-side signing secret; Jinbao identity/promotion position; exact PID fields pending console |
| Public exact quotas | 未验证 | 未验证 for Union APIs | 未验证 |
| Product retention | 未验证 | 未验证; 90-day order query window is not a product-retention grant | 未验证 |
| WeChat path | No public direct Mini Program target confirmed; documented Mini Program link field is not publicly open | Social/WeChat promotion is documented, but no API-generated target appId/path is publicly proven | Official material explicitly supports WeChat/Mini Program scenarios; exact target parameters pending |
| Relevant official SDK | Official API pages expose Java and other SDK examples | JOS recommends SDK and lists Java/PHP/.NET/Python | API/SDK confirmed; public PDF displays PHP server SDK; Java remains unverified |

## Taobao/Tmall

### Confirmed public capabilities

- `taobao.tbk.dg.material.optional.upgrade` is a general affiliate material search API. It supports query text, affiliate category filter, price range, Tmall filter, coupon filter, sort, page, and promotion-position input.[^1]
- `taobao.tbk.item.info.upgrade.get` and `taobao.tbk.item.details.upgrade.get` expose simple and detailed product data. The detailed call accepts up to 20 item IDs and exposes SKU price/inventory data; output fields depend on API entitlement level.[^2]
- Promotion data includes list price, discounted price, estimated final price, and promotion paths such as product coupons.[^3]
- `taobao.tbk.dg.general.link.convert` requires `adzone_id`; some material conversion modes are invite-only. A consumer price-comparison scene can require `biz_scene_id=2` and `relation_id`.[^4]
- Public FAQ says the operator must join Taobao Alliance, associate an AppKey, request required permissions, and wait for approval.[^5]
- The official API pages contain Java SDK examples relevant to Spring Boot integration. The exact downloadable artifact version and license must be captured after account access.

### Account and permission boundary

Status: **待账号验证**.

Prepare a Taobao Alliance promoter account, verified operator identity, recorded media/site, an application AppKey, a promotion position (`site_id`/`adzone_id`), and a server-side secret stored outside the repository. Confirm whether this comparison-shopping product receives consumer price-comparison scene ID 2, relation/channel management, product library scene, detailed item field tier, and conversion permissions.

Although several API pages are labelled “no authorization required,” they still require AppKey signing and business identifiers, and returned fields can depend on entitlement. This label must not be interpreted as anonymous or universally approved access.

### Limits, retention, and WeChat

- Exact numeric QPS/daily quota: **未验证**. Public error tables confirm QPS throttling exists, but not this account's numbers.[^6]
- Product data storage/refresh/deletion terms: **未验证**. Do not apply the project's proposed 30/90-day defaults until the active agreement is reviewed.
- `mini_program_link=1` is documented as “not currently open externally.”[^6]
- A direct Taobao/Tmall purchase jump from this WeChat Mini Program is therefore **待账号验证 + 待真机验证**. URL, H5, copy-code, or target-Mini-Program assumptions are not approved substitutes.

## JD

### Confirmed public capabilities

- JD Union is the affiliate system and JOS is the API/open-platform integration route; a Union-created AppKey can be used with the respective Union/JOS interface sets.[^7]
- `jd.union.open.goods.query` searches goods and coupon data by SKU, keyword, coupon properties and other filters, supports multiple sort dimensions, and feeds the returned original coupon link into conversion.[^7]
- `jd.union.open.goods.promotiongoodsinfo.query` returns promotion product details including title, main image, category, price, logistics, self-operated status, and 30-day order count.[^7]
- `jd.union.open.category.goods.get` traverses category levels.[^7]
- `jd.union.open.promotion.common.get` converts goods/activity links for website/app promotion. `subunionid` requires separate permission.[^7]
- JOS explicitly supports Java/PHP/.NET/Python SDK request paths; Java is the preferred candidate for this Spring Boot backend.[^7]

### Account and permission boundary

Status: **待账号验证**.

Prepare a JD account and JD Union operator identity (personal or company as appropriate), complete real-name/financial identity matching, register the intended Mini Program/media promotion method, create an application/AppKey and promotion position/PID, and request any required Union API package and subunion permission. If a website is used as the media asset, the official FAQ says it must have Chinese ICP registration; whether the planned WeChat Mini Program can be registered independently must be confirmed in the current console.[^7]

### Limits, retention, and WeChat

- Exact Union API QPS/daily quota: **未验证**. Quotas published for unrelated JOS logistics applications are not reused here.
- Product data retention terms: **未验证**. The documented 90-day window concerns order queries, not permission to retain product snapshots.[^7]
- JD documents social/WeChat promotion cases, but does not publicly prove an API response containing a WeChat target `appId`/`path` for this operator. The purchase jump is **待账号验证 + 待真机验证**.

## Pinduoduo

### Confirmed public capabilities

- Duoduo Jinbao is Pinduoduo's official CPS platform and advertises API/SDK integration for apps, Mini Programs, and WeChat storefronts.[^8]
- `pdd.ddk.goods.search` supports keywords, category filtering, `goods_sign`, activity filters, coupon indicators, and a blocked-category package specifically for Pinduoduo Mini Program restrictions.[^9]
- The official search document references `pdd.goods.cats.get`, `pdd.ddk.goods.detail`, and `pdd.ddk.goods.promotion.url.generate` as the category, detail, and promotion-link path.[^9]
- The public onboarding material says both individuals and companies may participate, requires Duoduo Jinbao registration/real-name verification, and shows Open Platform app review followed by Client ID binding.[^8]
- The official material confirms API and SDK modes but shows only a PHP server SDK in its public screenshot. A maintained official Java SDK is **未验证**.[^8]

### Account and permission boundary

Status: **待账号验证**.

Prepare a real-name Duoduo Jinbao account, decide personal versus company operator, register an Open Platform developer/application, obtain approval, bind the Client ID in Jinbao, create the required promotion position, and confirm enabled DDK APIs and current field schema. Secret values must remain in a secret manager or local protected environment, never in chat or Git.

### Limits, retention, and WeChat

- Exact API QPS/daily quota: **未验证**.
- Product data retention/refresh/deletion terms: **未验证**.
- The official material supports WeChat/Mini Program scenarios and one-click Pinduoduo purchase routing, but it predates the current account console and does not expose the exact current target Mini Program parameters.[^8]
- The actual `appId`, `path`, promotion attribution, blocked categories, fallback behavior, and iOS/Android behavior are **待账号验证 + 待真机验证**.

## Do-not-adopt decisions

- No HTML scraper or reverse-engineered platform endpoint.
- No unknown reseller/affiliate API.
- No unofficial SDK is selected merely because an official Java SDK is unavailable publicly.
- No product ID, title similarity, coupon, or price field is assumed to be stable without a live authorized schema.
- No generic `wx.navigateToMiniProgram` capability is treated as proof that a specific commerce platform permits or supports the target path.[^10]
- No third-party commerce URL is assumed embeddable in `web-view`; production use requires control and verification of a business domain.[^11]

## Sources

[^1]: Alibaba, [Taobao Alliance material search upgrade API](https://developer.alibaba.com/docs/api.htm?apiId=64759), accessed 2026-09-13.
[^2]: Alibaba, [detailed item API](https://developer.alibaba.com/docs/api.htm?apiId=64757) and [simple item API](https://developer.alibaba.com/docs/api.htm?apiId=64763), accessed 2026-09-13.
[^3]: Alibaba, [simple item promotion fields](https://developer.alibaba.com/docs/api.htm?apiId=64763), accessed 2026-09-13.
[^4]: Alibaba, [general link conversion API](https://developer.alibaba.com/docs/api.htm?apiId=65409), accessed 2026-09-13.
[^5]: Alibaba, [Taobao Alliance API application FAQ](https://developer.alibaba.com/docs/doc.htm?articleId=118971&docType=1&source=search&treeId=713), accessed 2026-09-13.
[^6]: Alibaba, [coupon conversion API and error table](https://developer.alibaba.com/doc2/apiDetail.htm?apiId=28625), accessed 2026-09-13.
[^7]: JD, [JD Union / JOS official solution](https://jos.jd.com/jdunion), accessed 2026-09-13.
[^8]: Pinduoduo, [Duoduo Jinbao integration PDF](https://funimg.pddpic.com/ddjb/2020-12-04/4f8c0c46-e2c3-40e4-bfee-5ac05ba96607.pdf), accessed 2026-09-13.
[^9]: Pinduoduo, [Duoduo Jinbao product search API PDF](https://commoncdn.yangkeduo.com/pdd_oms/2021-01-12/2e22638bda0b0f77479f89dab1de2988.pdf), accessed 2026-09-13.
[^10]: Tencent, [`wx.navigateToMiniProgram` interface summary](https://intl.cloud.tencent.com/zh/document/product/1219/61757), accessed 2026-09-13.
[^11]: Tencent Cloud, [Mini Program web-view/business-domain guidance](https://cloud.tencent.com/document/product/436/122402), accessed 2026-09-13.


# P1-A Official Source Register

Query date for all sources: **2026-09-13**.

Only official platform, vendor, or upstream project sources are used to confirm capabilities. Search-engine excerpts are treated as discovery aids; the linked official page/PDF remains the source. Where an official page could not expose a current public value, the corresponding fact is marked `未验证`.

## Affiliate platforms

1. [Taobao Alliance material search upgrade API](https://developer.alibaba.com/docs/api.htm?apiId=64759) — confirms `taobao.tbk.dg.material.optional.upgrade`, query/category/price/coupon filters, `adzone_id`, and consumer-comparison permission boundaries.
2. [Taobao Alliance detailed item API](https://developer.alibaba.com/docs/api.htm?apiId=64757) — confirms `taobao.tbk.item.details.upgrade.get`, up to 20 item IDs per call, SKU/price data, scene identifiers, and entitlement-dependent output.
3. [Taobao Alliance simple item API](https://developer.alibaba.com/docs/api.htm?apiId=64763) — confirms `taobao.tbk.item.info.upgrade.get`, price/promotion fields, and entitlement-dependent output.
4. [Taobao Alliance general link conversion API](https://developer.alibaba.com/docs/api.htm?apiId=65409) — confirms `taobao.tbk.dg.general.link.convert`, mandatory promotion position, comparison-scene relation ID behavior, and invite-only permission notes.
5. [Taobao category API](https://developer.alibaba.com/docs/api.htm?apiId=122) and [standard category query](https://developer.alibaba.com/docs/api.htm?apiId=48574) — confirm category-tree capabilities but do not prove the final affiliate-category mapping.
6. [Taobao Alliance API application FAQ](https://developer.alibaba.com/docs/doc.htm?articleId=118971&docType=1&source=search&treeId=713) — confirms Taobao Alliance enrollment and per-AppKey permission application.
7. [Taobao Alliance coupon conversion API](https://developer.alibaba.com/doc2/apiDetail.htm?apiId=28625) — confirms site/promotion-position requirements, coupon fields, rate-limit errors, and that the Mini Program link request field is currently not publicly open.
8. [JD Union / JOS official solution](https://jos.jd.com/jdunion) — confirms Union/JOS relationship; category, search, coupon, detail and promotion-link APIs; supported SDK languages; and selected account requirements.
9. [JD Union API group](https://jos.jd.com/apilist?apiGroupId=531&apiGroupName=%E4%BA%AC%E4%B8%9C%E8%81%94%E7%9B%9Fapi) — official API catalog entry; detailed values require JavaScript/login.
10. [Duoduo Jinbao product search API PDF](https://commoncdn.yangkeduo.com/pdd_oms/2021-01-12/2e22638bda0b0f77479f89dab1de2988.pdf) — confirms `pdd.ddk.goods.search`, category reference, coupon fields, Mini Program blocked-category package, and the detail/promotion interface names. The document is dated 2020-12-25 and must be revalidated against the account console.
11. [Duoduo Jinbao integration PDF](https://funimg.pddpic.com/ddjb/2020-12-04/4f8c0c46-e2c3-40e4-bfee-5ac05ba96607.pdf) — confirms Duoduo Jinbao as Pinduoduo's official CPS platform, API/SDK modes, WeChat/Mini Program scenarios, individual/company use, real-name registration, Open Platform application review, Client ID binding, and a PHP server SDK shown in the public material. The PDF is old and does not prove current quotas or Java SDK availability.

## WeChat platform

12. [Tencent documentation for Mini Program jump API](https://intl.cloud.tencent.com/zh/document/product/1219/61757) — confirms `wx.navigateToMiniProgram` opens another Mini Program and requires a target `appId`; platform-specific target parameters are not supplied.
13. [Tencent Cloud Mini Program web-view/domain guidance](https://cloud.tencent.com/document/product/436/122402) — confirms production `web-view` use requires an enterprise Mini Program and configured/verified business domain. It does not prove that Taobao/JD/Pinduoduo domains can be registered by this operator.

The direct `developers.weixin.qq.com` pages were not retrievable in this research environment. Tencent-hosted documentation was used only for the generic WeChat API/domain facts; every platform-specific jump remains pending official account output and physical-device testing.

## Technology and licenses

14. [TDesign Miniprogram official repository](https://github.com/Tencent/tdesign-miniprogram) — installation, supported stack, minimum base library, and MIT license.
15. [TDesign Miniprogram releases](https://github.com/Tencent/tdesign-miniprogram/releases) — active maintenance evidence; not used to authorize an upgrade from the P0-pinned `1.9.5`.
16. [RuoYi-Vue-Plus v6.0.0 releases](https://github.com/dromara/RuoYi-Vue-Plus/releases) — stable release tag/commit and bundled version changes.
17. [RuoYi-Vue-Plus 6.X `pom.xml`](https://github.com/dromara/RuoYi-Vue-Plus/blob/6.X/pom.xml) — Java 21 and Spring Boot 4.1.0 properties at query time. Final implementation must use the v6.0.0 tag, not the moving branch.
18. [RuoYi-Vue-Plus 6.X initialization guide](https://github.com/dromara/plus-doc/blob/master/6.X/ruoyi-vue-plus/quickstart/init.md) — stable branch guidance and supported JDK, MySQL, Redis, Node, pnpm, and Maven ranges.
19. [RuoYi-Vue-Plus repository](https://github.com/dromara/RuoYi-Vue-Plus) — MIT license identity and maintenance context.
20. [Spring Boot 4.1 release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.1-Release-Notes), [system requirements](https://docs.spring.io/spring-boot/4.1/system-requirements.html), and [license](https://github.com/spring-projects/spring-boot/blob/main/LICENSE.txt) — 4.1 line, Java/build requirements, and Apache-2.0 license.
21. [MySQL 8.4 reference manual](https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/mysql-8.4-en.pdf) and [MySQL server license](https://github.com/mysql/mysql-server/blob/trunk/LICENSE) — 8.4 LTS identity and GPLv2 distribution terms. Exact binary/Connector/J notices remain version-specific.
22. [Redis official license overview](https://redis.io/legal/licenses/) — confirms Redis 8 tri-license options and contrasts them with Redis 7.2 BSD-3-Clause.
23. [Node.js release schedule](https://nodejs.org/en/about/previous-releases) and [Node 24 releases](https://nodejs.org/en/blog/release) — confirms Node 24 is LTS and the current patch visible at research time.
24. [Eclipse Temurin 21 releases](https://github.com/adoptium/temurin21-binaries/releases) — confirms official Temurin 21.0.12 update artifacts.

# P1-A Technology Version and License Matrix

This is a candidate compatibility set, not an installation record. No dependency or runtime was changed in P1-A.

## Recommended coherent set

| Component | Candidate pin | Compatibility basis | License/public status | Decision state |
|---|---|---|---|---|
| TDesign Miniprogram | `1.9.5` | Existing `package.json` pin; P0 npm build and user Developer Tools run succeeded | MIT upstream; root starter metadata still says ISC | Keep now; metadata mismatch remains open |
| RuoYi-Vue-Plus | `v6.0.0` / `7180b52` | Official stable release; do not consume moving `6.X` | MIT, preserve license file/notices | Candidate; reproduce later |
| JDK | Eclipse Temurin `21.0.12+8` | RuoYi 6 uses Java 21; official guide recommends OpenJDK and warns against Oracle JDK for this project | Exact binary license/notices must be archived with artifact | Candidate |
| Spring Boot | `4.1.0` | Inherited from RuoYi v6.0.0 properties; no independent override | Apache-2.0 | Candidate |
| MySQL | Community Server `8.4.9` | RuoYi v6.0.0 release baseline; official 8.4 LTS family | GPLv2; binary and Connector/J notices are version/distribution specific | Candidate; legal distribution review required |
| Redis | Redis Open Source `8.6.3` | RuoYi v6.0.0 release baseline; official guide accepts Redis 6+ | Choice of RSALv2, SSPLv1, or AGPLv3 for Redis 8 | Candidate; explicit license/deployment approval required |
| Node.js | `24.21.0` LTS | Node 24 is LTS; RuoYi frontend requires at least 20.19.0; P0 used Node 24.15.0 | Node distribution notices must be captured | Candidate; reproduce admin build later |

## Why TDesign is not upgraded in this selection

TDesign is actively maintained and newer releases exist, but the current Mini Program is pinned to `1.9.5` and has a P0 visual/runtime baseline. Upgrading would combine framework migration with product work and could change component styles or behavior. P1-A therefore records the upstream project and license but keeps `1.9.5`; any later upgrade requires its own compatibility review, build, and screenshot regression.

## Why RuoYi versions stay together

RuoYi-Vue-Plus v6.0.0 is a major, incompatible Spring Boot 4 migration. Its Java, Spring Boot, database image, Redis image, admin frontend, and build-tool versions are a tested set from the upstream release. Overriding only Spring Boot, Java, MySQL, or Redis would create an untested combination and defeat the “no duplicate infrastructure” rule.

The candidate must be reproduced from the immutable tag/commit in P1-B or P2. The moving `6.X` branch already shows later dependency values and cannot serve as a reproducible pin.

## License risks and decisions

### Redis 8

Redis 8 offers RSALv2, SSPLv1, and AGPLv3. RSALv2/SSPLv1 are source-available rather than OSI-approved; AGPLv3 has network copyleft obligations for modified Redis/derivative works. Before final P1 approval, choose and record one of:

1. Use an unmodified Redis Open Source 8.6.3 service under a reviewed AGPLv3 compliance position.
2. Use a commercially licensed/managed Redis service with the applicable contract.
3. Select a reviewed compatible alternative only through an ADR and compatibility test; do not silently downgrade or fork the RuoYi baseline.

No legal conclusion is asserted by P1-A.

### MySQL and Connector/J

MySQL Community Server is GPLv2. The selected server deployment model and the exact Connector/J artifact have version-specific license notices and possible FOSS-exception implications. Full P1 must archive the actual image/JAR notices and decide whether the software is merely operated as a separate service or redistributed with a product bundle.

### Existing starter mismatch

The upstream starter repository has an MIT `LICENSE`, while the local root `package.json` declares ISC. This P0 risk remains unresolved. It must be corrected or explicitly reconciled before producing a third-party notice or distributable package, but P1-A does not edit package metadata.

### Platform SDKs

An official SDK is not automatically approved. After account access, capture exact SDK name, download origin, checksum/version, license/terms, transitive dependencies, supported Java level, maintenance status, and compatibility. If Pinduoduo offers no maintained official Java SDK, prefer a minimal protocol client based on the official API specification only after that absence is confirmed; do not adopt an unknown GitHub wrapper.

## Sources

1. Tencent, [TDesign Miniprogram repository and MIT license](https://github.com/Tencent/tdesign-miniprogram), accessed 2026-09-13.
2. Tencent, [TDesign Miniprogram releases](https://github.com/Tencent/tdesign-miniprogram/releases), accessed 2026-09-13.
3. Dromara, [RuoYi-Vue-Plus releases](https://github.com/dromara/RuoYi-Vue-Plus/releases), accessed 2026-09-13.
4. Dromara, [RuoYi-Vue-Plus 6.X `pom.xml`](https://github.com/dromara/RuoYi-Vue-Plus/blob/6.X/pom.xml), accessed 2026-09-13.
5. Dromara, [RuoYi-Vue-Plus 6.X initialization guide](https://github.com/dromara/plus-doc/blob/master/6.X/ruoyi-vue-plus/quickstart/init.md), accessed 2026-09-13.
6. Spring, [Spring Boot 4.1 release notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.1-Release-Notes), [system requirements](https://docs.spring.io/spring-boot/4.1/system-requirements.html), and [Apache-2.0 license](https://github.com/spring-projects/spring-boot/blob/main/LICENSE.txt), accessed 2026-09-13.
7. Oracle, [MySQL 8.4 reference manual](https://docs.oracle.com/cd/E17952_01/mysql-8.4-en/mysql-8.4-en.pdf) and [MySQL Community license](https://github.com/mysql/mysql-server/blob/trunk/LICENSE), accessed 2026-09-13.
8. Redis, [official license overview](https://redis.io/legal/licenses/), accessed 2026-09-13.
9. Node.js, [official release schedule](https://nodejs.org/en/about/previous-releases) and [release index](https://nodejs.org/en/blog/release), accessed 2026-09-13.
10. Eclipse Adoptium, [Temurin 21 releases](https://github.com/adoptium/temurin21-binaries/releases), accessed 2026-09-13.

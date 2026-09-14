# P1 Account and Device Validation Register

This file defines what P1-A could not prove without operator-controlled accounts or a physical WeChat device. Evidence must be redacted and must never contain an AppSecret, token, private key, session key, signature, or full credential.

## Operator preparation

| Platform | Prepare outside Git/chat | Required evidence state |
|---|---|---|
| Taobao/Tmall | Taobao Alliance enrollment; verified operator; registered Mini Program/media; approved application/AppKey; site and promotion position; comparison-scene/channel permissions if offered | 待账号验证 |
| JD | JD Union account; matching identity/financial profile; registered Mini Program/media; approved app/AppKey; promotion site/position/PID; optional subunion permission | 待账号验证 |
| Pinduoduo | Real-name Duoduo Jinbao account; operator type; Open Platform developer/app approval; bound Client ID; promotion position | 待账号验证 |
| WeChat | Certified production-eligible Mini Program, test users, legal entity/domain configuration where needed, and a physical iOS/Android device | 待账号验证、待真机验证 |

## Per-platform live account checklist

For each platform, record a redacted screenshot/export and date for:

1. Application approval and operator/media status.
2. Enabled API names and permission packages.
3. Promotion-position/PID existence, with identifiers partially redacted if they are operationally sensitive.
4. Search request success with a clothing query and the exact returned field names.
5. Detail request success for a returned product identifier.
6. Category request success and mapping relevance to clothing aggregation.
7. Price, coupon, expiry, commission, availability, and product-status fields actually returned.
8. Promotion conversion success and target type returned.
9. Numeric QPS, daily quota, concurrency, timeout, and retry policy shown by the account console/agreement.
10. Callback requirements, signature rules, timestamp tolerance, and IP whitelist rules.
11. Product scope and blocked/regulated categories.
12. Data display, caching, retention, refresh, deletion, and downstream-sharing terms.
13. SDK artifact/version/license offered in the approved console.

## Minimum live API evidence for full P1 PASS

At least one platform must provide all of the following with approved test credentials:

- Authorized search returns a real clothing product.
- Authorized detail returns the same product with source and observed timestamp.
- Authorized conversion generates a promotion target tied to an approved position.
- Logs prove secret redaction and do not include request signatures or credential values.
- A physical WeChat device completes the approved jump and reaches the intended product or permitted fallback.

## Physical-device matrix

| Test | iOS | Android | Current state |
|---|---:|---:|---|
| Target Mini Program opens from a user gesture | Required | Required | 待真机验证 |
| Correct product/landing page and attribution | Required | Required | 待真机验证 |
| User cancellation/back navigation | Required | Required | 待真机验证 |
| Missing/expired coupon behavior | Required | Required | 待真机验证 |
| Product removed or blocked category | Required | Required | 待真机验证 |
| Target app unavailable/version too old | Required | Required | 待真机验证 |
| No misleading in-Mini-Program checkout/payment implication | Required | Required | 待真机验证 |

## Unverified public-data gaps

| Gap | State | Why it blocks full P1 |
|---|---|---|
| Numeric affiliate API quotas for all three accounts | 未验证 | Required for rate-limit and cache design |
| Product-data retention and deletion terms for all three platforms | 未验证 | Project storage defaults are engineering proposals, not grants |
| Exact callback requirements | 未验证 | Required for secure contract and deployment design |
| Current Pinduoduo detail/conversion response schema and Java SDK | 未验证 | Old public PDFs are insufficient for implementation selection |
| Platform-specific WeChat target parameters | 未验证 | Generic WeChat API support does not prove commerce-platform permission |
| Exact SDK licenses/artifact provenance | 未验证 | Required before dependency adoption and third-party notices |


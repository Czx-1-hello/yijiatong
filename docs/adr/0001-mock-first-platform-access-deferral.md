# ADR-0001: Mock-first development and platform access deferral

- Status: Accepted
- Decision date: 2026-09-13
- Owner: czx
- Scope: phase gates, development data sources, and future platform integration

## Context

P0 established and manually validated the Tencent TDesign Retail baseline. P1-A completed official-first public research for Taobao/Tmall, JD, and Pinduoduo, but public documents do not prove that this operator owns the required permissions, quotas, promotion positions, data-retention rights, or WeChat jump path.

Those remaining checks depend on external platform accounts, approvals, live responses, and physical-device testing. Treating them as complete would fabricate evidence; requiring them before all internal engineering would unnecessarily stop repository, backend, domain, database, and contract work.

A deterministic Mini Program Mock Catalog has already been built as an early technical validation. It produces 30 unified products and 90 generic platform offers through fixtures, a fixed-seed generator, a service boundary, and automated tests. It predates the formal P4 domain model and P5 API/Mock Adapter work.

## Decision

1. Real Taobao/Tmall, JD, and Pinduoduo API integration is deferred.
2. Current development adopts a Mock-first strategy for P2 through P5.
3. P1-A remains `PASS`; P1-B is `DEFERRED / EXTERNAL BLOCKER`; P1 overall remains `INCOMPLETE` and must not be reported as `PASS`.
4. The existing Mock Catalog is retained as early technical validation only. It does not complete P4 or P5.
5. Mock data is permitted only in development and automated-test environments. It is not a production database, production product source, platform authorization, or evidence of live prices and availability.
6. Pages and UI components must not import Mock fixtures, generators, or model modules directly. They must consume stable, platform-neutral service/API contracts.
7. P4 owns the formal `UnifiedProductOffer` definition. If the prototype Mock and the approved formal model conflict, the Mock must adapt to the formal model; the formal model must not be distorted to preserve the prototype.
8. P6 restores the hard external gate. A real platform Adapter cannot be implemented or accepted until the target platform has formal account authorization, approved live interfaces, confirmed fields and quotas, applicable data terms, a valid promotion mechanism, and successful WeChat physical-device jump evidence.

## Target architecture retained

The approved production direction remains:

```text
微信小程序
  -> 自有 API
  -> Spring Boot
  -> MySQL
  -> UnifiedProductOffer
  -> Platform Adapter
  -> 淘宝 / 京东 / 拼多多
```

The Mock-first decision changes sequencing and development data only. It does not replace Spring Boot, MySQL, `UnifiedProductOffer`, or Platform Adapters in the target architecture.

When live access becomes available, the implementation behind the Adapter/data-source boundary will change from Mock to approved platform integrations. The Mini Program must not require a large page rewrite as long as the stable public contract is preserved.

## Phase-gate changes

| Phase | Current state | Gate after this decision |
|---|---|---|
| P0 | PASS | Unchanged |
| P1-A | PASS | Public research and candidate technology evidence retained |
| P1-B | DEFERRED / EXTERNAL BLOCKER | Does not block P2-P5; remains mandatory before P6 |
| P1 overall | INCOMPLETE | Cannot become PASS without the original account and device evidence |
| P2 | NOT STARTED | May start after P0, P1-A, and this ADR |
| P3 | NOT STARTED | Requires P2; platform-dependent tests use fixed fixtures |
| P4 | NOT STARTED | Requires P3; formally owns the domain model and database |
| P5 | NOT STARTED | Requires P4; builds OpenAPI, public API, and the backend Mock Adapter |
| P6 | NOT STARTED / HARD-GATED | Requires P5 plus target-platform P1-B evidence |
| P7-P14 | NOT STARTED | Existing downstream dependencies and production gates remain in force |

## Consequences

Positive consequences:

- Internal engineering can proceed without secrets or speculative platform clients.
- P2-P5 can test deterministic success and failure behavior with repeatable fixtures.
- Pages remain insulated from platform SDKs and platform-specific response fields.
- The future replacement point is constrained to the API, Adapter, and data-source implementations.

Costs and risks:

- Mock behavior cannot validate live eligibility, quotas, pricing semantics, data retention, conversion, or WeChat jumps.
- The existing JavaScript Mock may diverge from the formal P4 model and require adaptation.
- UI work based only on Mock can create false confidence unless every Mock state is visibly labelled and production use is prevented.
- P6 timing remains dependent on external approvals and cannot be estimated from P2-P5 progress alone.

## Alternatives considered

### Block all work until P1 is fully complete

Rejected because account approval and device evidence are external dependencies while P2-P5 can be built and verified without live platform access.

### Implement real clients from public documents before authorization

Rejected because public documentation is not account permission and would encourage guessed fields, unverified quotas, and noncompliant links.

### Treat the current Mini Program Mock as the final domain model and Mock Adapter

Rejected because the prototype has not passed P4 domain/database review or P5 OpenAPI and backend contract acceptance.

## Migration and replacement

1. P2 establishes the repository, environment, CI, and documentation foundations without real platform credentials.
2. P3 establishes the approved Spring Boot and administration baseline using fixed fixtures for platform-dependent scenarios.
3. P4 defines and tests the formal `UnifiedProductOffer` model and MySQL persistence. The existing Mock is reviewed and adapted after the model is approved.
4. P5 defines OpenAPI and implements the backend Mock Adapter, including success, empty, timeout, rate-limit, authorization-error, and partial-failure scenarios.
5. Before P6, resume the selected platform's P1-B work and obtain all hard-gate evidence.
6. P6 replaces the corresponding Mock Adapter/data source with an approved real Adapter while retaining the public contract.

## Rollback and review

This decision may be superseded by a later ADR when platform access becomes available or when evidence shows that the phase split is unsafe. Superseding it must not erase P1 evidence gaps or weaken P6 authorization and real-device gates.

The paused Home UI proposal remains unimplemented. No page change is part of this decision.

## Verification

- Confirm the plan, P1 record, Mock Catalog record, and project memory use the same P1-A/P1-B status and phase gates.
- Confirm the existing Mock Catalog tests still pass without changing its implementation.
- Confirm no file under `pages/` and no existing business-code file is modified by this decision record.

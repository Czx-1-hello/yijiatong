# P3 runtime validation evidence

Date: 2026-09-14

Automated by `scripts/verify-p3-runtime.ps1` with process-only random credentials, an exact temporary MySQL database/user, a temporary Redis ACL user, and a unique Redis key prefix. The verifier does not read `.env`, does not expose credential values, does not use `FLUSHDB`, and removes its temporary database, Redis keys, and accounts.

| Check | Result |
|---|---|
| Admin UI HTTP response | PASS |
| MySQL and Redis container health | PASS |
| P3 system schema initialization | PASS |
| Redis ACL test connection/PING | PASS |
| Spring Boot backend startup | PASS |
| Protected Actuator health | PASS (`UP`) |
| Database and Redis health indicators | PASS |
| Administrator login through Vite proxy | PASS |
| Super administrator role and wildcard permission | PASS |
| System and monitoring menu routes | PASS |
| Login audit persistence | PASS |
| Operation audit persistence | PASS |
| MySQL runtime version | 8.4.9 |
| Redis runtime version | 8.6.3 |
| Temporary verification cleanup | PASS |

The operation audit uses the existing RuoYi annotated account-unlock endpoint against an account with no failed-login lock. It verifies the audit aspect and persistence path without creating product data or changing a real user account.

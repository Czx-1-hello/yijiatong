# P3 build and test evidence

Date: 2026-09-14

## Backend

- Default Java: Eclipse Temurin OpenJDK `21.0.12+8-LTS`.
- Maven Wrapper: `3.9.12`, running on Java 21.0.12.
- Command: Maven clean/package with test skipping explicitly disabled.
- Result: PASS.
- Test result: `AdminBootstrapRunnerTest` 4/4 PASS and upstream tagged unit test 1/1 PASS; 0 failures, 0 errors, 0 skipped.
- Packaged artifact: `ruoyi-admin/target/ruoyi-admin.jar`.

## Administration UI

- Node.js `24.15.0`; pnpm `10.34.5`.
- Frozen lockfile install: PASS, 357 packages.
- `oxlint src`: PASS.
- `vue-tsc --noEmit`: PASS.
- Production build: PASS with Vite `8.1.5`; 3,259 modules transformed.
- Development serve: PASS; Vite reported ready and `http://127.0.0.1:5173/` returned HTTP 200.

No hosted GitHub Actions result is claimed for the unpushed P3 branch.

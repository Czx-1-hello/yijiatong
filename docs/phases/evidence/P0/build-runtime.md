# P0 Build and Runtime Baseline

## Official build method

The upstream README defines this process:

1. Run `npm install`.
2. Import the repository root into WeChat Developer Tools.
3. Run **Build npm** in WeChat Developer Tools.

There is no CLI build script in `package.json`.

Relevant project settings:

- `compileType`: `miniprogram`
- `libVersion`: `3.13.0`
- `setting.nodeModules`: `true`
- JS/WXML/WXSS minification: enabled
- README minimum base library: `^2.6.5`
- `miniprogram_npm/`: present, 883 files

The local AppID differs from upstream and is treated as a pre-existing developer configuration. Its value is not reproduced in this evidence.

## Existing human verification

Source: czx's P0 task instruction on 2026-09-13.

- npm build succeeded.
- WeChat Developer Tools compilation succeeded.
- The store home page ran successfully.

These are recorded as prior human observations. Codex did not observe, rerun, or independently confirm them during this P0 audit.

## Follow-up human verification

Source: czx's P0 follow-up instruction on 2026-09-13.

- czx stated that the current baseline was manually run in WeChat Developer Tools.
- Five image attachments were supplied for Home, Category, Cart, User Center, and Goods Detail.
- The images were visually inspected and copied unchanged into `docs/phases/evidence/P0/screenshots/`.
- The evidence covers all four main-tab pages and the primary product-detail flow.

This satisfies the P0 runnable-screenshot and representative-major-page requirements. It remains user human verification: Codex did not control the Developer Tools session or inspect its console.

## Automated checks performed in P0

| Check | Result | Interpretation |
|---|---|---|
| Required-path gate | PASS | All 10 required project paths exist |
| `git fetch origin` and commit comparison | PASS | Local commit equals refreshed `origin/main`; ahead/behind 0/0 |
| `git fsck --full` | PASS | Git object database has no reported integrity error |
| Registered route files | PASS | 29 routes, 0 missing `.js/.json/.wxml/.wxss` files |
| JSON parsing | PASS | 74 page/component JSON files parsed |
| Component resolution | PASS | 307 declarations checked, 0 unresolved |
| `npm ls --all` | PASS | Installed dependency tree returned exit code 0 |
| `npm audit --omit=dev` | PASS | 0 production vulnerabilities |
| `npm audit` | FAIL (risk finding) | 10 development-tool vulnerabilities; upgrades prohibited in P0 |
| Read-only ESLint API run | PASS with warnings | 140 files, 0 errors, 74,023 warnings; 73,986 fixable, dominated by CRLF/LF differences |
| `npm test` | FAIL | Upstream script is a placeholder: `Error: no test specified` |
| `npm run check` | Invalid/false success | Windows cannot find `grep`; script logs the error but exits 0, so it does not prove code quality |
| Developer Tools build/compile in this audit | USER VERIFIED | User reports successful npm build and compilation; no Codex-controlled run |
| Runtime screenshots | PASS (human evidence) | Five images archived: Home, Category, Cart, User Center, and Goods Detail |

## Runtime acceptance gap

The human verification establishes that the user built npm, compiled the Mini Program, and rendered all four main-tab pages plus Goods Detail. It does not establish the Developer Tools version, exact build settings, console state, Order runtime, secondary interactions, empty/error states, or full navigation behavior.

# P0 Dependencies and Licenses

## Toolchain and lock state

- Node.js used for audit: `v24.15.0`
- npm used for audit: `11.12.1`
- Lockfile: `package-lock.json`, lockfile version 3
- Root package: `@tencent/tdesign-miniprogram-starter-retail@0.2.0`
- Full installed dependency tree: `npm ls --all` exit code 0

The lockfile is present and valid, but upstream `.gitignore` excludes it. The fixed Git commit therefore does not fix transitive npm versions; the current local lockfile must be preserved intentionally or regenerated versions may drift.

## Runtime dependencies

| Package | Requested | Installed | Declared license | Purpose |
|---|---:|---:|---|---|
| `dayjs` | `^1.9.3` | `1.11.23` | MIT | Date/time formatting and mock data behavior |
| `tdesign-miniprogram` | `1.9.5` | `1.9.5` | MIT | Mini Program UI components |
| `tslib` | `^1.11.1` | `1.14.1` | 0BSD | TypeScript runtime helpers used by dependencies |

## Direct development dependencies

| Package | Requested | Installed | Declared license |
|---|---:|---:|---|
| `@commitlint/cli` | `^17.4.2` | `17.8.1` | MIT |
| `@commitlint/config-conventional` | `^17.4.2` | `17.8.1` | MIT |
| `commitizen` | `^4.3.0` | `4.3.2` | MIT |
| `conventional-changelog-cli` | `^2.2.2` | `2.2.2` | MIT |
| `cz-conventional-changelog` | `^3.3.0` | `3.3.0` | MIT |
| `eslint` | `^6.8.0` | `6.8.0` | MIT |
| `eslint-config-prettier` | `^6.10.0` | `6.15.0` | MIT |
| `eslint-plugin-import` | `^2.20.1` | `2.32.0` | MIT |
| `eslint-plugin-prettier` | `^3.1.2` | `3.4.1` | MIT |
| `husky` | `^8.0.3` | `8.0.3` | MIT |
| `lint-staged` | `^10.0.8` | `10.5.4` | MIT |
| `prettier` | `^2.1.2` | `2.8.8` | MIT |

## Vulnerability audit

`npm audit --omit=dev --json`:

- Production vulnerabilities: 0

`npm audit --json`:

- Total development-tool findings: 10
- Low: 2
- Moderate: 3
- High: 5
- Critical: 0
- Direct affected tools: `eslint` and `conventional-changelog-cli`
- Transitive affected packages include `external-editor`, `file-entry-cache`, `flat-cache`, `flatted`, `inquirer`, `tempfile`, `tmp`, and `uuid`.

Available npm remediations require major-version upgrades. P0 explicitly prohibits dependency upgrades, so no automatic fix was applied.

## Repository license issue

The root `package.json` declares `ISC`, while the repository `LICENSE` file begins with `MIT License`. TDesign Miniprogram itself declares MIT. The root metadata discrepancy is a license-governance risk and must be resolved before final third-party notices or redistribution decisions. P0 records the discrepancy; it does not provide legal advice.


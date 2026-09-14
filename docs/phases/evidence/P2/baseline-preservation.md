# P2 baseline preservation

- Date: 2026-09-14
- Result: **PASS**

## Mini Program boundary

- No changes were made under `pages/` or `components/`.
- `app.js` and `app.json` were not changed.
- The existing user-local `project.config.json` modification was preserved and its local identifier was not printed or copied into evidence.
- The root repository remains the WeChat Developer Tools import target; `apps/miniprogram/` is documentation only and does not duplicate or move the application.

## Mock Catalog hashes

| File | SHA-256 |
|---|---|
| `model/catalog/fixtures.js` | `B8A9E09690ABFE18EE5B931744FC8CC0A07853B630032D7489E9FA7CE5B88935` |
| `model/catalog/generator.js` | `520CB473FF10B7770371E5FB751F31211570E4AE5FDDAFA3F4F1D9C975CD990B` |
| `services/catalog/productCatalog.js` | `BF8D2EB47BB0F779F053EFAB9E2BEA501E8CEDE5B0459671CAC0FB315E714D69` |
| `tests/mock-catalog.test.js` | `FBD1493E0165C871749CE587D1108924FFF37B1274790D52866C4591EF13A6A9` |

All hashes match the recorded pre-P2 baseline. The Mock Catalog remains an early replaceable validation asset, not a production database or P4/P5 completion claim.

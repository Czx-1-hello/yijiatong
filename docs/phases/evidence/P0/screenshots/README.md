# P0 Runtime Screenshot Evidence

## Classification

- Source: screenshots supplied by czx from a manual WeChat Developer Tools run
- Evidence type: user human verification
- Codex action: visual inspection, exact binary copy, metadata and SHA-256 recording
- Not claimed: automated Developer Tools execution, interaction testing, or console inspection

## Artifacts

| Screen | File | Dimensions | Bytes | SHA-256 |
|---|---|---:|---:|---|
| Home | [home.png](home.png) | 302 x 662 | 127125 | `054E9DDA13EB739C98617350965263405F54758B82F67BF8267E928D13855CDE` |
| Category | [category.png](category.png) | 308 x 641 | 54826 | `FB0BE23CBA169C80EF470537015D576962DD18C65EAAC64C2F7AE3B84F3020C7` |
| Cart | [cart.png](cart.png) | 316 x 650 | 102369 | `24B741D22B5FD536B8318C30F7F284D7D9EF11446C34395730F231FAD4630163` |
| User Center | [user-center.png](user-center.png) | 307 x 637 | 47958 | `C40231782261ACF2446443CDE2090CAC86AB8A3859135DFD092D8C7CCDEA83C6` |
| Goods Detail | [goods-detail.png](goods-detail.png) | 339 x 665 | 128986 | `F80315BFB75BC496CC4B4327C5FA23C8D66A68B3C26C4E48C9CAEC0A698494C5` |

## Visual findings

- Home renders remote assets, product cards, prices, tabs, and tab bar.
- Category renders sidebar navigation and apparel category images.
- Cart renders multi-item content, quantities, pricing, total, and checkout control.
- User Center renders profile and navigation groups.
- Goods Detail renders image carousel, price, tags, title, rating summary, and purchase controls.
- No captured page shows a blocking blank state, missing primary component, missing primary image, or collapsed layout.

## Limits

Static screenshots do not prove interaction behavior, console cleanliness, network behavior, Order runtime, secondary navigation, or loading/empty/failure states. These limits remain recorded in the P0 risk register.


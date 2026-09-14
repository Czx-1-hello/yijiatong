# Clothing price comparison development workspace

This repository preserves the runnable Tencent TDesign Retail Mini Program baseline while the staged project plan builds a replaceable multi-platform comparison architecture. P2 provides local infrastructure and CI only; the current Mini Program still uses Mock data and contains no real platform API integration.

## Prerequisites

- Node.js 24 and npm
- Eclipse Temurin JDK 21
- Docker Desktop with the WSL2 Linux backend
- WeChat Developer Tools for interactive Mini Program compilation and runtime verification

## First-time setup

```powershell
git clone https://github.com/Tencent/tdesign-miniprogram-starter-retail.git
cd tdesign-miniprogram-starter-retail
npm ci
Copy-Item .env.example .env
```

Replace every `change_me_for_local_development` value in `.env`. Do not commit or share that file.

Start the development infrastructure:

```powershell
docker compose --env-file .env -f deploy/docker/compose.yaml up -d --wait
docker compose --env-file .env -f deploy/docker/compose.yaml ps
```

Run the P2 repository checks:

```powershell
npm run verify:p2
docker compose --env-file .env -f deploy/docker/compose.yaml config --quiet
```

Import the repository root into WeChat Developer Tools, then select **Tools -> Build npm** and compile the Mini Program. The headless `npm run build:miniprogram` command only packages npm dependencies; it does not replace Developer Tools compilation or physical-device testing.

Stop the local infrastructure without deleting named volumes:

```powershell
docker compose --env-file .env -f deploy/docker/compose.yaml down
```

See `deploy/docker/README.md`, `docs/Tech-Spec.md`, and `docs/phases/P2.md` for boundaries and evidence.

## P3 administration foundation

P3 adds a bounded RuoYi-Vue-Plus backend under `services/backend/` and its matching Plus-UI application under `apps/admin/`. The existing Mini Program remains at the repository root and is not coupled to the administration runtime.

After starting the P2 MySQL and Redis containers, initialize `services/backend/script/sql/p3_foundation.sql` once in an empty local database. Copy `.env.example` to the ignored `.env`, replace every placeholder locally, and load those values into the backend process environment without printing them. Then run:

```powershell
Set-Location services/backend
.\mvnw.cmd clean package '-Dmaven.test.skip=false' '-DskipTests=false'
java -jar .\ruoyi-admin\target\ruoyi-admin.jar
```

In another terminal:

```powershell
Set-Location apps/admin
corepack pnpm install --frozen-lockfile
corepack pnpm run lint
.\node_modules\.bin\vue-tsc.cmd --noEmit
corepack pnpm run dev -- --host 127.0.0.1 --port 5173
```

There is no repository default administrator password. A local administrator is activated only when `ADMIN_BOOTSTRAP_ENABLED=true` and valid process-level `ADMIN_USERNAME`/`ADMIN_PASSWORD` values are supplied. Actuator health endpoints use separate process-level Basic Auth credentials. See `docs/phases/P3.md` for the complete boundary and verification evidence.

## Upstream starter documentation

<p align="center">
  <a href="https://tdesign.tencent.com/" target="_blank">
    <img alt="TDesign Logo" width="200" src="https://tdesign.gtimg.com/site/TDesign.png">
  </a>
</p>

<p align="center">
  <a href="https://img.shields.io/github/stars/Tencent/tdesign-miniprogram-starter-retail">
    <img src="https://img.shields.io/github/stars/Tencent/tdesign-miniprogram-starter-retail" alt="License">
  </a>
  <a href="https://github.com/Tencent/tdesign-miniprogram-starter-retail/issues">
    <img src="https://img.shields.io/github/issues/Tencent/tdesign-miniprogram-starter-retail" alt="License">
  </a>
  <a href="https://github.com/Tencent/tdesign-miniprogram-starter-retail/LICENSE">
    <img src="https://img.shields.io/github/license/Tencent/tdesign-miniprogram-starter-retail" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-miniprogram">
    <img src="https://img.shields.io/npm/v/tdesign-miniprogram.svg?sanitize=true" alt="Version">
  </a>
  <a href="https://www.npmjs.com/package/tdesign-miniprogram">
    <img src="https://img.shields.io/npm/dw/tdesign-miniprogram" alt="Downloads">
  </a>
</p>

# TDesign 零售行业模版示例小程序

TDesign 零售模版示例小程序采用 [TDesign 企业级设计体系小程序解决方案](https://tdesign.tencent.com/miniprogram/overview) 进行搭建，依赖 [TDesign 微信小程序组件库](https://github.com/Tencent/tdesign-miniprogram)，涵盖完整的基本零售场景需求。

## :pushpin: 项目介绍

### 1. 业务介绍

零售行业模版小程序是个经典的单店版电商小程序，涵盖了电商的黄金链路流程，从商品->购物车->结算->订单等。小程序总共包含 28 个完整的页面，涵盖首页，商品详情页，个人中心，售后流程等基础页面。采用 mock 数据进行展示，提供了完整的零售商品展示、交易与售后流程。页面详情：

<img src="https://tdesign.gtimg.com/miniprogram/template/retail/tdesign-starter-readmeV1.png" width = "650" height = "900" alt="模版小程序页面详情" align=center />

主要页面截图如下：

<p align="center">
    <img alt="example-home" width="200" src="https://tdesign.gtimg.com/miniprogram/template/retail/example/v1/home.png" />
    <img alt="example-sort" width="200" src="https://tdesign.gtimg.com/miniprogram/template/retail/example/v2/sort.png" />
    <img alt="example-cart" width="200" src="https://tdesign.gtimg.com/miniprogram/template/retail/example/v1/cart.png" />
    <img alt="example-user-center" width="200" src="https://tdesign.gtimg.com/miniprogram/template/retail/example/v1/user-center.png" />
    <img alt="example-goods-detail" width="200" src="https://tdesign.gtimg.com/miniprogram/template/retail/example/v1/goods-detail.png" />
    <img alt="example-pay" width="200" src="https://tdesign.gtimg.com/miniprogram/template/retail/example/v1/pay.png" />
    <img alt="example-order" width="200" src="https://tdesign.gtimg.com/miniprogram/template/retail/example/v1/order.png" />
    <img alt="example-order-detail" width="200" src="https://tdesign.gtimg.com/miniprogram/template/retail/example/v2/order.png" />
</p>

### 2. 项目构成

零售行业模版小程序采用基础的 JavaScript + WXSS + ESLint 进行构建，降低了使用门槛。

项目目录结构如下：

```
|-- tdesign-miniprogram-starter
    |-- README.md
    |-- app.js
    |-- app.json
    |-- app.wxss
    |-- components	//	公共组件库
    |-- config	//	基础配置
    |-- custom-tab-bar	//	自定义 tabbar
    |-- model	//	mock 数据
    |-- pages
    |   |-- cart	//	购物车相关页面
    |   |-- coupon	//	优惠券相关页面
    |   |-- goods	//	商品相关页面
    |   |-- home	//	首页
    |   |-- order	//	订单售后相关页面
    |   |-- promotion-detail	//	营销活动页面
    |   |-- usercenter	//	个人中心及收货地址相关页面
    |-- services	//	请求接口
    |-- style	//	公共样式与iconfont
    |-- utils	//	工具库
```

### 3. 数据模拟

零售小程序采用真实的接口数据，模拟后端返回逻辑，在小程序展示完整的购物场景与购物体验逻辑。

### 4. 添加新页面

1. 在 `pages `目录下创建对应的页面文件夹
2. 在 `app.json` 文件中的 ` "pages"` 数组中加上页面路径
3. [可选] 在 `project.config.json` 文件的 `"miniprogram-list"` 下添加页面配置

## :hammer: 构建运行

1. `npm install`
2. 小程序开发工具中引入工程
3. 构建 npm

## :art: 代码风格控制

- `eslint`
- `prettier`

## :iphone: 基础库版本

最低基础库版本`^2.6.5`

## :dart: 反馈

有任何问题，建议通过 [Github issues](https://github.com/Tencent/tdesign-miniprogram/issues) 反馈或扫码加入用户微信群。

<img src="https://raw.githubusercontent.com/Tencent/tdesign/main/packages/site-components/src/images/groups/wx-group.png" width="200" />

## :link: TDesign 其他技术栈实现

- 移动端 小程序 实现：[mobile-miniprogram](https://github.com/Tencent/tdesign-miniprogram)
- 桌面端 Vue 2 实现：[web-vue](https://github.com/Tencent/tdesign-vue)
- 桌面端 Vue 3 实现：[web-vue-next](https://github.com/Tencent/tdesign-vue-next)
- 桌面端 React 实现：[web-react](https://github.com/Tencent/tdesign-react)

## :page_with_curl: 开源协议

TDesign 遵循 [MIT 协议](https://github.com/Tencent/tdesign-miniprogram/LICENSE)。

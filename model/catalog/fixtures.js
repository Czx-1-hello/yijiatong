const MOCK_CATALOG_SEED = 'tdesign-apparel-mock-v1';
const MOCK_OBSERVED_AT = '2026-09-13T08:00:00.000Z';
const PRODUCTS_PER_CATEGORY = 6;

const CATEGORY_FIXTURES = [
  {
    id: 'women',
    name: '女装',
    brands: ['Mock Atelier', 'Mock Daily', 'Mock Linen'],
    styles: ['针织开衫', '通勤连衣裙', '宽松衬衫', '直筒休闲裤', '轻薄外套', '百褶半身裙'],
    colors: ['燕麦色', '雾蓝色', '柔粉色'],
    basePriceMinor: 15900,
    images: [
      'https://tdesign.gtimg.com/miniprogram/template/retail/goods/nz-09a.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/goods/nz-08b.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/goods/nz-17a.png',
    ],
  },
  {
    id: 'men',
    name: '男装',
    brands: ['Mock North', 'Mock Basic', 'Mock Urban'],
    styles: ['基础圆领卫衣', '休闲夹克', '纯棉短袖', '直筒长裤', '轻商务衬衫', '针织套头衫'],
    colors: ['深灰色', '海军蓝', '米白色'],
    basePriceMinor: 16900,
    images: [
      'https://tdesign.gtimg.com/miniprogram/template/retail/goods/dz-3a.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/goods/dz-2a.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-7.png',
    ],
  },
  {
    id: 'kids',
    name: '童装',
    brands: ['Mock Little', 'Mock Sprout', 'Mock Junior'],
    styles: ['儿童连帽卫衣', '儿童防风外套', '儿童针织毛衣', '儿童休闲长裤', '儿童连衣裙', '儿童保暖马甲'],
    colors: ['奶油黄', '薄荷绿', '天空蓝'],
    basePriceMinor: 9900,
    images: [
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-1.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-4.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-8.png',
    ],
  },
  {
    id: 'shoes',
    name: '鞋靴',
    brands: ['Mock Step', 'Mock Walk', 'Mock Motion'],
    styles: ['轻量运动鞋', '通勤乐福鞋', '简约帆布鞋', '缓震跑步鞋', '短筒休闲靴', '软底童鞋'],
    colors: ['经典黑', '云朵白', '沙丘棕'],
    basePriceMinor: 13900,
    images: [
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-2.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-5.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-11.png',
    ],
  },
  {
    id: 'accessories',
    name: '配饰',
    brands: ['Mock Accent', 'Mock Detail', 'Mock Studio'],
    styles: ['轻便托特包', '针织围巾', '日常棒球帽', '简约腰带', '通勤双肩包', '保暖手套'],
    colors: ['炭黑色', '焦糖色', '浅卡其'],
    basePriceMinor: 6900,
    images: [
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-3.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-6.png',
      'https://tdesign.gtimg.com/miniprogram/template/retail/classify/img-10.png',
    ],
  },
];

const PLATFORM_FIXTURES = [
  {
    id: 'TAOBAO_TMAIL',
    sourcePrefix: 'TB',
    shopPrefix: 'Mock 淘系服饰店',
    priceOffsetMinor: 0,
  },
  {
    id: 'JD',
    sourcePrefix: 'JD',
    shopPrefix: 'Mock 京东服饰店',
    priceOffsetMinor: 300,
  },
  {
    id: 'PDD',
    sourcePrefix: 'PDD',
    shopPrefix: 'Mock 拼多多服饰店',
    priceOffsetMinor: -400,
  },
];

module.exports = {
  CATEGORY_FIXTURES,
  MOCK_CATALOG_SEED,
  MOCK_OBSERVED_AT,
  PLATFORM_FIXTURES,
  PRODUCTS_PER_CATEGORY,
};

const {
  CATEGORY_FIXTURES,
  MOCK_CATALOG_SEED,
  MOCK_OBSERVED_AT,
  PLATFORM_FIXTURES,
  PRODUCTS_PER_CATEGORY,
} = require('./fixtures');

const SCHEMA_VERSION = 1;

function hashSeed(seed) {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRandom(seed) {
  let state = hashSeed(seed);
  return function random() {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function randomInteger(random, min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function addMinutes(isoDate, minutes) {
  return new Date(new Date(isoDate).getTime() + minutes * 60000).toISOString();
}

function getStockStatus(selector) {
  if (selector === 0) return 'OUT_OF_STOCK';
  if (selector === 1) return 'UNKNOWN';
  return 'IN_STOCK';
}

function getAvailability(stockStatus) {
  if (stockStatus === 'OUT_OF_STOCK') return 'INACTIVE';
  if (stockStatus === 'UNKNOWN') return 'UNKNOWN';
  return 'ACTIVE';
}

function createProduct(category, productIndex, globalIndex, random) {
  const sequence = String(productIndex + 1).padStart(2, '0');
  const unifiedProductId = `MOCK-UNIFIED-${category.id.toUpperCase()}-${sequence}`;
  const brand = category.brands[productIndex % category.brands.length];
  const color = category.colors[productIndex % category.colors.length];
  const title = `【Mock】${brand} ${category.styles[productIndex]} ${color}`;
  const primaryImage = category.images[productIndex % category.images.length];

  return {
    productId: `MOCK-PRODUCT-${category.id.toUpperCase()}-${sequence}`,
    unifiedProductId,
    title,
    brand,
    category: {
      id: category.id,
      name: category.name,
    },
    categoryPath: [
      { id: 'apparel', name: '服装服饰' },
      { id: category.id, name: category.name },
    ],
    images: [primaryImage],
    attributes: {
      color,
      fixtureVariant: randomInteger(random, 1, 9),
    },
    dataSource: 'MOCK',
    isMock: true,
    schemaVersion: SCHEMA_VERSION,
    sortIndex: globalIndex,
  };
}

function createOffer(product, category, platform, platformIndex, globalIndex, random) {
  const listPriceMinor =
    category.basePriceMinor + globalIndex * 470 + platform.priceOffsetMinor + randomInteger(random, 0, 8) * 100;
  const saleDiscountMinor = randomInteger(random, 5, 20) * 100;
  const salePriceMinor = Math.max(100, listPriceMinor - saleDiscountMinor);
  const couponAmountMinor = randomInteger(random, 1, 8) * 100;
  const estimatedFinalPriceMinor = Math.max(100, salePriceMinor - couponAmountMinor);
  const stockSelector = (globalIndex * 3 + platformIndex) % 17;
  const stockStatus = getStockStatus(stockSelector);
  const updatedAt = addMinutes(MOCK_OBSERVED_AT, globalIndex * PLATFORM_FIXTURES.length + platformIndex);
  const sourceSequence = String(globalIndex + 1).padStart(3, '0');

  return {
    offerId: `MOCK-OFFER-${platform.sourcePrefix}-${sourceSequence}`,
    unifiedProductId: product.unifiedProductId,
    platform: platform.id,
    sourceProductId: `MOCK-${platform.sourcePrefix}-PRODUCT-${sourceSequence}`,
    sourceSkuId: null,
    title: product.title,
    brand: product.brand,
    categoryPath: product.categoryPath.map((item) => ({ ...item })),
    images: [...product.images],
    currency: 'CNY',
    listPriceMinor,
    salePriceMinor,
    coupon: {
      amountMinor: couponAmountMinor,
      thresholdMinor: salePriceMinor,
      description: 'Mock fixture coupon; not redeemable',
    },
    estimatedFinalPriceMinor,
    stockStatus,
    shop: {
      sourceShopId: `MOCK-${platform.sourcePrefix}-SHOP-${(globalIndex % 4) + 1}`,
      name: `${platform.shopPrefix} ${(globalIndex % 4) + 1}`,
      type: 'MOCK_STORE',
    },
    salesMetric: {
      value: randomInteger(random, 0, 5000),
      unit: 'ORDER',
      window: 'MOCK_30D',
      label: 'Mock 30-day sales',
    },
    promotionTarget: null,
    fetchedAt: updatedAt,
    updatedAt,
    expiresAt: addMinutes(updatedAt, 60),
    availability: getAvailability(stockStatus),
    dataSource: 'MOCK',
    isMock: true,
    schemaVersion: SCHEMA_VERSION,
  };
}

function createMockCatalog(seed = MOCK_CATALOG_SEED) {
  const random = createSeededRandom(seed);
  const products = [];
  const offers = [];
  let globalIndex = 0;

  CATEGORY_FIXTURES.forEach((category) => {
    for (let productIndex = 0; productIndex < PRODUCTS_PER_CATEGORY; productIndex += 1) {
      const product = createProduct(category, productIndex, globalIndex, random);
      products.push(product);

      PLATFORM_FIXTURES.forEach((platform, platformIndex) => {
        offers.push(createOffer(product, category, platform, platformIndex, globalIndex, random));
      });
      globalIndex += 1;
    }
  });

  return {
    dataSource: 'MOCK',
    isMock: true,
    seed,
    generatedAt: MOCK_OBSERVED_AT,
    schemaVersion: SCHEMA_VERSION,
    products,
    offers,
  };
}

module.exports = {
  MOCK_CATALOG_SEED,
  createMockCatalog,
};

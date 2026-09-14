const { config } = require('../../config/index.js');
const { createMockCatalog } = require('../../model/catalog/generator');
const { delay } = require('../_utils/delay.js');

function assertMockSourceEnabled() {
  if (!config.useMock) {
    throw new Error('Catalog API data source is not configured');
  }
}

function toPositiveInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function matchesKeyword(product, keyword) {
  if (!keyword) return true;
  const normalizedKeyword = String(keyword).trim().toLowerCase();
  if (!normalizedKeyword) return true;

  return [product.title, product.brand, product.category.name].some((value) =>
    value.toLowerCase().includes(normalizedKeyword),
  );
}

function filterProducts(products, params) {
  const { categoryId, keyword } = params;
  return products.filter(
    (product) => (!categoryId || product.category.id === categoryId) && matchesKeyword(product, keyword),
  );
}

function mockFetchProductCatalog(params = {}) {
  const { products, generatedAt, schemaVersion } = createMockCatalog();
  const pageNum = toPositiveInteger(params.pageNum, 1);
  const pageSize = toPositiveInteger(params.pageSize, 20);
  const matchingProducts = filterProducts(products, params);
  const start = (pageNum - 1) * pageSize;

  return {
    dataSource: 'MOCK',
    isMock: true,
    generatedAt,
    schemaVersion,
    pageNum,
    pageSize,
    totalCount: matchingProducts.length,
    records: matchingProducts.slice(start, start + pageSize),
  };
}

function mockFetchProductOffers(unifiedProductId, params = {}) {
  const { offers, generatedAt, schemaVersion } = createMockCatalog();
  const records = offers.filter(
    (offer) => offer.unifiedProductId === unifiedProductId && (!params.platform || offer.platform === params.platform),
  );

  return {
    dataSource: 'MOCK',
    isMock: true,
    generatedAt,
    schemaVersion,
    unifiedProductId,
    totalCount: records.length,
    records,
  };
}

function mockFetchProductComparison(unifiedProductId) {
  const { products, offers, generatedAt, schemaVersion } = createMockCatalog();
  return {
    dataSource: 'MOCK',
    isMock: true,
    generatedAt,
    schemaVersion,
    product: products.find((item) => item.unifiedProductId === unifiedProductId) || null,
    offers: offers.filter((offer) => offer.unifiedProductId === unifiedProductId),
  };
}

function fetchProductCatalog(params = {}) {
  try {
    assertMockSourceEnabled();
    return delay().then(() => mockFetchProductCatalog(params));
  } catch (error) {
    return Promise.reject(error);
  }
}

function fetchProductOffers(unifiedProductId, params = {}) {
  try {
    assertMockSourceEnabled();
    return delay().then(() => mockFetchProductOffers(unifiedProductId, params));
  } catch (error) {
    return Promise.reject(error);
  }
}

function fetchProductComparison(unifiedProductId) {
  try {
    assertMockSourceEnabled();
    return delay().then(() => mockFetchProductComparison(unifiedProductId));
  } catch (error) {
    return Promise.reject(error);
  }
}

module.exports = {
  fetchProductCatalog,
  fetchProductComparison,
  fetchProductOffers,
};

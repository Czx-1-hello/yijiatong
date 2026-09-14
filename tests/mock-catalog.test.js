const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { MOCK_CATALOG_SEED, createMockCatalog } = require('../model/catalog/generator');
const {
  fetchProductCatalog,
  fetchProductComparison,
  fetchProductOffers,
} = require('../services/catalog/productCatalog');

const EXPECTED_CATEGORIES = ['women', 'men', 'kids', 'shoes', 'accessories'];
const EXPECTED_PLATFORMS = ['TAOBAO_TMAIL', 'JD', 'PDD'];

function listJavaScriptFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) return listJavaScriptFiles(target);
    return entry.isFile() && entry.name.endsWith('.js') ? [target] : [];
  });
}

test('fixed seed generates 30 products and 90 deterministic offers', () => {
  const first = createMockCatalog(MOCK_CATALOG_SEED);
  const second = createMockCatalog(MOCK_CATALOG_SEED);

  assert.deepEqual(first, second);
  assert.equal(first.products.length, 30);
  assert.equal(first.offers.length, 90);

  const categories = new Set(first.products.map((product) => product.category.id));
  assert.deepEqual([...categories], EXPECTED_CATEGORIES);

  for (const category of EXPECTED_CATEGORIES) {
    assert.equal(first.products.filter((product) => product.category.id === category).length, 6);
  }

  for (const product of first.products) {
    const offers = first.offers.filter((offer) => offer.unifiedProductId === product.unifiedProductId);
    assert.equal(offers.length, 3);
    assert.deepEqual(
      offers.map((offer) => offer.platform),
      EXPECTED_PLATFORMS,
    );
  }

  for (const platform of EXPECTED_PLATFORMS) {
    assert.equal(first.offers.filter((offer) => offer.platform === platform).length, 30);
  }
});

test('products and offers use a platform-neutral mock contract', () => {
  const { products, offers } = createMockCatalog(MOCK_CATALOG_SEED);
  const productIds = new Set(products.map((product) => product.unifiedProductId));

  assert.equal(productIds.size, 30);
  assert.equal(new Set(offers.map((offer) => offer.offerId)).size, 90);

  for (const product of products) {
    assert.match(product.productId, /^MOCK-PRODUCT-/);
    assert.match(product.unifiedProductId, /^MOCK-UNIFIED-/);
    assert.equal(product.dataSource, 'MOCK');
    assert.equal(product.isMock, true);
    assert.match(product.title, /^【Mock】/);
    assert.equal(Object.hasOwn(product, 'offers'), false);
  }

  for (const offer of offers) {
    assert.ok(productIds.has(offer.unifiedProductId));
    assert.ok(EXPECTED_PLATFORMS.includes(offer.platform));
    assert.match(offer.sourceProductId, /^MOCK-/);
    assert.match(offer.title, /^【Mock】/);
    assert.equal(typeof offer.brand, 'string');
    assert.ok(Array.isArray(offer.categoryPath));
    assert.ok(Array.isArray(offer.images));
    assert.ok(offer.images.length > 0);
    assert.equal(Number.isInteger(offer.listPriceMinor), true);
    assert.equal(Number.isInteger(offer.salePriceMinor), true);
    assert.equal(Number.isInteger(offer.estimatedFinalPriceMinor), true);
    assert.ok(offer.listPriceMinor >= offer.salePriceMinor);
    assert.ok(offer.salePriceMinor >= offer.estimatedFinalPriceMinor);
    assert.equal(typeof offer.shop.name, 'string');
    assert.equal(Number.isInteger(offer.salesMetric.value), true);
    assert.ok(['IN_STOCK', 'OUT_OF_STOCK', 'UNKNOWN'].includes(offer.stockStatus));
    assert.doesNotThrow(() => new Date(offer.updatedAt).toISOString());
    assert.equal(offer.dataSource, 'MOCK');
    assert.equal(offer.isMock, true);
    assert.equal(offer.promotionTarget, null);
  }
});

test('catalog services keep products and offers behind one replaceable boundary', async () => {
  const productPage = await fetchProductCatalog({
    categoryId: 'women',
    pageNum: 1,
    pageSize: 10,
  });

  assert.equal(productPage.dataSource, 'MOCK');
  assert.equal(productPage.totalCount, 6);
  assert.equal(productPage.records.length, 6);
  assert.equal(Object.hasOwn(productPage.records[0], 'offers'), false);

  const { unifiedProductId } = productPage.records[0];
  const offerResult = await fetchProductOffers(unifiedProductId);
  assert.equal(offerResult.dataSource, 'MOCK');
  assert.equal(offerResult.records.length, 3);
  assert.ok(offerResult.records.every((offer) => offer.unifiedProductId === unifiedProductId));

  const comparison = await fetchProductComparison(unifiedProductId);
  assert.equal(comparison.product.unifiedProductId, unifiedProductId);
  assert.equal(comparison.offers.length, 3);
});

test('pages do not directly import mock fixtures or model modules', () => {
  const pageRoot = path.resolve(__dirname, '../pages');
  const forbiddenImport = /(?:from\s+|require\()['"][^'"]*(?:model\/|model\\|fixtures|mockCatalog)/i;

  for (const file of listJavaScriptFiles(pageRoot)) {
    const source = fs.readFileSync(file, 'utf8');
    assert.equal(forbiddenImport.test(source), false, `${path.relative(pageRoot, file)} bypasses the service boundary`);
  }
});

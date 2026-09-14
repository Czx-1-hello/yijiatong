const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');

function projectPath(relativePath) {
  return path.join(projectRoot, relativePath);
}

function readProjectFile(relativePath) {
  return fs.readFileSync(projectPath(relativePath), 'utf8');
}

test('P3 vendors the pinned RuoYi backend and Vue admin foundations', () => {
  for (const relativePath of [
    'services/backend/LICENSE',
    'services/backend/UPSTREAM.md',
    'services/backend/pom.xml',
    'services/backend/ruoyi-admin/pom.xml',
    'services/backend/ruoyi-modules/ruoyi-system/pom.xml',
    'apps/admin/LICENSE',
    'apps/admin/UPSTREAM.md',
    'apps/admin/package.json',
    'apps/admin/pnpm-lock.yaml',
  ]) {
    assert.equal(fs.existsSync(projectPath(relativePath)), true, `missing P3 foundation: ${relativePath}`);
  }

  assert.match(readProjectFile('services/backend/pom.xml'), /<revision>6\.0\.0<\/revision>/);
  assert.match(readProjectFile('services/backend/pom.xml'), /<java\.version>21<\/java\.version>/);
  assert.match(readProjectFile('services/backend/pom.xml'), /<spring-boot\.version>4\.1\.0<\/spring-boot\.version>/);

  const adminPackage = JSON.parse(readProjectFile('apps/admin/package.json'));
  assert.equal(adminPackage.version, '6.0.0');
  assert.equal(adminPackage.packageManager, 'pnpm@10.34.5');
});

test('P3 excludes unrelated upstream applications and demo modules', () => {
  for (const relativePath of [
    'services/backend/ruoyi-extend',
    'services/backend/ruoyi-modules/ruoyi-ai',
    'services/backend/ruoyi-modules/ruoyi-demo',
    'services/backend/ruoyi-modules/ruoyi-gen',
    'services/backend/ruoyi-modules/ruoyi-job',
    'services/backend/ruoyi-modules/ruoyi-workflow',
    'apps/admin/src/views/ai',
    'apps/admin/src/views/demo',
    'apps/admin/src/views/workflow',
    'apps/admin/src/components/Process',
  ]) {
    assert.equal(fs.existsSync(projectPath(relativePath)), false, `unrelated module retained: ${relativePath}`);
  }

  const backendModules = readProjectFile('services/backend/ruoyi-modules/pom.xml');
  assert.match(backendModules, /<module>ruoyi-system<\/module>/);
  assert.doesNotMatch(backendModules, /ruoyi-(ai|demo|gen|job|workflow)/);

  const adminPom = readProjectFile('services/backend/ruoyi-admin/pom.xml');
  assert.doesNotMatch(adminPom, /ruoyi-(ai|demo|gen|job|workflow)/);
});

test('P3 runtime configuration uses environment boundaries and exposes health', () => {
  const environmentTemplate = readProjectFile('.env.example');
  for (const variableName of [
    'BACKEND_PORT',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USERNAME',
    'DB_PASSWORD',
    'REDIS_HOST',
    'REDIS_PORT',
    'REDIS_USERNAME',
    'REDIS_KEY_PREFIX',
    'REDIS_PASSWORD',
    'SA_TOKEN_JWT_SECRET',
    'ACTUATOR_USERNAME',
    'ACTUATOR_PASSWORD',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD',
    'VITE_APP_BASE_API',
    'VITE_APP_CLIENT_ID',
  ]) {
    assert.match(environmentTemplate, new RegExp(`^${variableName}=`, 'm'));
  }

  const application = readProjectFile('services/backend/ruoyi-admin/src/main/resources/application.yml');
  const development = readProjectFile('services/backend/ruoyi-admin/src/main/resources/application-dev.yml');
  const production = readProjectFile('services/backend/ruoyi-admin/src/main/resources/application-prod.yml');

  assert.match(application, /jwt-secret-key:\s*\$\{SA_TOKEN_JWT_SECRET\}/);
  assert.match(application, /username:\s*\$\{ACTUATOR_USERNAME\}/);
  assert.match(application, /password:\s*\$\{ACTUATOR_PASSWORD\}/);
  assert.match(application, /management:/);
  assert.match(application, /health:/);
  assert.match(development, /\$\{DB_PASSWORD\}/);
  assert.match(development, /\$\{REDIS_USERNAME/);
  assert.match(development, /\$\{REDIS_KEY_PREFIX/);
  assert.match(development, /\$\{REDIS_PASSWORD\}/);
  assert.match(production, /\$\{DB_PASSWORD\}/);
  assert.match(production, /\$\{REDIS_USERNAME\}/);
  assert.match(production, /\$\{REDIS_KEY_PREFIX\}/);
  assert.match(production, /\$\{REDIS_PASSWORD\}/);
  assert.doesNotMatch(production, /password:\s*(root|123456|ruoyi123)\s*$/m);
});

test('P3 documents automated verification and preserves the Mini Program boundary', () => {
  const packageJson = JSON.parse(readProjectFile('package.json'));
  assert.equal(typeof packageJson.scripts['verify:p3:structure'], 'string');

  for (const relativePath of [
    'docs/adr/0003-ruoyi-foundation-integration.md',
    'docs/phases/P3.md',
    'docs/phases/evidence/P3/README.md',
    'scripts/check-p3-architecture.js',
    'scripts/verify-p3-runtime.ps1',
  ]) {
    assert.equal(fs.existsSync(projectPath(relativePath)), true, `missing P3 evidence: ${relativePath}`);
  }

  const architectureCheck = readProjectFile('scripts/check-p3-architecture.js');
  assert.match(architectureCheck, /pages/);
  assert.match(architectureCheck, /model\/catalog/);

  const secretScanner = readProjectFile('scripts/scan-secrets.js');
  assert.match(secretScanner, /'\.java'/);
  assert.match(secretScanner, /'\.ps1'/);
  assert.match(secretScanner, /\.env\.example/);
  assert.match(secretScanner, /apps\/admin\/\.env\.development/);
  assert.match(secretScanner, /project\.config\.json/);
});

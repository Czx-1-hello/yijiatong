const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');

function readProjectFile(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
}

test('P2 foundation exposes the required local and CI commands', () => {
  const packageJson = JSON.parse(readProjectFile('package.json'));
  const requiredScripts = [
    'build',
    'build:miniprogram',
    'dependency:check',
    'lint:ci',
    'secret:scan',
    'test',
    'typecheck',
    'verify:p2',
  ];

  for (const scriptName of requiredScripts) {
    assert.equal(typeof packageJson.scripts[scriptName], 'string', `missing npm script: ${scriptName}`);
  }

  for (const relativePath of [
    '.env.example',
    '.github/workflows/ci.yml',
    'AGENTS.md',
    'MEMORY.md',
    'docs/PRD.md',
    'docs/Tech-Spec.md',
    'docs/api/README.md',
    'deploy/docker/compose.yaml',
  ]) {
    assert.equal(fs.existsSync(path.join(projectRoot, relativePath)), true, `missing P2 file: ${relativePath}`);
  }
});

test('Docker development environment pins approved services and host-only ports', () => {
  const compose = readProjectFile('deploy/docker/compose.yaml');
  const environmentTemplate = readProjectFile('.env.example');

  assert.match(compose, /mysql:8\.4\.9/);
  assert.match(compose, /redis:8\.6\.3/);
  assert.match(compose, /127\.0\.0\.1:\$\{MYSQL_PORT/);
  assert.match(compose, /127\.0\.0\.1:\$\{REDIS_PORT/);
  assert.match(compose, /MYSQL_PASSWORD: "?\$\{MYSQL_PASSWORD:\?/);
  assert.match(compose, /REDIS_PASSWORD: "?\$\{REDIS_PASSWORD:\?/);

  for (const variableName of [
    'MYSQL_DATABASE',
    'MYSQL_PASSWORD',
    'MYSQL_ROOT_PASSWORD',
    'MYSQL_USER',
    'REDIS_PASSWORD',
  ]) {
    assert.match(environmentTemplate, new RegExp(`^${variableName}=`, 'm'));
  }
});

test('planned application directories are placeholders rather than premature implementations', () => {
  assert.match(readProjectFile('.gitignore'), /^!apps\/miniprogram\/$/m);

  for (const relativePath of [
    'apps/miniprogram/README.md',
    'apps/admin/README.md',
    'services/backend/README.md',
    'tests/contract/README.md',
    'tests/integration/README.md',
    'tests/e2e/README.md',
    'tests/fixtures/README.md',
    'deploy/nginx/README.md',
    'deploy/runbooks/README.md',
  ]) {
    assert.equal(fs.existsSync(path.join(projectRoot, relativePath)), true, `missing placeholder: ${relativePath}`);
  }
});

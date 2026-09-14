const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const protectedRoots = ['pages', 'model/catalog', 'services/catalog'];

function git(args) {
  return execFileSync('git', args, { cwd: projectRoot, encoding: 'utf8' }).trim();
}

const baseline = git(['merge-base', 'HEAD', 'origin/main']);
assert.ok(baseline, 'origin/main merge-base is required');

const trackedChanges = git(['diff', '--name-only', baseline, '--', ...protectedRoots]);
assert.equal(trackedChanges, '', `P3 changed protected Mini Program paths:\n${trackedChanges}`);

for (const relativePath of protectedRoots) {
  assert.ok(fs.existsSync(path.join(projectRoot, relativePath)), `missing protected path: ${relativePath}`);
}

console.log(`P3 architecture boundary PASS (baseline ${baseline.slice(0, 12)})`);

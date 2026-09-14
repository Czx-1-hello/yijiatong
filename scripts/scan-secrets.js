/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const textExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.less',
  '.md',
  '.toml',
  '.wxml',
  '.wxss',
  '.yaml',
  '.yml',
]);
const excludedDirectories = new Set(['.firecrawl', '.git', 'miniprogram_dist', 'miniprogram_npm', 'node_modules']);
const allowedValueMarkers = /change_me|example|placeholder|not[_-]?a[_-]?secret|\$\{|<[^>]+>/i;
const secretAssignment =
  /\b(APP_?SECRET|API_?KEY|ACCESS_?TOKEN|PRIVATE_?KEY|MYSQL_(?:ROOT_)?PASSWORD|REDIS_PASSWORD)\b\s*[:=]\s*["']?([^\s"']+)/gi;
const highConfidencePatterns = [
  { name: 'private key block', pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'AWS access key', pattern: /\bAKIA[0-9A-Z]{16}\b/ },
  { name: 'GitHub token', pattern: /\bgh[pousr]_[A-Za-z0-9]{36,}\b/ },
];

function listFilesFromDisk(directory = projectRoot) {
  const files = [];

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...listFilesFromDisk(absolutePath));
      continue;
    }

    const relativePath = path.relative(projectRoot, absolutePath).replaceAll('\\', '/');
    const isLocalEnvironmentFile =
      entry.name === '.env' || (entry.name.startsWith('.env.') && entry.name !== '.env.example');
    if (!isLocalEnvironmentFile && textExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(relativePath);
    }
  }

  return files;
}

function listCandidateFiles() {
  let files;

  try {
    const output = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    files = output.split(/\r?\n/).filter(Boolean);
  } catch {
    files = listFilesFromDisk();
  }

  return files
    .filter((file) => textExtensions.has(path.extname(file).toLowerCase()))
    .filter((file) => !file.startsWith('docs/phases/evidence/P0/screenshots/'));
}

const findings = [];
const candidateFiles = listCandidateFiles();

for (const relativePath of candidateFiles) {
  const source = fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

  for (const candidate of highConfidencePatterns) {
    if (candidate.pattern.test(source)) findings.push(`${relativePath}: ${candidate.name}`);
  }

  for (const match of source.matchAll(secretAssignment)) {
    const value = match[2];
    const isEscapedEnvironmentReference = value.includes('\\$\\{');
    if (value && !allowedValueMarkers.test(value) && !isEscapedEnvironmentReference) {
      findings.push(`${relativePath}: non-placeholder ${match[1]} assignment`);
    }
  }
}

if (findings.length > 0) {
  console.error(`Potential secrets found:\n${findings.join('\n')}`);
  process.exit(1);
}

console.log(`Secret scan passed for ${candidateFiles.length} repository text files.`);

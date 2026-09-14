/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const projectRoot = path.resolve(__dirname, '..');
const textExtensions = new Set([
  '.css',
  '.html',
  '.java',
  '.js',
  '.json',
  '.less',
  '.md',
  '.properties',
  '.ps1',
  '.sql',
  '.toml',
  '.ts',
  '.vue',
  '.wxml',
  '.wxss',
  '.xml',
  '.yaml',
  '.yml',
]);
const excludedDirectories = new Set([
  '.firecrawl',
  '.git',
  'dist',
  'miniprogram_dist',
  'miniprogram_npm',
  'node_modules',
  'target',
]);
const excludedFiles = new Set(['project.config.json', 'project.private.config.json']);
const trackedEnvironmentFiles = new Set(['.env.example', 'apps/admin/.env.development', 'apps/admin/.env.production']);
const allowedValueMarkers = /change_me|disabled|example|placeholder|not[_-]?a[_-]?secret|\$\{|<[^>]+>/i;
const secretName =
  'APP_?SECRET|API_?KEY|ACCESS_?TOKEN|PRIVATE_?KEY|CLIENT_?SECRET|(?:DB|MYSQL(?:_ROOT)?|REDIS|ADMIN|ACTUATOR)_PASSWORD|SA_TOKEN_JWT_SECRET';
const quotedSecretAssignment = new RegExp(`\\b(${secretName})\\b["']?\\s*[:=]\\s*["']([^"'\\r\\n]+)["']`, 'gi');
const unquotedSecretAssignment = new RegExp(`\\b(${secretName})\\b\\s*[:=]\\s*([^\\s#]+)`, 'gi');
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
      entry.name === '.env' || (entry.name.startsWith('.env.') && !trackedEnvironmentFiles.has(relativePath));
    if (!isLocalEnvironmentFile && isScannable(relativePath)) {
      files.push(relativePath);
    }
  }

  return files;
}

function isScannable(file) {
  return trackedEnvironmentFiles.has(file) || textExtensions.has(path.extname(file).toLowerCase());
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
    .filter(isScannable)
    .filter((file) => !excludedFiles.has(file))
    .filter((file) => !file.startsWith('docs/phases/evidence/P0/screenshots/'));
}

const findings = [];
const candidateFiles = listCandidateFiles();

for (const relativePath of candidateFiles) {
  const source = fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');

  for (const candidate of highConfidencePatterns) {
    if (candidate.pattern.test(source)) findings.push(`${relativePath}: ${candidate.name}`);
  }

  const assignments = [...source.matchAll(quotedSecretAssignment)];
  if (/\.(?:env\.example|properties|toml|ya?ml)$/i.test(relativePath)) {
    assignments.push(...source.matchAll(unquotedSecretAssignment));
  }

  for (const match of assignments) {
    const value = match[2];
    const isEscapedEnvironmentReference = value.includes('\\$\\{');
    const normalizedName = match[1].replaceAll(/[_-]/g, '').toLowerCase();
    const normalizedValue = value.replaceAll(/[_-]/g, '').toLowerCase();
    const isSchemaLabel = normalizedName === normalizedValue;
    if (value && !allowedValueMarkers.test(value) && !isEscapedEnvironmentReference && !isSchemaLabel) {
      findings.push(`${relativePath}: non-placeholder ${match[1]} assignment`);
    }
  }
}

if (findings.length > 0) {
  console.error(`Potential secrets found:\n${findings.join('\n')}`);
  process.exit(1);
}

console.log(`Secret scan passed for ${candidateFiles.length} repository text files.`);

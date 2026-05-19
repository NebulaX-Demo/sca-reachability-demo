#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const outputArg =
  process.argv[2] ||
  process.env.REACHABILITY_OUTPUT ||
  'reachability-output.json';
const outputPath = path.isAbsolute(outputArg)
  ? outputArg
  : path.join(repoRoot, outputArg);

const expectedAdvisories = [
  'GHSA-P6MC-M468-83GW',
  'GHSA-8J8C-7JFH-H6HX',
  'GHSA-HRPP-H998-J3PP',
  'GHSA-Q4V7-4RHW-9HQM',
  'GHSA-CWX2-736X-MF6W',
  'GHSA-4G88-FPPR-53PP',
  'GHSA-F9XV-Q969-PQX4'
];

function fail(message) {
  console.error(`Validation failed: ${message}`);
  process.exit(1);
}

function normalizeScannerPath(value) {
  return value.replace(/^\.\//, '');
}

function validateScannerPath(value, label) {
  if (typeof value !== 'string' || value.length === 0) {
    fail(`${label} is missing`);
  }

  if (path.isAbsolute(value) || /^[A-Za-z]:[\\/]/.test(value)) {
    fail(`${label} must be relative: ${value}`);
  }

  const normalized = normalizeScannerPath(value);
  if (!normalized.startsWith('src/examples/')) {
    fail(`${label} must point under src/examples/: ${value}`);
  }
}

if (!fs.existsSync(outputPath)) {
  fail(`scanner output does not exist: ${outputPath}`);
}

const findings = JSON.parse(fs.readFileSync(outputPath, 'utf8'));

if (!Array.isArray(findings)) {
  fail('scanner output must be a JSON array');
}

if (findings.length !== 8) {
  fail(`expected 8 findings, got ${findings.length}`);
}

const advisoryIds = new Set(
  findings
    .map((finding) => String(finding.scaId || '').toUpperCase())
    .filter(Boolean)
);

for (const advisoryId of expectedAdvisories) {
  if (!advisoryIds.has(advisoryId)) {
    fail(`missing advisory ${advisoryId}`);
  }
}

for (const [index, finding] of findings.entries()) {
  validateScannerPath(finding.file, `finding[${index}].file`);

  const sources = Array.isArray(finding.source) ? finding.source : [];
  const calls = Array.isArray(finding.call) ? finding.call : [];

  if (sources.length === 0) {
    fail(`finding[${index}] has no source evidence`);
  }
  if (calls.length === 0) {
    fail(`finding[${index}] has no call evidence`);
  }

  for (const [sourceIndex, source] of sources.entries()) {
    validateScannerPath(
      source.file,
      `finding[${index}].source[${sourceIndex}].file`
    );
  }

  for (const [callIndex, call] of calls.entries()) {
    validateScannerPath(call.file, `finding[${index}].call[${callIndex}].file`);
  }
}

const lodashFindings = findings.filter(
  (finding) => String(finding.scaId).toUpperCase() === 'GHSA-P6MC-M468-83GW'
);

if (lodashFindings.length !== 2) {
  fail(
    `expected the lodash advisory to have 2 reachable findings, got ${lodashFindings.length}`
  );
}

const lodashSourceLines = lodashFindings.flatMap((finding) =>
  (Array.isArray(finding.source) ? finding.source : []).map(
    (source) => source.lines || source.text || ''
  )
);
const lodashSinkText = lodashFindings.map((finding) => finding.text || '');

if (!lodashSourceLines.some((line) => line.includes('profilePath'))) {
  fail('lodash finding is missing the profilePath source');
}
if (!lodashSourceLines.some((line) => line.includes('metadataPath'))) {
  fail('lodash finding is missing the metadataPath source');
}
if (!lodashSinkText.some((text) => text.includes('lodash.set'))) {
  fail('lodash finding is missing the lodash.set sink');
}
if (!lodashSinkText.some((text) => text.includes('lodash.update'))) {
  fail('lodash finding is missing the lodash.update sink');
}

console.log(
  'Reachability output is valid: 8 findings, 7 advisories, relative paths, source evidence, call evidence, and 2 lodash sources.'
);

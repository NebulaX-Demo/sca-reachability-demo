#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const outputArg =
  process.argv[2] ||
  process.env.ROUTE_MAPPING_OUTPUT ||
  'vulnerable-api-map.json';
const outputPath = path.isAbsolute(outputArg)
  ? outputArg
  : path.join(repoRoot, outputArg);

const expectedSchema = 'xeize-route.finding-endpoints.v2';
const expectedRoutesByFramework = {
  js_express: [
    '/ejs/render',
    '/handlebars/template',
    '/js-yaml/document',
    '/json5/preferences',
    '/lodash-merge/preferences',
    '/lodash/profile',
    '/marked/preview',
    '/minimatch/files',
    '/minimist/flags',
    '/node-serialize/session',
    '/object-path/settings',
    '/qs/search',
    '/semver/range',
    '/set-value/account',
    '/yaml/config',
    '/yargs-parser/options'
  ],
  python_flask: [
    '/bleach/comment',
    '/lxml/feed',
    '/numpy/archive',
    '/pillow/expression',
    '/pyyaml/profile',
    '/requests/client'
  ],
  java_spring: [
    '/java/commons-text/lookup',
    '/java/snakeyaml/document',
    '/java/xstream/import'
  ],
  kotlin_spring: [
    '/kotlin/commons-text/lookup',
    '/kotlin/snakeyaml/document',
    '/kotlin/xstream/import'
  ]
};
const requiredJsFindingPaths = new Set([
  '/js-yaml/document',
  '/lodash/profile',
  '/node-serialize/session',
  '/object-path/settings',
  '/qs/search',
  '/set-value/account',
  '/yaml/config'
]);
const expectedPathToFramework = new Map(
  Object.entries(expectedRoutesByFramework).flatMap(([framework, routes]) =>
    routes.map((routePath) => [routePath, framework])
  )
);
const expectedRouteCount = Object.values(expectedRoutesByFramework).reduce(
  (total, routes) => total + routes.length,
  0
);

function fail(message) {
  console.error(`Validation failed: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(outputPath)) {
  fail(`route mapping output does not exist: ${outputPath}`);
}

const doc = JSON.parse(fs.readFileSync(outputPath, 'utf8'));

if (doc.schema_version !== expectedSchema) {
  fail(`expected schema ${expectedSchema}, got ${doc.schema_version}`);
}

if (!doc.summary || typeof doc.summary !== 'object') {
  fail('summary is missing');
}

if (doc.summary.total_findings < 8) {
  fail(`expected at least 8 total findings, got ${doc.summary.total_findings}`);
}
if (doc.summary.mapped !== doc.summary.total_findings) {
  fail(
    `expected every finding to map, got ${doc.summary.mapped} mapped of ${doc.summary.total_findings}`
  );
}
if (doc.summary.unmapped !== 0) {
  fail(`expected 0 unmapped findings, got ${doc.summary.unmapped}`);
}

if (!Array.isArray(doc.api_matches) || doc.api_matches.length === 0) {
  fail('api_matches must contain route inventory entries');
}

if (doc.api_matches.length !== expectedRouteCount) {
  fail(
    `expected ${expectedRouteCount} route inventory entries, got ${doc.api_matches.length}`
  );
}

for (const [framework, expectedPaths] of Object.entries(expectedRoutesByFramework)) {
  const frameworkRoutes = doc.api_matches.filter(
    (route) => route.framework_id === framework
  );
  if (frameworkRoutes.length !== expectedPaths.length) {
    fail(
      `expected ${expectedPaths.length} ${framework} routes, got ${frameworkRoutes.length}`
    );
  }

  const actualPaths = new Set(frameworkRoutes.map((route) => route.path));
  for (const expectedPath of expectedPaths) {
    if (!actualPaths.has(expectedPath)) {
      fail(`missing ${framework} route ${expectedPath}`);
    }
  }
}

if (!Array.isArray(doc.findings)) {
  fail('findings must be an array');
}
if (doc.findings.length < 8) {
  fail(`expected at least 8 output findings, got ${doc.findings.length}`);
}

const mappedPaths = new Set();
const lodashFindings = [];

for (const [index, finding] of doc.findings.entries()) {
  if (finding.mapping?.status !== 'mapped') {
    fail(`finding[${index}] is not mapped`);
  }

  const endpoint = finding.endpoint;
  if (!endpoint || typeof endpoint !== 'object') {
    fail(`finding[${index}] is missing endpoint`);
  }

  const expectedFramework = expectedPathToFramework.get(endpoint.path);
  if (!expectedFramework) {
    fail(`finding[${index}] has unexpected endpoint path: ${endpoint.path}`);
  }
  if (endpoint.framework_id !== expectedFramework) {
    fail(
      `finding[${index}] expected ${expectedFramework} endpoint for ${endpoint.path}, got ${endpoint.framework_id}`
    );
  }
  if (endpoint.method !== 'GET') {
    fail(`finding[${index}] expected GET endpoint, got ${endpoint.method}`);
  }

  mappedPaths.add(endpoint.path);

  if (String(finding.scaId).toUpperCase() === 'GHSA-P6MC-M468-83GW') {
    lodashFindings.push(finding);
  }
}

for (const expectedPath of requiredJsFindingPaths) {
  if (!mappedPaths.has(expectedPath)) {
    fail(`missing mapped endpoint ${expectedPath}`);
  }
}

if (lodashFindings.length !== 2) {
  fail(`expected 2 lodash mapped findings, got ${lodashFindings.length}`);
}
if (!lodashFindings.every((finding) => finding.endpoint?.path === '/lodash/profile')) {
  fail('all lodash findings must map to /lodash/profile');
}

console.log(
  `Route mapping output is valid: schema v2, ${expectedRouteCount} inventoried routes across JS/Python/Java/Kotlin, ${doc.summary.mapped} mapped findings, 0 unmapped findings, and 2 lodash findings mapped to /lodash/profile.`
);

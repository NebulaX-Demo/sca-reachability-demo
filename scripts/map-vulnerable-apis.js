#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const routeBinary = process.env.XEIZE_ROUTE_BINARY || 'xeize-route';
const findingsFile = process.env.REACHABILITY_OUTPUT || 'reachability-output.json';
const outputFile = process.env.ROUTE_MAPPING_OUTPUT || 'vulnerable-api-map.json';
const findingsPath = path.isAbsolute(findingsFile)
  ? findingsFile
  : path.join(repoRoot, findingsFile);

if (!fs.existsSync(findingsPath)) {
  console.error(
    `Reachability output does not exist: ${findingsPath}. Run npm run scan:reachability first.`
  );
  process.exit(1);
}

const args = ['scan', '.', '--findings', findingsFile, '-o', outputFile];

console.log(`Running ${routeBinary} ${args.join(' ')}`);

const result = spawnSync(routeBinary, args, {
  cwd: repoRoot,
  env: process.env,
  stdio: 'inherit'
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);

#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const routeBinary = process.env.XEIZE_ROUTE_BINARY || 'xeize-route';
const outputFile = process.env.ROUTE_OUTPUT || 'route-output.json';
const args = ['scan', '.', '--format', 'routes-json', '-o', outputFile];

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

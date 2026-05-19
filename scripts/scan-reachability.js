#!/usr/bin/env node

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const scanner = process.env.SCA_REACHABILITY_BINARY || 'xeize-sca';
const outputFile = process.env.REACHABILITY_OUTPUT || 'reachability-output.json';
const args = ['scan', '-o', outputFile, 'advisory-ids.txt', '.'];

if (!process.env.XEIZE_TOKEN) {
  console.warn(
    'XEIZE_TOKEN is not set. Set it before running a reachability scan.'
  );
}

console.log(`Running ${scanner} ${args.join(' ')}`);

const result = spawnSync(scanner, args, {
  cwd: repoRoot,
  env: process.env,
  stdio: 'inherit'
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);

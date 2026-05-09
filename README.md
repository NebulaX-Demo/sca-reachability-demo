# SCA Reachability Demo

Deliberately vulnerable Node.js project for demonstrating SCA reachability in the vulnerability dialog.

Each example pins a vulnerable package version and passes request-controlled `req.query` data through a helper function into a vulnerable API. This gives the reachability UI realistic source, call, sink, and code-view evidence while keeping the project small enough for manual scan demos.

## Quickstart

```sh
npm install --ignore-scripts
npm start
```

`npm start` runs a tiny in-repo route harness. It does not start a server; it executes each demo route once and prints the route results.

## Reachability Scan

```sh
export XEIZE_TOKEN='<token>'
export SCA_REACHABILITY_BINARY=/path/to/xeize-sca
npm run scan:reachability
npm run validate:reachability
```

`scan:reachability` writes `reachability-output.json` in the repo root. The file is ignored by git.

The expected scanner result is 8 reachable findings across 7 advisories. The lodash advisory intentionally has two reachable sinks from two different request sources so the XEIZE SCA dialog can show multiple reachability source cards for a single vulnerability.

## Reachable Examples

| File | Package | Version | Advisory | Reachable sink |
| --- | --- | ---: | --- | --- |
| `src/examples/lodash-profile.js` | lodash | 4.17.18 | GHSA-P6MC-M468-83GW / CVE-2020-8203 | `lodash.set(target, path, value)` and `lodash.update(target, path, updater)` |
| `src/examples/js-yaml-document.js` | js-yaml | 3.13.0 | GHSA-8J8C-7JFH-H6HX | `jsYaml.load(payload)` |
| `src/examples/qs-search.js` | qs | 6.9.6 | GHSA-HRPP-H998-J3PP / CVE-2022-24999 | `qs.parse(queryString)` |
| `src/examples/node-serialize-session.js` | node-serialize | 0.0.4 | GHSA-Q4V7-4RHW-9HQM / CVE-2017-5941 | `serialize.unserialize(payload)` |
| `src/examples/object-path-settings.js` | object-path | 0.11.4 | GHSA-CWX2-736X-MF6W / CVE-2020-15256 | `objectPath.set(target, path, value)` |
| `src/examples/set-value-account.js` | set-value | 2.0.0 | GHSA-4G88-FPPR-53PP / CVE-2019-10747 | `setValue(target, path, value)` |
| `src/examples/yaml-config.js` | yaml | 2.2.1 | GHSA-F9XV-Q969-PQX4 / CVE-2023-2251 | `modernYaml.parse(payload)` |

## Multiple Source Dialog Scenario

`src/examples/lodash-profile.js` uses one route with two independent `req.query` sources:

- `profilePath` reaches `lodash.set(...)`
- `metadataPath` reaches `lodash.update(...)`

Both findings share `GHSA-P6MC-M468-83GW`, so after a manual scan upload the lodash vulnerability dialog should show two reachability evidence cards in the Reachability tab.

## Manual Upload ZIP

Create the upload archive outside the repo folder so generated files stay local-only:

```sh
cd ..
zip -r sca-reachability-demo.zip sca-reachability-demo \
  -x 'sca-reachability-demo/.git/*' \
  -x 'sca-reachability-demo/node_modules/*' \
  -x 'sca-reachability-demo/reachability-output*.json' \
  -x 'sca-reachability-demo/sca-output*.json' \
  -x 'sca-reachability-demo/*.zip'
```

Upload `sca-reachability-demo.zip` through the XEIZE manual scan flow.

## Generated Files

The repo intentionally ignores local scanner and packaging output:

- `node_modules/`
- `reachability-output*.json`
- `sca-output*.json`
- `*.tgz`
- `*.zip`

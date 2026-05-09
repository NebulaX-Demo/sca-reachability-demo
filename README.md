# SCA Reachability Demo

Deliberately vulnerable Node.js project for demonstrating SCA reachability in the vulnerability dialog.

Each example pins a vulnerable package version and passes request-controlled `req.query` data through a helper function into a vulnerable API. This gives the reachability UI realistic source, call, sink, and code-view evidence while keeping the project small enough for manual scan demos.

## Quickstart

```sh
npm install
npm start
```

`npm start` runs a tiny in-repo route harness. It does not start a server; it executes each demo route once and prints the route results.

## Reachable Examples

| File | Package | Version | Advisory | Reachable sink |
| --- | --- | ---: | --- | --- |
| `src/examples/lodash-profile.js` | lodash | 4.17.18 | GHSA-P6MC-M468-83GW / CVE-2020-8203 | `lodash.set(target, path, value)` |
| `src/examples/js-yaml-document.js` | js-yaml | 3.13.0 | GHSA-8J8C-7JFH-H6HX | `jsYaml.load(payload)` |
| `src/examples/qs-search.js` | qs | 6.9.6 | GHSA-HRPP-H998-J3PP / CVE-2022-24999 | `qs.parse(queryString)` |
| `src/examples/node-serialize-session.js` | node-serialize | 0.0.4 | GHSA-Q4V7-4RHW-9HQM / CVE-2017-5941 | `serialize.unserialize(payload)` |
| `src/examples/object-path-settings.js` | object-path | 0.11.4 | GHSA-CWX2-736X-MF6W / CVE-2020-15256 | `objectPath.set(target, path, value)` |
| `src/examples/set-value-account.js` | set-value | 2.0.0 | GHSA-4G88-FPPR-53PP / CVE-2019-10747 | `setValue(target, path, value)` |
| `src/examples/yaml-config.js` | yaml | 2.2.1 | GHSA-F9XV-Q969-PQX4 / CVE-2023-2251 | `modernYaml.parse(payload)` |

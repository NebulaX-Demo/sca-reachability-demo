# SCA Reachability Demo

Deliberately vulnerable multi-ecosystem project for demonstrating SCA reachability in the vulnerability dialog.

Each example pins a vulnerable package version and passes request-controlled data through a helper function into a vulnerable API. Node.js examples use `req.query` sources, Python examples use `request.args.get(...)`-style sources, and Java/Kotlin examples use `HttpServletRequest.getParameter(...)` sources. This gives the reachability UI realistic source, call, sink, and code-view evidence while keeping the project small enough for manual scan demos.

## Quickstart

```sh
npm install --ignore-scripts
npm start
```

`npm start` runs a tiny in-repo route harness. It does not start a server; it executes each demo route once and prints the route results.

The Python, Java, and Kotlin examples are scan-focused and are not executed by `npm start`. Validate Python syntax without installing old vulnerable packages:

```sh
python3 -m compileall python
```

## Reachability Scan

```sh
export XEIZE_TOKEN='<token>'
export SCA_REACHABILITY_BINARY=/path/to/xeize-sca
npm run scan:reachability
npm run validate:reachability
```

`scan:reachability` writes `reachability-output.json` in the repo root. The file is ignored by git.

The demo now contains 29 intentional reachable sinks across 28 demo routes/handlers. Current reachability scanner output depends on the embedded rule set in the local `xeize-sca` binary; the scanner-supported JavaScript/Python subset produced 18 reachable findings across 17 advisories during validation, while dependency scanners should still surface all pinned vulnerable package versions. The lodash advisory intentionally has two reachable sinks from two different request sources so the XEIZE SCA dialog can show multiple reachability source cards for a single vulnerability.

## Vulnerable API Route Mapping

The JavaScript examples keep the lightweight in-repo route harness, but include Express-compatible route markers so `xeize-route` can inventory the vulnerable API paths without adding Express or starting a server. Python examples use Flask-style decorators, and Java/Kotlin examples use Spring-style mapping annotations, as static scan markers only; Flask and Spring are intentionally not added to the dependency manifests.

```sh
export XEIZE_ROUTE_BINARY=/path/to/xeize-route
npm run scan:reachability
npm run route:inventory
npm run map:vulnerable-apis
npm run validate:route-mapping
```

`route:inventory` writes `route-output.json` by default. `map:vulnerable-apis` reads `reachability-output.json` and writes `vulnerable-api-map.json` by default. Override those paths with `ROUTE_OUTPUT`, `REACHABILITY_OUTPUT`, and `ROUTE_MAPPING_OUTPUT`.

Route mapping validation requires all 28 demo routes to be inventoried across `js_express`, `python_flask`, `java_spring`, and `kotlin_spring`. It remains compatible with older scanner output that only contains the current 8 JavaScript findings, and validates Python/Java/Kotlin mapped findings when the local scanner emits them.

## Reachable Examples

| Ecosystem | File | Package | Version | Advisory | Reachable sink |
| --- | --- | --- | ---: | --- | --- |
| npm | `src/examples/lodash-profile.js` | lodash | 4.17.18 | GHSA-P6MC-M468-83GW / CVE-2020-8203 | `lodash.set(target, path, value)` and `lodash.update(target, path, updater)` |
| npm | `src/examples/js-yaml-document.js` | js-yaml | 3.13.0 | GHSA-8J8C-7JFH-H6HX | `jsYaml.load(payload)` |
| npm | `src/examples/qs-search.js` | qs | 6.9.6 | GHSA-HRPP-H998-J3PP / CVE-2022-24999 | `qs.parse(queryString)` |
| npm | `src/examples/node-serialize-session.js` | node-serialize | 0.0.4 | GHSA-Q4V7-4RHW-9HQM / CVE-2017-5941 | `serialize.unserialize(payload)` |
| npm | `src/examples/object-path-settings.js` | object-path | 0.11.4 | GHSA-CWX2-736X-MF6W / CVE-2020-15256 | `objectPath.set(target, path, value)` |
| npm | `src/examples/set-value-account.js` | set-value | 2.0.0 | GHSA-4G88-FPPR-53PP / CVE-2019-10747 | `setValue(target, path, value)` |
| npm | `src/examples/yaml-config.js` | yaml | 2.2.1 | GHSA-F9XV-Q969-PQX4 / CVE-2023-2251 | `modernYaml.parse(payload)` |
| npm | `src/examples/ejs-render.js` | ejs | 3.1.6 | GHSA-PHWQ-J96M-2C2Q / CVE-2022-29078 | `ejs.render(template, viewModel)` |
| npm | `src/examples/marked-preview.js` | marked | 0.3.5 | GHSA-5V2H-R2CX-5XGJ / CVE-2022-21681 | `marked.parse(markdown)` |
| npm | `src/examples/minimist-flags.js` | minimist | 0.0.8 | GHSA-XVCH-5GV4-984H / CVE-2021-44906 | `minimist(argv.split(' '))` |
| npm | `src/examples/semver-range.js` | semver | 5.7.1 | GHSA-C2QF-RXJJ-QQGW / CVE-2022-25883 | `semver.validRange(range)` |
| npm | `src/examples/handlebars-template.js` | handlebars | 4.0.12 | GHSA-2CF5-4W76-R9QV | `handlebars.compile(template)` |
| npm | `src/examples/json5-preferences.js` | json5 | 1.0.1 | GHSA-9C47-M6QQ-7P4H / CVE-2022-46175 | `JSON5.parse(payload)` |
| npm | `src/examples/lodash-merge-preferences.js` | lodash.merge | 4.6.1 | GHSA-H726-X36V-RX45 | `merge(defaults, preferences)` |
| npm | `src/examples/minimatch-files.js` | minimatch | 3.0.4 | GHSA-23C5-XMQV-RM74 / CVE-2026-27904 | `minimatch.match(files, pattern)` |
| npm | `src/examples/yargs-parser-options.js` | yargs-parser | 13.1.1 | GHSA-P9PC-299P-VXGP / CVE-2020-7608 | `yargsParser(argv.split(' '))` |
| PyPI | `python/examples/requests_client.py` | requests | 2.19.1 | GHSA-9HJG-9R4M-MVJ7 / CVE-2024-47081 | `requests.Request("GET", url).prepare()` |
| PyPI | `python/examples/pyyaml_profile.py` | PyYAML | 5.3.1 | GHSA-RPRW-H62V-C2W7 / CVE-2017-18342 | `yaml.load(payload, Loader=yaml.Loader)` |
| PyPI | `python/examples/bleach_comment.py` | bleach | 3.1.0 | GHSA-M6XF-FQ7Q-8743 / CVE-2020-6816 | `bleach.clean(fragment, tags=tags, strip=False)` |
| PyPI | `python/examples/lxml_feed.py` | lxml | 4.6.2 | GHSA-JQ4V-F5Q6-MJQQ / CVE-2021-28957 | `etree.fromstring(payload.encode("utf-8"))` |
| PyPI | `python/examples/numpy_archive.py` | numpy | 1.16.0 | GHSA-9FQ2-X9R6-WFMF / CVE-2019-6446 | `numpy.load(archive, allow_pickle=True)` |
| PyPI | `python/examples/pillow_expression.py` | Pillow | 8.2.0 | GHSA-8VJ2-VXX3-667W / CVE-2022-22817 | `ImageMath.eval(expression)` |
| Maven | `java/src/main/java/demo/CommonsTextLookup.java` | org.apache.commons:commons-text | 1.9 | GHSA-599F-7C49-W659 / CVE-2022-42889 | `StringSubstitutor.createInterpolator().replace(template)` |
| Maven | `java/src/main/java/demo/SnakeYamlDocument.java` | org.yaml:snakeyaml | 1.30 | GHSA-3MC7-4Q67-W48M / CVE-2022-25857 | `new Yaml().load(document)` |
| Maven | `java/src/main/java/demo/XStreamImport.java` | com.thoughtworks.xstream:xstream | 1.4.17 | GHSA-2Q8X-2P7F-574V / CVE-2021-39153 | `new XStream().fromXML(xml)` |
| Gradle | `kotlin/src/main/kotlin/demo/CommonsTextLookup.kt` | org.apache.commons:commons-text | 1.9 | GHSA-599F-7C49-W659 / CVE-2022-42889 | `StringSubstitutor.createInterpolator().replace(template)` |
| Gradle | `kotlin/src/main/kotlin/demo/SnakeYamlDocument.kt` | org.yaml:snakeyaml | 1.30 | GHSA-3MC7-4Q67-W48M / CVE-2022-25857 | `Yaml().load(document)` |
| Gradle | `kotlin/src/main/kotlin/demo/XStreamImport.kt` | com.thoughtworks.xstream:xstream | 1.4.17 | GHSA-2Q8X-2P7F-574V / CVE-2021-39153 | `XStream().fromXML(xml)` |

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
  -x 'sca-reachability-demo/route-output*.json' \
  -x 'sca-reachability-demo/vulnerable-api-map*.json' \
  -x 'sca-reachability-demo/*.zip'
```

Upload `sca-reachability-demo.zip` through the XEIZE manual scan flow.

## Generated Files

The repo intentionally ignores local scanner and packaging output:

- `node_modules/`
- `__pycache__/`
- `*.py[cod]`
- `target/`
- `.gradle/`
- `build/`
- `*.class`
- `reachability-output*.json`
- `sca-output*.json`
- `route-output*.json`
- `vulnerable-api-map*.json`
- `*.tgz`
- `*.zip`

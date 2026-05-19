const { createDemoApp } = require('./demo-app');

const examples = [
  require('./examples/lodash-profile'),
  require('./examples/js-yaml-document'),
  require('./examples/qs-search'),
  require('./examples/node-serialize-session'),
  require('./examples/object-path-settings'),
  require('./examples/set-value-account'),
  require('./examples/yaml-config'),
  require('./examples/ejs-render'),
  require('./examples/marked-preview'),
  require('./examples/minimist-flags'),
  require('./examples/semver-range'),
  require('./examples/handlebars-template'),
  require('./examples/json5-preferences'),
  require('./examples/lodash-merge-preferences'),
  require('./examples/minimatch-files'),
  require('./examples/yargs-parser-options')
];

function runDemo() {
  const app = createDemoApp();

  for (const registerExample of examples) {
    registerExample(app);
  }

  return app.results;
}

if (require.main === module) {
  console.log(JSON.stringify(runDemo(), null, 2));
}

module.exports = { runDemo };

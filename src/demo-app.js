function createDemoApp() {
  const routeResults = [];

  return {
    get(path, handler) {
      const req = {
        query: demoQueryFor(path)
      };
      const res = {
        json(value) {
          routeResults.push({ path, value });
          return value;
        }
      };

      return handler(req, res);
    },

    get results() {
      return routeResults.slice();
    }
  };
}

function demoQueryFor(path) {
  switch (path) {
    case '/lodash/profile':
      return {
        profilePath: 'profile.displayName',
        metadataPath: 'profile.metadata.badge'
      };
    case '/js-yaml/document':
      return { document: 'name: demo\nrole: maintainer' };
    case '/qs/search':
      return { queryString: 'filter=all&sort=created' };
    case '/node-serialize/session':
      return { session: '{"user":"demo","role":"admin"}' };
    case '/object-path/settings':
      return { settingsPath: 'ui.theme', value: 'dark' };
    case '/set-value/account':
      return { accountPath: 'flags.demo', value: true };
    case '/yaml/config':
      return { config: 'feature: reachability\nstatus: enabled' };
    case '/ejs/render':
      return { template: 'Hello <%= name %>', name: 'reachability' };
    case '/marked/preview':
      return { markdown: '# Reachability\n\nScanner preview.' };
    case '/minimist/flags':
      return { argv: '--feature reachability --enabled true' };
    case '/semver/range':
      return { range: '^1.2.3' };
    case '/handlebars/template':
      return { template: 'Hello {{name}}', name: 'reachability' };
    case '/json5/preferences':
      return { preferences: '{theme:"dark", beta:true}' };
    case '/lodash-merge/preferences':
      return { preferences: { notifications: { sms: false } } };
    case '/minimatch/files':
      return { pattern: 'src/*.js' };
    case '/yargs-parser/options':
      return { argv: '--profile demo --enabled true' };
    default:
      return {};
  }
}

module.exports = { createDemoApp, demoQueryFor };

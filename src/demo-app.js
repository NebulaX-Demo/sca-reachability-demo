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
      return { profilePath: 'profile.displayName' };
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
    default:
      return {};
  }
}

module.exports = { createDemoApp, demoQueryFor };


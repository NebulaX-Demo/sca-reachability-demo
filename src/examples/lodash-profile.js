const lodash = require('lodash');

function registerLodashProfile(app) {
  app.get('/lodash/profile', (req, res) => {
    const path = req.query.profilePath;
    const target = {};

    applyLodashProfile(target, path);

    return res.json(target);
  });
}

function applyLodashProfile(target, path) {
  lodash.set(target, path, 'reachable-lodash-value');
  return target;
}

module.exports = registerLodashProfile;


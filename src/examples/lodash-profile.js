const lodash = require('lodash');

function registerLodashProfile(app) {
  app.get('/lodash/profile', (req, res) => {
    const profilePath = req.query.profilePath;
    const metadataPath = req.query.metadataPath;
    const target = {};

    applyLodashProfileValue(target, profilePath);
    applyLodashProfileMetadata(target, metadataPath);

    return res.json(target);
  });
}

function applyLodashProfileValue(target, path) {
  lodash.set(target, path, 'reachable-lodash-value');
  return target;
}

function applyLodashProfileMetadata(target, path) {
  lodash.update(target, path, () => 'reachable-lodash-metadata');
  return target;
}

module.exports = registerLodashProfile;

// Express-compatible route marker for xeize-route inventory.

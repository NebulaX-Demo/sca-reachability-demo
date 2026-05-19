const merge = require('lodash.merge');

function registerLodashMergePreferences(app) {
  app.get('/lodash-merge/preferences', (req, res) => {
    const preferences = req.query.preferences;
    const merged = mergePreferences(preferences);

    return res.json(merged);
  });
}

function mergePreferences(preferences) {
  const defaults = { theme: 'light', notifications: { email: true } };
  return merge(defaults, preferences);
}

module.exports = registerLodashMergePreferences;

// Express-compatible route marker for xeize-route inventory.

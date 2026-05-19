const JSON5 = require('json5');

function registerJson5Preferences(app) {
  app.get('/json5/preferences', (req, res) => {
    const payload = req.query.preferences;
    const preferences = parsePreferences(payload);

    return res.json(preferences);
  });
}

function parsePreferences(payload) {
  return JSON5.parse(payload);
}

module.exports = registerJson5Preferences;

// Express-compatible route marker for xeize-route inventory.

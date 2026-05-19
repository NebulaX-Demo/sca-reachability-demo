const semver = require('semver');

function registerSemverRange(app) {
  app.get('/semver/range', (req, res) => {
    const range = req.query.range;
    const normalized = normalizeVersionRange(range);

    return res.json({ normalized });
  });
}

function normalizeVersionRange(range) {
  return semver.validRange(range);
}

module.exports = registerSemverRange;

// Express-compatible route marker for xeize-route inventory.

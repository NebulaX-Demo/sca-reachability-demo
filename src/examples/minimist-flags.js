const minimist = require('minimist');

function registerMinimistFlags(app) {
  app.get('/minimist/flags', (req, res) => {
    const argv = req.query.argv;
    const parsed = parseCliFlags(argv);

    return res.json(parsed);
  });
}

function parseCliFlags(argv) {
  return minimist(argv.split(' '));
}

module.exports = registerMinimistFlags;

// Express-compatible route marker for xeize-route inventory.

const yargsParser = require('yargs-parser');

function registerYargsParserOptions(app) {
  app.get('/yargs-parser/options', (req, res) => {
    const argv = req.query.argv;
    const parsed = parseOptions(argv);

    return res.json(parsed);
  });
}

function parseOptions(argv) {
  return yargsParser(argv.split(' '));
}

module.exports = registerYargsParserOptions;

// Express-compatible route marker for xeize-route inventory.

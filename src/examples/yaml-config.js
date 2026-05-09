const modernYaml = require('yaml');

function registerYamlConfig(app) {
  app.get('/yaml/config', (req, res) => {
    const payload = req.query.config;
    const parsed = parseModernYaml(payload);

    return res.json(parsed);
  });
}

function parseModernYaml(payload) {
  return modernYaml.parse(payload);
}

module.exports = registerYamlConfig;


const jsYaml = require('js-yaml');

function registerJsYamlDocument(app) {
  app.get('/js-yaml/document', (req, res) => {
    const payload = req.query.document;
    const parsed = parseLegacyYaml(payload);

    return res.json(parsed);
  });
}

function parseLegacyYaml(payload) {
  return jsYaml.load(payload);
}

module.exports = registerJsYamlDocument;


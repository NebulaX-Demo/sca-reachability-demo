const handlebars = require('handlebars');

function registerHandlebarsTemplate(app) {
  app.get('/handlebars/template', (req, res) => {
    const template = req.query.template;
    const rendered = renderTemplate(template, {
      name: req.query.name || 'demo'
    });

    return res.json({ rendered });
  });
}

function renderTemplate(template, viewModel) {
  const compiled = handlebars.compile(template);
  return compiled(viewModel);
}

module.exports = registerHandlebarsTemplate;

// Express-compatible route marker for xeize-route inventory.

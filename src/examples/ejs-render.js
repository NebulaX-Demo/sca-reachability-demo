const ejs = require('ejs');

function registerEjsRender(app) {
  app.get('/ejs/render', (req, res) => {
    const template = req.query.template;
    const rendered = renderTemplatePreview(template, {
      name: req.query.name || 'demo'
    });

    return res.json({ rendered });
  });
}

function renderTemplatePreview(template, viewModel) {
  return ejs.render(template, viewModel);
}

module.exports = registerEjsRender;

// Express-compatible route marker for xeize-route inventory.

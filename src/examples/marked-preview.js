const marked = require('marked');

function registerMarkedPreview(app) {
  app.get('/marked/preview', (req, res) => {
    const markdown = req.query.markdown;
    const html = renderMarkdownPreview(markdown);

    return res.json({ html });
  });
}

function renderMarkdownPreview(markdown) {
  return marked.parse(markdown);
}

module.exports = registerMarkedPreview;

// Express-compatible route marker for xeize-route inventory.

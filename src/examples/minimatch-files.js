const minimatch = require('minimatch');

function registerMinimatchFiles(app) {
  app.get('/minimatch/files', (req, res) => {
    const pattern = req.query.pattern;
    const matches = filterFiles(pattern);

    return res.json({ matches });
  });
}

function filterFiles(pattern) {
  return minimatch.match(['src/app.js', 'src/demo-app.js'], pattern);
}

module.exports = registerMinimatchFiles;

// Express-compatible route marker for xeize-route inventory.

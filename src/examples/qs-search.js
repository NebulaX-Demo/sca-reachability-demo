const qs = require('qs');

function registerQsSearch(app) {
  app.get('/qs/search', (req, res) => {
    const queryString = req.query.queryString;
    const parsed = parseSearchQuery(queryString);

    return res.json(parsed);
  });
}

function parseSearchQuery(queryString) {
  return qs.parse(queryString);
}

module.exports = registerQsSearch;


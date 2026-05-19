const setValue = require('set-value');

function registerSetValueAccount(app) {
  app.get('/set-value/account', (req, res) => {
    const path = req.query.accountPath;
    const target = {};

    applyAccountFlag(target, path, req.query.value);

    return res.json(target);
  });
}

function applyAccountFlag(target, path, value) {
  setValue(target, path, value);
  return target;
}

module.exports = registerSetValueAccount;

// Express-compatible route marker for xeize-route inventory.

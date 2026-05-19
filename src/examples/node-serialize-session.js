const serialize = require('node-serialize');

function registerNodeSerializeSession(app) {
  app.get('/node-serialize/session', (req, res) => {
    const payload = req.query.session;
    const session = restoreSession(payload);

    return res.json(session);
  });
}

function restoreSession(payload) {
  return serialize.unserialize(payload);
}

module.exports = registerNodeSerializeSession;

// Express-compatible route marker for xeize-route inventory.

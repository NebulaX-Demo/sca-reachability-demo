const objectPath = require('object-path');

function registerObjectPathSettings(app) {
  app.get('/object-path/settings', (req, res) => {
    const path = req.query.settingsPath;
    const target = {};

    applyObjectPathSetting(target, path, req.query.value);

    return res.json(target);
  });
}

function applyObjectPathSetting(target, path, value) {
  objectPath.set(target, path, value);
  return target;
}

module.exports = registerObjectPathSettings;


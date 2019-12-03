"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _umiUtils = require("umi-utils");

function _default(api, options = []) {
  (0, _umiUtils.deprecate)(`umi-plugin-polyfills`, `use config.targets instead.`);
  const paths = api.paths;
  api.addEntryPolyfillImports(() => {
    return ['ie9', 'ie10', 'ie11'].filter(key => {
      return options.includes(key);
    }).map(key => ({
      source: (0, _path.relative)(paths.absTmpDirPath, (0, _path.join)(__dirname, `${key}.js`))
    }));
  });
}
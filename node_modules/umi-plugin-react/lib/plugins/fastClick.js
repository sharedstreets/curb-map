"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api, options = {}) {
  const paths = api.paths;
  api.addEntryImport(() => {
    return {
      source: (0, _path().relative)(paths.absTmpDirPath, options.libraryPath || require.resolve('fastclick')),
      specifier: 'FastClick'
    };
  });
  api.addEntryCodeAhead(`
// Initialize fastclick
document.addEventListener(
  'DOMContentLoaded',
  () => {
    FastClick.attach(document.body);
  },
  false,
);
  `.trim());
}
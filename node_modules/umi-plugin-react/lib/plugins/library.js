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

function _default(api, options) {
  const cwd = api.cwd,
        compatDirname = api.compatDirname;
  api.chainWebpackConfig(webpackConfig => {
    if (options === 'preact') {
      webpackConfig.resolve.alias.set('preact/devtools', require.resolve('preact/devtools')).set('preact', require.resolve('preact')).set('react', compatDirname('preact-compat/package.json', cwd, (0, _path().dirname)(require.resolve('preact-compat/package.json')))).set('react-dom', compatDirname('preact-compat/package.json', cwd, (0, _path().dirname)(require.resolve('preact-compat/package.json')))).set('create-react-class', (0, _path().join)(compatDirname('preact-compat/lib/create-react-class', cwd, (0, _path().dirname)(require.resolve('preact-compat/lib/create-react-class'))), 'create-react-class'));
    }
  });
  api.addEntryImport(() => {
    if (process.env.NODE_ENV === 'development' && options === 'preact') {
      return {
        source: 'preact/devtools'
      };
    } else {
      return [];
    }
  });
}
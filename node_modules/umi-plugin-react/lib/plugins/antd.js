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

function importPlugin(key, options) {
  return [require.resolve('babel-plugin-import'), {
    libraryName: key,
    libraryDirectory: process.env.ANTD_IMPORT_DIRECTORY || options.importDirectory || 'es',
    style: true
  }, key];
}

function _default(api, options = {}) {
  const cwd = api.cwd,
        compatDirname = api.compatDirname;
  const antdDir = compatDirname('antd/package.json', cwd, (0, _path().dirname)(require.resolve('antd/package.json'))); // eslint-disable-next-line import/no-dynamic-require

  const antdVersion = require((0, _path().join)(antdDir, 'package.json')).version;

  api.addVersionInfo([`antd@${antdVersion} (${antdDir})`]);
  api.modifyAFWebpackOpts((memo, opts = {}) => {
    // antd ssr not enabled
    if (!opts.ssr) {
      memo.babel.plugins = [...(memo.babel.plugins || []), importPlugin('antd', options), importPlugin('antd-mobile', options), [require.resolve('babel-plugin-import'), {
        libraryName: 'ant-design-pro',
        libraryDirectory: 'lib',
        style: true,
        camel2DashComponentName: false
      }, 'ant-design-pro']];
    }

    return memo;
  });
  api.chainWebpackConfig(webpackConfig => {
    webpackConfig.resolve.alias.set('antd', compatDirname('antd/package.json', cwd, (0, _path().dirname)(require.resolve('antd/package.json')))).set('antd-mobile', compatDirname('antd-mobile/package.json', cwd, (0, _path().dirname)(require.resolve('antd-mobile/package.json'))));
  });
}
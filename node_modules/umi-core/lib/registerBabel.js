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

function _slash() {
  const data = _interopRequireDefault(require("slash2"));

  _slash = function _slash() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(cwd, extraFiles = []) {
  const umiEnv = process.env.UMI_ENV;

  require('@babel/register')({
    presets: [require.resolve('@babel/preset-typescript'), [require.resolve('babel-preset-umi'), {
      env: {
        targets: {
          node: 8
        }
      },
      transformRuntime: false
    }]],
    ignore: [/node_modules/],
    only: [(0, _path().join)(cwd, 'config'), (0, _path().join)(cwd, '.umirc.js'), (0, _path().join)(cwd, '.umirc.ts'), ...(umiEnv ? [(0, _path().join)(cwd, `.umirc.${umiEnv}.js`), (0, _path().join)(cwd, `.umirc.${umiEnv}.ts`)] : [])].concat(extraFiles).map(file => (0, _slash().default)(file)),
    extensions: ['.es6', '.es', '.jsx', '.js', '.mjs', '.ts', '.tsx'],
    babelrc: false,
    cache: false
  });
}
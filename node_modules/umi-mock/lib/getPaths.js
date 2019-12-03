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

function _umiUtils() {
  const data = require("umi-utils");

  _umiUtils = function _umiUtils() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(cwd) {
  const winCwd = (0, _umiUtils().winPath)(cwd);
  const absMockPath = (0, _umiUtils().winPath)((0, _path().join)(winCwd, 'mock'));
  const absConfigPath = (0, _umiUtils().winPath)((0, _path().join)(winCwd, '.umirc.mock.js'));
  const absConfigPathWithTS = (0, _umiUtils().winPath)((0, _path().join)(winCwd, '.umirc.mock.ts'));
  return {
    absMockPath,
    absConfigPath,
    absConfigPathWithTS
  };
}
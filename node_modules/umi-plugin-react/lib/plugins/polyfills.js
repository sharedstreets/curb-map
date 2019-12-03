"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _umiPluginPolyfills().default;
  }
});

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _umiPluginPolyfills() {
  const data = _interopRequireDefault(require("umi-plugin-polyfills"));

  _umiPluginPolyfills = function _umiPluginPolyfills() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
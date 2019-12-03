"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isEmpty = require('lodash/isEmpty');

// 方便测试
var _default = option => {
  if (Array.isArray(option) && option.length > 0) {
    return option.filter(script => !isEmpty(script)).map(aScript => {
      if (typeof aScript === 'string') {
        return /^(http:|https:)?\/\//.test(aScript) ? {
          src: aScript
        } : {
          content: aScript
        };
      } // [{ content: '', async: true, crossOrigin: true }]


      return aScript;
    });
  }

  return [];
};

exports.default = _default;
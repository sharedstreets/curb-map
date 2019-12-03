"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootContainer = rootContainer;
exports.initialProps = initialProps;
exports.modifyInitialProps = modifyInitialProps;

var _react = _interopRequireDefault(require("react"));

var _dva = require("@tmp/dva");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rootContainer(container) {
  return _react.default.createElement(_dva._DvaContainer, null, container);
}

function initialProps(props) {
  if (props) return props;

  var state = (0, _dva.getApp)()._store.getState();

  return Object.keys(state).reduce(function (memo, key) {
    if (!['@@dva', 'loading', 'routing'].includes(key)) {
      memo[key] = state[key];
    }

    return memo;
  }, {});
}

function modifyInitialProps(value) {
  if (value) {
    return {
      store: (0, _dva.getApp)()._store
    };
  }

  return {};
}
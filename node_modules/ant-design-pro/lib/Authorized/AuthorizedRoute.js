'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _umi = require('umi');

var _Authorized = require('./Authorized');

var _Authorized2 = _interopRequireDefault(_Authorized);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// TODO: umi只会返回render和rest
var AuthorizedRoute = function AuthorizedRoute(_ref) {
  var Component = _ref.component,
      _render = _ref.render,
      authority = _ref.authority,
      redirectPath = _ref.redirectPath,
      rest = _objectWithoutProperties(_ref, ['component', 'render', 'authority', 'redirectPath']);

  return _react2.default.createElement(
    _Authorized2.default,
    {
      authority: authority,
      noMatch: _react2.default.createElement(_umi.Route, _extends({}, rest, { render: function render() {
          return _react2.default.createElement(_umi.Redirect, { to: { pathname: redirectPath } });
        } }))
    },
    _react2.default.createElement(_umi.Route, _extends({}, rest, { render: function render(props) {
        return Component ? _react2.default.createElement(Component, props) : _render(props);
      } }))
  );
};

exports.default = AuthorizedRoute;
module.exports = exports.default;
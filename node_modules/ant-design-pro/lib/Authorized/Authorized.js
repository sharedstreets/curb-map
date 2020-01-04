'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CheckPermissions = require('./CheckPermissions');

var _CheckPermissions2 = _interopRequireDefault(_CheckPermissions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Authorized = function Authorized(_ref) {
  var children = _ref.children,
      authority = _ref.authority,
      _ref$noMatch = _ref.noMatch,
      noMatch = _ref$noMatch === undefined ? null : _ref$noMatch;

  var childrenRender = typeof children === 'undefined' ? null : children;
  return (0, _CheckPermissions2.default)(authority, childrenRender, noMatch);
};

exports.default = Authorized;
module.exports = exports.default;
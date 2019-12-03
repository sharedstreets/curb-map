'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Authorized = require('./Authorized');

var _Authorized2 = _interopRequireDefault(_Authorized);

var _AuthorizedRoute = require('./AuthorizedRoute');

var _AuthorizedRoute2 = _interopRequireDefault(_AuthorizedRoute);

var _Secured = require('./Secured');

var _Secured2 = _interopRequireDefault(_Secured);

var _CheckPermissions = require('./CheckPermissions');

var _CheckPermissions2 = _interopRequireDefault(_CheckPermissions);

var _renderAuthorize = require('./renderAuthorize');

var _renderAuthorize2 = _interopRequireDefault(_renderAuthorize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Authorized2.default.Secured = _Secured2.default;
_Authorized2.default.AuthorizedRoute = _AuthorizedRoute2.default;
_Authorized2.default.check = _CheckPermissions2.default;

exports.default = (0, _renderAuthorize2.default)(_Authorized2.default);
module.exports = exports.default;
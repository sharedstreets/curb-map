'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable import/no-mutable-exports */
var CURRENT = 'NULL';
/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
var renderAuthorize = function renderAuthorize(Authorized) {
  return function (currentAuthority) {
    if (currentAuthority) {
      if (typeof currentAuthority === 'function') {
        exports.CURRENT = CURRENT = currentAuthority();
      }
      if (Object.prototype.toString.call(currentAuthority) === '[object String]' || Array.isArray(currentAuthority)) {
        exports.CURRENT = CURRENT = currentAuthority;
      }
    } else {
      exports.CURRENT = CURRENT = 'NULL';
    }
    return Authorized;
  };
};

exports.CURRENT = CURRENT;

exports.default = function (Authorized) {
  return renderAuthorize(Authorized);
};
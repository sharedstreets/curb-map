"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = endWithSlash;

function endWithSlash(path) {
  return path.slice(-1) !== '/' ? `${path}/` : path;
}
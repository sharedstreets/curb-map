"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = optsToArray;

function optsToArray(item) {
  if (item === null || item === undefined) return [];

  if (Array.isArray(item)) {
    return item;
  } else {
    return [item];
  }
}
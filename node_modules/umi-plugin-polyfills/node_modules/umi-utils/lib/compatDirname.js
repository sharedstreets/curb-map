"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

function _default(path, cwd, fallback) {
  const pkg = findPkg(path, cwd);
  if (pkg) return pkg;

  if (cwd !== process.cwd()) {
    const pkg = findPkg(path, process.cwd());
    if (pkg) return pkg;
  }

  return fallback;
}

function findPkg(path, cwd) {
  const pkgPath = (0, _path.join)(cwd, 'package.json');
  const library = path.split('/')[0];

  if ((0, _fs.existsSync)(pkgPath)) {
    const _require = require(pkgPath),
          _require$dependencies = _require.dependencies,
          dependencies = _require$dependencies === void 0 ? {} : _require$dependencies,
          _require$devDependenc = _require.devDependencies,
          devDependencies = _require$devDependenc === void 0 ? {} : _require$devDependenc; // eslint-disable-line


    if (dependencies[library] || devDependencies[library]) {
      const pkgPath = (0, _path.dirname)((0, _path.join)(cwd, 'node_modules', path));

      if ((0, _fs.existsSync)(pkgPath)) {
        return pkgPath;
      }
    }
  }
}
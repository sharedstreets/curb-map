"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printUmiError = printUmiError;
exports.UmiError = void 0;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function _chalk() {
    return data;
  };

  return data;
}

function _signale() {
  const data = _interopRequireDefault(require("signale"));

  _signale = function _signale() {
    return data;
  };

  return data;
}

function _marked() {
  const data = _interopRequireDefault(require("marked"));

  _marked = function _marked() {
    return data;
  };

  return data;
}

function _markedTerminal() {
  const data = _interopRequireDefault(require("marked-terminal"));

  _markedTerminal = function _markedTerminal() {
    return data;
  };

  return data;
}

function _fs() {
  const data = require("fs");

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_marked().default.setOptions({
  renderer: new (_markedTerminal().default)()
}); // 支持内部框架扩展 error code map


const ERROR_CODE_MAP = require(process.env.ERROR_CODE_MAP_PATH || '@umijs/error-code-map');

class UmiError extends Error {
  constructor(opts, ...params) {
    const message = opts.message,
          code = opts.code,
          context = opts.context;
    super(message, ...params);
    this.code = code;
    this.context = context || {};
    this.test();
  }

  test() {
    if (this.code) {
      return;
    }

    for (var _i = 0, _Object$keys = Object.keys(ERROR_CODE_MAP); _i < _Object$keys.length; _i++) {
      const c = _Object$keys[_i];
      const test = ERROR_CODE_MAP[c].test;

      if (test && test({
        error: this,
        context: this.context
      })) {
        this.code = c;
        break;
      }
    }
  }

}

exports.UmiError = UmiError;

function printUmiError(e, opts = {}) {
  if (!(e instanceof UmiError)) {
    _signale().default.error(e);

    return;
  }

  const detailsOnly = opts.detailsOnly;
  const code = e.code;
  if (!code) return;
  const _ERROR_CODE_MAP$code = ERROR_CODE_MAP[code],
        message = _ERROR_CODE_MAP$code.message,
        details = _ERROR_CODE_MAP$code.details;
  console.error(`\n${_chalk().default.bgRed.black(' ERROR CODE ')} ${_chalk().default.red(code)}`);

  if (!detailsOnly) {
    console.error(`\n${_chalk().default.bgRed.black(' ERROR ')} ${_chalk().default.red(e.message || message)}`);
  }

  const osLocale = require('os-locale');

  const lang = osLocale.sync();

  if (lang === 'zh-CN') {
    console.error(`\n${_chalk().default.bgMagenta.black(' DETAILS ')}\n\n${(0, _marked().default)(details['zh-CN'])}`);
  } else {
    console.error(`\n${_chalk().default.bgMagenta.black(' DETAILS ')}\n\n${(0, _marked().default)(details.en)}`);
  }

  if (!detailsOnly && e.stack) {
    console.error(`${_chalk().default.bgRed.black(' STACK ')}\n\n${e.stack.split('\n').slice(1).join('\n')}`);
  } // 将错误信息输出到文件


  if (process.env.DUMP_ERROR_PATH) {
    try {
      if ((0, _fs().existsSync)(process.env.DUMP_ERROR_PATH)) {
        return;
      }

      (0, _fs().writeFileSync)(process.env.DUMP_ERROR_PATH, JSON.stringify({
        code,
        message,
        stack: e.stack
      }));
    } catch (_) {//
    }
  }
}
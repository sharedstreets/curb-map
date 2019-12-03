"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

function _chokidar() {
  const data = _interopRequireDefault(require("chokidar"));

  _chokidar = function _chokidar() {
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

function _umiUtils() {
  const data = require("umi-utils");

  _umiUtils = function _umiUtils() {
    return data;
  };

  return data;
}

var _matchMock = _interopRequireDefault(require("./matchMock"));

var _getMockData = _interopRequireDefault(require("./getMockData"));

var _getPaths2 = _interopRequireDefault(require("./getPaths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = require('debug')('umi-mock:createMiddleware');

function noop() {}

function _default(opts = {}) {
  const cwd = opts.cwd,
        _opts$errors = opts.errors,
        errors = _opts$errors === void 0 ? [] : _opts$errors,
        config = opts.config,
        absPagesPath = opts.absPagesPath,
        absSrcPath = opts.absSrcPath,
        watch = opts.watch,
        _opts$onStart = opts.onStart,
        onStart = _opts$onStart === void 0 ? noop : _opts$onStart,
        _opts$onError = opts.onError,
        onError = _opts$onError === void 0 ? noop : _opts$onError;

  const _getPaths = (0, _getPaths2.default)(cwd),
        absMockPath = _getPaths.absMockPath,
        absConfigPath = _getPaths.absConfigPath,
        absConfigPathWithTS = _getPaths.absConfigPathWithTS;

  const mockPaths = [absMockPath, absConfigPath, absConfigPathWithTS];
  const paths = [...mockPaths, (0, _umiUtils().winPath)((0, _path().basename)(absSrcPath) === 'src' ? absSrcPath : absPagesPath)];
  let mockData = null; // registerBabel 和 clean require cache 包含整个 src 目录
  // 而 watch 只包含 pages/**/_mock.[jt]s

  onStart({
    paths
  });
  fetchMockData();
  let watcher = null;

  if (watch) {
    // chokidar 在 windows 下使用反斜杠组成的 glob 无法正确 watch 文件变动
    // ref: https://github.com/paulmillr/chokidar/issues/777
    const absPagesGlobPath = (0, _umiUtils().winPath)((0, _path().join)(absPagesPath, '**/_mock.[jt]s'));
    watcher = _chokidar().default.watch([...mockPaths, absPagesGlobPath], {
      ignoreInitial: true
    });
    watcher.on('all', (event, file) => {
      debug(`[${event}] ${file}, reload mock data`);
      errors.splice(0, errors.length);
      cleanRequireCache();
      fetchMockData();

      if (!errors.length) {
        _signale().default.success(`Mock files parse success`);
      }
    });
    process.once('SIGINT', () => {
      watcher.close();
    });
  }

  function cleanRequireCache() {
    Object.keys(require.cache).forEach(file => {
      if (paths.some(path => {
        return (0, _umiUtils().winPath)(file).indexOf(path) > -1;
      })) {
        delete require.cache[file];
      }
    });
  }

  function fetchMockData() {
    mockData = (0, _getMockData.default)({
      cwd,
      config,
      absPagesPath,

      onError(e) {
        onError(e);
        errors.push(e);
      }

    });
  }

  return {
    middleware: function UMI_MOCK(req, res, next) {
      const match = mockData && (0, _matchMock.default)(req, mockData);

      if (match) {
        debug(`mock matched: [${match.method}] ${match.path}`);
        return match.handler(req, res, next);
      } else {
        return next();
      }
    },
    watcher
  };
}
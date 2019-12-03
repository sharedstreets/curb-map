'use strict';

var _core = require('@antv/g2/lib/core');

var _core2 = _interopRequireDefault(_core);

var _util = require('./shared/util');

var _util2 = _interopRequireDefault(_util);

var _themes = require('./themes');

var _themes2 = _interopRequireDefault(_themes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BizCharts = {
  G2: _core2.default,
  Util: _util2.default,
  Shape: _core.Shape,
  Animate: _core.Animate,
  PathUtil: _core.PathUtil,
  track: function track() {
    var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    // for srs
    _core2.default.track(enable);
  },
  setTheme: function setTheme(theme) {
    var themeObj = theme;
    if (typeof theme === 'string' && _themes2.default[theme]) {
      themeObj = _themes2.default[theme];
    }

    _core2.default.Global.setTheme(themeObj);
  }
};

exports.default = BizCharts;
module.exports = BizCharts;
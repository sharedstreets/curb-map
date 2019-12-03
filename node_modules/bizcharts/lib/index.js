'use strict';

var _core = require('@antv/g2/lib/core');

var _core2 = _interopRequireDefault(_core);

var _interaction = require('@antv/g2/lib/interaction');

var _interaction2 = _interopRequireDefault(_interaction);

var _util = require('./shared/util');

var _util2 = _interopRequireDefault(_util);

var _themes = require('./themes');

var _themes2 = _interopRequireDefault(_themes);

var _components = require('./components');

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// G2.Global.animate = false;

var BizCharts = _util2.default.mix(components, {
  G2: _core2.default,
  Util: _util2.default,
  Shape: _core.Shape,
  Animate: _core.Animate,
  PathUtil: _core.PathUtil,
  track: function track() {},
  setTheme: function setTheme(theme) {
    var themeObj = theme;
    if (typeof theme === 'string' && _themes2.default[theme]) {
      themeObj = _themes2.default[theme];
    }

    _core2.default.Global.setTheme(themeObj);
  },

  Interactions: _interaction2.default
});

exports.default = BizCharts;
module.exports = BizCharts;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineChart = exports.TagCloud = exports.WaterWave = exports.Field = exports.ChartCard = exports.MiniProgress = exports.MiniArea = exports.MiniBar = exports.Radar = exports.Gauge = exports.Pie = exports.Bar = exports.yuan = exports.default = undefined;

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _ChartCard = require('./ChartCard');

var _ChartCard2 = _interopRequireDefault(_ChartCard);

var _Field = require('./Field');

var _Field2 = _interopRequireDefault(_Field);

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _Pie = require('./Pie');

var _Pie2 = _interopRequireDefault(_Pie);

var _Radar = require('./Radar');

var _Radar2 = _interopRequireDefault(_Radar);

var _Gauge = require('./Gauge');

var _Gauge2 = _interopRequireDefault(_Gauge);

var _MiniArea = require('./MiniArea');

var _MiniArea2 = _interopRequireDefault(_MiniArea);

var _MiniBar = require('./MiniBar');

var _MiniBar2 = _interopRequireDefault(_MiniBar);

var _MiniProgress = require('./MiniProgress');

var _MiniProgress2 = _interopRequireDefault(_MiniProgress);

var _WaterWave = require('./WaterWave');

var _WaterWave2 = _interopRequireDefault(_WaterWave);

var _TagCloud = require('./TagCloud');

var _TagCloud2 = _interopRequireDefault(_TagCloud);

var _TimelineChart = require('./TimelineChart');

var _TimelineChart2 = _interopRequireDefault(_TimelineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yuan = function yuan(val) {
  return '\xA5 ' + (0, _numeral2.default)(val).format('0,0');
};

var Charts = {
  yuan: yuan,
  Bar: _Bar2.default,
  Pie: _Pie2.default,
  Gauge: _Gauge2.default,
  Radar: _Radar2.default,
  MiniBar: _MiniBar2.default,
  MiniArea: _MiniArea2.default,
  MiniProgress: _MiniProgress2.default,
  ChartCard: _ChartCard2.default,
  Field: _Field2.default,
  WaterWave: _WaterWave2.default,
  TagCloud: _TagCloud2.default,
  TimelineChart: _TimelineChart2.default
};

exports.default = Charts;
exports.yuan = yuan;
exports.Bar = _Bar2.default;
exports.Pie = _Pie2.default;
exports.Gauge = _Gauge2.default;
exports.Radar = _Radar2.default;
exports.MiniBar = _MiniBar2.default;
exports.MiniArea = _MiniArea2.default;
exports.MiniProgress = _MiniProgress2.default;
exports.ChartCard = _ChartCard2.default;
exports.Field = _Field2.default;
exports.WaterWave = _WaterWave2.default;
exports.TagCloud = _TagCloud2.default;
exports.TimelineChart = _TimelineChart2.default;
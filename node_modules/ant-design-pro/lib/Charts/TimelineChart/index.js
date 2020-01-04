'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bizcharts = require('bizcharts');

var _dataSet = require('@antv/data-set');

var _dataSet2 = _interopRequireDefault(_dataSet);

var _bizchartsPluginSlider = require('bizcharts-plugin-slider');

var _bizchartsPluginSlider2 = _interopRequireDefault(_bizchartsPluginSlider);

var _autoHeight = require('../autoHeight');

var _autoHeight2 = _interopRequireDefault(_autoHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'timelineChart': 'antd-pro-charts-timeline-chart-timelineChart'
};
var TimelineChart = (_dec = (0, _autoHeight2.default)(), _dec(_class = function (_React$Component) {
  _inherits(TimelineChart, _React$Component);

  function TimelineChart() {
    _classCallCheck(this, TimelineChart);

    return _possibleConstructorReturn(this, (TimelineChart.__proto__ || Object.getPrototypeOf(TimelineChart)).apply(this, arguments));
  }

  _createClass(TimelineChart, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          _props$height = _props.height,
          height = _props$height === undefined ? 400 : _props$height,
          _props$padding = _props.padding,
          padding = _props$padding === undefined ? [60, 20, 40, 40] : _props$padding,
          _props$titleMap = _props.titleMap,
          titleMap = _props$titleMap === undefined ? {
        y1: 'y1',
        y2: 'y2'
      } : _props$titleMap,
          _props$borderWidth = _props.borderWidth,
          borderWidth = _props$borderWidth === undefined ? 2 : _props$borderWidth,
          sourceData = _props.data;


      var data = Array.isArray(sourceData) ? sourceData : [{ x: 0, y1: 0, y2: 0 }];

      data.sort(function (a, b) {
        return a.x - b.x;
      });

      var max = void 0;
      if (data[0] && data[0].y1 && data[0].y2) {
        max = Math.max([].concat(_toConsumableArray(data)).sort(function (a, b) {
          return b.y1 - a.y1;
        })[0].y1, [].concat(_toConsumableArray(data)).sort(function (a, b) {
          return b.y2 - a.y2;
        })[0].y2);
      }

      var ds = new _dataSet2.default({
        state: {
          start: data[0].x,
          end: data[data.length - 1].x
        }
      });

      var dv = ds.createView();
      dv.source(data).transform({
        type: 'filter',
        callback: function callback(obj) {
          var date = obj.x;
          return date <= ds.state.end && date >= ds.state.start;
        }
      }).transform({
        type: 'map',
        callback: function callback(row) {
          var newRow = _extends({}, row);
          newRow[titleMap.y1] = row.y1;
          newRow[titleMap.y2] = row.y2;
          return newRow;
        }
      }).transform({
        type: 'fold',
        fields: [titleMap.y1, titleMap.y2], // 展开字段集
        key: 'key', // key字段
        value: 'value' // value字段
      });

      var timeScale = {
        type: 'time',
        tickInterval: 60 * 60 * 1000,
        mask: 'HH:mm',
        range: [0, 1]
      };

      var cols = {
        x: timeScale,
        value: {
          max: max,
          min: 0
        }
      };

      var SliderGen = function SliderGen() {
        return _react2.default.createElement(_bizchartsPluginSlider2.default, {
          padding: [0, padding[1] + 20, 0, padding[3]],
          width: 'auto',
          height: 26,
          xAxis: 'x',
          yAxis: 'y1',
          scales: { x: timeScale },
          data: data,
          start: ds.state.start,
          end: ds.state.end,
          backgroundChart: { type: 'line' },
          onChange: function onChange(_ref) {
            var startValue = _ref.startValue,
                endValue = _ref.endValue;

            ds.setState('start', startValue);
            ds.setState('end', endValue);
          }
        });
      };

      return _react2.default.createElement(
        'div',
        { className: styles.timelineChart, style: { height: height + 30 } },
        _react2.default.createElement(
          'div',
          null,
          title && _react2.default.createElement(
            'h4',
            null,
            title
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            { height: height, padding: padding, data: dv, scale: cols, forceFit: true },
            _react2.default.createElement(_bizcharts.Axis, { name: 'x' }),
            _react2.default.createElement(_bizcharts.Tooltip, null),
            _react2.default.createElement(_bizcharts.Legend, { name: 'key', position: 'top' }),
            _react2.default.createElement(_bizcharts.Geom, { type: 'line', position: 'x*value', size: borderWidth, color: 'key' })
          ),
          _react2.default.createElement(
            'div',
            { style: { marginRight: -20 } },
            _react2.default.createElement(SliderGen, null)
          )
        )
      );
    }
  }]);

  return TimelineChart;
}(_react2.default.Component)) || _class);
exports.default = TimelineChart;
module.exports = exports.default;
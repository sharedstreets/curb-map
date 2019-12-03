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

var _autoHeight = require('../autoHeight');

var _autoHeight2 = _interopRequireDefault(_autoHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'miniChart': 'antd-pro-charts-miniChart',
  'chartContent': 'antd-pro-charts-chartContent',
  'chartLoading': 'antd-pro-charts-chartLoading'
};
var MiniArea = (_dec = (0, _autoHeight2.default)(), _dec(_class = function (_React$PureComponent) {
  _inherits(MiniArea, _React$PureComponent);

  function MiniArea() {
    _classCallCheck(this, MiniArea);

    return _possibleConstructorReturn(this, (MiniArea.__proto__ || Object.getPrototypeOf(MiniArea)).apply(this, arguments));
  }

  _createClass(MiniArea, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          _props$data = _props.data,
          data = _props$data === undefined ? [] : _props$data,
          _props$forceFit = _props.forceFit,
          forceFit = _props$forceFit === undefined ? true : _props$forceFit,
          _props$color = _props.color,
          color = _props$color === undefined ? 'rgba(24, 144, 255, 0.2)' : _props$color,
          _props$borderColor = _props.borderColor,
          borderColor = _props$borderColor === undefined ? '#1089ff' : _props$borderColor,
          _props$scale = _props.scale,
          scale = _props$scale === undefined ? {} : _props$scale,
          _props$borderWidth = _props.borderWidth,
          borderWidth = _props$borderWidth === undefined ? 2 : _props$borderWidth,
          line = _props.line,
          xAxis = _props.xAxis,
          yAxis = _props.yAxis,
          _props$animate = _props.animate,
          animate = _props$animate === undefined ? true : _props$animate;


      var padding = [36, 5, 30, 5];

      var scaleProps = {
        x: _extends({
          type: 'cat',
          range: [0, 1]
        }, scale.x),
        y: _extends({
          min: 0
        }, scale.y)
      };

      var tooltip = ['x*y', function (x, y) {
        return {
          name: x,
          value: y
        };
      }];

      var chartHeight = height + 54;

      return _react2.default.createElement(
        'div',
        { className: styles.miniChart, style: { height: height } },
        _react2.default.createElement(
          'div',
          { className: styles.chartContent },
          height > 0 && _react2.default.createElement(
            _bizcharts.Chart,
            {
              animate: animate,
              scale: scaleProps,
              height: chartHeight,
              forceFit: forceFit,
              data: data,
              padding: padding
            },
            _react2.default.createElement(_bizcharts.Axis, _extends({
              key: 'axis-x',
              name: 'x',
              label: false,
              line: false,
              tickLine: false,
              grid: false
            }, xAxis)),
            _react2.default.createElement(_bizcharts.Axis, _extends({
              key: 'axis-y',
              name: 'y',
              label: false,
              line: false,
              tickLine: false,
              grid: false
            }, yAxis)),
            _react2.default.createElement(_bizcharts.Tooltip, { showTitle: false, crosshairs: false }),
            _react2.default.createElement(_bizcharts.Geom, {
              type: 'area',
              position: 'x*y',
              color: color,
              tooltip: tooltip,
              shape: 'smooth',
              style: {
                fillOpacity: 1
              }
            }),
            line ? _react2.default.createElement(_bizcharts.Geom, {
              type: 'line',
              position: 'x*y',
              shape: 'smooth',
              color: borderColor,
              size: borderWidth,
              tooltip: false
            }) : _react2.default.createElement('span', { style: { display: 'none' } })
          )
        )
      );
    }
  }]);

  return MiniArea;
}(_react2.default.PureComponent)) || _class);
exports.default = MiniArea;
module.exports = exports.default;
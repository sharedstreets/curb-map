'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
var MiniBar = (_dec = (0, _autoHeight2.default)(), _dec(_class = function (_React$Component) {
  _inherits(MiniBar, _React$Component);

  function MiniBar() {
    _classCallCheck(this, MiniBar);

    return _possibleConstructorReturn(this, (MiniBar.__proto__ || Object.getPrototypeOf(MiniBar)).apply(this, arguments));
  }

  _createClass(MiniBar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          _props$forceFit = _props.forceFit,
          forceFit = _props$forceFit === undefined ? true : _props$forceFit,
          _props$color = _props.color,
          color = _props$color === undefined ? '#1890FF' : _props$color,
          _props$data = _props.data,
          data = _props$data === undefined ? [] : _props$data;


      var scale = {
        x: {
          type: 'cat'
        },
        y: {
          min: 0
        }
      };

      var padding = [36, 5, 30, 5];

      var tooltip = ['x*y', function (x, y) {
        return {
          name: x,
          value: y
        };
      }];

      // for tooltip not to be hide
      var chartHeight = height + 54;

      return _react2.default.createElement(
        'div',
        { className: styles.miniChart, style: { height: height } },
        _react2.default.createElement(
          'div',
          { className: styles.chartContent },
          _react2.default.createElement(
            _bizcharts.Chart,
            {
              scale: scale,
              height: chartHeight,
              forceFit: forceFit,
              data: data,
              padding: padding
            },
            _react2.default.createElement(_bizcharts.Tooltip, { showTitle: false, crosshairs: false }),
            _react2.default.createElement(_bizcharts.Geom, { type: 'interval', position: 'x*y', color: color, tooltip: tooltip })
          )
        )
      );
    }
  }]);

  return MiniBar;
}(_react2.default.Component)) || _class);
exports.default = MiniBar;
module.exports = exports.default;
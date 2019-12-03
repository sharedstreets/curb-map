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

var Arc = _bizcharts.Guide.Arc,
    Html = _bizcharts.Guide.Html,
    Line = _bizcharts.Guide.Line;


var defaultFormatter = function defaultFormatter(val) {
  switch (val) {
    case '2':
      return '差';
    case '4':
      return '中';
    case '6':
      return '良';
    case '8':
      return '优';
    default:
      return '';
  }
};

_bizcharts.Shape.registerShape('point', 'pointer', {
  drawShape: function drawShape(cfg, group) {
    var point = cfg.points[0];
    point = this.parsePoint(point);
    var center = this.parsePoint({
      x: 0,
      y: 0
    });
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y,
        stroke: cfg.color,
        lineWidth: 2,
        lineCap: 'round'
      }
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 6,
        stroke: cfg.color,
        lineWidth: 3,
        fill: '#fff'
      }
    });
  }
});

var Gauge = (_dec = (0, _autoHeight2.default)(), _dec(_class = function (_React$Component) {
  _inherits(Gauge, _React$Component);

  function Gauge() {
    _classCallCheck(this, Gauge);

    return _possibleConstructorReturn(this, (Gauge.__proto__ || Object.getPrototypeOf(Gauge)).apply(this, arguments));
  }

  _createClass(Gauge, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          height = _props.height,
          percent = _props.percent,
          _props$forceFit = _props.forceFit,
          forceFit = _props$forceFit === undefined ? true : _props$forceFit,
          _props$formatter = _props.formatter,
          formatter = _props$formatter === undefined ? defaultFormatter : _props$formatter,
          _props$color = _props.color,
          color = _props$color === undefined ? '#2F9CFF' : _props$color,
          _props$bgColor = _props.bgColor,
          bgColor = _props$bgColor === undefined ? '#F0F2F5' : _props$bgColor;

      var cols = {
        value: {
          type: 'linear',
          min: 0,
          max: 10,
          tickCount: 6,
          nice: true
        }
      };
      var data = [{ value: percent / 10 }];
      return _react2.default.createElement(
        _bizcharts.Chart,
        { height: height, data: data, scale: cols, padding: [-16, 0, 16, 0], forceFit: forceFit },
        _react2.default.createElement(_bizcharts.Coord, { type: 'polar', startAngle: -1.25 * Math.PI, endAngle: 0.25 * Math.PI, radius: 0.8 }),
        _react2.default.createElement(_bizcharts.Axis, { name: '1', line: null }),
        _react2.default.createElement(_bizcharts.Axis, {
          line: null,
          tickLine: null,
          subTickLine: null,
          name: 'value',
          zIndex: 2,
          gird: null,
          label: {
            offset: -12,
            formatter: formatter,
            textStyle: {
              fontSize: 12,
              fill: 'rgba(0, 0, 0, 0.65)',
              textAlign: 'center'
            }
          }
        }),
        _react2.default.createElement(
          _bizcharts.Guide,
          null,
          _react2.default.createElement(Line, {
            start: [3, 0.905],
            end: [3, 0.85],
            lineStyle: {
              stroke: color,
              lineDash: null,
              lineWidth: 2
            }
          }),
          _react2.default.createElement(Line, {
            start: [5, 0.905],
            end: [5, 0.85],
            lineStyle: {
              stroke: color,
              lineDash: null,
              lineWidth: 3
            }
          }),
          _react2.default.createElement(Line, {
            start: [7, 0.905],
            end: [7, 0.85],
            lineStyle: {
              stroke: color,
              lineDash: null,
              lineWidth: 3
            }
          }),
          _react2.default.createElement(Arc, {
            zIndex: 0,
            start: [0, 0.965],
            end: [10, 0.965],
            style: {
              stroke: bgColor,
              lineWidth: 10
            }
          }),
          _react2.default.createElement(Arc, {
            zIndex: 1,
            start: [0, 0.965],
            end: [data[0].value, 0.965],
            style: {
              stroke: color,
              lineWidth: 10
            }
          }),
          _react2.default.createElement(Html, {
            position: ['50%', '95%'],
            html: function html() {
              return '\n                <div style="width: 300px;text-align: center;font-size: 12px!important;">\n                  <p style="font-size: 14px; color: rgba(0,0,0,0.43);margin: 0;">' + title + '</p>\n                  <p style="font-size: 24px;color: rgba(0,0,0,0.85);margin: 0;">\n                    ' + (data[0].value * 10).toFixed(2) + '%\n                  </p>\n                </div>';
            }
          })
        ),
        _react2.default.createElement(_bizcharts.Geom, {
          line: false,
          type: 'point',
          position: 'value*1',
          shape: 'pointer',
          color: color,
          active: false
        })
      );
    }
  }]);

  return Gauge;
}(_react2.default.Component)) || _class);
exports.default = Gauge;
module.exports = exports.default;
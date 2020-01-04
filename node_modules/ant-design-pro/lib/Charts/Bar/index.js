'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bizcharts = require('bizcharts');

var _debounce = require('lodash-decorators/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _bind = require('lodash-decorators/bind');

var _bind2 = _interopRequireDefault(_bind);

var _autoHeight = require('../autoHeight');

var _autoHeight2 = _interopRequireDefault(_autoHeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var styles = {
  'miniChart': 'antd-pro-charts-miniChart',
  'chartContent': 'antd-pro-charts-chartContent',
  'chartLoading': 'antd-pro-charts-chartLoading'
};
var Bar = (_dec = (0, _autoHeight2.default)(), _dec2 = (0, _bind2.default)(), _dec3 = (0, _debounce2.default)(400), _dec(_class = (_class2 = function (_Component) {
  _inherits(Bar, _Component);

  function Bar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bar.__proto__ || Object.getPrototypeOf(Bar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      autoHideXLabels: false
    }, _this.handleRoot = function (n) {
      _this.root = n;
    }, _this.handleRef = function (n) {
      _this.node = n;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.resize, { passive: true });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: 'resize',
    value: function resize() {
      if (!this.node) {
        return;
      }
      var canvasWidth = this.node.parentNode.clientWidth;
      var _props = this.props,
          _props$data = _props.data,
          data = _props$data === undefined ? [] : _props$data,
          _props$autoLabel = _props.autoLabel,
          autoLabel = _props$autoLabel === undefined ? true : _props$autoLabel;

      if (!autoLabel) {
        return;
      }
      var minWidth = data.length * 30;
      var autoHideXLabels = this.state.autoHideXLabels;


      if (canvasWidth <= minWidth) {
        if (!autoHideXLabels) {
          this.setState({
            autoHideXLabels: true
          });
        }
      } else if (autoHideXLabels) {
        this.setState({
          autoHideXLabels: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          height = _props2.height,
          title = _props2.title,
          _props2$forceFit = _props2.forceFit,
          forceFit = _props2$forceFit === undefined ? true : _props2$forceFit,
          data = _props2.data,
          _props2$color = _props2.color,
          color = _props2$color === undefined ? 'rgba(24, 144, 255, 0.85)' : _props2$color,
          padding = _props2.padding;
      var autoHideXLabels = this.state.autoHideXLabels;


      var scale = {
        x: {
          type: 'cat'
        },
        y: {
          min: 0
        }
      };

      var tooltip = ['x*y', function (x, y) {
        return {
          name: x,
          value: y
        };
      }];

      return _react2.default.createElement(
        'div',
        { className: styles.chart, style: { height: height }, ref: this.handleRoot },
        _react2.default.createElement(
          'div',
          { ref: this.handleRef },
          title && _react2.default.createElement(
            'h4',
            { style: { marginBottom: 20 } },
            title
          ),
          _react2.default.createElement(
            _bizcharts.Chart,
            {
              scale: scale,
              height: title ? height - 41 : height,
              forceFit: forceFit,
              data: data,
              padding: padding || 'auto'
            },
            _react2.default.createElement(_bizcharts.Axis, {
              name: 'x',
              title: false,
              label: autoHideXLabels ? false : {},
              tickLine: autoHideXLabels ? false : {}
            }),
            _react2.default.createElement(_bizcharts.Axis, { name: 'y', min: 0 }),
            _react2.default.createElement(_bizcharts.Tooltip, { showTitle: false, crosshairs: false }),
            _react2.default.createElement(_bizcharts.Geom, { type: 'interval', position: 'x*y', color: color, tooltip: tooltip })
          )
        )
      );
    }
  }]);

  return Bar;
}(_react.Component), (_applyDecoratedDescriptor(_class2.prototype, 'resize', [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'resize'), _class2.prototype)), _class2)) || _class);
exports.default = Bar;
module.exports = exports.default;
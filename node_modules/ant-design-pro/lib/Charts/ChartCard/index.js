'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = require('antd/lib/card');

var _card2 = _interopRequireDefault(_card);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'chartCard': 'antd-pro-charts-chart-card-chartCard',
  'chartTop': 'antd-pro-charts-chart-card-chartTop',
  'chartTopMargin': 'antd-pro-charts-chart-card-chartTopMargin',
  'chartTopHasMargin': 'antd-pro-charts-chart-card-chartTopHasMargin',
  'metaWrap': 'antd-pro-charts-chart-card-metaWrap',
  'avatar': 'antd-pro-charts-chart-card-avatar',
  'meta': 'antd-pro-charts-chart-card-meta',
  'action': 'antd-pro-charts-chart-card-action',
  'total': 'antd-pro-charts-chart-card-total',
  'content': 'antd-pro-charts-chart-card-content',
  'contentFixed': 'antd-pro-charts-chart-card-contentFixed',
  'footer': 'antd-pro-charts-chart-card-footer',
  'footerMargin': 'antd-pro-charts-chart-card-footerMargin'
};


var renderTotal = function renderTotal(total) {
  var totalDom = void 0;
  switch (typeof total === 'undefined' ? 'undefined' : _typeof(total)) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = _react2.default.createElement(
        'div',
        { className: styles.total },
        total()
      );
      break;
    default:
      totalDom = _react2.default.createElement(
        'div',
        { className: styles.total },
        total
      );
  }
  return totalDom;
};

var ChartCard = function (_React$PureComponent) {
  _inherits(ChartCard, _React$PureComponent);

  function ChartCard() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ChartCard);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ChartCard.__proto__ || Object.getPrototypeOf(ChartCard)).call.apply(_ref, [this].concat(args))), _this), _this.renderConnet = function () {
      var _this$props = _this.props,
          contentHeight = _this$props.contentHeight,
          title = _this$props.title,
          avatar = _this$props.avatar,
          action = _this$props.action,
          total = _this$props.total,
          footer = _this$props.footer,
          children = _this$props.children,
          loading = _this$props.loading;

      if (loading) {
        return false;
      }
      return _react2.default.createElement(
        'div',
        { className: styles.chartCard },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(styles.chartTop, _defineProperty({}, styles.chartTopMargin, !children && !footer))
          },
          _react2.default.createElement(
            'div',
            { className: styles.avatar },
            avatar
          ),
          _react2.default.createElement(
            'div',
            { className: styles.metaWrap },
            _react2.default.createElement(
              'div',
              { className: styles.meta },
              _react2.default.createElement(
                'span',
                { className: styles.title },
                title
              ),
              _react2.default.createElement(
                'span',
                { className: styles.action },
                action
              )
            ),
            renderTotal(total)
          )
        ),
        children && _react2.default.createElement(
          'div',
          { className: styles.content, style: { height: contentHeight || 'auto' } },
          _react2.default.createElement(
            'div',
            { className: contentHeight && styles.contentFixed },
            children
          )
        ),
        footer && _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(styles.footer, _defineProperty({}, styles.footerMargin, !children))
          },
          footer
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ChartCard, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$loading = _props.loading,
          loading = _props$loading === undefined ? false : _props$loading,
          contentHeight = _props.contentHeight,
          title = _props.title,
          avatar = _props.avatar,
          action = _props.action,
          total = _props.total,
          footer = _props.footer,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['loading', 'contentHeight', 'title', 'avatar', 'action', 'total', 'footer', 'children']);

      return _react2.default.createElement(
        _card2.default,
        _extends({ loading: loading, bodyStyle: { padding: '20px 24px 8px 24px' } }, rest),
        this.renderConnet()
      );
    }
  }]);

  return ChartCard;
}(_react2.default.PureComponent);

exports.default = ChartCard;
module.exports = exports.default;
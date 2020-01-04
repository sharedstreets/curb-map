'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  'trendItem': 'antd-pro-trend-trendItem',
  'up': 'antd-pro-trend-up',
  'down': 'antd-pro-trend-down',
  'trendItemGrey': 'antd-pro-trend-trendItemGrey',
  'reverseColor': 'antd-pro-trend-reverseColor'
};


var Trend = function Trend(_ref) {
  var _classNames;

  var _ref$colorful = _ref.colorful,
      colorful = _ref$colorful === undefined ? true : _ref$colorful,
      _ref$reverseColor = _ref.reverseColor,
      reverseColor = _ref$reverseColor === undefined ? false : _ref$reverseColor,
      flag = _ref.flag,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['colorful', 'reverseColor', 'flag', 'children', 'className']);

  var classString = (0, _classnames2.default)(styles.trendItem, (_classNames = {}, _defineProperty(_classNames, styles.trendItemGrey, !colorful), _defineProperty(_classNames, styles.reverseColor, reverseColor && colorful), _classNames), className);
  return _react2.default.createElement(
    'div',
    _extends({}, rest, { className: classString, title: typeof children === 'string' ? children : '' }),
    _react2.default.createElement(
      'span',
      null,
      children
    ),
    flag && _react2.default.createElement(
      'span',
      { className: styles[flag] },
      _react2.default.createElement(_icon2.default, { type: 'caret-' + flag })
    )
  );
};

exports.default = Trend;
module.exports = exports.default;
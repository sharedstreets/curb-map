'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  'descriptionList': 'antd-pro-description-list-descriptionList',
  'ant-row': 'antd-pro-description-list-ant-row',
  'title': 'antd-pro-description-list-title',
  'term': 'antd-pro-description-list-term',
  'detail': 'antd-pro-description-list-detail',
  'small': 'antd-pro-description-list-small',
  'large': 'antd-pro-description-list-large',
  'vertical': 'antd-pro-description-list-vertical'
};


var DescriptionList = function DescriptionList(_ref) {
  var _classNames;

  var className = _ref.className,
      title = _ref.title,
      _ref$col = _ref.col,
      col = _ref$col === undefined ? 3 : _ref$col,
      _ref$layout = _ref.layout,
      layout = _ref$layout === undefined ? 'horizontal' : _ref$layout,
      _ref$gutter = _ref.gutter,
      gutter = _ref$gutter === undefined ? 32 : _ref$gutter,
      children = _ref.children,
      size = _ref.size,
      restProps = _objectWithoutProperties(_ref, ['className', 'title', 'col', 'layout', 'gutter', 'children', 'size']);

  var clsString = (0, _classnames2.default)(styles.descriptionList, styles[layout], className, (_classNames = {}, _defineProperty(_classNames, styles.small, size === 'small'), _defineProperty(_classNames, styles.large, size === 'large'), _classNames));
  var column = col > 4 ? 4 : col;
  return _react2.default.createElement(
    'div',
    _extends({ className: clsString }, restProps),
    title ? _react2.default.createElement(
      'div',
      { className: styles.title },
      title
    ) : null,
    _react2.default.createElement(
      _row2.default,
      { gutter: gutter },
      _react2.default.Children.map(children, function (child) {
        return child ? _react2.default.cloneElement(child, { column: column }) : child;
      })
    )
  );
};

exports.default = DescriptionList;
module.exports = exports.default;
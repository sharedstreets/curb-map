'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tooltip = require('antd/lib/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _avatar = require('antd/lib/avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  'avatarList': 'antd-pro-avatar-list-avatarList',
  'avatarItem': 'antd-pro-avatar-list-avatarItem',
  'ant-avatar': 'antd-pro-avatar-list-ant-avatar',
  'avatarItemLarge': 'antd-pro-avatar-list-avatarItemLarge',
  'avatarItemSmall': 'antd-pro-avatar-list-avatarItemSmall',
  'avatarItemMini': 'antd-pro-avatar-list-avatarItemMini',
  'ant-avatar-string': 'antd-pro-avatar-list-ant-avatar-string'
};


var avatarSizeToClassName = function avatarSizeToClassName(size) {
  var _classNames;

  return (0, _classnames2.default)(styles.avatarItem, (_classNames = {}, _defineProperty(_classNames, styles.avatarItemLarge, size === 'large'), _defineProperty(_classNames, styles.avatarItemSmall, size === 'small'), _defineProperty(_classNames, styles.avatarItemMini, size === 'mini'), _classNames));
};

var AvatarList = function AvatarList(_ref) {
  var children = _ref.children,
      size = _ref.size,
      maxLength = _ref.maxLength,
      excessItemsStyle = _ref.excessItemsStyle,
      other = _objectWithoutProperties(_ref, ['children', 'size', 'maxLength', 'excessItemsStyle']);

  var numOfChildren = _react2.default.Children.count(children);
  var numToShow = maxLength >= numOfChildren ? numOfChildren : maxLength;

  var childrenWithProps = _react2.default.Children.toArray(children).slice(0, numToShow).map(function (child) {
    return _react2.default.cloneElement(child, {
      size: size
    });
  });

  if (numToShow < numOfChildren) {
    var cls = avatarSizeToClassName(size);

    childrenWithProps.push(_react2.default.createElement(
      'li',
      { key: 'exceed', className: cls },
      _react2.default.createElement(
        _avatar2.default,
        { size: size, style: excessItemsStyle },
        '+' + (numOfChildren - maxLength)
      )
    ));
  }

  return _react2.default.createElement(
    'div',
    _extends({}, other, { className: styles.avatarList }),
    _react2.default.createElement(
      'ul',
      null,
      ' ',
      childrenWithProps,
      ' '
    )
  );
};

var Item = function Item(_ref2) {
  var src = _ref2.src,
      size = _ref2.size,
      tips = _ref2.tips,
      _ref2$onClick = _ref2.onClick,
      onClick = _ref2$onClick === undefined ? function () {} : _ref2$onClick;

  var cls = avatarSizeToClassName(size);

  return _react2.default.createElement(
    'li',
    { className: cls, onClick: onClick },
    tips ? _react2.default.createElement(
      _tooltip2.default,
      { title: tips },
      _react2.default.createElement(_avatar2.default, { src: src, size: size, style: { cursor: 'pointer' } })
    ) : _react2.default.createElement(_avatar2.default, { src: src, size: size })
  );
};

AvatarList.Item = Item;

exports.default = AvatarList;
module.exports = exports.default;
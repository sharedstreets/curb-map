'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Result;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  'result': 'antd-pro-result-result',
  'icon': 'antd-pro-result-icon',
  'success': 'antd-pro-result-success',
  'error': 'antd-pro-result-error',
  'title': 'antd-pro-result-title',
  'description': 'antd-pro-result-description',
  'extra': 'antd-pro-result-extra',
  'actions': 'antd-pro-result-actions'
};
function Result(_ref) {
  var className = _ref.className,
      type = _ref.type,
      title = _ref.title,
      description = _ref.description,
      extra = _ref.extra,
      actions = _ref.actions,
      restProps = _objectWithoutProperties(_ref, ['className', 'type', 'title', 'description', 'extra', 'actions']);

  var iconMap = {
    error: _react2.default.createElement(_icon2.default, { className: styles.error, type: 'close-circle', theme: 'filled' }),
    success: _react2.default.createElement(_icon2.default, { className: styles.success, type: 'check-circle', theme: 'filled' })
  };
  var clsString = (0, _classnames2.default)(styles.result, className);
  return _react2.default.createElement(
    'div',
    _extends({ className: clsString }, restProps),
    _react2.default.createElement(
      'div',
      { className: styles.icon },
      iconMap[type]
    ),
    _react2.default.createElement(
      'div',
      { className: styles.title },
      title
    ),
    description && _react2.default.createElement(
      'div',
      { className: styles.description },
      description
    ),
    extra && _react2.default.createElement(
      'div',
      { className: styles.extra },
      extra
    ),
    actions && _react2.default.createElement(
      'div',
      { className: styles.actions },
      actions
    )
  );
}
module.exports = exports.default;
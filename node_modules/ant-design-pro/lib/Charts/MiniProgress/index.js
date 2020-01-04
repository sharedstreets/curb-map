'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tooltip = require('antd/lib/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  'miniProgress': 'antd-pro-charts-mini-progress-miniProgress',
  'progressWrap': 'antd-pro-charts-mini-progress-progressWrap',
  'progress': 'antd-pro-charts-mini-progress-progress',
  'target': 'antd-pro-charts-mini-progress-target'
};


var MiniProgress = function MiniProgress(_ref) {
  var targetLabel = _ref.targetLabel,
      target = _ref.target,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'rgb(19, 194, 194)' : _ref$color,
      strokeWidth = _ref.strokeWidth,
      percent = _ref.percent;

  return _react2.default.createElement(
    'div',
    { className: styles.miniProgress },
    _react2.default.createElement(
      _tooltip2.default,
      { title: targetLabel },
      _react2.default.createElement(
        'div',
        { className: styles.target, style: { left: target ? target + '%' : null } },
        _react2.default.createElement('span', { style: { backgroundColor: color || null } }),
        _react2.default.createElement('span', { style: { backgroundColor: color || null } })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: styles.progressWrap },
      _react2.default.createElement('div', {
        className: styles.progress,
        style: {
          backgroundColor: color || null,
          width: percent ? percent + '%' : null,
          height: strokeWidth || null
        }
      })
    )
  );
};

exports.default = MiniProgress;
module.exports = exports.default;
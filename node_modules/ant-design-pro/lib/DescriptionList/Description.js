'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _responsive = require('./responsive');

var _responsive2 = _interopRequireDefault(_responsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


var Description = function Description(_ref) {
  var term = _ref.term,
      column = _ref.column,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, ['term', 'column', 'children']);

  return _react2.default.createElement(
    _col2.default,
    _extends({}, _responsive2.default[column], restProps),
    term && _react2.default.createElement(
      'div',
      { className: styles.term },
      term
    ),
    children !== null && children !== undefined && _react2.default.createElement(
      'div',
      { className: styles.detail },
      children
    )
  );
};

Description.defaultProps = {
  term: ''
};

Description.propTypes = {
  term: _propTypes2.default.node
};

exports.default = Description;
module.exports = exports.default;
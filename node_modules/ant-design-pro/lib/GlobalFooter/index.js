'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  'globalFooter': 'antd-pro-global-footer-globalFooter',
  'links': 'antd-pro-global-footer-links',
  'copyright': 'antd-pro-global-footer-copyright'
};


var GlobalFooter = function GlobalFooter(_ref) {
  var className = _ref.className,
      links = _ref.links,
      copyright = _ref.copyright;

  var clsString = (0, _classnames2.default)(styles.globalFooter, className);
  return _react2.default.createElement(
    'footer',
    { className: clsString },
    links && _react2.default.createElement(
      'div',
      { className: styles.links },
      links.map(function (link) {
        return _react2.default.createElement(
          'a',
          {
            key: link.key,
            title: link.key,
            target: link.blankTarget ? '_blank' : '_self',
            href: link.href
          },
          link.title
        );
      })
    ),
    copyright && _react2.default.createElement(
      'div',
      { className: styles.copyright },
      copyright
    )
  );
};

exports.default = GlobalFooter;
module.exports = exports.default;
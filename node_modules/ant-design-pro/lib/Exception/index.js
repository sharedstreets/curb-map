'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _typeConfig = require('./typeConfig');

var _typeConfig2 = _interopRequireDefault(_typeConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'exception': 'antd-pro-exception-exception',
  'imgBlock': 'antd-pro-exception-imgBlock',
  'imgEle': 'antd-pro-exception-imgEle',
  'content': 'antd-pro-exception-content',
  'desc': 'antd-pro-exception-desc',
  'actions': 'antd-pro-exception-actions'
};
var Exception = (_temp = _class = function (_React$PureComponent) {
  _inherits(Exception, _React$PureComponent);

  function Exception(props) {
    _classCallCheck(this, Exception);

    var _this = _possibleConstructorReturn(this, (Exception.__proto__ || Object.getPrototypeOf(Exception)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Exception, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          backText = _props.backText,
          _props$linkElement = _props.linkElement,
          linkElement = _props$linkElement === undefined ? 'a' : _props$linkElement,
          type = _props.type,
          title = _props.title,
          desc = _props.desc,
          img = _props.img,
          actions = _props.actions,
          redirect = _props.redirect,
          rest = _objectWithoutProperties(_props, ['className', 'backText', 'linkElement', 'type', 'title', 'desc', 'img', 'actions', 'redirect']);

      var pageType = type in _typeConfig2.default ? type : '404';
      var clsString = (0, _classnames2.default)(styles.exception, className);
      return _react2.default.createElement(
        'div',
        _extends({ className: clsString }, rest),
        _react2.default.createElement(
          'div',
          { className: styles.imgBlock },
          _react2.default.createElement('div', {
            className: styles.imgEle,
            style: { backgroundImage: 'url(' + (img || _typeConfig2.default[pageType].img) + ')' }
          })
        ),
        _react2.default.createElement(
          'div',
          { className: styles.content },
          _react2.default.createElement(
            'h1',
            null,
            title || _typeConfig2.default[pageType].title
          ),
          _react2.default.createElement(
            'div',
            { className: styles.desc },
            desc || _typeConfig2.default[pageType].desc
          ),
          _react2.default.createElement(
            'div',
            { className: styles.actions },
            actions || (0, _react.createElement)(linkElement, {
              to: redirect,
              href: redirect
            }, _react2.default.createElement(
              _button2.default,
              { type: 'primary' },
              backText
            ))
          )
        )
      );
    }
  }]);

  return Exception;
}(_react2.default.PureComponent), _class.defaultProps = {
  backText: 'back to home',
  redirect: '/'
}, _temp);
exports.default = Exception;
module.exports = exports.default;
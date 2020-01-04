'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'toolbar': 'antd-pro-footer-toolbar-toolbar',
  'left': 'antd-pro-footer-toolbar-left',
  'right': 'antd-pro-footer-toolbar-right'
};
var FooterToolbar = (_temp2 = _class = function (_Component) {
  _inherits(FooterToolbar, _Component);

  function FooterToolbar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FooterToolbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FooterToolbar.__proto__ || Object.getPrototypeOf(FooterToolbar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      width: undefined
    }, _this.resizeFooterToolbar = function () {
      var sider = document.querySelector('.ant-layout-sider');
      if (sider == null) {
        return;
      }
      var isMobile = _this.context.isMobile;

      var width = isMobile ? null : 'calc(100% - ' + sider.style.width + ')';
      var stateWidth = _this.state.width;

      if (stateWidth !== width) {
        _this.setState({ width: width });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FooterToolbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.resizeFooterToolbar);
      this.resizeFooterToolbar();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeFooterToolbar);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          extra = _props.extra,
          restProps = _objectWithoutProperties(_props, ['children', 'className', 'extra']);

      var width = this.state.width;

      return _react2.default.createElement(
        'div',
        _extends({ className: (0, _classnames2.default)(className, styles.toolbar), style: { width: width } }, restProps),
        _react2.default.createElement(
          'div',
          { className: styles.left },
          extra
        ),
        _react2.default.createElement(
          'div',
          { className: styles.right },
          children
        )
      );
    }
  }]);

  return FooterToolbar;
}(_react.Component), _class.contextTypes = {
  isMobile: _propTypes2.default.bool
}, _temp2);
exports.default = FooterToolbar;
module.exports = exports.default;
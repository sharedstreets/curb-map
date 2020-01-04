'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tabs = require('antd/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _loginContext = require('./loginContext');

var _loginContext2 = _interopRequireDefault(_loginContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabPane = _tabs2.default.TabPane;


var generateId = function () {
  var i = 0;
  return function () {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    i += 1;
    return '' + prefix + i;
  };
}();

var LoginTab = function (_Component) {
  _inherits(LoginTab, _Component);

  function LoginTab(props) {
    _classCallCheck(this, LoginTab);

    var _this = _possibleConstructorReturn(this, (LoginTab.__proto__ || Object.getPrototypeOf(LoginTab)).call(this, props));

    _this.uniqueId = generateId('login-tab-');
    return _this;
  }

  _createClass(LoginTab, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var tabUtil = this.props.tabUtil;

      tabUtil.addTab(this.uniqueId);
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return _react2.default.createElement(
        TabPane,
        this.props,
        children
      );
    }
  }]);

  return LoginTab;
}(_react.Component);

var wrapContext = function wrapContext(props) {
  return _react2.default.createElement(
    _loginContext2.default.Consumer,
    null,
    function (value) {
      return _react2.default.createElement(LoginTab, _extends({ tabUtil: value.tabUtil }, props));
    }
  );
};

// 标志位 用来判断是不是自定义组件
wrapContext.typeName = 'LoginTab';

exports.default = wrapContext;
module.exports = exports.default;
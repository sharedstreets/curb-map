'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _loginContext = require('./loginContext');

var _loginContext2 = _interopRequireDefault(_loginContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'login': 'antd-pro-login-login',
  'ant-tabs': 'antd-pro-login-ant-tabs',
  'ant-tabs-bar': 'antd-pro-login-ant-tabs-bar',
  'ant-form-item': 'antd-pro-login-ant-form-item',
  'getCaptcha': 'antd-pro-login-getCaptcha',
  'icon': 'antd-pro-login-icon',
  'other': 'antd-pro-login-other',
  'register': 'antd-pro-login-register',
  'prefixIcon': 'antd-pro-login-prefixIcon',
  'submit': 'antd-pro-login-submit'
};


var FormItem = _form2.default.Item;

var WrapFormItem = (_temp = _class = function (_Component) {
  _inherits(WrapFormItem, _Component);

  function WrapFormItem(props) {
    _classCallCheck(this, WrapFormItem);

    var _this = _possibleConstructorReturn(this, (WrapFormItem.__proto__ || Object.getPrototypeOf(WrapFormItem)).call(this, props));

    _this.onGetCaptcha = function () {
      var onGetCaptcha = _this.props.onGetCaptcha;

      var result = onGetCaptcha ? onGetCaptcha() : null;
      if (result === false) {
        return;
      }
      if (result instanceof Promise) {
        result.then(_this.runGetCaptchaCountDown);
      } else {
        _this.runGetCaptchaCountDown();
      }
    };

    _this.getFormItemOptions = function (_ref) {
      var onChange = _ref.onChange,
          defaultValue = _ref.defaultValue,
          customprops = _ref.customprops,
          rules = _ref.rules;

      var options = {
        rules: rules || customprops.rules
      };
      if (onChange) {
        options.onChange = onChange;
      }
      if (defaultValue) {
        options.initialValue = defaultValue;
      }
      return options;
    };

    _this.runGetCaptchaCountDown = function () {
      var countDown = _this.props.countDown;

      var count = countDown || 59;
      _this.setState({ count: count });
      _this.interval = setInterval(function () {
        count -= 1;
        _this.setState({ count: count });
        if (count === 0) {
          clearInterval(_this.interval);
        }
      }, 1000);
    };

    _this.state = {
      count: 0
    };
    return _this;
  }

  _createClass(WrapFormItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          updateActive = _props.updateActive,
          name = _props.name;

      if (updateActive) {
        updateActive(name);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: 'render',
    value: function render() {
      var count = this.state.count;
      var getFieldDecorator = this.props.form.getFieldDecorator;

      // 这么写是为了防止restProps中 带入 onChange, defaultValue, rules props

      var _props2 = this.props,
          onChange = _props2.onChange,
          customprops = _props2.customprops,
          defaultValue = _props2.defaultValue,
          rules = _props2.rules,
          name = _props2.name,
          getCaptchaButtonText = _props2.getCaptchaButtonText,
          getCaptchaSecondText = _props2.getCaptchaSecondText,
          updateActive = _props2.updateActive,
          type = _props2.type,
          restProps = _objectWithoutProperties(_props2, ['onChange', 'customprops', 'defaultValue', 'rules', 'name', 'getCaptchaButtonText', 'getCaptchaSecondText', 'updateActive', 'type']);

      // get getFieldDecorator props


      var options = this.getFormItemOptions(this.props);

      var otherProps = restProps || {};
      if (type === 'Captcha') {
        var inputProps = (0, _omit2.default)(otherProps, ['onGetCaptcha', 'countDown']);
        return _react2.default.createElement(
          FormItem,
          null,
          _react2.default.createElement(
            _row2.default,
            { gutter: 8 },
            _react2.default.createElement(
              _col2.default,
              { span: 16 },
              getFieldDecorator(name, options)(_react2.default.createElement(_input2.default, _extends({}, customprops, inputProps)))
            ),
            _react2.default.createElement(
              _col2.default,
              { span: 8 },
              _react2.default.createElement(
                _button2.default,
                {
                  disabled: count,
                  className: styles.getCaptcha,
                  size: 'large',
                  onClick: this.onGetCaptcha
                },
                count ? count + ' ' + getCaptchaSecondText : getCaptchaButtonText
              )
            )
          )
        );
      }
      return _react2.default.createElement(
        FormItem,
        null,
        getFieldDecorator(name, options)(_react2.default.createElement(_input2.default, _extends({}, customprops, otherProps)))
      );
    }
  }]);

  return WrapFormItem;
}(_react.Component), _class.defaultProps = {
  getCaptchaButtonText: 'captcha',
  getCaptchaSecondText: 'second'
}, _temp);


var LoginItem = {};
Object.keys(_map2.default).forEach(function (key) {
  var item = _map2.default[key];
  LoginItem[key] = function (props) {
    return _react2.default.createElement(
      _loginContext2.default.Consumer,
      null,
      function (context) {
        return _react2.default.createElement(WrapFormItem, _extends({
          customprops: item.props,
          rules: item.rules
        }, props, {
          type: key,
          updateActive: context.updateActive,
          form: context.form
        }));
      }
    );
  };
});

exports.default = LoginItem;
module.exports = exports.default;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
exports.default = {
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      prefix: _react2.default.createElement(_icon2.default, { type: 'user', className: styles.prefixIcon }),
      placeholder: 'admin'
    },
    rules: [{
      required: true,
      message: 'Please enter username!'
    }]
  },
  Password: {
    props: {
      size: 'large',
      prefix: _react2.default.createElement(_icon2.default, { type: 'lock', className: styles.prefixIcon }),
      type: 'password',
      id: 'password',
      placeholder: '888888'
    },
    rules: [{
      required: true,
      message: 'Please enter password!'
    }]
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: _react2.default.createElement(_icon2.default, { type: 'mobile', className: styles.prefixIcon }),
      placeholder: 'mobile number'
    },
    rules: [{
      required: true,
      message: 'Please enter mobile number!'
    }, {
      pattern: /^1\d{10}$/,
      message: 'Wrong mobile number format!'
    }]
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: _react2.default.createElement(_icon2.default, { type: 'mail', className: styles.prefixIcon }),
      placeholder: 'captcha'
    },
    rules: [{
      required: true,
      message: 'Please enter Captcha!'
    }]
  }
};
module.exports = exports.default;
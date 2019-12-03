'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _skeleton = require('antd/lib/skeleton');

var _skeleton2 = _interopRequireDefault(_skeleton);

var _tabs = require('antd/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _breadcrumb = require('./breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'pageHeader': 'antd-pro-page-header-pageHeader',
  'wide': 'antd-pro-page-header-wide',
  'detail': 'antd-pro-page-header-detail',
  'row': 'antd-pro-page-header-row',
  'breadcrumb': 'antd-pro-page-header-breadcrumb',
  'tabs': 'antd-pro-page-header-tabs',
  'ant-tabs-bar': 'antd-pro-page-header-ant-tabs-bar',
  'logo': 'antd-pro-page-header-logo',
  'title': 'antd-pro-page-header-title',
  'action': 'antd-pro-page-header-action',
  'ant-btn-group': 'antd-pro-page-header-ant-btn-group',
  'ant-btn': 'antd-pro-page-header-ant-btn',
  'content': 'antd-pro-page-header-content',
  'extraContent': 'antd-pro-page-header-extraContent',
  'main': 'antd-pro-page-header-main'
};
var TabPane = _tabs2.default.TabPane;

var PageHeader = function (_PureComponent) {
  _inherits(PageHeader, _PureComponent);

  function PageHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PageHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PageHeader.__proto__ || Object.getPrototypeOf(PageHeader)).call.apply(_ref, [this].concat(args))), _this), _this.onChange = function (key) {
      var onTabChange = _this.props.onTabChange;

      if (onTabChange) {
        onTabChange(key);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PageHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$title = _props.title,
          title = _props$title === undefined ? '' : _props$title,
          logo = _props.logo,
          action = _props.action,
          content = _props.content,
          extraContent = _props.extraContent,
          tabList = _props.tabList,
          className = _props.className,
          tabActiveKey = _props.tabActiveKey,
          tabDefaultActiveKey = _props.tabDefaultActiveKey,
          tabBarExtraContent = _props.tabBarExtraContent,
          _props$loading = _props.loading,
          loading = _props$loading === undefined ? false : _props$loading,
          _props$wide = _props.wide,
          wide = _props$wide === undefined ? false : _props$wide,
          _props$hiddenBreadcru = _props.hiddenBreadcrumb,
          hiddenBreadcrumb = _props$hiddenBreadcru === undefined ? false : _props$hiddenBreadcru;


      var clsString = (0, _classnames2.default)(styles.pageHeader, className);
      var activeKeyProps = {};
      if (tabDefaultActiveKey !== undefined) {
        activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
      }
      if (tabActiveKey !== undefined) {
        activeKeyProps.activeKey = tabActiveKey;
      }
      return _react2.default.createElement(
        'div',
        { className: clsString },
        _react2.default.createElement(
          'div',
          { className: wide ? styles.wide : '' },
          _react2.default.createElement(
            _skeleton2.default,
            {
              loading: loading,
              title: false,
              active: true,
              paragraph: { rows: 3 },
              avatar: { size: 'large', shape: 'circle' }
            },
            hiddenBreadcrumb ? null : _react2.default.createElement(_breadcrumb2.default, this.props),
            _react2.default.createElement(
              'div',
              { className: styles.detail },
              logo && _react2.default.createElement(
                'div',
                { className: styles.logo },
                logo
              ),
              _react2.default.createElement(
                'div',
                { className: styles.main },
                _react2.default.createElement(
                  'div',
                  { className: styles.row },
                  _react2.default.createElement(
                    'h1',
                    { className: styles.title },
                    title
                  ),
                  action && _react2.default.createElement(
                    'div',
                    { className: styles.action },
                    action
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: styles.row },
                  content && _react2.default.createElement(
                    'div',
                    { className: styles.content },
                    content
                  ),
                  extraContent && _react2.default.createElement(
                    'div',
                    { className: styles.extraContent },
                    extraContent
                  )
                )
              )
            ),
            tabList && tabList.length ? _react2.default.createElement(
              _tabs2.default,
              _extends({
                className: styles.tabs
              }, activeKeyProps, {
                onChange: this.onChange,
                tabBarExtraContent: tabBarExtraContent
              }),
              tabList.map(function (item) {
                return _react2.default.createElement(TabPane, { tab: item.tab, key: item.key });
              })
            ) : null
          )
        )
      );
    }
  }]);

  return PageHeader;
}(_react.PureComponent);

exports.default = PageHeader;
module.exports = exports.default;
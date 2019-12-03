'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getBreadcrumb = undefined;

var _breadcrumb = require('antd/lib/breadcrumb');

var _breadcrumb2 = _interopRequireDefault(_breadcrumb);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pathToRegexp = require('path-to-regexp');

var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

var _pathTools = require('../_utils/pathTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var getBreadcrumb = exports.getBreadcrumb = function getBreadcrumb(breadcrumbNameMap, url) {
  var breadcrumb = breadcrumbNameMap[url];
  if (!breadcrumb) {
    Object.keys(breadcrumbNameMap).forEach(function (item) {
      if ((0, _pathToRegexp2.default)(item).test(url)) {
        breadcrumb = breadcrumbNameMap[item];
      }
    });
  }
  return breadcrumb || {};
};

var BreadcrumbView = function (_PureComponent) {
  _inherits(BreadcrumbView, _PureComponent);

  function BreadcrumbView() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, BreadcrumbView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BreadcrumbView.__proto__ || Object.getPrototypeOf(BreadcrumbView)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      breadcrumb: null
    }, _this.getBreadcrumbDom = function () {
      var breadcrumb = _this.conversionBreadcrumbList();
      _this.setState({
        breadcrumb: breadcrumb
      });
    }, _this.getBreadcrumbProps = function () {
      var _this$props = _this.props,
          routes = _this$props.routes,
          params = _this$props.params,
          location = _this$props.location,
          breadcrumbNameMap = _this$props.breadcrumbNameMap;

      return {
        routes: routes,
        params: params,
        routerLocation: location,
        breadcrumbNameMap: breadcrumbNameMap
      };
    }, _this.conversionFromProps = function () {
      var _this$props2 = _this.props,
          breadcrumbList = _this$props2.breadcrumbList,
          breadcrumbSeparator = _this$props2.breadcrumbSeparator,
          itemRender = _this$props2.itemRender,
          _this$props2$linkElem = _this$props2.linkElement,
          linkElement = _this$props2$linkElem === undefined ? 'a' : _this$props2$linkElem;

      return _react2.default.createElement(
        _breadcrumb2.default,
        { className: styles.breadcrumb, separator: breadcrumbSeparator },
        breadcrumbList.map(function (item) {
          var title = itemRender ? itemRender(item) : item.title;
          return _react2.default.createElement(
            _breadcrumb2.default.Item,
            { key: item.title },
            item.href ? (0, _react.createElement)(linkElement, _defineProperty({}, linkElement === 'a' ? 'href' : 'to', item.href), title) : title
          );
        })
      );
    }, _this.conversionFromLocation = function (routerLocation, breadcrumbNameMap) {
      var _this$props3 = _this.props,
          breadcrumbSeparator = _this$props3.breadcrumbSeparator,
          home = _this$props3.home,
          itemRender = _this$props3.itemRender,
          _this$props3$linkElem = _this$props3.linkElement,
          linkElement = _this$props3$linkElem === undefined ? 'a' : _this$props3$linkElem;
      // Convert the url to an array

      var pathSnippets = (0, _pathTools.urlToList)(routerLocation.pathname);
      // Loop data mosaic routing
      var extraBreadcrumbItems = pathSnippets.map(function (url, index) {
        var currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
        if (currentBreadcrumb.inherited) {
          return null;
        }
        var isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
        var name = itemRender ? itemRender(currentBreadcrumb) : currentBreadcrumb.name;
        return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? _react2.default.createElement(
          _breadcrumb2.default.Item,
          { key: url },
          (0, _react.createElement)(isLinkable ? linkElement : 'span', _defineProperty({}, linkElement === 'a' ? 'href' : 'to', url), name)
        ) : null;
      });
      // Add home breadcrumbs to your head if defined
      if (home) {
        extraBreadcrumbItems.unshift(_react2.default.createElement(
          _breadcrumb2.default.Item,
          { key: 'home' },
          (0, _react.createElement)(linkElement, _defineProperty({}, linkElement === 'a' ? 'href' : 'to', '/'), home)
        ));
      }
      return _react2.default.createElement(
        _breadcrumb2.default,
        { className: styles.breadcrumb, separator: breadcrumbSeparator },
        extraBreadcrumbItems
      );
    }, _this.conversionBreadcrumbList = function () {
      var _this$props4 = _this.props,
          breadcrumbList = _this$props4.breadcrumbList,
          breadcrumbSeparator = _this$props4.breadcrumbSeparator;

      var _this$getBreadcrumbPr = _this.getBreadcrumbProps(),
          routes = _this$getBreadcrumbPr.routes,
          params = _this$getBreadcrumbPr.params,
          routerLocation = _this$getBreadcrumbPr.routerLocation,
          breadcrumbNameMap = _this$getBreadcrumbPr.breadcrumbNameMap;

      if (breadcrumbList && breadcrumbList.length) {
        return _this.conversionFromProps();
      }
      // 如果传入 routes 和 params 属性
      // If pass routes and params attributes
      if (routes && params) {
        return _react2.default.createElement(_breadcrumb2.default, {
          className: styles.breadcrumb,
          routes: routes.filter(function (route) {
            return route.breadcrumbName;
          }),
          params: params,
          itemRender: _this.itemRender,
          separator: breadcrumbSeparator
        });
      }
      // 根据 location 生成 面包屑
      // Generate breadcrumbs based on location
      if (routerLocation && routerLocation.pathname) {
        return _this.conversionFromLocation(routerLocation, breadcrumbNameMap);
      }
      return null;
    }, _this.itemRender = function (route, params, routes, paths) {
      var _this$props$linkEleme = _this.props.linkElement,
          linkElement = _this$props$linkEleme === undefined ? 'a' : _this$props$linkEleme;

      var last = routes.indexOf(route) === routes.length - 1;
      return last || !route.component ? _react2.default.createElement(
        'span',
        null,
        route.breadcrumbName
      ) : (0, _react.createElement)(linkElement, {
        href: paths.join('/') || '/',
        to: paths.join('/') || '/'
      }, route.breadcrumbName);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(BreadcrumbView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getBreadcrumbDom();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(preProps) {
      var location = this.props.location;

      if (!location || !preProps.location) {
        return;
      }
      var prePathname = preProps.location.pathname;
      if (prePathname !== location.pathname) {
        this.getBreadcrumbDom();
      }
    }

    // Generated according to props


    /**
     * 将参数转化为面包屑
     * Convert parameters into breadcrumbs
     */


    // 渲染Breadcrumb 子节点
    // Render the Breadcrumb child node

  }, {
    key: 'render',
    value: function render() {
      var breadcrumb = this.state.breadcrumb;

      return breadcrumb;
    }
  }]);

  return BreadcrumbView;
}(_react.PureComponent);

exports.default = BreadcrumbView;
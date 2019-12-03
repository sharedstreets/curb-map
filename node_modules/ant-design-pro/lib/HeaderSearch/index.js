'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _autoComplete = require('antd/lib/auto-complete');

var _autoComplete2 = _interopRequireDefault(_autoComplete);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _desc, _value, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _debounce = require('lodash-decorators/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _bind = require('lodash-decorators/bind');

var _bind2 = _interopRequireDefault(_bind);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var styles = {
  'headerSearch': 'antd-pro-header-search-headerSearch',
  'input': 'antd-pro-header-search-input',
  'show': 'antd-pro-header-search-show'
};
var HeaderSearch = (_dec = (0, _bind2.default)(), _dec2 = (0, _debounce2.default)(500, {
  leading: true,
  trailing: false
}), (_class = (_temp = _class2 = function (_PureComponent) {
  _inherits(HeaderSearch, _PureComponent);

  _createClass(HeaderSearch, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props) {
      if ('open' in props) {
        return {
          searchMode: props.open
        };
      }
      return null;
    }
  }]);

  function HeaderSearch(props) {
    _classCallCheck(this, HeaderSearch);

    var _this = _possibleConstructorReturn(this, (HeaderSearch.__proto__ || Object.getPrototypeOf(HeaderSearch)).call(this, props));

    _this.onKeyDown = function (e) {
      if (e.key === 'Enter') {
        var onPressEnter = _this.props.onPressEnter;
        var value = _this.state.value;

        _this.timeout = setTimeout(function () {
          onPressEnter(value); // Fix duplicate onPressEnter
        }, 0);
      }
    };

    _this.onChange = function (value) {
      var _this$props = _this.props,
          onSearch = _this$props.onSearch,
          onChange = _this$props.onChange;

      _this.setState({ value: value });
      if (onSearch) {
        onSearch(value);
      }
      if (onChange) {
        onChange(value);
      }
    };

    _this.enterSearchMode = function () {
      var onVisibleChange = _this.props.onVisibleChange;

      onVisibleChange(true);
      _this.setState({ searchMode: true }, function () {
        var searchMode = _this.state.searchMode;

        if (searchMode) {
          _this.input.focus();
        }
      });
    };

    _this.leaveSearchMode = function () {
      _this.setState({
        searchMode: false,
        value: ''
      });
    };

    _this.state = {
      searchMode: props.defaultOpen,
      value: ''
    };
    return _this;
  }

  _createClass(HeaderSearch, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'debouncePressEnter',


    // NOTE: 不能小于500，如果长按某键，第一次触发auto repeat的间隔是500ms，小于500会导致触发2次
    value: function debouncePressEnter() {
      var onPressEnter = this.props.onPressEnter;
      var value = this.state.value;

      onPressEnter(value);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          placeholder = _props.placeholder,
          open = _props.open,
          restProps = _objectWithoutProperties(_props, ['className', 'placeholder', 'open']);

      var _state = this.state,
          searchMode = _state.searchMode,
          value = _state.value;

      delete restProps.defaultOpen; // for rc-select not affected
      var inputClass = (0, _classnames2.default)(styles.input, _defineProperty({}, styles.show, searchMode));
      return _react2.default.createElement(
        'span',
        {
          className: (0, _classnames2.default)(className, styles.headerSearch),
          onClick: this.enterSearchMode,
          onTransitionEnd: function onTransitionEnd(_ref) {
            var propertyName = _ref.propertyName;

            if (propertyName === 'width' && !searchMode) {
              var onVisibleChange = _this2.props.onVisibleChange;

              onVisibleChange(searchMode);
            }
          }
        },
        _react2.default.createElement(_icon2.default, { type: 'search', key: 'Icon' }),
        _react2.default.createElement(
          _autoComplete2.default,
          _extends({
            key: 'AutoComplete'
          }, restProps, {
            className: inputClass,
            value: value,
            onChange: this.onChange
          }),
          _react2.default.createElement(_input2.default, {
            ref: function ref(node) {
              _this2.input = node;
            },
            'aria-label': placeholder,
            placeholder: placeholder,
            onKeyDown: this.onKeyDown,
            onBlur: this.leaveSearchMode
          })
        )
      );
    }
  }]);

  return HeaderSearch;
}(_react.PureComponent), _class2.propTypes = {
  className: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  onSearch: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onPressEnter: _propTypes2.default.func,
  defaultActiveFirstOption: _propTypes2.default.bool,
  dataSource: _propTypes2.default.array,
  defaultOpen: _propTypes2.default.bool,
  onVisibleChange: _propTypes2.default.func
}, _class2.defaultProps = {
  defaultActiveFirstOption: false,
  onPressEnter: function onPressEnter() {},
  onSearch: function onSearch() {},
  onChange: function onChange() {},
  className: '',
  placeholder: '',
  dataSource: [],
  defaultOpen: false,
  onVisibleChange: function onVisibleChange() {}
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'debouncePressEnter', [_dec, _dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'debouncePressEnter'), _class.prototype)), _class));
exports.default = HeaderSearch;
module.exports = exports.default;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.cutStrByFullLength = exports.getStrFullLength = undefined;

var _tooltip = require('antd/lib/tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  'ellipsis': 'antd-pro-ellipsis-ellipsis',
  'lines': 'antd-pro-ellipsis-lines',
  'shadow': 'antd-pro-ellipsis-shadow',
  'lineClamp': 'antd-pro-ellipsis-lineClamp'
};

/* eslint react/no-did-mount-set-state: 0 */
/* eslint no-param-reassign: 0 */

var isSupportLineClamp = document.body.style.webkitLineClamp !== undefined;

var TooltipOverlayStyle = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word'
};

var getStrFullLength = exports.getStrFullLength = function getStrFullLength() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return str.split('').reduce(function (pre, cur) {
    var charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1;
    }
    return pre + 2;
  }, 0);
};

var cutStrByFullLength = exports.cutStrByFullLength = function cutStrByFullLength() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var maxLength = arguments[1];

  var showLength = 0;
  return str.split('').reduce(function (pre, cur) {
    var charCode = cur.charCodeAt(0);
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1;
    } else {
      showLength += 2;
    }
    if (showLength <= maxLength) {
      return pre + cur;
    }
    return pre;
  }, '');
};

var getTooltip = function getTooltip(_ref) {
  var tooltip = _ref.tooltip,
      overlayStyle = _ref.overlayStyle,
      title = _ref.title,
      children = _ref.children;

  if (tooltip) {
    var props = tooltip === true ? { overlayStyle: overlayStyle, title: title } : _extends({}, tooltip, { overlayStyle: overlayStyle, title: title });
    return _react2.default.createElement(
      _tooltip2.default,
      props,
      children
    );
  }
  return children;
};

var EllipsisText = function EllipsisText(_ref2) {
  var text = _ref2.text,
      length = _ref2.length,
      tooltip = _ref2.tooltip,
      fullWidthRecognition = _ref2.fullWidthRecognition,
      other = _objectWithoutProperties(_ref2, ['text', 'length', 'tooltip', 'fullWidthRecognition']);

  if (typeof text !== 'string') {
    throw new Error('Ellipsis children must be string.');
  }
  var textLength = fullWidthRecognition ? getStrFullLength(text) : text.length;
  if (textLength <= length || length < 0) {
    return _react2.default.createElement(
      'span',
      other,
      text
    );
  }
  var tail = '...';
  var displayText = void 0;
  if (length - tail.length <= 0) {
    displayText = '';
  } else {
    displayText = fullWidthRecognition ? cutStrByFullLength(text, length) : text.slice(0, length);
  }

  var spanAttrs = tooltip ? {} : _extends({}, other);
  return getTooltip({
    tooltip: tooltip,
    overlayStyle: TooltipOverlayStyle,
    title: text,
    children: _react2.default.createElement(
      'span',
      spanAttrs,
      displayText,
      tail
    )
  });
};

var Ellipsis = function (_Component) {
  _inherits(Ellipsis, _Component);

  function Ellipsis() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, Ellipsis);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = Ellipsis.__proto__ || Object.getPrototypeOf(Ellipsis)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
      text: '',
      targetCount: 0
    }, _this.computeLine = function () {
      var lines = _this.props.lines;

      if (lines && !isSupportLineClamp) {
        var text = _this.shadowChildren.innerText || _this.shadowChildren.textContent;
        var lineHeight = parseInt(getComputedStyle(_this.root).lineHeight, 10);
        var targetHeight = lines * lineHeight;
        _this.content.style.height = targetHeight + 'px';
        var totalHeight = _this.shadowChildren.offsetHeight;
        var shadowNode = _this.shadow.firstChild;

        if (totalHeight <= targetHeight) {
          _this.setState({
            text: text,
            targetCount: text.length
          });
          return;
        }

        // bisection
        var len = text.length;
        var mid = Math.ceil(len / 2);

        var count = _this.bisection(targetHeight, mid, 0, len, text, shadowNode);

        _this.setState({
          text: text,
          targetCount: count
        });
      }
    }, _this.bisection = function (th, m, b, e, text, shadowNode) {
      var suffix = '...';
      var mid = m;
      var end = e;
      var begin = b;
      shadowNode.innerHTML = text.substring(0, mid) + suffix;
      var sh = shadowNode.offsetHeight;

      if (sh <= th) {
        shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
        sh = shadowNode.offsetHeight;
        if (sh > th || mid === begin) {
          return mid;
        }
        begin = mid;
        if (end - begin === 1) {
          mid = 1 + begin;
        } else {
          mid = Math.floor((end - begin) / 2) + begin;
        }
        return _this.bisection(th, mid, begin, end, text, shadowNode);
      }
      if (mid - 1 < 0) {
        return mid;
      }
      shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh <= th) {
        return mid - 1;
      }
      end = mid;
      mid = Math.floor((end - begin) / 2) + begin;
      return _this.bisection(th, mid, begin, end, text, shadowNode);
    }, _this.handleRoot = function (n) {
      _this.root = n;
    }, _this.handleContent = function (n) {
      _this.content = n;
    }, _this.handleNode = function (n) {
      _this.node = n;
    }, _this.handleShadow = function (n) {
      _this.shadow = n;
    }, _this.handleShadowChildren = function (n) {
      _this.shadowChildren = n;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Ellipsis, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.node) {
        this.computeLine();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(perProps) {
      var lines = this.props.lines;

      if (lines !== perProps.lines) {
        this.computeLine();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames;

      var _state = this.state,
          text = _state.text,
          targetCount = _state.targetCount;

      var _props = this.props,
          children = _props.children,
          lines = _props.lines,
          length = _props.length,
          className = _props.className,
          tooltip = _props.tooltip,
          fullWidthRecognition = _props.fullWidthRecognition,
          restProps = _objectWithoutProperties(_props, ['children', 'lines', 'length', 'className', 'tooltip', 'fullWidthRecognition']);

      var cls = (0, _classnames2.default)(styles.ellipsis, className, (_classNames = {}, _defineProperty(_classNames, styles.lines, lines && !isSupportLineClamp), _defineProperty(_classNames, styles.lineClamp, lines && isSupportLineClamp), _classNames));

      if (!lines && !length) {
        return _react2.default.createElement(
          'span',
          _extends({ className: cls }, restProps),
          children
        );
      }

      // length
      if (!lines) {
        return _react2.default.createElement(EllipsisText, _extends({
          className: cls,
          length: length,
          text: children || '',
          tooltip: tooltip,
          fullWidthRecognition: fullWidthRecognition
        }, restProps));
      }

      var id = 'antd-pro-ellipsis-' + ('' + new Date().getTime() + Math.floor(Math.random() * 100));

      // support document.body.style.webkitLineClamp
      if (isSupportLineClamp) {
        var style = '#' + id + '{-webkit-line-clamp:' + lines + ';-webkit-box-orient: vertical;}';

        var node = _react2.default.createElement(
          'div',
          _extends({ id: id, className: cls }, restProps),
          _react2.default.createElement(
            'style',
            null,
            style
          ),
          children
        );

        return getTooltip({
          tooltip: tooltip,
          overlayStyle: TooltipOverlayStyle,
          title: children,
          children: node
        });
      }

      var childNode = _react2.default.createElement(
        'span',
        { ref: this.handleNode },
        targetCount > 0 && text.substring(0, targetCount),
        targetCount > 0 && targetCount < text.length && '...'
      );

      return _react2.default.createElement(
        'div',
        _extends({}, restProps, { ref: this.handleRoot, className: cls }),
        _react2.default.createElement(
          'div',
          { ref: this.handleContent },
          getTooltip({
            tooltip: tooltip,
            overlayStyle: TooltipOverlayStyle,
            title: text,
            children: childNode
          }),
          _react2.default.createElement(
            'div',
            { className: styles.shadow, ref: this.handleShadowChildren },
            children
          ),
          _react2.default.createElement(
            'div',
            { className: styles.shadow, ref: this.handleShadow },
            _react2.default.createElement(
              'span',
              null,
              text
            )
          )
        )
      );
    }
  }]);

  return Ellipsis;
}(_react.Component);

exports.default = Ellipsis;
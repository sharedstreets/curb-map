'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint eqeqeq: 0 */


function computeHeight(node) {
  var totalHeight = parseInt(getComputedStyle(node).height, 10);
  var padding = parseInt(getComputedStyle(node).paddingTop, 10) + parseInt(getComputedStyle(node).paddingBottom, 10);
  return totalHeight - padding;
}

function getAutoHeight(n) {
  if (!n) {
    return 0;
  }

  var node = n;

  var height = computeHeight(node);

  while (!height) {
    node = node.parentNode;
    if (node) {
      height = computeHeight(node);
    } else {
      break;
    }
  }

  return height;
}

var autoHeight = function autoHeight() {
  return function (WrappedComponent) {
    return function (_React$Component) {
      _inherits(_class2, _React$Component);

      function _class2() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _class2);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          computedHeight: 0
        }, _this.handleRoot = function (node) {
          _this.root = node;
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(_class2, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var height = this.props.height;

          if (!height) {
            var h = getAutoHeight(this.root);
            // eslint-disable-next-line
            this.setState({ computedHeight: h });
          }
        }
      }, {
        key: 'render',
        value: function render() {
          var height = this.props.height;
          var computedHeight = this.state.computedHeight;

          var h = height || computedHeight;
          return _react2.default.createElement(
            'div',
            { ref: this.handleRoot },
            h > 0 && _react2.default.createElement(WrappedComponent, _extends({}, this.props, { height: h }))
          );
        }
      }]);

      return _class2;
    }(_react2.default.Component);
  };
};

exports.default = autoHeight;
module.exports = exports.default;
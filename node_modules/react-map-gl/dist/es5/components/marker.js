"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _draggableControl = _interopRequireDefault(require("./draggable-control"));

var propTypes = Object.assign({}, _draggableControl["default"].propTypes, {
  className: _propTypes["default"].string,
  longitude: _propTypes["default"].number.isRequired,
  latitude: _propTypes["default"].number.isRequired
});
var defaultProps = Object.assign({}, _draggableControl["default"].defaultProps, {
  className: ''
});

var Marker = function (_DraggableControl) {
  (0, _inherits2["default"])(Marker, _DraggableControl);

  function Marker() {
    (0, _classCallCheck2["default"])(this, Marker);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Marker).apply(this, arguments));
  }

  (0, _createClass2["default"])(Marker, [{
    key: "_getPosition",
    value: function _getPosition() {
      var _this$props = this.props,
          longitude = _this$props.longitude,
          latitude = _this$props.latitude,
          offsetLeft = _this$props.offsetLeft,
          offsetTop = _this$props.offsetTop;
      var _this$state = this.state,
          dragPos = _this$state.dragPos,
          dragOffset = _this$state.dragOffset;

      if (dragPos && dragOffset) {
        return this._getDraggedPosition(dragPos, dragOffset);
      }

      var _this$_context$viewpo = this._context.viewport.project([longitude, latitude]),
          _this$_context$viewpo2 = (0, _slicedToArray2["default"])(_this$_context$viewpo, 2),
          x = _this$_context$viewpo2[0],
          y = _this$_context$viewpo2[1];

      x += offsetLeft;
      y += offsetTop;
      return [x, y];
    }
  }, {
    key: "_render",
    value: function _render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          draggable = _this$props2.draggable;
      var dragPos = this.state.dragPos;

      var _this$_getPosition = this._getPosition(),
          _this$_getPosition2 = (0, _slicedToArray2["default"])(_this$_getPosition, 2),
          x = _this$_getPosition2[0],
          y = _this$_getPosition2[1];

      var containerStyle = {
        position: 'absolute',
        left: x,
        top: y,
        cursor: draggable ? dragPos ? 'grabbing' : 'grab' : 'auto'
      };
      return _react["default"].createElement("div", {
        className: "mapboxgl-marker ".concat(className),
        ref: this._containerRef,
        style: containerStyle
      }, this.props.children);
    }
  }]);
  return Marker;
}(_draggableControl["default"]);

exports["default"] = Marker;
(0, _defineProperty2["default"])(Marker, "propTypes", propTypes);
(0, _defineProperty2["default"])(Marker, "defaultProps", defaultProps);
//# sourceMappingURL=marker.js.map
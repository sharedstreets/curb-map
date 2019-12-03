import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import DraggableControl from './draggable-control';
var propTypes = Object.assign({}, DraggableControl.propTypes, {
  className: PropTypes.string,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired
});
var defaultProps = Object.assign({}, DraggableControl.defaultProps, {
  className: ''
});

var Marker = function (_DraggableControl) {
  _inherits(Marker, _DraggableControl);

  function Marker() {
    _classCallCheck(this, Marker);

    return _possibleConstructorReturn(this, _getPrototypeOf(Marker).apply(this, arguments));
  }

  _createClass(Marker, [{
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
          _this$_context$viewpo2 = _slicedToArray(_this$_context$viewpo, 2),
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
          _this$_getPosition2 = _slicedToArray(_this$_getPosition, 2),
          x = _this$_getPosition2[0],
          y = _this$_getPosition2[1];

      var containerStyle = {
        position: 'absolute',
        left: x,
        top: y,
        cursor: draggable ? dragPos ? 'grabbing' : 'grab' : 'auto'
      };
      return React.createElement("div", {
        className: "mapboxgl-marker ".concat(className),
        ref: this._containerRef,
        style: containerStyle
      }, this.props.children);
    }
  }]);

  return Marker;
}(DraggableControl);

_defineProperty(Marker, "propTypes", propTypes);

_defineProperty(Marker, "defaultProps", defaultProps);

export { Marker as default };
//# sourceMappingURL=marker.js.map
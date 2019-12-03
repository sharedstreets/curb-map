import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import PropTypes from 'prop-types';
import BaseControl from './base-control';
var propTypes = Object.assign({}, BaseControl.propTypes, {
  draggable: PropTypes.bool,
  onDrag: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragStart: PropTypes.func,
  offsetLeft: PropTypes.number,
  offsetTop: PropTypes.number
});
var defaultProps = Object.assign({}, BaseControl.defaultProps, {
  draggable: false,
  offsetLeft: 0,
  offsetTop: 0
});

var DraggableControl = function (_BaseControl) {
  _inherits(DraggableControl, _BaseControl);

  function DraggableControl() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DraggableControl);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DraggableControl)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      dragPos: null,
      dragOffset: null
    });

    _defineProperty(_assertThisInitialized(_this), "_dragEvents", null);

    _defineProperty(_assertThisInitialized(_this), "_onDragStart", function (event) {
      var _this$props = _this.props,
          draggable = _this$props.draggable,
          captureDrag = _this$props.captureDrag;

      if (draggable || captureDrag) {
        event.stopPropagation();
      }

      if (!draggable) {
        return;
      }

      var dragPos = _this._getDragEventPosition(event);

      var dragOffset = _this._getDragEventOffset(event);

      _this.setState({
        dragPos: dragPos,
        dragOffset: dragOffset
      });

      _this._setupDragEvents();

      var onDragStart = _this.props.onDragStart;

      if (onDragStart && dragOffset) {
        var callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = _this._getDragLngLat(dragPos, dragOffset);
        onDragStart(callbackEvent);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onDrag", function (event) {
      event.stopPropagation();

      var dragPos = _this._getDragEventPosition(event);

      _this.setState({
        dragPos: dragPos
      });

      var onDrag = _this.props.onDrag;
      var dragOffset = _this.state.dragOffset;

      if (onDrag && dragOffset) {
        var callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = _this._getDragLngLat(dragPos, dragOffset);
        onDrag(callbackEvent);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onDragEnd", function (event) {
      var _this$state = _this.state,
          dragPos = _this$state.dragPos,
          dragOffset = _this$state.dragOffset;
      event.stopPropagation();

      _this.setState({
        dragPos: null,
        dragOffset: null
      });

      _this._removeDragEvents();

      var onDragEnd = _this.props.onDragEnd;

      if (onDragEnd && dragPos && dragOffset) {
        var callbackEvent = Object.assign({}, event);
        callbackEvent.lngLat = _this._getDragLngLat(dragPos, dragOffset);
        onDragEnd(callbackEvent);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onDragCancel", function (event) {
      event.stopPropagation();

      _this.setState({
        dragPos: null,
        dragOffset: null
      });

      _this._removeDragEvents();
    });

    return _this;
  }

  _createClass(DraggableControl, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(_getPrototypeOf(DraggableControl.prototype), "componentWillUnmount", this).call(this);

      this._removeDragEvents();
    }
  }, {
    key: "_setupDragEvents",
    value: function _setupDragEvents() {
      var eventManager = this._context.eventManager;

      if (!eventManager) {
        return;
      }

      this._dragEvents = {
        panmove: this._onDrag,
        panend: this._onDragEnd,
        pancancel: this._onDragCancel
      };
      eventManager.on(this._dragEvents);
    }
  }, {
    key: "_removeDragEvents",
    value: function _removeDragEvents() {
      var eventManager = this._context.eventManager;

      if (!eventManager || !this._dragEvents) {
        return;
      }

      eventManager.off(this._dragEvents);
      this._dragEvents = null;
    }
  }, {
    key: "_getDragEventPosition",
    value: function _getDragEventPosition(event) {
      var _event$offsetCenter = event.offsetCenter,
          x = _event$offsetCenter.x,
          y = _event$offsetCenter.y;
      return [x, y];
    }
  }, {
    key: "_getDragEventOffset",
    value: function _getDragEventOffset(event) {
      var _event$center = event.center,
          x = _event$center.x,
          y = _event$center.y;
      var container = this._containerRef.current;

      if (container) {
        var rect = container.getBoundingClientRect();
        return [rect.left - x, rect.top - y];
      }

      return null;
    }
  }, {
    key: "_getDraggedPosition",
    value: function _getDraggedPosition(dragPos, dragOffset) {
      return [dragPos[0] + dragOffset[0], dragPos[1] + dragOffset[1]];
    }
  }, {
    key: "_getDragLngLat",
    value: function _getDragLngLat(dragPos, dragOffset) {
      var _this$props2 = this.props,
          offsetLeft = _this$props2.offsetLeft,
          offsetTop = _this$props2.offsetTop;

      var _this$_getDraggedPosi = this._getDraggedPosition(dragPos, dragOffset),
          _this$_getDraggedPosi2 = _slicedToArray(_this$_getDraggedPosi, 2),
          x = _this$_getDraggedPosi2[0],
          y = _this$_getDraggedPosi2[1];

      return this._context.viewport.unproject([x - offsetLeft, y - offsetTop]);
    }
  }]);

  return DraggableControl;
}(BaseControl);

_defineProperty(DraggableControl, "propTypes", propTypes);

_defineProperty(DraggableControl, "defaultProps", defaultProps);

export { DraggableControl as default };
//# sourceMappingURL=draggable-control.js.map
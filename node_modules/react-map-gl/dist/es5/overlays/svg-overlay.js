"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _baseControl = _interopRequireDefault(require("../components/base-control"));

var propTypes = Object.assign({}, _baseControl["default"].propTypes, {
  redraw: _propTypes["default"].func.isRequired,
  style: _propTypes["default"].object
});
var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var SVGOverlay = function (_BaseControl) {
  (0, _inherits2["default"])(SVGOverlay, _BaseControl);

  function SVGOverlay() {
    (0, _classCallCheck2["default"])(this, SVGOverlay);
    return (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(SVGOverlay).apply(this, arguments));
  }

  (0, _createClass2["default"])(SVGOverlay, [{
    key: "_render",
    value: function _render() {
      var _this$_context = this._context,
          viewport = _this$_context.viewport,
          isDragging = _this$_context.isDragging;
      var style = Object.assign({
        position: 'absolute',
        left: 0,
        top: 0
      }, this.props.style);
      return _react["default"].createElement("svg", {
        width: viewport.width,
        height: viewport.height,
        ref: this._containerRef,
        style: style
      }, this.props.redraw({
        width: viewport.width,
        height: viewport.height,
        isDragging: isDragging,
        project: viewport.project.bind(viewport),
        unproject: viewport.unproject.bind(viewport)
      }));
    }
  }]);
  return SVGOverlay;
}(_baseControl["default"]);

exports["default"] = SVGOverlay;
(0, _defineProperty2["default"])(SVGOverlay, "propTypes", propTypes);
(0, _defineProperty2["default"])(SVGOverlay, "defaultProps", defaultProps);
//# sourceMappingURL=svg-overlay.js.map
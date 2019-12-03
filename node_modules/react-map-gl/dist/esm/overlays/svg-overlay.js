import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import BaseControl from '../components/base-control';
var propTypes = Object.assign({}, BaseControl.propTypes, {
  redraw: PropTypes.func.isRequired,
  style: PropTypes.object
});
var defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

var SVGOverlay = function (_BaseControl) {
  _inherits(SVGOverlay, _BaseControl);

  function SVGOverlay() {
    _classCallCheck(this, SVGOverlay);

    return _possibleConstructorReturn(this, _getPrototypeOf(SVGOverlay).apply(this, arguments));
  }

  _createClass(SVGOverlay, [{
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
      return React.createElement("svg", {
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
}(BaseControl);

_defineProperty(SVGOverlay, "propTypes", propTypes);

_defineProperty(SVGOverlay, "defaultProps", defaultProps);

export { SVGOverlay as default };
//# sourceMappingURL=svg-overlay.js.map
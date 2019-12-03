import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import PropTypes from 'prop-types';
import DraggableControl from './draggable-control';
const propTypes = Object.assign({}, DraggableControl.propTypes, {
  className: PropTypes.string,
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired
});
const defaultProps = Object.assign({}, DraggableControl.defaultProps, {
  className: ''
});
export default class Marker extends DraggableControl {
  _getPosition() {
    const {
      longitude,
      latitude,
      offsetLeft,
      offsetTop
    } = this.props;
    const {
      dragPos,
      dragOffset
    } = this.state;

    if (dragPos && dragOffset) {
      return this._getDraggedPosition(dragPos, dragOffset);
    }

    let [x, y] = this._context.viewport.project([longitude, latitude]);

    x += offsetLeft;
    y += offsetTop;
    return [x, y];
  }

  _render() {
    const {
      className,
      draggable
    } = this.props;
    const {
      dragPos
    } = this.state;

    const [x, y] = this._getPosition();

    const containerStyle = {
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

}

_defineProperty(Marker, "propTypes", propTypes);

_defineProperty(Marker, "defaultProps", defaultProps);
//# sourceMappingURL=marker.js.map
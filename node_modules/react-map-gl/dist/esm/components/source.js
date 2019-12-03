import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { PureComponent, cloneElement } from 'react';
import PropTypes from 'prop-types';
import MapContext from './map-context';
import assert from '../utils/assert';
var propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string
};
var sourceCounter = 0;

var Source = function (_PureComponent) {
  _inherits(Source, _PureComponent);

  function Source(_props) {
    var _this;

    _classCallCheck(this, Source);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Source).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "id", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", void 0);

    _defineProperty(_assertThisInitialized(_this), "_map", null);

    _defineProperty(_assertThisInitialized(_this), "_sourceOptions", {});

    _defineProperty(_assertThisInitialized(_this), "_updateSource", function () {
      var _assertThisInitialize = _assertThisInitialized(_this),
          type = _assertThisInitialize.type,
          map = _assertThisInitialize._map;

      if (!map) {
        return;
      }

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          sourceOptions = _assertThisInitialize2._sourceOptions,
          props = _assertThisInitialize2.props;

      assert(!props.id || props.id === _this.id, 'source id changed');
      assert(props.type === type, 'source type changed');
      var changedKey = null;
      var changedKeyCount = 0;

      for (var key in props) {
        if (key !== 'children' && key !== 'id' && sourceOptions[key] !== props[key]) {
          sourceOptions[key] = props[key];
          changedKey = key;
          changedKeyCount++;
        }
      }

      var source = _this.getSource();

      if (!source) {
        _this._createSource(sourceOptions);

        return;
      }

      if (!changedKeyCount) {
        return;
      }

      if (type === 'geojson') {
        source.setData(sourceOptions.data);
      } else if (type === 'image') {
        source.updateImage({
          url: sourceOptions.url,
          coordinates: sourceOptions.coordinates
        });
      } else if ((type === 'canvas' || type === 'video') && changedKeyCount === 1 && changedKey === 'coordinates') {
        source.setCoordinates(sourceOptions.coordinates);
      } else {
        map.removeSource(_this.id);
        map.addSource(_this.id, sourceOptions);
      }
    });

    _this.id = _props.id || "jsx-source-".concat(sourceCounter++);
    _this.type = _props.type;
    return _this;
  }

  _createClass(Source, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      var map = this._map;

      if (map) {
        map.off('styledata', this._updateSource);

        if (map.style) {
          requestAnimationFrame(function () {
            return map.removeSource(_this2.id);
          });
        }
      }
    }
  }, {
    key: "getSource",
    value: function getSource() {
      var map = this._map;
      return map && map.style && map.getSource(this.id);
    }
  }, {
    key: "_createSource",
    value: function _createSource(sourceOptions) {
      var map = this._map;

      if (map.style && map.style._loaded) {
        map.addSource(this.id, sourceOptions);
      }
    }
  }, {
    key: "_render",
    value: function _render(context) {
      var _this3 = this;

      if (!this._map) {
        this._map = context.map;

        this._map.on('styledata', this._updateSource);
      }

      this._updateSource();

      return React.Children.map(this.props.children, function (child) {
        return cloneElement(child, {
          source: _this3.id
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(MapContext.Consumer, null, this._render.bind(this));
    }
  }]);

  return Source;
}(PureComponent);

_defineProperty(Source, "propTypes", propTypes);

export { Source as default };
//# sourceMappingURL=source.js.map
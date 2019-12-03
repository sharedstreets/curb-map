'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _tag = require('antd/lib/tag');

var _tag2 = _interopRequireDefault(_tag);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  'tagSelect': 'antd-pro-tag-select-tagSelect',
  'ant-tag': 'antd-pro-tag-select-ant-tag',
  'expanded': 'antd-pro-tag-select-expanded',
  'trigger': 'antd-pro-tag-select-trigger',
  'hasExpandTag': 'antd-pro-tag-select-hasExpandTag'
};
var CheckableTag = _tag2.default.CheckableTag;


var TagSelectOption = function TagSelectOption(_ref) {
  var children = _ref.children,
      checked = _ref.checked,
      _onChange = _ref.onChange,
      value = _ref.value;
  return _react2.default.createElement(
    CheckableTag,
    { checked: checked, key: value, onChange: function onChange(state) {
        return _onChange(value, state);
      } },
    children
  );
};

TagSelectOption.isTagSelectOption = true;

var TagSelect = (_temp = _class = function (_Component) {
  _inherits(TagSelect, _Component);

  function TagSelect(props) {
    _classCallCheck(this, TagSelect);

    var _this = _possibleConstructorReturn(this, (TagSelect.__proto__ || Object.getPrototypeOf(TagSelect)).call(this, props));

    _this.onChange = function (value) {
      var onChange = _this.props.onChange;

      if (!('value' in _this.props)) {
        _this.setState({ value: value });
      }
      if (onChange) {
        onChange(value);
      }
    };

    _this.onSelectAll = function (checked) {
      var checkedTags = [];
      if (checked) {
        checkedTags = _this.getAllTags();
      }
      _this.onChange(checkedTags);
    };

    _this.handleTagChange = function (value, checked) {
      var StateValue = _this.state.value;

      var checkedTags = [].concat(_toConsumableArray(StateValue));

      var index = checkedTags.indexOf(value);
      if (checked && index === -1) {
        checkedTags.push(value);
      } else if (!checked && index > -1) {
        checkedTags.splice(index, 1);
      }
      _this.onChange(checkedTags);
    };

    _this.handleExpand = function () {
      var expand = _this.state.expand;

      _this.setState({
        expand: !expand
      });
    };

    _this.isTagSelectOption = function (node) {
      return node && node.type && (node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption');
    };

    _this.state = {
      expand: false,
      value: props.value || props.defaultValue || []
    };
    return _this;
  }

  _createClass(TagSelect, [{
    key: 'getAllTags',
    value: function getAllTags() {
      var _this2 = this;

      var children = this.props.children;

      children = _react2.default.Children.toArray(children);
      var checkedTags = children.filter(function (child) {
        return _this2.isTagSelectOption(child);
      }).map(function (child) {
        return child.props.value;
      });
      return checkedTags || [];
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames,
          _this3 = this;

      var _state = this.state,
          value = _state.value,
          expand = _state.expand;
      var _props = this.props,
          children = _props.children,
          hideCheckAll = _props.hideCheckAll,
          className = _props.className,
          style = _props.style,
          expandable = _props.expandable,
          actionsText = _props.actionsText;

      var checkedAll = this.getAllTags().length === value.length;

      var _ref2 = actionsText === null ? {} : actionsText,
          _ref2$expandText = _ref2.expandText,
          expandText = _ref2$expandText === undefined ? 'Expand' : _ref2$expandText,
          _ref2$collapseText = _ref2.collapseText,
          collapseText = _ref2$collapseText === undefined ? 'Collapse' : _ref2$collapseText,
          _ref2$selectAllText = _ref2.selectAllText,
          selectAllText = _ref2$selectAllText === undefined ? 'All' : _ref2$selectAllText;

      var cls = (0, _classnames2.default)(styles.tagSelect, className, (_classNames = {}, _defineProperty(_classNames, styles.hasExpandTag, expandable), _defineProperty(_classNames, styles.expanded, expand), _classNames));

      return _react2.default.createElement(
        'div',
        { className: cls, style: style },
        hideCheckAll ? null : _react2.default.createElement(
          CheckableTag,
          { checked: checkedAll, key: 'tag-select-__all__', onChange: this.onSelectAll },
          selectAllText
        ),
        value && _react2.default.Children.map(children, function (child) {
          if (_this3.isTagSelectOption(child)) {
            return _react2.default.cloneElement(child, {
              key: 'tag-select-' + child.props.value,
              value: child.props.value,
              checked: value.indexOf(child.props.value) > -1,
              onChange: _this3.handleTagChange
            });
          }
          return child;
        }),
        expandable && _react2.default.createElement(
          'a',
          { className: styles.trigger, onClick: this.handleExpand },
          expand ? collapseText : expandText,
          ' ',
          _react2.default.createElement(_icon2.default, { type: expand ? 'up' : 'down' })
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps) {
      if ('value' in nextProps) {
        return { value: nextProps.value || [] };
      }
      return null;
    }
  }]);

  return TagSelect;
}(_react.Component), _class.propTypes = {
  actionsText: _propTypes2.default.object,
  hideCheckAll: _propTypes2.default.bool
}, _class.defaultProps = {
  hideCheckAll: false,
  actionsText: {
    expandText: 'Expand',
    collapseText: 'Collapse',
    selectAllText: 'All'
  }
}, _temp);


TagSelect.Option = TagSelectOption;

exports.default = TagSelect;
module.exports = exports.default;
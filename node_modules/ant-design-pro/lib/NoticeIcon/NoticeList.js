'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _list = require('antd/lib/list');

var _list2 = _interopRequireDefault(_list);

var _avatar = require('antd/lib/avatar');

var _avatar2 = _interopRequireDefault(_avatar);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var styles = {
  'list': 'antd-pro-notice-icon-list',
  'item': 'antd-pro-notice-icon-item',
  'meta': 'antd-pro-notice-icon-meta',
  'avatar': 'antd-pro-notice-icon-avatar',
  'iconElement': 'antd-pro-notice-icon-iconElement',
  'read': 'antd-pro-notice-icon-read',
  'title': 'antd-pro-notice-icon-title',
  'description': 'antd-pro-notice-icon-description',
  'datetime': 'antd-pro-notice-icon-datetime',
  'extra': 'antd-pro-notice-icon-extra',
  'loadMore': 'antd-pro-notice-icon-loadMore',
  'loadedAll': 'antd-pro-notice-icon-loadedAll',
  'notFound': 'antd-pro-notice-icon-notFound',
  'bottomBar': 'antd-pro-notice-icon-bottomBar'
};
function NoticeList(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === undefined ? [] : _ref$data,
      _onClick = _ref.onClick,
      onClear = _ref.onClear,
      title = _ref.title,
      locale = _ref.locale,
      emptyText = _ref.emptyText,
      emptyImage = _ref.emptyImage,
      _ref$onViewMore = _ref.onViewMore,
      onViewMore = _ref$onViewMore === undefined ? null : _ref$onViewMore,
      _ref$showClear = _ref.showClear,
      showClear = _ref$showClear === undefined ? true : _ref$showClear,
      _ref$showViewMore = _ref.showViewMore,
      showViewMore = _ref$showViewMore === undefined ? false : _ref$showViewMore;

  if (data.length === 0) {
    return _react2.default.createElement(
      'div',
      { className: styles.notFound },
      emptyImage ? _react2.default.createElement('img', { src: emptyImage, alt: 'not found' }) : null,
      _react2.default.createElement(
        'div',
        null,
        emptyText || locale.emptyText
      )
    );
  }
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _list2.default,
      { className: styles.list },
      data.map(function (item, i) {
        var itemCls = (0, _classnames2.default)(styles.item, _defineProperty({}, styles.read, item.read));
        // eslint-disable-next-line no-nested-ternary
        var leftIcon = item.avatar ? typeof item.avatar === 'string' ? _react2.default.createElement(_avatar2.default, { className: styles.avatar, src: item.avatar }) : _react2.default.createElement(
          'span',
          { className: styles.iconElement },
          item.avatar
        ) : null;

        return _react2.default.createElement(
          _list2.default.Item,
          { className: itemCls, key: item.key || i, onClick: function onClick() {
              return _onClick(item);
            } },
          _react2.default.createElement(_list2.default.Item.Meta, {
            className: styles.meta,
            avatar: leftIcon,
            title: _react2.default.createElement(
              'div',
              { className: styles.title },
              item.title,
              _react2.default.createElement(
                'div',
                { className: styles.extra },
                item.extra
              )
            ),
            description: _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: styles.description, title: item.description },
                item.description
              ),
              _react2.default.createElement(
                'div',
                { className: styles.datetime },
                item.datetime
              )
            )
          })
        );
      })
    ),
    _react2.default.createElement(
      'div',
      { className: styles.bottomBar },
      showClear ? _react2.default.createElement(
        'div',
        { onClick: onClear },
        locale.clear,
        ' ',
        locale[title] || title
      ) : null,
      showViewMore ? _react2.default.createElement(
        'div',
        { onClick: onViewMore },
        locale.viewMore
      ) : null
    )
  );
}
exports.default = NoticeList;
module.exports = exports.default;
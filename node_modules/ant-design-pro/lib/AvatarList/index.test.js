'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _enzyme = require('enzyme');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderItems = function renderItems(numItems) {
  return (0, _range2.default)(numItems).map(function (i) {
    return _react2.default.createElement(_index2.default.Item, {
      key: i,
      tips: 'Jake',
      src: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png'
    });
  });
};

describe('AvatarList', function () {
  it('renders all items', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _index2.default,
      null,
      renderItems(4)
    ));
    expect(wrapper.find('AvatarList').length).toBe(1);
    expect(wrapper.find('Item').length).toBe(4);
    expect(wrapper.findWhere(function (node) {
      return node.key() === 'exceed';
    }).length).toBe(0);
  });

  it('renders max of 3 items', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _index2.default,
      { maxLength: 3 },
      renderItems(4)
    ));
    expect(wrapper.find('AvatarList').length).toBe(1);
    expect(wrapper.find('Item').length).toBe(3);
    expect(wrapper.findWhere(function (node) {
      return node.key() === 'exceed';
    }).length).toBe(1);
  });
});
'use strict';

var _breadcrumb = require('./breadcrumb');

var _pathTools = require('../_utils/pathTools');

var routerData = {
  '/dashboard/analysis': {
    name: '分析页'
  },
  '/userinfo': {
    name: '用户列表'
  },
  '/userinfo/:id': {
    name: '用户信息'
  },
  '/userinfo/:id/addr': {
    name: '收货订单'
  }
};
describe('test getBreadcrumb', function () {
  it('Simple url', function () {
    expect((0, _breadcrumb.getBreadcrumb)(routerData, '/dashboard/analysis').name).toEqual('分析页');
  });
  it('Parameters url', function () {
    expect((0, _breadcrumb.getBreadcrumb)(routerData, '/userinfo/2144').name).toEqual('用户信息');
  });
  it('The middle parameter url', function () {
    expect((0, _breadcrumb.getBreadcrumb)(routerData, '/userinfo/2144/addr').name).toEqual('收货订单');
  });
  it('Loop through the parameters', function () {
    var urlNameList = (0, _pathTools.urlToList)('/userinfo/2144/addr').map(function (url) {
      return (0, _breadcrumb.getBreadcrumb)(routerData, url).name;
    });
    expect(urlNameList).toEqual(['用户列表', '用户信息', '收货订单']);
  });

  it('a path', function () {
    var urlNameList = (0, _pathTools.urlToList)('/userinfo').map(function (url) {
      return (0, _breadcrumb.getBreadcrumb)(routerData, url).name;
    });
    expect(urlNameList).toEqual(['用户列表']);
  });
  it('Secondary path', function () {
    var urlNameList = (0, _pathTools.urlToList)('/userinfo/2144').map(function (url) {
      return (0, _breadcrumb.getBreadcrumb)(routerData, url).name;
    });
    expect(urlNameList).toEqual(['用户列表', '用户信息']);
  });
});
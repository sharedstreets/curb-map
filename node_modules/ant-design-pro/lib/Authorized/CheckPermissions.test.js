'use strict';

var _CheckPermissions = require('./CheckPermissions');

var target = 'ok';
var error = 'error';

describe('test CheckPermissions', function () {
  it('Correct string permission authentication', function () {
    expect((0, _CheckPermissions.checkPermissions)('user', 'user', target, error)).toEqual('ok');
  });
  it('Correct string permission authentication', function () {
    expect((0, _CheckPermissions.checkPermissions)('user', 'NULL', target, error)).toEqual('error');
  });
  it('authority is undefined , return ok', function () {
    expect((0, _CheckPermissions.checkPermissions)(null, 'NULL', target, error)).toEqual('ok');
  });
  it('currentAuthority is undefined , return error', function () {
    expect((0, _CheckPermissions.checkPermissions)('admin', null, target, error)).toEqual('error');
  });
  it('Wrong string permission authentication', function () {
    expect((0, _CheckPermissions.checkPermissions)('admin', 'user', target, error)).toEqual('error');
  });
  it('Correct Array permission authentication', function () {
    expect((0, _CheckPermissions.checkPermissions)(['user', 'admin'], 'user', target, error)).toEqual('ok');
  });
  it('Wrong Array permission authentication,currentAuthority error', function () {
    expect((0, _CheckPermissions.checkPermissions)(['user', 'admin'], 'user,admin', target, error)).toEqual('error');
  });
  it('Wrong Array permission authentication', function () {
    expect((0, _CheckPermissions.checkPermissions)(['user', 'admin'], 'guest', target, error)).toEqual('error');
  });
  it('Wrong Function permission authentication', function () {
    expect((0, _CheckPermissions.checkPermissions)(function () {
      return false;
    }, 'guest', target, error)).toEqual('error');
  });
  it('Correct Function permission authentication', function () {
    expect((0, _CheckPermissions.checkPermissions)(function () {
      return true;
    }, 'guest', target, error)).toEqual('ok');
  });
  it('authority is string, currentAuthority is array, return ok', function () {
    expect((0, _CheckPermissions.checkPermissions)('user', ['user'], target, error)).toEqual('ok');
  });
  it('authority is string, currentAuthority is array, return ok', function () {
    expect((0, _CheckPermissions.checkPermissions)('user', ['user', 'admin'], target, error)).toEqual('ok');
  });
  it('authority is array, currentAuthority is array, return ok', function () {
    expect((0, _CheckPermissions.checkPermissions)(['user', 'admin'], ['user', 'admin'], target, error)).toEqual('ok');
  });
  it('Wrong Function permission authentication', function () {
    expect((0, _CheckPermissions.checkPermissions)(function () {
      return false;
    }, ['user'], target, error)).toEqual('error');
  });
  it('Correct Function permission authentication', function () {
    expect((0, _CheckPermissions.checkPermissions)(function () {
      return true;
    }, ['user'], target, error)).toEqual('ok');
  });
  it('authority is undefined , return ok', function () {
    expect((0, _CheckPermissions.checkPermissions)(null, ['user'], target, error)).toEqual('ok');
  });
});
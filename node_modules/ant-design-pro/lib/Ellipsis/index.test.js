'use strict';

var _index = require('./index');

describe('test calculateShowLength', function () {
  it('get full length', function () {
    expect((0, _index.getStrFullLength)('一二，a,')).toEqual(8);
  });
  it('cut str by full length', function () {
    expect((0, _index.cutStrByFullLength)('一二，a,', 7)).toEqual('一二，a');
  });
  it('cut str when length small', function () {
    expect((0, _index.cutStrByFullLength)('一22三', 5)).toEqual('一22');
  });
});
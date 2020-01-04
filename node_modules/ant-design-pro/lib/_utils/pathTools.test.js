"use strict";

var _pathTools = require("./pathTools");

describe("test urlToList", function() {
  it("A path", function() {
    expect((0, _pathTools.urlToList)("/userinfo")).toEqual(["/userinfo"]);
  });
  it("Secondary path", function() {
    expect((0, _pathTools.urlToList)("/userinfo/2144")).toEqual([
      "/userinfo",
      "/userinfo/2144"
    ]);
  });
  it("Three paths", function() {
    expect((0, _pathTools.urlToList)("/userinfo/2144/addr")).toEqual([
      "/userinfo",
      "/userinfo/2144",
      "/userinfo/2144/addr"
    ]);
  });
});

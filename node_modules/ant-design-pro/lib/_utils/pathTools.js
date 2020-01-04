"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlToList = urlToList;
// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
// eslint-disable-next-line import/prefer-default-export
function urlToList(url) {
  var urllist = url.split("/").filter(function(i) {
    return i;
  });
  return urllist.map(function(urlItem, index) {
    return "/" + urllist.slice(0, index + 1).join("/");
  });
}

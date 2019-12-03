'use strict';

/**
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认50px, 对于iPhone的设计稿, 1rem=100px; 方便裸算rem; 有的是16px, 用浏览器默认;
 * @param {Number} [psdWidth = 750] - 设计稿默认宽度, 以750为基准;
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var win = window;

exports.default = win.vw = function (baseFontSize, psdWidth) {
  var _baseFontSize = baseFontSize || 100;
  var _psdWidth = psdWidth || 750;

  var doc = win.document;
  var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  var dpr = win.devicePixelRatio || 1;
  var docEl = doc.documentElement;
  // 为了消除安卓dpr乱标的比例
  var rate = 1;
  var scale = 1 / dpr;
  if (isIos) {
    // iOS下不用做什么
  } else {
    // 如果是在PC或者安卓4.3(会闪屏)以下, 则正常展现.
    scale = 1;
  }

  var metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',viewport-fit=cover');

  // width/750*100, 为了统一rem为0.01rem = 1px
  var setFontSize = function setFontSize() {
    docEl.style.fontSize = _baseFontSize / _psdWidth * docEl.clientWidth * rate + 'px';
  };
  setFontSize();
  win.addEventListener('resize', setFontSize);
};

module.exports = exports['default'];
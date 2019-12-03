"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _registerServiceWorker = require("register-service-worker");

/* eslint-disable */
// polyfill the CustomEvent in ie9/10/11
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
(function () {
  if (typeof window.CustomEvent === 'function') return false;

  function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();

function dispatchServiceWorkerEvent(eventName, eventData) {
  var event = new CustomEvent(eventName, {
    detail: eventData
  });
  window.dispatchEvent(event);
}

function _default(swDest) {
  (0, _registerServiceWorker.register)("".concat(process.env.BASE_URL).concat(swDest), {
    ready: function ready(registration) {
      dispatchServiceWorkerEvent('sw.ready', registration);
    },
    registered: function registered(registration) {
      dispatchServiceWorkerEvent('sw.registered', registration);
    },
    cached: function cached(registration) {
      dispatchServiceWorkerEvent('sw.cached', registration);
    },
    updatefound: function updatefound(registration) {
      dispatchServiceWorkerEvent('sw.updatefound', registration);
    },
    updated: function updated(registration) {
      dispatchServiceWorkerEvent('sw.updated', registration);
    },
    offline: function offline() {
      dispatchServiceWorkerEvent('sw.offline', {});
    },
    error: function error(_error) {
      dispatchServiceWorkerEvent('sw.error', _error);
    }
  });
}
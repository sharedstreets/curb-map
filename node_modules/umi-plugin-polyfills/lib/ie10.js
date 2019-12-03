"use strict";

require("core-js/es6/promise");

require("core-js/es6/set");

require("core-js/es6/map");

require("core-js/es6/object");

require("core-js/es6/number");

require("core-js/es6/array");

require("url-polyfill");

// UMI depends on promise
// React depends on set/map/requestAnimationFrame
// https://reactjs.org/docs/javascript-environment-requirements.html
// https://github.com/umijs/umi/issues/413
Object.setPrototypeOf = require('setprototypeof');
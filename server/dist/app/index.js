'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require('../Customer/api');

Object.defineProperty(exports, 'CustomerResource', {
  enumerable: true,
  get: function get() {
    return _api.CustomerResource;
  }
});

var _api2 = require('../Order/api/');

Object.defineProperty(exports, 'OrderResource', {
  enumerable: true,
  get: function get() {
    return _api2.OrderResource;
  }
});
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getLogger = undefined;

var _gdsStack = require('gds-stack');

var LOGGER_NAME = process.env.LOGGER_NAME || 'nica-office';

var getLogger = exports.getLogger = function getLogger() {
    return (0, _gdsStack.Logger)(LOGGER_NAME);
};
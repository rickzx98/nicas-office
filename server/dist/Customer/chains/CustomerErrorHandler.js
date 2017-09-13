'use strict';

var _chain = require('./chain.info');

var _fluidChains = require('fluid-chains');

var _entity = require('../entity/');

var _AppLogger = require('../../AppLogger');

var CustomerChain = new _fluidChains.Chain(_chain.CUSTOMER_ERROR_HANDLER, function (context, param, next) {
    (0, _AppLogger.getLogger)().info(_chain.CUSTOMER_ERROR_HANDLER + ' has been invoked.');
    (0, _AppLogger.getLogger)().error(param.$err && param.$errorMessage());
    next();
});
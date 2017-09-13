'use strict';

var _fluidChains = require('fluid-chains');

var _chain = require('./chain.info');

var _AppLogger = require('../../AppLogger');

var OrderChain = new _fluidChains.Chain(GET_ORDERS, function (context, param, next) {
    (0, _AppLogger.getLogger)().info(_chain.ORDER_ERROR_HANDLER + ' has been invoked.');
    (0, _AppLogger.getLogger)().error(param.$err && param.$errorMessage());
    next();
});
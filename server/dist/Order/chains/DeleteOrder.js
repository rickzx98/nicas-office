'use strict';

var _fluidChains = require('fluid-chains');

var _chain = require('./chain.info');

var _entity = require('../entity/');

var OrderChain = new _fluidChains.Chain(_chain.DELETE_ORDER, function (context, param, next) {
    var orderId = param.orderId();
    _entity.OrderModel.findByIdAndRemove(orderId).then(function (data) {
        context.set('orderDeletedData', data);
        next();
    }).catch(function (error) {
        next(error);
    });
});
OrderChain.addSpec('orderId').require();
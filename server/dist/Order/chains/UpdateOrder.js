'use strict';

var _fluidChains = require('fluid-chains');

var _entity = require('../entity/');

var _chain = require('./chain.info');

var OrderChain = new _fluidChains.Chain(_chain.UPDATE_ORDER, function (context, param, next) {
    var updateData = param.inputData();
    var orderId = param.orderId();
    _entity.OrderModel.findByIdAndUpdate(orderId, updateData).then(function (data) {
        context.set('orderUpdatedData', data);
        next();
    }).catch(function (error) {
        next(error);
    });
});
OrderChain.addSpec('orderId').require();
OrderChain.addSpec('inputData').default({}).require();
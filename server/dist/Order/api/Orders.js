'use strict';

var _chain = require('../chains/chain.info');

var _chain2 = require('./chain.info');

var _fluidChains = require('fluid-chains');

var _gdsStack = require('gds-stack');

var CreateOrder = new _fluidChains.Chain(_chain2.CREATE_ORDER_API, function (context, param, next) {
    var body = param.inputBody();
    (0, _fluidChains.ExecuteChain)(_chain.CREATE_ORDER, Object.assign({}, body), function (result) {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _chain2.CREATE_ORDER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new _gdsStack.GDSDomainDTO(_chain2.CREATE_ORDER_API, result.orderCreatedData()));
            next();
        }
    }, undefined, _chain.ORDER_ERROR_HANDLER);
});
CreateOrder.addSpec('inputBody').require();

var UpdateOrder = new _fluidChains.Chain(_chain2.UPDATE_ORDER_API, function (context, param, next) {
    var inputData = param.inputBody();
    var orderId = param.orderId();
    (0, _fluidChains.ExecuteChain)(_chain.UPDATE_ORDER, Object.assign({}, { inputData: inputData, orderId: orderId }), function (result) {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _chain2.UPDATE_ORDER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new _gdsStack.GDSDomainDTO(_chain2.UPDATE_ORDER_API, result.orderUpdatedData()));
            next();
        }
    }, undefined, _chain.ORDER_ERROR_HANDLER);
});
UpdateOrder.addSpec('orderId').require();
UpdateOrder.addSpec('inputBody').require();

var DeleteOrder = new _fluidChains.Chain(_chain2.DELETE_ORDER_API, function (context, param, next) {
    var orderId = param.orderId();
    (0, _fluidChains.ExecuteChain)(_chain.DELETE_ORDER, { orderId: orderId }, function (result) {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _chain2.DELETE_ORDER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new _gdsStack.GDSDomainDTO(_chain2.DELETE_ORDER_API, result.orderDeletedData()));
            next();
        }
    }, undefined, _chain.ORDER_ERROR_HANDLER);
});
DeleteOrder.addSpec('orderId').require();

var GetOrders = new _fluidChains.Chain(_chain2.GET_ORDERS_API, function (context, param, next) {
    var paginate = param.paginate();
    (0, _fluidChains.ExecuteChain)(_chain.GET_ORDERS, {
        query: param.query(),
        limit: paginate.limit,
        offset: paginate.offset,
        page: paginate.page
    }, function (result) {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _chain2.GET_ORDERS_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new _gdsStack.GDSDomainDTO(_chain2.GET_ORDERS_API, result.orderFetchedData()));
            next();
        }
    });
}, undefined, _chain.ORDER_ERROR_HANDLER);

GetOrders.addSpec('query');
GetOrders.addSpec('paginate');
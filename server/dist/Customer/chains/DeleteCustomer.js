'use strict';

var _chain = require('./chain.info');

var _fluidChains = require('fluid-chains');

var _entity = require('../entity/');

var DeleteCustomerChain = new _fluidChains.Chain(_chain.DELETE_CUSTOMER, function (context, param, next) {
    var _id = param.customerId();
    _entity.CustomerModel.findByIdAndRemove(_id).then(function (result) {
        context.set('customerDeleteData', result);
        next();
    }).catch(function (error) {
        next(error);
    });
}, undefined, _chain.CUSTOMER_ERROR_HANDLER);
DeleteCustomerChain.addSpec('customerId').require();
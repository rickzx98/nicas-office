'use strict';

var _chain = require('./chain.info');

var _fluidChains = require('fluid-chains');

var _entity = require('../entity/');

var UpdateCustomerChain = new _fluidChains.Chain(_chain.UPDATE_CUSTOMER, function (context, param, next) {
    var _id = param.customerId();
    _entity.CustomerModel.findByIdAndUpdate(_id, param.inputData()).then(function (result) {
        context.set('customerUpdatedData', result);
        next();
    }).catch(function (error) {
        next(error);
    });
}, undefined, _chain.CUSTOMER_ERROR_HANDLER);
UpdateCustomerChain.addSpec('customerId').require();
UpdateCustomerChain.addSpec('inputData').require();
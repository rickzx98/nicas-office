'use strict';

var _chain = require('./chain.info');

var _fluidChains = require('fluid-chains');

var _entity = require('../entity/');

var CreateCustomerChain = new _fluidChains.Chain(_chain.CREATE_CUSTOMER, function (context, param, next) {
    var createdBy = param.createdBy();
    var name = param.name();
    _entity.CustomerModel.create({ createdBy: createdBy, name: name }).then(function (result) {
        context.set('customerCreatedData', result);
        next();
    }).catch(function (error) {
        next(error);
    });
}, undefined, _chain.CUSTOMER_ERROR_HANDLER);

CreateCustomerChain.addSpec('createdBy').require();
CreateCustomerChain.addSpec('name').require();
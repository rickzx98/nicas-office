'use strict';

var _chain = require('../chains/chain.info');

var _chain2 = require('./chain.info');

var _fluidChains = require('fluid-chains');

var _gdsStack = require('gds-stack');

var CreateCustomerAPI = new _fluidChains.Chain(_chain2.CREATE_CUSTOMER_API, function (context, param, next) {
    (0, _fluidChains.ExecuteChain)(_chain.CREATE_CUSTOMER, {
        name: param.customerName(),
        createdBy: param.userId()
    }, function (result) {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _chain2.CREATE_CUSTOMER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new _gdsStack.GDSDomainDTO(_chain2.CREATE_CUSTOMER_API, result.customerCreatedData()));
            next();
        }
    });
});

CreateCustomerAPI.addSpec('customerName').require();
CreateCustomerAPI.addSpec('userId').require();

var DeleteCustomerAPI = new _fluidChains.Chain(_chain2.DELETE_CUSTOMER_API, function (context, param, next) {
    (0, _fluidChains.ExecuteChain)(_chain.DELETE_CUSTOMER, {
        customerId: param.customerId()
    }, function (result) {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _chain2.DELETE_CUSTOMER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new _gdsStack.GDSDomainDTO(_chain2.DELETE_CUSTOMER_API, result.customerDeleteData()));
            next();
        }
    });
});

DeleteCustomerAPI.addSpec('customerId').require();

var UpdateCustomerAPI = new _fluidChains.Chain(_chain2.UPDATE_CUSTOMER_API, function (context, param, next) {
    (0, _fluidChains.ExecuteChain)(_chain.UPDATE_CUSTOMER, {
        customerId: param.customerId(),
        inputData: param.inputData()
    }, function (result) {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _chain2.UPDATE_CUSTOMER_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new _gdsStack.GDSDomainDTO(_chain2.UPDATE_CUSTOMER_API, result.customerUpdatedData()));
            next();
        }
    });
});

UpdateCustomerAPI.addSpec('customerId').require();
UpdateCustomerAPI.addSpec('inputData').require();

var GetCustomersAPI = new _fluidChains.Chain(_chain2.GET_CUSTOMERS_API, function (context, param, next) {
    var paginate = param.paginate();
    (0, _fluidChains.ExecuteChain)(_chain.GET_CUSTOMERS, {
        query: param.query(),
        limit: paginate.limit,
        offset: paginate.offset,
        page: paginate.page
    }, function (result) {
        if (result.$err) {
            context.set('status', 500);
            context.set('dto', new _gdsStack.GDSDomainDTO('ERROR_' + _chain2.GET_CUSTOMERS_API, result.$errorMessage()));
            next();
        } else {
            context.set('status', 200);
            context.set('dto', new _gdsStack.GDSDomainDTO(_chain2.GET_CUSTOMERS_API, result.customerFetchedData()));
            next();
        }
    });
}, undefined, _chain.CUSTOMER_ERROR_HANDLER);

GetCustomersAPI.addSpec('query');
GetCustomersAPI.addSpec('paginate');
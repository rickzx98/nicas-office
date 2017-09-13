'use strict';

var _chain = require('./chain.info');

var _fluidChains = require('fluid-chains');

var _entity = require('../entity/');

var GetCustomersChain = new _fluidChains.Chain(_chain.GET_CUSTOMERS, function (context, param, next) {
    var query = param.query();
    var paginate = {
        limit: param.limit(),
        offset: param.offset(),
        page: param.page()
    };
    _entity.CustomerModel.paginate(query, paginate, function (err, result) {
        context.set('customerFetchedData', result);
        next(err);
    });
}, undefined, _chain.CUSTOMER_ERROR_HANDLER);

GetCustomersChain.addSpec('query').default({});
GetCustomersChain.addSpec('limit').default(25).transform(function (current, toValue) {
    return toValue(parseInt(current));
});
GetCustomersChain.addSpec('offset').default(0).transform(function (current, toValue) {
    return toValue(parseInt(current));
});
GetCustomersChain.addSpec('page').default(1).transform(function (current, toValue) {
    return toValue(parseInt(current));
});
'use strict';

var _fluidChains = require('fluid-chains');

var _chain = require('./chain.info');

var _entity = require('../entity/');

var OrderChain = new _fluidChains.Chain(_chain.GET_ORDERS, function (context, param, next) {
    var query = param.query();
    var paginate = {
        limit: param.limit(),
        offset: param.offset(),
        page: param.page()
    };
    _entity.OrderModel.paginage(query, paginate).then(function (data) {
        context.set('orderFetchedData', data.docs);
        next();
    }).catch(function (error) {
        next(error);
    });
});
OrderChain.addSpec('query').default({});
OrderChain.addSpec('limit').default(25);
OrderChain.addSpec('offset').default(0);
OrderChain.addSpec('page').default(1);
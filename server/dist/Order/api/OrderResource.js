'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrderResource = undefined;

var _chain = require('./chain.info');

var _fluidChains = require('fluid-chains');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = 'orders/';

var OrderResource = exports.OrderResource = function OrderResource(resource) {
    _classCallCheck(this, OrderResource);

    resource.post(_chain.CREATE_ORDER_API, '' + API, function (req, res) {
        (0, _fluidChains.ExecuteChain)(_chain.CREATE_ORDER_API, {
            inputBody: req.body
        }, function (result) {
            res.status(result.status()).send(result.dto());
        });
    });
    resource.delete(_chain.DELETE_ORDER_API, API + ':orderId', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_chain.DELETE_ORDER_API, {
            orderId: req.params.orderId
        }, function (result) {
            res.status(result.status()).send(result.dto());
        });
    });
    resource.put(_chain.UPDATE_ORDER_API, API + ':orderId', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_chain.UPDATE_ORDER_API, {
            orderId: req.params.orderId,
            inputData: req.body
        }, function (result) {
            res.status(result.status()).send(result.dto());
        });
    });
    resource.get(_chain.GET_ORDERS_API, '' + API, function (req, res) {
        var query = Object.assign({}, req.query);
        delete query.limit;
        delete query.offset;
        delete query.page;
        console.log('query', query);
        (0, _fluidChains.ExecuteChain)(_chain.GET_ORDERS_API, {
            query: query,
            paginate: {
                limit: req.query.limit || 25,
                offset: req.query.offset || 0,
                page: req.query.page || 1
            }
        }, function (result) {
            res.status(result.status()).send(result.dto());
        });
    });
};
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomerResource = undefined;

var _chain = require('./chain.info');

var _fluidChains = require('fluid-chains');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = 'customers/';

var CustomerResource = exports.CustomerResource = function CustomerResource(resource) {
    _classCallCheck(this, CustomerResource);

    resource.post(_chain.CREATE_CUSTOMER_API, '' + API, function (req, res) {
        (0, _fluidChains.ExecuteChain)(_chain.CREATE_CUSTOMER_API, {
            userId: req.body.userId,
            customerName: req.body.customerName
        }, function (result) {
            res.status(result.status()).send(result.dto());
        });
    });
    resource.delete(_chain.DELETE_CUSTOMER_API, API + ':customerId', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_chain.DELETE_CUSTOMER_API, {
            customerId: req.params.customerId
        }, function (result) {
            res.status(result.status()).send(result.dto());
        });
    });
    resource.put(_chain.UPDATE_CUSTOMER_API, API + ':customerId', function (req, res) {
        (0, _fluidChains.ExecuteChain)(_chain.UPDATE_CUSTOMER_API, {
            customerId: req.params.customerId,
            inputData: req.body
        }, function (result) {
            res.status(result.status()).send(result.dto());
        });
    });
    resource.get(_chain.GET_CUSTOMERS_API, '' + API, function (req, res) {
        var query = Object.assign({}, req.query);
        delete query.limit;
        delete query.offset;
        delete query.page;
        console.log('query', query);
        (0, _fluidChains.ExecuteChain)(_chain.GET_CUSTOMERS_API, {
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
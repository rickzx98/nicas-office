'use strict';

var _chain = require('./chain.info');

var _fluidChains = require('fluid-chains');

var _entity = require('../entity/');

var CreateOrderChain = new _fluidChains.Chain(_chain.CREATE_ORDER, function (context, param, next) {
    var orderNo = param.orderNo();
    var customerPONumber = param.customerPONumber();
    var customerName = param.customerName();
    var poReceivedDate = param.poReceivedDate();
    var sourceType = param.sourceType();
    var dateCreatedEBS = param.dateCreatedEBS();
    var shipDate = param.shipDate();
    var cancelDate = param.cancelDate();
    var requestDate = param.requestDate();
    var amount = param.amount();
    var comments = param.comments();
    var status = param.status();
    var category = param.category();
    var createdBy = param.createdBy();
    _entity.OrderModel.create({
        orderNo: orderNo,
        customerPONumber: customerPONumber,
        customerName: customerName,
        poReceivedDate: poReceivedDate,
        sourceType: sourceType,
        dateCreatedEBS: dateCreatedEBS,
        shipDate: shipDate,
        cancelDate: cancelDate,
        requestDate: requestDate,
        amount: amount,
        comments: comments,
        status: status,
        category: category,
        createdBy: createdBy
    }).then(function (orderCreated) {
        context.set('orderCreatedData', orderCreated);
        next();
    }).catch(function (error) {
        next(error);
    });
});
CreateOrderChain.addSpec('orderNo').default(0);
CreateOrderChain.addSpec('customerPONumber').require().validator(function (current, valid) {
    valid(current.length <= 10);
});
CreateOrderChain.addSpec('customerName').require().validator(function (current, valid) {
    valid(current.length <= 50);
});
CreateOrderChain.addSpec('poReceivedDate').require();
CreateOrderChain.addSpec('sourceType').require();
CreateOrderChain.addSpec('dateCreatedEBS').default('');
CreateOrderChain.addSpec('shipDate').default('');
CreateOrderChain.addSpec('cancelDate').default('');
CreateOrderChain.addSpec('requestDate').default('');
CreateOrderChain.addSpec('amount').require();
CreateOrderChain.addSpec('comments').default('');
CreateOrderChain.addSpec('status').require();
CreateOrderChain.addSpec('category').require();
CreateOrderChain.addSpec('createdBy').require();
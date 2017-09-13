import { CREATE_ORDER, ORDER_ERROR_HANDLER } from './chain.info';

import { Chain } from 'fluid-chains';
import { OrderModel } from '../entity/';

const CreateOrderChain = new Chain(CREATE_ORDER, (context, param, next) => {
    const orderNo = param.orderNo();
    const customerPONumber = param.customerPONumber();
    const customerName = param.customerName();
    const poReceivedDate = param.poReceivedDate();
    const sourceType = param.sourceType();
    const dateCreatedEBS = param.dateCreatedEBS();
    const shipDate = param.shipDate();
    const cancelDate = param.cancelDate();
    const requestDate = param.requestDate();
    const amount = param.amount();
    const comments = param.comments();
    const status = param.status();
    const category = param.category();
    const createdBy = param.createdBy();
    const newOrder = Object.assign({}, {
        orderNo,
        customerPONumber,
        customerName,
        poReceivedDate,
        sourceType,
        dateCreatedEBS,
        shipDate,
        cancelDate,
        requestDate,
        amount,
        comments,
        status,
        category,
        createdBy
    });
    console.log('newOrder', newOrder);
    OrderModel.create(newOrder).then(orderCreated => {
        context.set('orderCreatedData', orderCreated);
        next();
    }).catch(error => {
        next(error);
    });
}, undefined, ORDER_ERROR_HANDLER);
CreateOrderChain.addSpec('orderNo').default(0);
CreateOrderChain.addSpec('customerPONumber').require().validator((current, valid) => {
    valid(current.length <= 10);
});
CreateOrderChain.addSpec('customerName').require().validator((current, valid) => {
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
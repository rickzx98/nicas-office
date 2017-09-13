import { GET_ALL_ORDERS, ORDER_ERROR_HANDLER } from './chain.info';

import { Chain } from 'fluid-chains';
import { OrderModel } from '../entity/';

const OrderChain = new Chain(GET_ALL_ORDERS, (context, param, next) => {
    const query = param.query();
    const paginate = param.paginate();
    let regexed = query;
    if (query.orderNo) {
        regexed = Object.assign(query, { orderNo: new RegExp(query.orderNo, 'i') });
    }
    else if (query.customerPONumber) {
        regexed = Object.assign(query, { customerPONumber: new RegExp(query.customerPONumber, 'i') });
    }
    OrderModel.find(regexed, null, { sort: paginate.sort }, (err, result) => {
        if (!err) {
            context.set('orderFetchedData', result);
        }
        next(err);
    });
}, undefined, ORDER_ERROR_HANDLER);
OrderChain.addSpec('query').default({});
OrderChain.addSpec('paginate').default({});
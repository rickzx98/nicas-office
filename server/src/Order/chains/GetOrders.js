import { GET_ORDERS, ORDER_ERROR_HANDLER } from './chain.info';

import { Chain } from 'fluid-chains';
import { OrderModel } from '../entity/';

const OrderChain = new Chain(GET_ORDERS, (context, param, next) => {
    const query = param.query();
    const paginate = param.paginate();
    let regexed = query;
    if (query.orderNo) {
        regexed = Object.assign(query, { orderNo: new RegExp(query.orderNo, 'i') });
    }
    else if (query.customerPONumber) {
        regexed = Object.assign(query, { customerPONumber: new RegExp(query.customerPONumber, 'i') });
    }
    OrderModel.paginate(regexed, paginate, (err, result) => {
        if (!err) {
            const pages = Math.floor((result.total + paginate.limit - 1) / paginate.limit);
            context.set('orderFetchedData', Object.assign({ pages, page: paginate.page }, result));
        }
        next(err);
    });
}, undefined, ORDER_ERROR_HANDLER);
OrderChain.addSpec('query').default({});
OrderChain.addSpec('paginate').default({
    limit: 25,
    offset: 0,
    page: 1
});
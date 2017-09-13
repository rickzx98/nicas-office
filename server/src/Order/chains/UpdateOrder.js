import { ORDER_ERROR_HANDLER, UPDATE_ORDER } from './chain.info';

import { Chain } from 'fluid-chains';
import { OrderModel } from '../entity/';

const OrderChain = new Chain(UPDATE_ORDER, (context, param, next) => {
    const updateData = param.inputData();
    const orderId = param.orderId();
    OrderModel.findByIdAndUpdate(orderId, updateData)
        .then(data => {
            context.set('orderUpdatedData', data);
            next();
        }).catch(error => {
            next(error);
        });
}, undefined, ORDER_ERROR_HANDLER);
OrderChain.addSpec('orderId').require();
OrderChain.addSpec('inputData').default({}).require();